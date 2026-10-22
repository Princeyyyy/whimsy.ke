import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollections, getProductsForCollection } from "@/lib/repositories";
import { ShopCatalog } from "@/features/catalog/shop-catalog";
import { ProductCardSkeleton } from "@/components/ui/skeleton";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) {
    return { title: "Collection Not Found" };
  }
  return {
    title: `${collection.title} — ${collection.subtitle}`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) {
    notFound();
  }

  const allCollections = getCollections();
  const collectionProducts = getProductsForCollection(slug);

  return (
    <div>
      {/* Quick Collection Switcher Strip */}
      <div className="border-plum/15 overflow-x-auto border-b bg-white/80 py-2.5">
        <div className="mx-auto flex max-w-(--spacing-container) items-center gap-2 px-4 whitespace-nowrap sm:px-6">
          <span className="font-display text-soft-plum mr-1 text-xs font-bold uppercase">
            Collections:
          </span>
          {allCollections.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className={`font-display rounded-full border-2 px-3.5 py-1 text-xs font-bold transition-all ${
                c.slug === slug
                  ? "border-plum bg-bubblegum text-plum shadow-[0_2px_0_#4A3552]"
                  : "border-plum/25 bg-cream text-plum hover:bg-blush/50"
              }`}
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>

      <React.Suspense
        fallback={
          <div className="mx-auto max-w-(--spacing-container) px-4 py-12 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        }
      >
        <ShopCatalog
          initialProducts={collectionProducts}
          heading={collection.title}
          subheading={collection.description}
          badgeText={collection.badgeText}
          lockedCollectionSlug={collection.slug}
        />
      </React.Suspense>
    </div>
  );
}
