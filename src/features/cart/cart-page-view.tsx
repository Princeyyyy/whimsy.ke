"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowRight, Gift, Minus, Plus, Sparkles, Trash2 } from "lucide-react";
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
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/controls";
import { Textarea } from "@/components/ui/input";

export function CartPageView() {
  const hydrated = useHydrated();
  const items = useShopStore((s) => s.items);
  const giftWrap = useShopStore((s) => s.giftWrap);
  const orderNote = useShopStore((s) => s.orderNote);
  const updateQuantity = useShopStore((s) => s.updateQuantity);
  const removeItem = useShopStore((s) => s.removeItem);
  const restoreItem = useShopStore((s) => s.restoreItem);
  const addItem = useShopStore((s) => s.addItem);
  const setGiftWrap = useShopStore((s) => s.setGiftWrap);
  const setOrderNote = useShopStore((s) => s.setOrderNote);

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
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">Review Bag</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">{copy.cart.title}</h1>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-8 max-w-(--spacing-container) px-4 sm:px-6">
        {bagItems.length === 0 ? (
          <div className="rounded-feature border-line-strong shadow-sticker flex flex-col items-center justify-center border bg-white px-6 py-16 text-center">
            <BrandGlyph mood="sleepy" size="xl" />
            <h2 className="font-display text-plum text-h2 mt-4 font-bold">
              {copy.cart.emptyTitle}
            </h2>
            <p className="text-soft-plum text-body mt-1.5 max-w-md">{copy.cart.emptySubtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/shop">{copy.cart.emptyCta}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/gift-builder">Build a Gift Set (-10%)</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Line Items + Add-ons */}
            <div className="space-y-6 lg:col-span-8">
              {/* Free Delivery Ribbon */}
              <div className="rounded-card border-line-strong bg-mint/75 shadow-sticker border p-4">
                <div className="flex items-center justify-between gap-2 text-sm font-bold">
                  <span className="text-plum flex items-center gap-2">
                    <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                    {totals.qualifiesForFreeDelivery
                      ? copy.cart.freeDeliveryUnlocked
                      : copy.cart.freeDeliveryProgress(formatKES(totals.remainingForFreeDelivery))}
                  </span>
                  <span className="font-display text-plum">
                    {totals.freeDeliveryProgressPercent}%
                  </span>
                </div>
                <div className="border-line-strong mt-2 h-3 w-full overflow-hidden rounded-full border bg-white">
                  <div
                    className="bg-bubblegum h-full transition-all duration-300"
                    style={{ width: `${totals.freeDeliveryProgressPercent}%` }}
                  />
                </div>
              </div>

              <ul className="space-y-4">
                {bagItems.map((item) => (
                  <li
                    key={item.key}
                    className="rounded-card border-line-strong shadow-sticker flex flex-col gap-4 border bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <Link href={`/products/${item.slug}`} className="size-24 shrink-0">
                      <ProductIllustration
                        kind={item.illustration}
                        backdrop={item.backdrop}
                        alt={item.name}
                        className="aspect-square rounded-2xl"
                      />
                    </Link>

                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-display text-plum hover:text-bubblegum-deep text-lg font-bold"
                      >
                        {item.name}
                      </Link>
                      {item.variant && (
                        <p className="text-soft-plum text-xs font-semibold">
                          Variant: {item.variant}
                        </p>
                      )}
                      {item.giftNote && (
                        <p className="text-plum bg-butter/40 inline-block rounded-xl px-2.5 py-1 text-xs font-semibold">
                          Gift Note: &ldquo;{item.giftNote}&rdquo;
                        </p>
                      )}
                      <p className="text-soft-plum text-xs font-semibold">
                        Unit Price: {formatKES(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="border-line-strong bg-cream inline-flex items-center rounded-full border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() =>
                            item.quantity === 1
                              ? handleRemoveWithUndo(item)
                              : updateQuantity(item.key, item.quantity - 1)
                          }
                          className="text-plum hover:bg-blush inline-flex size-10 items-center justify-center rounded-l-full"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="font-display text-plum min-w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="text-plum hover:bg-blush inline-flex size-10 items-center justify-center rounded-r-full"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>

                      <span className="font-display text-plum min-w-22 text-right text-base font-bold">
                        {formatKES(item.price * item.quantity)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveWithUndo(item)}
                        aria-label={`Remove ${item.name}`}
                        className="border-plum/30 text-soft-plum hover:text-error hover:border-error inline-flex size-10 items-center justify-center rounded-full border transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Add-on Suggestions */}
              {addonSuggestions.length > 0 && (
                <div className="rounded-card border-plum/25 border bg-white p-5">
                  <h2 className="font-display text-plum mb-3 text-base font-bold">
                    Tuck In a Little Extra Under KES 650{" "}
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {addonSuggestions.map((addon) => (
                      <div
                        key={addon.slug}
                        className="border-plum/20 bg-cream/60 flex items-center justify-between gap-3 rounded-2xl border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-14 shrink-0">
                            <ProductIllustration
                              kind={addon.illustration}
                              backdrop={addon.backdrop}
                              alt={addon.name}
                              className="aspect-square rounded-xl"
                            />
                          </div>
                          <div>
                            <p className="font-display text-plum text-sm font-bold">{addon.name}</p>
                            <p className="text-soft-plum text-xs font-semibold">
                              {formatKES(addon.price)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
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
                        >
                          + Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Gift Options & Summary */}
            <div className="lg:col-span-4">
              <div className="rounded-feature border-line-strong shadow-sticker-plum sticky top-24 space-y-5 border bg-white p-6">
                <h2 className="font-display text-plum text-h3 font-bold">Gift Bag Summary</h2>

                {/* Gift Wrap Option */}
                <div className="border-plum/25 bg-lavender/40 space-y-3 rounded-2xl border p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="cart-page-gift-wrap"
                      checked={giftWrap}
                      onCheckedChange={(c) => setGiftWrap(Boolean(c))}
                    />
                    <label
                      htmlFor="cart-page-gift-wrap"
                      className="text-plum flex-1 cursor-pointer text-xs font-semibold"
                    >
                      <span className="font-display flex items-center justify-between text-sm font-bold">
                        <span className="flex items-center gap-1">
                          <Gift className="size-4" aria-hidden="true" />
                          {copy.cart.giftWrapLabel}
                        </span>
                        <span>+{formatKES(siteConfig.giftWrapFee)}</span>
                      </span>
                      <span className="text-soft-plum mt-0.5 block">
                        Includes pink tissue paper, satin bow & handwritten-style note card.
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="cart-page-note"
                      className="font-display text-plum mb-1 block text-xs font-bold"
                    >
                      {copy.cart.orderNoteLabel}
                    </label>
                    <Textarea
                      id="cart-page-note"
                      rows={2}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder={copy.cart.orderNotePlaceholder}
                      className="min-h-20 bg-white text-xs"
                    />
                  </div>
                </div>

                {/* Totals Breakdown */}
                <div className="border-blush space-y-2 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-soft-plum font-semibold">Items Subtotal</span>
                    <span className="font-display text-plum font-bold">
                      {formatKES(totals.subtotal)}
                    </span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="text-soft-plum font-semibold">Signature Bow Gift Wrap</span>
                      <span className="font-display text-plum font-bold">
                        {formatKES(totals.wrapCost)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-soft-plum font-semibold">Kenya Delivery</span>
                    <span className="font-display text-plum font-bold">
                      {totals.qualifiesForFreeDelivery ? "FREE" : "Calculated next"}
                    </span>
                  </div>
                  <div className="border-blush flex items-center justify-between border-t pt-3 text-lg">
                    <span className="font-display text-plum font-bold">Estimated Total</span>
                    <span className="font-display text-plum text-xl font-bold">
                      {formatKES(totals.subtotal + totals.wrapCost)}
                    </span>
                  </div>
                </div>

                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/checkout">
                    <span>{copy.cart.checkoutCta}</span>
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
