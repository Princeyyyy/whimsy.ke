"use client";

import * as React from "react";
import Link from "next/link";
import { copy } from "@/config/i18n";
import { getProductsBySlugs } from "@/lib/repositories";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/shared/product-card";

export function WishlistView() {
  const hydrated = useHydrated();
  const wishlistSlugs = useShopStore((s) => s.wishlistSlugs);

  const wishedProducts = React.useMemo(() => {
    if (!hydrated) return [];
    return getProductsBySlugs(wishlistSlugs);
  }, [hydrated, wishlistSlugs]);

  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">Persisted Favourites 💖</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">
            {copy.wishlist.title} ({wishedProducts.length})
          </h1>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-8 max-w-(--spacing-container) px-4 sm:px-6">
        {wishedProducts.length === 0 ? (
          <div className="rounded-feature border-plum shadow-sticker flex flex-col items-center border-2 bg-white px-6 py-16 text-center">
            <BowMascot mood="sleepy" size="xl" />
            <h2 className="font-display text-plum text-h2 mt-4 font-bold">
              {copy.wishlist.emptyTitle}
            </h2>
            <p className="text-soft-plum text-body mt-1.5 max-w-md">
              {copy.wishlist.emptySubtitle}
            </p>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <Link href="/shop">{copy.wishlist.emptyCta}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {wishedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
