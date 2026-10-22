"use client";

import * as React from "react";
import Link from "next/link";
import { Drawer } from "vaul";
import { toast } from "sonner";
import { Gift, Minus, Plus, ShoppingBag, Sparkles, Trash2, X } from "lucide-react";
import { copy } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { formatKES } from "@/lib/formatters";
import { getBagAddonSuggestions } from "@/lib/repositories";
import {
  calculateBagTotals,
  useHydrated,
  useShopStore,
  type CartItem,
} from "@/features/cart/store";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/controls";

export function BagDrawer() {
  const hydrated = useHydrated();
  const isBagOpen = useShopStore((s) => s.isBagOpen);
  const setBagOpen = useShopStore((s) => s.setBagOpen);
  const items = useShopStore((s) => s.items);
  const giftWrap = useShopStore((s) => s.giftWrap);
  const orderNote = useShopStore((s) => s.orderNote);
  const updateQuantity = useShopStore((s) => s.updateQuantity);
  const removeItem = useShopStore((s) => s.removeItem);
  const restoreItem = useShopStore((s) => s.restoreItem);
  const addItem = useShopStore((s) => s.addItem);
  const setGiftWrap = useShopStore((s) => s.setGiftWrap);
  const setOrderNote = useShopStore((s) => s.setOrderNote);

  const isDesktop = React.useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );

  const bagItems = hydrated ? items : [];
  const totals = calculateBagTotals(bagItems, giftWrap);
  const addonSuggestions = getBagAddonSuggestions(
    bagItems.map((i) => i.slug),
    2,
  );

  function handleRemoveWithUndo(item: CartItem) {
    removeItem(item.key);
    toast(copy.cart.removedToast(item.name), {
      action: {
        label: copy.cart.undoAction,
        onClick: () => restoreItem(item),
      },
    });
  }

  return (
    <Drawer.Root
      open={isBagOpen}
      onOpenChange={setBagOpen}
      direction={isDesktop ? "right" : "bottom"}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="bg-plum/45 fixed inset-0 z-50 backdrop-blur-[2px]" />
        <Drawer.Content
          aria-describedby={undefined}
          className={
            isDesktop
              ? "border-plum bg-cream fixed top-0 right-0 bottom-0 z-50 flex h-dvh w-full max-w-md flex-col border-l-2 shadow-2xl outline-none"
              : "border-plum bg-cream fixed right-0 bottom-0 left-0 z-50 flex max-h-[90dvh] flex-col rounded-t-[28px] border-t-2 outline-none"
          }
        >
          {!isDesktop && (
            <div className="bg-plum/25 mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full" />
          )}

          {/* Header */}
          <div className="border-blush flex items-center justify-between border-b px-5 py-4">
            <Drawer.Title className="font-display text-plum flex items-center gap-2 text-xl font-bold">
              <ShoppingBag className="size-5" aria-hidden="true" />
              <span>{copy.cart.title}</span>
              <span className="border-plum bg-butter text-plum rounded-full border-2 px-2.5 py-0.5 text-xs">
                {bagItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </Drawer.Title>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close gift bag"
                className="border-plum text-plum hover:bg-blush inline-flex size-10 items-center justify-center rounded-full border-2 bg-white shadow-[0_2px_0_#4A3552]"
              >
                <X className="size-4" />
              </button>
            </Drawer.Close>
          </div>

          {/* Free Delivery Progress Ribbon */}
          <div className="border-blush bg-mint/65 border-b px-5 py-3">
            <div className="flex items-center justify-between gap-2 text-xs font-bold">
              <span className="text-plum flex items-center gap-1.5">
                <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                {totals.qualifiesForFreeDelivery
                  ? copy.cart.freeDeliveryUnlocked
                  : copy.cart.freeDeliveryProgress(formatKES(totals.remainingForFreeDelivery))}
              </span>
              <span className="font-display text-plum">{totals.freeDeliveryProgressPercent}%</span>
            </div>
            <div className="border-plum mt-1.5 h-2.5 w-full overflow-hidden rounded-full border bg-white">
              <div
                className="bg-bubblegum h-full transition-all duration-300"
                style={{ width: `${totals.freeDeliveryProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Body */}
          {bagItems.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <BowMascot mood="sleepy" size="lg" />
              <h3 className="font-display text-plum text-h3 mt-4 font-bold">
                {copy.cart.emptyTitle}
              </h3>
              <p className="text-soft-plum text-small mt-1.5 max-w-xs">{copy.cart.emptySubtitle}</p>
              <Button
                asChild
                variant="primary"
                size="md"
                className="mt-6"
                onClick={() => setBagOpen(false)}
              >
                <Link href="/shop">{copy.cart.emptyCta}</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                {/* Bag Line Items */}
                <ul className="space-y-3">
                  {bagItems.map((item) => (
                    <li
                      key={item.key}
                      className="border-plum/25 flex gap-3 rounded-2xl border-2 bg-white p-3 shadow-[0_3px_0_#FFD9E8]"
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setBagOpen(false)}
                        className="size-20 shrink-0"
                      >
                        <ProductIllustration
                          kind={item.illustration}
                          backdrop={item.backdrop}
                          alt={item.name}
                          className="aspect-square rounded-xl"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={() => setBagOpen(false)}
                              className="font-display text-plum hover:text-bubblegum-deep text-sm font-bold"
                            >
                              {item.name}
                            </Link>
                            {item.variant && (
                              <p className="text-soft-plum text-xs font-medium">
                                Option: {item.variant}
                              </p>
                            )}
                            {item.giftNote && (
                              <p className="text-plum bg-butter/40 mt-1 rounded-lg px-2 py-0.5 text-[11px] font-medium">
                                💌 Gift note: &ldquo;{item.giftNote}&rdquo;
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveWithUndo(item)}
                            aria-label={`Remove ${item.name} from bag`}
                            className="text-soft-plum hover:text-error inline-flex size-8 items-center justify-center rounded-full transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity Stepper */}
                          <div className="border-plum bg-cream inline-flex items-center rounded-full border-2">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() =>
                                item.quantity === 1
                                  ? handleRemoveWithUndo(item)
                                  : updateQuantity(item.key, item.quantity - 1)
                              }
                              className="text-plum hover:bg-blush inline-flex size-8 items-center justify-center rounded-l-full"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="font-display text-plum min-w-7 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="text-plum hover:bg-blush inline-flex size-8 items-center justify-center rounded-r-full"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>

                          <span className="font-display text-plum text-sm font-bold">
                            {formatKES(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Gift Wrap Toggle & Order Note */}
                <div className="border-plum/25 bg-lavender/35 space-y-3 rounded-2xl border-2 p-3.5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="bag-gift-wrap"
                      checked={giftWrap}
                      onCheckedChange={(checked) => setGiftWrap(Boolean(checked))}
                    />
                    <label
                      htmlFor="bag-gift-wrap"
                      className="text-plum flex-1 cursor-pointer text-xs leading-snug font-semibold"
                    >
                      <span className="font-display flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1">
                          <Gift className="size-3.5" aria-hidden="true" />
                          {copy.cart.giftWrapLabel}
                        </span>
                        <span>+{formatKES(siteConfig.giftWrapFee)}</span>
                      </span>
                      <span className="text-soft-plum block text-[11px]">
                        Pink tissue paper, satin bow & handwritten-style gift card
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="bag-order-note"
                      className="font-display text-plum mb-1 block text-xs font-semibold"
                    >
                      {copy.cart.orderNoteLabel}
                    </label>
                    <input
                      id="bag-order-note"
                      type="text"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder={copy.cart.orderNotePlaceholder}
                      className="border-plum/30 text-plum placeholder:text-soft-plum/70 focus-visible:border-plum w-full rounded-xl border-2 bg-white px-3 py-2 text-xs font-medium focus-visible:outline-none"
                    />
                  </div>
                </div>

                {/* Two Small Add-on Suggestions */}
                {addonSuggestions.length > 0 && (
                  <div className="pt-1">
                    <p className="font-display text-soft-plum mb-2 text-xs font-bold tracking-wider uppercase">
                      Little Extras Under KES 650 ✨
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {addonSuggestions.map((addon) => (
                        <div
                          key={addon.slug}
                          className="border-plum/20 flex items-center gap-2 rounded-2xl border-2 bg-white p-2"
                        >
                          <div className="size-12 shrink-0">
                            <ProductIllustration
                              kind={addon.illustration}
                              backdrop={addon.backdrop}
                              alt={addon.name}
                              className="aspect-square rounded-xl"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-plum truncate text-xs font-bold">
                              {addon.name}
                            </p>
                            <p className="text-soft-plum text-[11px] font-semibold">
                              {formatKES(addon.price)}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                addItem({
                                  slug: addon.slug,
                                  name: addon.name,
                                  price: addon.price,
                                  quantity: 1,
                                  illustration: addon.illustration,
                                  backdrop: addon.backdrop,
                                });
                                toast.success(copy.cart.addedToast(addon.name));
                              }}
                              className="font-display text-bubblegum-deep mt-0.5 text-xs font-bold underline"
                            >
                              + Toss in
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Footer Actions */}
              <div className="border-plum/20 pb-safe space-y-3 border-t-2 bg-white px-5 pt-4">
                <div className="space-y-1 text-sm">
                  {giftWrap && (
                    <div className="text-soft-plum flex justify-between text-xs font-semibold">
                      <span>Signature Bow Gift Wrap</span>
                      <span>{formatKES(totals.wrapCost)}</span>
                    </div>
                  )}
                  <div className="font-display text-plum flex items-center justify-between text-base font-bold">
                    <span>Subtotal</span>
                    <span className="text-lg">{formatKES(totals.subtotal + totals.wrapCost)}</span>
                  </div>
                  <p className="text-soft-plum text-xs">
                    Delivery calculated at checkout · Free over{" "}
                    {formatKES(siteConfig.freeDeliveryThreshold)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button asChild variant="secondary" size="sm" onClick={() => setBagOpen(false)}>
                    <Link href="/cart">{copy.cart.viewFullBag}</Link>
                  </Button>
                  <Button asChild variant="primary" size="sm" onClick={() => setBagOpen(false)}>
                    <Link href="/checkout">{copy.cart.checkoutCta} →</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
