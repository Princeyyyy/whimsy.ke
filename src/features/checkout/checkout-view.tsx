"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Lock,
  MapPin,
  PackageSearch,
  RefreshCcw,
  Smartphone,
  Sparkles,
  Tag,
  Truck,
  Wallet,
} from "lucide-react";
import { copy } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { formatKES, isValidKenyanPhone, normalizeKenyanPhone } from "@/lib/formatters";
import { getDeliveryZoneById, getDeliveryZones } from "@/lib/repositories";
import {
  calculateBagTotals,
  useHydrated,
  useShopStore,
  type StoredOrder,
} from "@/features/cart/store";
import {
  generateOrderNumber,
  simulatedPaymentProvider,
} from "@/features/checkout/payment-provider";
import { trackEvent } from "@/lib/analytics";
import { fireCelebrationConfetti } from "@/lib/confetti";
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/controls";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  phone: z
    .string()
    .refine(
      (val) => isValidKenyanPhone(val),
      "Enter a valid Kenyan mobile number (e.g. 0712 345 678 or +254 712 345 678).",
    ),
  deliveryMethod: z.enum(["delivery", "pickup"]),
  zoneId: z.string().min(1, "Please select a delivery zone."),
  address: z.string().min(3, "Please enter your street, apartment, or pickup town details."),
  landmark: z.string().min(2, "Add a nearby landmark so our rider finds you easily!"),
  paymentMethod: z.enum(["mpesa", "cod"]),
  mpesaPhone: z
    .string()
    .refine(
      (val) => isValidKenyanPhone(val),
      "Enter a valid M-Pesa phone number (e.g. 0712 345 678).",
    ),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutView() {
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const items = useShopStore((s) => s.items);
  const giftWrap = useShopStore((s) => s.giftWrap);
  const orderNote = useShopStore((s) => s.orderNote);
  const saveOrder = useShopStore((s) => s.saveOrder);
  const clearCart = useShopStore((s) => s.clearCart);

  const zones = React.useMemo(() => getDeliveryZones(), []);

  // Promo code state
  const [promoInput, setPromoInput] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState<string | undefined>(undefined);
  const [mobileSummaryOpen, setMobileSummaryOpen] = React.useState(false);

  // Payment simulation state
  const [paymentStage, setPaymentStage] = React.useState<
    "form" | "waiting-mpesa" | "failed" | "confirmed"
  >("form");
  const [paymentError, setPaymentError] = React.useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = React.useState<StoredOrder | null>(null);

  // Dev toggle to test failure/retry states (initialized from ?pay=fail)
  const [simulateFail, setSimulateFail] = React.useState(() => searchParams.get("pay") === "fail");

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      customerName: "",
      phone: "",
      deliveryMethod: "delivery",
      zoneId: zones[0]?.id ?? "zone-cbd",
      address: "",
      landmark: "",
      paymentMethod: "mpesa",
      mpesaPhone: "",
    },
  });

  const watchedDeliveryMethod = useWatch({
    control,
    name: "deliveryMethod",
    defaultValue: "delivery",
  });
  const watchedZoneId = useWatch({
    control,
    name: "zoneId",
    defaultValue: zones[0]?.id ?? "zone-cbd",
  });
  const watchedPaymentMethod = useWatch({
    control,
    name: "paymentMethod",
    defaultValue: "mpesa",
  });
  const watchedContactPhone = useWatch({
    control,
    name: "phone",
    defaultValue: "",
  });

  // Auto-sync M-Pesa phone when contact phone is blurred if M-Pesa phone is still blank
  const selectedZone = getDeliveryZoneById(watchedZoneId) ?? zones[0]!;
  const rawDeliveryFee = watchedDeliveryMethod === "pickup" ? 0 : selectedZone.fee;

  const bagItems = hydrated ? items : [];
  const totals = calculateBagTotals(bagItems, giftWrap, appliedPromo, rawDeliveryFee);

  // If user switches to an Upcountry zone where COD is unavailable, switch payment method back to M-Pesa
  React.useEffect(() => {
    if (
      watchedDeliveryMethod === "delivery" &&
      !selectedZone.codAvailable &&
      watchedPaymentMethod === "cod"
    ) {
      setValue("paymentMethod", "mpesa");
    }
  }, [watchedDeliveryMethod, selectedZone.codAvailable, watchedPaymentMethod, setValue]);

  React.useEffect(() => {
    if (hydrated && bagItems.length > 0) {
      trackEvent({
        name: "begin_checkout",
        payload: { itemCount: bagItems.length, subtotal: totals.subtotal },
      });
    }
  }, [hydrated, bagItems.length, totals.subtotal]);

  function handleApplyPromo() {
    const clean = promoInput.trim().toUpperCase();
    if (clean === siteConfig.promoCodes.WHIMSY10.code) {
      setAppliedPromo(clean);
      toast.success("Hooray! Code WHIMSY10 applied for 10% off");
    } else {
      toast.error("Pole! Try code WHIMSY10 for our 10% welcome discount.");
    }
  }

  async function onSubmit(values: CheckoutFormValues) {
    setPaymentError(null);
    const normalizedContactPhone = normalizeKenyanPhone(values.phone);
    const normalizedMpesaPhone = normalizeKenyanPhone(values.mpesaPhone || values.phone);

    if (values.paymentMethod === "mpesa") {
      setPaymentStage("waiting-mpesa");
    }

    const result = await simulatedPaymentProvider.processPayment({
      method: values.paymentMethod,
      amount: totals.total,
      phone: normalizedMpesaPhone,
      forceFail: simulateFail && values.paymentMethod === "mpesa",
    });

    if (!result.success) {
      setPaymentError(result.errorMessage ?? copy.checkout.paymentFailedTitle);
      setPaymentStage("failed");
      return;
    }

    const orderNum = generateOrderNumber();
    const newOrder: StoredOrder = {
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customerName: values.customerName.trim(),
      phone: normalizedContactPhone,
      deliveryMethod: values.deliveryMethod,
      zoneId: selectedZone.id,
      zoneName: values.deliveryMethod === "pickup" ? "Kilimani Studio Pickup" : selectedZone.name,
      address: values.address.trim(),
      landmark: values.landmark.trim(),
      paymentMethod: values.paymentMethod,
      mpesaReceipt: result.receiptNumber,
      items: [...bagItems],
      giftWrap,
      orderNote,
      promoCode: appliedPromo,
      discountAmount: totals.discountAmount,
      deliveryFee: totals.effectiveDeliveryFee,
      subtotal: totals.subtotal,
      total: totals.total,
      eta:
        values.deliveryMethod === "pickup"
          ? "Ready in 2 hours at Kilimani Studio"
          : selectedZone.eta,
      status: values.paymentMethod === "mpesa" ? "Paid" : "Placed",
    };

    saveOrder(newOrder);
    setConfirmedOrder(newOrder);
    clearCart();
    setPaymentStage("confirmed");

    trackEvent({
      name: "purchase",
      payload: {
        orderNumber: newOrder.orderNumber,
        total: newOrder.total,
        paymentMethod: newOrder.paymentMethod,
        itemCount: newOrder.items.reduce((s, i) => s + i.quantity, 0),
      },
    });

    fireCelebrationConfetti();
  }

  // 1. M-PESA WAITING SCREEN (Animated Mascot + 4s STK push countdown)
  if (paymentStage === "waiting-mpesa") {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-feature border-line-strong shadow-sticker-plum-lg space-y-5 border bg-white p-8">
          <div className="mx-auto flex justify-center">
            <BrandGlyph mood="waving" size="xl" />
          </div>
          <Badge variant="new" className="mx-auto">
            Safaricom M-Pesa STK Push Sent{" "}
          </Badge>
          <h1 className="font-display text-plum text-h2 font-bold">
            {copy.checkout.mpesaWaitingTitle}
          </h1>
          <p className="text-soft-plum text-body">{copy.checkout.mpesaWaitingSubtitle}</p>

          <div className="border-line-strong bg-mint/60 mx-auto max-w-xs space-y-1 rounded-2xl border p-4 text-sm font-semibold">
            <p className="text-plum font-display font-bold">Amount: {formatKES(totals.total)}</p>
            <p className="text-soft-plum text-xs">
              Payable to: Whimsy.KE ({siteConfig.contact.mpesaTillNumber})
            </p>
          </div>

          <div className="border-line-strong bg-cream mx-auto h-3 w-56 overflow-hidden rounded-full border">
            <div className="bg-bubblegum h-full w-full animate-pulse" />
          </div>
          <p className="text-soft-plum text-xs font-semibold">
            Waiting for PIN confirmation (approx. 4 seconds)...
          </p>
        </div>
      </div>
    );
  }

  // 2. ORDER CONFIRMATION SCREEN (Success + Confetti + Summary + Track Order CTA)
  if (paymentStage === "confirmed" && confirmedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-feature border-line-strong shadow-sticker-plum-lg space-y-6 border bg-white p-6 text-center sm:p-10">
          <div className="mx-auto flex justify-center">
            <BrandGlyph mood="happy" size="xl" />
          </div>

          <div className="space-y-2">
            <Badge variant="new">Order Confirmed</Badge>
            <h1 className="font-display text-plum text-h1 font-bold">
              {copy.checkout.orderSuccessTitle}
            </h1>
            <p className="text-soft-plum text-body">
              Thank you, <strong>{confirmedOrder.customerName}</strong>! We&apos;re already wrapping
              your pastel parcel with extra care and a free bow sticker.
            </p>
          </div>

          {/* Order Meta Card */}
          <div className="border-line-strong bg-cream grid grid-cols-2 gap-4 rounded-2xl border p-4 text-left text-xs sm:grid-cols-4 sm:text-sm">
            <div>
              <span className="text-soft-plum block text-xs font-bold uppercase">Order Number</span>
              <span className="font-display text-plum font-bold">{confirmedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-soft-plum block text-xs font-bold uppercase">Payment</span>
              <span className="font-display text-plum font-bold uppercase">
                {confirmedOrder.paymentMethod === "mpesa"
                  ? `M-Pesa (${confirmedOrder.mpesaReceipt})`
                  : "Cash on Delivery"}
              </span>
            </div>
            <div>
              <span className="text-soft-plum block text-xs font-bold uppercase">Total Paid</span>
              <span className="font-display text-plum font-bold">
                {formatKES(confirmedOrder.total)}
              </span>
            </div>
            <div>
              <span className="text-soft-plum block text-xs font-bold uppercase">
                Estimated Arrival
              </span>
              <span className="font-display text-plum font-bold">{confirmedOrder.eta}</span>
            </div>
          </div>

          {/* Ordered Items List */}
          <div className="border-plum/25 rounded-2xl border bg-white p-4 text-left">
            <h2 className="font-display text-plum mb-3 text-sm font-bold">
              Items in Your Parcel ({confirmedOrder.zoneName})
            </h2>
            <ul className="divide-blush divide-y text-sm">
              {confirmedOrder.items.map((item) => (
                <li key={item.key} className="flex items-center justify-between py-2">
                  <span className="text-plum font-semibold">
                    {item.quantity}× {item.name} {item.variant ? `(${item.variant})` : ""}
                  </span>
                  <span className="font-display text-plum font-bold">
                    {formatKES(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link
                href={`/track?order=${encodeURIComponent(
                  confirmedOrder.orderNumber,
                )}&phone=${encodeURIComponent(confirmedOrder.phone)}`}
              >
                <PackageSearch className="size-5" aria-hidden="true" />
                <span>Track Order Status</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Bag Guard
  if (hydrated && bagItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-feature border-line-strong shadow-sticker space-y-4 border bg-white p-8">
          <BrandGlyph mood="sleepy" size="lg" className="mx-auto" />
          <h1 className="font-display text-plum text-h2 font-bold">{copy.cart.emptyTitle}</h1>
          <p className="text-soft-plum text-small">
            Select items from our collection before proceeding to checkout.
          </p>
          <Button asChild variant="primary" size="md">
            <Link href="/shop">{copy.cart.emptyCta}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-clip pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-8">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="bestseller">Secure Kenya Checkout</Badge>
              <h1 className="font-display text-plum text-h1 mt-1 font-bold">
                {copy.checkout.title}
              </h1>
            </div>

            {/* Clear Step Indicator */}
            <ol
              aria-label="Checkout steps"
              className="font-display flex flex-wrap items-center gap-1.5 text-xs font-bold sm:gap-2 sm:text-sm"
            >
              <li className="border-line-strong text-plum shadow-sticker flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5">
                <span className="bg-bubblegum border-line-strong flex size-5 items-center justify-center rounded-full border text-xs">
                  1
                </span>
                <span>Contact</span>
              </li>
              <span aria-hidden="true">→</span>
              <li className="border-line-strong text-plum shadow-sticker flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5">
                <span className="bg-butter border-line-strong flex size-5 items-center justify-center rounded-full border text-xs">
                  2
                </span>
                <span>Delivery</span>
              </li>
              <span aria-hidden="true">→</span>
              <li className="border-line-strong text-plum shadow-sticker flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5">
                <span className="bg-mint border-line-strong flex size-5 items-center justify-center rounded-full border text-xs">
                  3
                </span>
                <span>M-Pesa / COD</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-8 max-w-(--spacing-container) px-4 sm:px-6">
        {/* Payment Failure Alert Banner (when ?pay=fail or dev toggle is active) */}
        {paymentStage === "failed" && paymentError && (
          <div
            role="alert"
            className="rounded-card border-error bg-error-bg text-plum shadow-sticker mb-6 flex flex-col items-start justify-between gap-4 border p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-3">
              <BrandGlyph mood="confused" size="sm" animated={false} />
              <div>
                <h2 className="font-display text-error text-base font-bold">
                  {copy.checkout.paymentFailedTitle}
                </h2>
                <p className="text-plum text-xs font-medium">{paymentError}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setSimulateFail(false);
                setPaymentStage("form");
                setPaymentError(null);
                toast.info("Switched M-Pesa simulator back to Success mode! Tap Pay to complete.");
              }}
            >
              <RefreshCcw className="size-4" />
              <span>Switch to Success & Retry</span>
            </Button>
          </div>
        )}

        {/* Collapsible Mobile Order Summary */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            aria-expanded={mobileSummaryOpen}
            onClick={() => setMobileSummaryOpen((o) => !o)}
            className="rounded-card border-line-strong text-plum shadow-sticker flex w-full items-center justify-between border bg-white p-4"
          >
            <span className="font-display flex items-center gap-2 text-sm font-bold">
              <span>
                {mobileSummaryOpen ? "Hide" : "Show"} Order Summary (
                {bagItems.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <ChevronDown
                className={cn("size-4 transition-transform", mobileSummaryOpen && "rotate-180")}
              />
            </span>
            <span className="font-display text-plum text-base font-bold">
              {formatKES(totals.total)}
            </span>
          </button>

          {mobileSummaryOpen && (
            <div className="border-line-strong mt-2 rounded-2xl border bg-white p-4">
              <ul className="divide-blush divide-y text-xs">
                {bagItems.map((item) => (
                  <li key={item.key} className="flex items-center justify-between py-2">
                    <span className="font-semibold">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-display font-bold">
                      {formatKES(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* Left Column: Steps 1, 2, 3 */}
          <div className="space-y-8 lg:col-span-7">
            {/* STEP 1: CONTACT DETAILS */}
            <section
              aria-labelledby="step-contact"
              className="rounded-feature border-line-strong shadow-sticker space-y-4 border bg-white p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-display border-line-strong bg-bubblegum text-plum flex size-7 items-center justify-center rounded-full border text-sm font-bold">
                  1
                </span>
                <h2 id="step-contact" className="font-display text-plum text-h3 font-bold">
                  Your Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="checkout-name">Full Name</Label>
                  <Input
                    id="checkout-name"
                    autoComplete="name"
                    placeholder="e.g. Wanjiru Kamau"
                    hasError={Boolean(errors.customerName)}
                    {...register("customerName")}
                  />
                  {errors.customerName && (
                    <p className="text-error mt-1 text-xs font-semibold">
                      {errors.customerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="checkout-phone">
                    Kenyan Phone Number (WhatsApp / Rider Call)
                  </Label>
                  <Input
                    id="checkout-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0712 345 678 or +254 712 345 678"
                    hasError={Boolean(errors.phone)}
                    {...register("phone", {
                      onBlur: (e) => {
                        const norm = normalizeKenyanPhone(e.target.value);
                        setValue("phone", norm);
                        if (!getValues("mpesaPhone")) {
                          setValue("mpesaPhone", norm);
                        }
                      },
                    })}
                  />
                  {errors.phone ? (
                    <p className="text-error mt-1 text-xs font-semibold">{errors.phone.message}</p>
                  ) : (
                    <p className="text-soft-plum mt-1 text-[11px]">
                      Auto-formats to +254 standard on blur.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* STEP 2: DELIVERY OR STUDIO PICKUP */}
            <section
              aria-labelledby="step-delivery"
              className="rounded-feature border-line-strong shadow-sticker space-y-5 border bg-white p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-display border-line-strong bg-butter text-plum flex size-7 items-center justify-center rounded-full border text-sm font-bold">
                  2
                </span>
                <h2 id="step-delivery" className="font-display text-plum text-h3 font-bold">
                  Delivery or Studio Pickup
                </h2>
              </div>

              {/* Delivery vs Pickup Toggle Cards */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all",
                    watchedDeliveryMethod === "delivery"
                      ? "border-line-strong bg-blush/45 shadow-sticker"
                      : "border-plum/25 bg-cream/50 hover:bg-white",
                  )}
                >
                  <input
                    type="radio"
                    value="delivery"
                    className="sr-only"
                    {...register("deliveryMethod")}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-plum flex items-center gap-2 text-sm font-bold">
                      <Truck className="size-4" aria-hidden="true" />
                      Doorstep / Courier Delivery
                    </span>
                    <span className="font-display text-plum text-xs font-bold">
                      {totals.qualifiesForFreeDelivery ? "FREE" : formatKES(selectedZone.fee)}
                    </span>
                  </div>
                  <p className="text-soft-plum mt-1 text-xs">
                    Same-day Nairobi rider or 1–2 day upcountry courier
                  </p>
                </label>

                <label
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all",
                    watchedDeliveryMethod === "pickup"
                      ? "border-line-strong bg-mint/65 shadow-sticker"
                      : "border-plum/25 bg-cream/50 hover:bg-white",
                  )}
                >
                  <input
                    type="radio"
                    value="pickup"
                    className="sr-only"
                    {...register("deliveryMethod")}
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-plum flex items-center gap-2 text-sm font-bold">
                      <MapPin className="size-4" aria-hidden="true" />
                      Kilimani Studio Pickup
                    </span>
                    <span className="font-display text-plum text-xs font-bold">FREE</span>
                  </div>
                  <p className="text-soft-plum mt-1 text-xs">
                    Ready in 2 hours · {siteConfig.contact.pickupAddress}
                  </p>
                </label>
              </div>

              {/* Delivery Zone Selector with Live Fee & ETA */}
              {watchedDeliveryMethod === "delivery" && (
                <div>
                  <Label htmlFor="checkout-zone">Select Your Delivery Zone</Label>
                  <select
                    id="checkout-zone"
                    className="border-line-strong text-plum font-display focus-visible:outline-plum shadow-sticker flex min-h-12 w-full rounded-2xl border bg-white px-4 py-2.5 text-sm font-semibold"
                    {...register("zoneId")}
                  >
                    {zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.name} —{" "}
                        {totals.qualifiesForFreeDelivery ? "FREE (Unlocked!)" : formatKES(z.fee)} (
                        {z.eta})
                      </option>
                    ))}
                  </select>

                  <div className="border-plum/25 bg-mint/45 mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold">
                    <span className="text-plum">
                      Estimated Arrival: <strong>{selectedZone.eta}</strong>
                    </span>
                    <span className="text-plum">
                      Fee:{" "}
                      <strong>
                        {totals.qualifiesForFreeDelivery
                          ? "FREE (Over KES 3,000)"
                          : formatKES(selectedZone.fee)}
                      </strong>
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="checkout-address">
                    {watchedDeliveryMethod === "pickup"
                      ? "Person Collecting / Notes"
                      : "Building, Street or Estate"}
                  </Label>
                  <Input
                    id="checkout-address"
                    autoComplete="street-address"
                    placeholder="e.g. Kindaruma Rd, Pastel Court Apt 4B"
                    hasError={Boolean(errors.address)}
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-error mt-1 text-xs font-semibold">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="checkout-landmark">Nearest Landmark / Gate Instructions</Label>
                  <Input
                    id="checkout-landmark"
                    placeholder={selectedZone.landmarksHint}
                    hasError={Boolean(errors.landmark)}
                    {...register("landmark")}
                  />
                  {errors.landmark && (
                    <p className="text-error mt-1 text-xs font-semibold">
                      {errors.landmark.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* STEP 3: PAYMENT METHOD CARDS */}
            <section
              aria-labelledby="step-payment"
              className="rounded-feature border-line-strong shadow-sticker space-y-5 border bg-white p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-display border-line-strong bg-mint text-plum flex size-7 items-center justify-center rounded-full border text-sm font-bold">
                  3
                </span>
                <h2 id="step-payment" className="font-display text-plum text-h3 font-bold">
                  Choose Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {/* Option A: M-Pesa Simulated */}
                <label
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all",
                    watchedPaymentMethod === "mpesa"
                      ? "border-line-strong bg-mint/55 shadow-sticker"
                      : "border-plum/25 hover:bg-cream/60 bg-white",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-plum flex items-center gap-2 text-sm font-bold sm:text-base">
                      <input
                        type="radio"
                        value="mpesa"
                        className="accent-plum size-4 shrink-0"
                        {...register("paymentMethod")}
                      />
                      <Smartphone className="size-5 shrink-0" aria-hidden="true" />
                      <span>M-Pesa Express (STK Push Prompt)</span>
                    </span>
                    <Badge variant="new">Instant</Badge>
                  </div>
                  <p className="text-soft-plum mt-1 text-xs sm:pl-6">
                    We&apos;ll send an automated M-Pesa PIN prompt straight to your phone screen.
                  </p>

                  {watchedPaymentMethod === "mpesa" && (
                    <div className="mt-4 sm:pl-6">
                      <Label htmlFor="checkout-mpesa-phone">M-Pesa Phone Number to Prompt</Label>
                      <Input
                        id="checkout-mpesa-phone"
                        type="tel"
                        inputMode="tel"
                        placeholder={watchedContactPhone || "0712 345 678"}
                        hasError={Boolean(errors.mpesaPhone)}
                        {...register("mpesaPhone", {
                          onBlur: (e) =>
                            setValue("mpesaPhone", normalizeKenyanPhone(e.target.value)),
                        })}
                      />
                      {errors.mpesaPhone && (
                        <p className="text-error mt-1 text-xs font-semibold">
                          {errors.mpesaPhone.message}
                        </p>
                      )}
                    </div>
                  )}
                </label>

                {/* Option B: Cash on Delivery (Nairobi zones) */}
                <label
                  className={cn(
                    "rounded-2xl border p-4 transition-all",
                    !selectedZone.codAvailable && watchedDeliveryMethod === "delivery"
                      ? "border-plum/15 bg-cream-subtle cursor-not-allowed opacity-60"
                      : watchedPaymentMethod === "cod"
                        ? "border-line-strong bg-butter/60 shadow-sticker cursor-pointer"
                        : "border-plum/25 hover:bg-cream/60 cursor-pointer bg-white",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-plum flex items-center gap-2 text-sm font-bold sm:text-base">
                      <input
                        type="radio"
                        value="cod"
                        disabled={
                          !selectedZone.codAvailable && watchedDeliveryMethod === "delivery"
                        }
                        className="accent-plum size-4 shrink-0"
                        {...register("paymentMethod")}
                      />
                      <Wallet className="size-5 shrink-0" aria-hidden="true" />
                      <span>Pay on Delivery (Cash or M-Pesa to Rider)</span>
                    </span>
                    <Badge variant="bestseller">Nairobi Zones</Badge>
                  </div>
                  <p className="text-soft-plum mt-1 text-xs sm:pl-6">
                    {selectedZone.codAvailable || watchedDeliveryMethod === "pickup"
                      ? "Pay comfortably when your pastel parcel is handed to you."
                      : "Pole! Cash on Delivery is only available within Nairobi zones."}
                  </p>
                </label>

                {/* Option C: Card (Disabled "Coming soon") */}
                <div
                  aria-disabled="true"
                  className="border-plum/15 bg-cream-subtle flex flex-wrap items-center justify-between gap-2 rounded-2xl border p-4 opacity-65 select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="text-soft-plum size-5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-display text-soft-plum text-sm font-bold">
                        Visa / Mastercard Debit & Credit Card
                      </p>
                      <p className="text-soft-plum text-xs">
                        Card gateway integration is coming soon
                      </p>
                    </div>
                  </div>
                  <Badge variant="soldOut">Coming Soon</Badge>
                </div>
              </div>

              {/* Discreet Stakeholder Demo Panel to test M-Pesa failure state */}
              <div className="border-plum/25 bg-lavender/35 flex items-center justify-between gap-3 rounded-2xl border border-dashed p-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="dev-simulate-fail"
                    checked={simulateFail}
                    onCheckedChange={(c) => setSimulateFail(Boolean(c))}
                  />
                  <label
                    htmlFor="dev-simulate-fail"
                    className="text-plum cursor-pointer font-semibold"
                  >
                    <strong className="font-display">Demo Toggle:</strong> Simulate M-Pesa
                    timeout/failure on next tap (or use <code>?pay=fail</code>)
                  </label>
                </div>
                <AlertTriangle className="text-plum size-4 shrink-0" aria-hidden="true" />
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Order Summary + Promo Code + Pay CTA */}
          <div className="lg:col-span-5">
            <div className="rounded-feature border-line-strong shadow-sticker-plum sticky top-24 space-y-5 border bg-white p-6">
              <h2 className="font-display text-plum text-h3 font-bold">Order Summary</h2>

              {/* Line Items Preview */}
              <ul className="divide-blush max-h-64 divide-y overflow-y-auto pr-1">
                {bagItems.map((item) => (
                  <li key={item.key} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="size-12 shrink-0">
                        <ProductIllustration
                          kind={item.illustration}
                          backdrop={item.backdrop}
                          alt={item.name}
                          className="aspect-square rounded-xl"
                        />
                      </div>
                      <div>
                        <p className="font-display text-plum text-xs font-bold">
                          {item.quantity}× {item.name}
                        </p>
                        {item.variant && (
                          <p className="text-soft-plum text-[11px]">{item.variant}</p>
                        )}
                      </div>
                    </div>
                    <span className="font-display text-plum text-xs font-bold">
                      {formatKES(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Promo Code Input (Accepts WHIMSY10) */}
              <div className="border-blush border-t pt-4">
                <Label htmlFor="checkout-promo-input">
                  Promo Code (Try <strong>WHIMSY10</strong> for 10% off)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="checkout-promo-input"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="WHIMSY10"
                    className="uppercase"
                  />
                  <Button type="button" variant="secondary" size="sm" onClick={handleApplyPromo}>
                    <Tag className="size-4" aria-hidden="true" />
                    <span>Apply</span>
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-plum bg-mint mt-2 inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Code {appliedPromo} applied (-10% off!)
                  </p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="border-blush space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-soft-plum font-semibold">Subtotal</span>
                  <span className="font-display text-plum font-bold">
                    {formatKES(totals.subtotal)}
                  </span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="text-bubblegum-deep flex justify-between font-bold">
                    <span>Promo Discount (WHIMSY10)</span>
                    <span>-{formatKES(totals.discountAmount)}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between">
                    <span className="text-soft-plum font-semibold">Signature Bow Gift Wrap</span>
                    <span className="font-display text-plum font-bold">
                      {formatKES(totals.wrapCost)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-soft-plum font-semibold">
                    Delivery (
                    {watchedDeliveryMethod === "pickup"
                      ? "Studio Pickup"
                      : selectedZone.name.split(",")[0]}
                    )
                  </span>
                  <span className="font-display text-plum font-bold">
                    {totals.effectiveDeliveryFee === 0
                      ? "FREE"
                      : formatKES(totals.effectiveDeliveryFee)}
                  </span>
                </div>

                <div className="border-blush flex items-center justify-between border-t pt-3 text-lg">
                  <span className="font-display text-plum font-bold">Total to Pay</span>
                  <span className="font-display text-plum text-2xl font-bold">
                    {formatKES(totals.total)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
              >
                <Lock className="size-4" aria-hidden="true" />
                <span>
                  {watchedPaymentMethod === "mpesa"
                    ? `Pay ${formatKES(totals.total)} with M-Pesa`
                    : `Place COD Order · ${formatKES(totals.total)}`}
                </span>
              </Button>

              <p className="text-soft-plum flex items-center justify-center gap-1.5 text-center text-xs">
                <Sparkles className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{siteConfig.demoNotice}</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
