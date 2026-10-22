"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, MapPin, Package, Search } from "lucide-react";
import { formatDate, formatKES, normalizeKenyanPhone } from "@/lib/formatters";
import {
  useHydrated,
  useShopStore,
  type OrderStatusStep,
  type StoredOrder,
} from "@/features/cart/store";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STATUS_TIMELINE: {
  step: OrderStatusStep;
  title: string;
  subtitle: string;
}[] = [
  {
    step: "Placed",
    title: "Order Placed",
    subtitle: "Received at our Kilimani pastel studio",
  },
  {
    step: "Paid",
    title: "Payment Confirmed",
    subtitle: "M-Pesa receipt or COD verified",
  },
  {
    step: "Packed",
    title: "Wrapped with a Bow",
    subtitle: "Nestled in pink tissue with your free sticker sheet",
  },
  {
    step: "Out for delivery",
    title: "Out for Delivery",
    subtitle: "Our rider or courier is on the way to your landmark",
  },
  {
    step: "Delivered",
    title: "Delivered with Smiles!",
    subtitle: "Enjoy your cute Whimsy.KE goodies",
  },
];

export function OrderTrackingView() {
  const searchParams = useSearchParams();
  const hydrated = useHydrated();
  const orders = useShopStore((s) => s.orders);

  const initialOrderParam = searchParams.get("order") ?? "WHIM-2026-8421";
  const initialPhoneParam = searchParams.get("phone") ?? "0712 345 678";

  const [orderInput, setOrderInput] = React.useState(initialOrderParam);
  const [phoneInput, setPhoneInput] = React.useState(initialPhoneParam);
  const [activeQuery, setActiveQuery] = React.useState({
    orderNo: initialOrderParam,
    phoneRaw: initialPhoneParam,
  });

  const matchedOrder = React.useMemo<StoredOrder | null>(() => {
    if (!hydrated) return null;
    const cleanOrder = activeQuery.orderNo.trim().toUpperCase();
    const normalizedPhone = normalizeKenyanPhone(activeQuery.phoneRaw);

    const found = orders.find((o) => {
      const orderMatches = o.orderNumber.toUpperCase() === cleanOrder;
      if (!activeQuery.phoneRaw.trim()) return orderMatches;
      return (
        orderMatches &&
        (o.phone === normalizedPhone ||
          o.phone.endsWith(activeQuery.phoneRaw.replace(/\D/g, "").slice(-8)))
      );
    });

    return found ?? null;
  }, [hydrated, orders, activeQuery]);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setActiveQuery({ orderNo: orderInput, phoneRaw: phoneInput });
  }

  const activeStepIndex = matchedOrder
    ? STATUS_TIMELINE.findIndex((s) => s.step === matchedOrder.status)
    : -1;

  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">Live Parcel Tracker 📦</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">Track Your Whimsy Order</h1>
          <p className="text-soft-plum text-body mt-1 max-w-xl">
            Enter your order number and phone number below. Try our pre-seeded demo order{" "}
            <strong>WHIM-2026-8421</strong> with phone <strong>0712 345 678</strong>!
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-8 max-w-4xl space-y-8 px-4 sm:px-6">
        {/* Lookup Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="rounded-feature border-plum shadow-sticker grid grid-cols-1 gap-4 border-2 bg-white p-6 sm:grid-cols-12 sm:items-end"
        >
          <div className="sm:col-span-5">
            <Label htmlFor="track-order-number">Order Number</Label>
            <Input
              id="track-order-number"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              placeholder="e.g. WHIM-2026-8421"
              required
            />
          </div>

          <div className="sm:col-span-5">
            <Label htmlFor="track-phone">Kenyan Phone Number</Label>
            <Input
              id="track-phone"
              type="tel"
              inputMode="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="e.g. 0712 345 678"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              <Search className="size-4" aria-hidden="true" />
              <span>Track</span>
            </Button>
          </div>

          {/* Quick Demo Order Pills */}
          {hydrated && orders.length > 0 && (
            <div className="border-blush flex flex-wrap items-center gap-2 border-t pt-3 text-xs sm:col-span-12">
              <span className="font-display text-soft-plum font-bold">
                Quick-fill stored orders:
              </span>
              {orders.slice(0, 3).map((o) => (
                <button
                  key={o.orderNumber}
                  type="button"
                  onClick={() => {
                    setOrderInput(o.orderNumber);
                    setPhoneInput(o.phone);
                    setActiveQuery({ orderNo: o.orderNumber, phoneRaw: o.phone });
                  }}
                  className="font-display border-plum bg-butter/60 hover:bg-butter text-plum rounded-full border px-3 py-1 font-bold transition-colors"
                >
                  {o.orderNumber} ({o.status})
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Results Area */}
        {hydrated && !matchedOrder && (
          <div className="rounded-feature border-plum shadow-sticker flex flex-col items-center border-2 bg-white p-10 text-center">
            <BowMascot mood="confused" size="lg" />
            <h2 className="font-display text-plum text-h3 mt-4 font-bold">
              Pole! We couldn&apos;t find an order matching those details.
            </h2>
            <p className="text-soft-plum text-small mt-1 max-w-md">
              Check your order number or click the <strong>WHIM-2026-8421</strong> demo pill above
              to preview a live order timeline.
            </p>
          </div>
        )}

        {matchedOrder && (
          <div className="rounded-feature border-plum shadow-sticker-plum space-y-8 border-2 bg-white p-6 sm:p-8">
            {/* Top Summary Header */}
            <div className="border-blush flex flex-wrap items-start justify-between gap-4 border-b pb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <Badge variant="new">{matchedOrder.status}</Badge>
                  <span className="text-soft-plum text-xs font-semibold">
                    Placed on {formatDate(matchedOrder.createdAt)}
                  </span>
                </div>
                <h2 className="font-display text-plum text-h2 mt-2 font-bold">
                  Order {matchedOrder.orderNumber}
                </h2>
                <p className="text-soft-plum text-small">
                  For <strong>{matchedOrder.customerName}</strong> ({matchedOrder.phone})
                </p>
              </div>

              <div className="border-plum bg-mint/55 rounded-2xl border-2 px-4 py-3 text-right">
                <span className="text-soft-plum block text-xs font-bold uppercase">
                  Estimated Arrival
                </span>
                <span className="font-display text-plum text-base font-bold">
                  {matchedOrder.eta}
                </span>
              </div>
            </div>

            {/* 5-Step Status Timeline (Placed -> Paid -> Packed -> Out for delivery -> Delivered) */}
            <div>
              <h3 className="font-display text-plum mb-5 text-base font-bold">Parcel Journey</h3>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-5">
                {STATUS_TIMELINE.map((item, idx) => {
                  const isCompleted = idx <= activeStepIndex;
                  const isCurrent = idx === activeStepIndex;

                  return (
                    <li
                      key={item.step}
                      className={cn(
                        "rounded-2xl border-2 p-4 transition-all",
                        isCurrent
                          ? "border-plum bg-butter/65 shadow-[0_4px_0_#4A3552]"
                          : isCompleted
                            ? "border-plum bg-mint/55"
                            : "border-plum/20 bg-cream/60 opacity-65",
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className={cn(
                            "font-display flex size-7 items-center justify-center rounded-full border-2 text-xs font-bold",
                            isCompleted
                              ? "border-plum text-plum bg-white"
                              : "border-plum/30 text-soft-plum bg-white",
                          )}
                        >
                          {isCompleted ? <Check className="size-4 stroke-[3]" /> : idx + 1}
                        </span>
                        {isCurrent && (
                          <span className="font-display bg-bubblegum border-plum text-plum rounded-full border px-2 py-0.5 text-[10px] font-bold">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="font-display text-plum text-sm font-bold">{item.title}</p>
                      <p className="text-soft-plum mt-1 text-xs leading-snug">{item.subtitle}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Delivery Address & Items Breakdown */}
            <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-12">
              <div className="border-plum/25 bg-cream/65 space-y-2.5 rounded-2xl border-2 p-4 text-xs md:col-span-5">
                <h3 className="font-display text-plum flex items-center gap-1.5 text-sm font-bold">
                  <MapPin className="size-4" aria-hidden="true" />
                  <span>Delivery Destination</span>
                </h3>
                <p className="text-plum font-semibold">{matchedOrder.zoneName}</p>
                <p className="text-soft-plum">{matchedOrder.address}</p>
                <p className="text-soft-plum">
                  <strong>Landmark:</strong> {matchedOrder.landmark}
                </p>
                {matchedOrder.orderNote && (
                  <p className="bg-butter/50 text-plum mt-2 rounded-xl p-2.5 font-semibold">
                    💌 Gift Note: &ldquo;{matchedOrder.orderNote}&rdquo;
                  </p>
                )}
              </div>

              <div className="border-plum/25 rounded-2xl border-2 bg-white p-4 md:col-span-7">
                <h3 className="font-display text-plum mb-3 flex items-center gap-1.5 text-sm font-bold">
                  <Package className="size-4" aria-hidden="true" />
                  <span>Items Inside Your Parcel</span>
                </h3>
                <ul className="divide-blush divide-y">
                  {matchedOrder.items.map((item) => (
                    <li key={item.key} className="flex items-center justify-between gap-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="size-11 shrink-0">
                          <ProductIllustration
                            kind={item.illustration}
                            backdrop={item.backdrop}
                            alt={item.name}
                            className="aspect-square rounded-xl"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-display text-plum hover:text-bubblegum-deep text-xs font-bold"
                          >
                            {item.quantity}× {item.name}
                          </Link>
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

                <div className="border-blush mt-3 flex items-center justify-between border-t pt-3">
                  <span className="font-display text-plum text-sm font-bold">
                    Total ({matchedOrder.paymentMethod.toUpperCase()})
                  </span>
                  <span className="font-display text-plum text-lg font-bold">
                    {formatKES(matchedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
