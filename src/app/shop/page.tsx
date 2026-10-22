import * as React from "react";
import type { Metadata } from "next";
import { ShopCatalog } from "@/features/catalog/shop-catalog";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Shop All Cute Home & Lifestyle Goods",
  description:
    "Browse 30+ pastel bags, ceramic tableware, journals, and curated gift bundles in Kenya.",
};

function ShopFallback() {
  return (
    <div className="mx-auto max-w-(--spacing-container) px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <React.Suspense fallback={<ShopFallback />}>
      <ShopCatalog />
    </React.Suspense>
  );
}
