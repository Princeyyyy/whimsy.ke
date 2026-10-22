"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Bell, Check, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/types";
import { copy } from "@/config/i18n";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { trackEvent } from "@/lib/analytics";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { Badge } from "@/components/ui/badge";
import { HangTagPrice } from "@/components/ui/hang-tag-price";
import { Button } from "@/components/ui/button";
import { cn, getStickerTiltClass } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Signature Sticker Product Card
 * - Product art sits on a die-cut white outline with a tiny deterministic rotation (-2 to 2 degrees)
 *   that straightens and lifts on hover and keyboard focus.
 * - Includes Hang-Tag price, wishlist heart button, stock badges, and a heart-burst add-to-bag animation.
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const hydrated = useHydrated();
  const addItem = useShopStore((s) => s.addItem);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const addNotifyMe = useShopStore((s) => s.addNotifyMe);
  const wishlistSlugs = useShopStore((s) => s.wishlistSlugs);
  const notifyMeSlugs = useShopStore((s) => s.notifyMeSlugs);

  const [justAdded, setJustAdded] = React.useState(false);

  const isWishlisted = hydrated && wishlistSlugs.includes(product.slug);
  const isNotified = hydrated && notifyMeSlugs.includes(product.slug);
  const isSoldOut = product.stock === 0;
  const tiltClass = getStickerTiltClass(product.slug);

  function handleAddToBag(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (isSoldOut) return;

    const defaultVariant = product.variants?.[0]?.options[0];
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity: 1,
      variant: defaultVariant,
      illustration: product.illustration,
      backdrop: product.backdrop,
    });

    trackEvent({
      name: "add_to_cart",
      payload: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: 1,
        variant: defaultVariant,
      },
    });

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);

    toast.success(copy.cart.addedToast(product.name));
  }

  function handleToggleWishlist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const added = toggleWishlist(product.slug);
    toast(
      added ? `Saved ${product.name} to your wishes 💖` : `Removed ${product.name} from wishes`,
    );
  }

  function handleNotifyMe(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    addNotifyMe(product.slug);
    toast.success(copy.shop.notifiedSaved);
  }

  return (
    <article
      className={cn(
        "group rounded-card border-plum shadow-sticker-card hover:shadow-sticker-card-hover focus-within:shadow-sticker-card-hover @container relative flex h-full flex-col justify-between border-2 bg-white p-3.5 ring-4 ring-white transition-all duration-200 focus-within:-translate-y-1 hover:-translate-y-1",
        tiltClass,
        "focus-within:motion-safe:rotate-0 hover:motion-safe:rotate-0",
        isSoldOut && "opacity-90",
        className,
      )}
    >
      <div>
        {/* Top Image / Illustration Area */}
        <div className="relative">
          <Link
            href={`/products/${product.slug}`}
            className="focus-visible:outline-plum block overflow-hidden rounded-2xl"
          >
            <ProductIllustration
              kind={product.illustration}
              backdrop={product.backdrop}
              alt={product.name}
              className="transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Badges Overlay (Top Left) */}
          <div className="pointer-events-none absolute top-2.5 left-2.5 z-20 flex flex-wrap gap-1.5">
            {isSoldOut ? (
              <Badge variant="soldOut">Sold Out</Badge>
            ) : (
              product.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant={
                    badge === "New"
                      ? "new"
                      : badge === "Bestseller"
                        ? "bestseller"
                        : badge === "Sale"
                          ? "sale"
                          : "lowStock"
                  }
                >
                  {badge}
                </Badge>
              ))
            )}
          </div>

          {/* Wishlist Heart Button (Top Right, 44px touch target) */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            aria-pressed={isWishlisted}
            className="border-plum text-plum hover:bg-blush absolute top-2.5 right-2.5 z-20 inline-flex size-11 items-center justify-center rounded-full border-2 bg-white/95 shadow-[0_2px_0_#4A3552] transition-transform active:scale-95"
          >
            <Heart
              className={cn(
                "size-5 transition-colors",
                isWishlisted ? "fill-bubblegum text-plum" : "text-plum",
              )}
              aria-hidden="true"
            />
          </button>

          {/* Heart burst feedback when added to bag */}
          {justAdded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
            >
              <span className="border-plum bg-butter text-plum font-display inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-bold shadow-[0_4px_0_#4A3552] motion-safe:animate-bounce">
                <span>In your bag!</span>
                <span>💖</span>
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="mt-3.5 space-y-1.5 px-1">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-soft-plum font-semibold">{product.category}</span>
            <span
              className="text-plum inline-flex items-center gap-1 font-semibold"
              aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}
            >
              <Star className="fill-butter text-plum size-3.5" aria-hidden="true" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-soft-plum">({product.reviewCount})</span>
            </span>
          </div>

          <h3 className="font-display text-plum text-h4 leading-snug font-bold">
            <Link
              href={`/products/${product.slug}`}
              className="hover:text-bubblegum-deep transition-colors"
            >
              {product.name}
            </Link>
          </h3>

          <p className="text-soft-plum line-clamp-2 text-xs leading-relaxed sm:text-sm">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom Price Hang-Tag & Primary Action */}
      <div className="border-blush/70 mt-4 flex flex-wrap items-center justify-between gap-2 border-t px-1 pt-3">
        <HangTagPrice price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />

        {isSoldOut ? (
          <Button
            type="button"
            variant="lavender"
            size="sm"
            onClick={handleNotifyMe}
            disabled={isNotified}
            className="px-3.5 text-xs"
          >
            {isNotified ? (
              <>
                <Check className="size-3.5" aria-hidden="true" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bell className="size-3.5" aria-hidden="true" />
                <span>{copy.shop.notifyMe}</span>
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant={justAdded ? "mint" : "primary"}
            size="sm"
            onClick={handleAddToBag}
            aria-label={`Add ${product.name} to gift bag`}
            className="px-4 text-xs sm:text-sm"
          >
            {justAdded ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" aria-hidden="true" />
                <span>Add</span>
              </>
            )}
          </Button>
        )}
      </div>
    </article>
  );
}
