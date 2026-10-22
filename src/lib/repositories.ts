import { PRODUCTS } from "@/data/products";
import { CATEGORIES, COLLECTIONS, MOOD_TILES } from "@/data/categories";
import { DELIVERY_ZONES, FAQS, REVIEWS } from "@/data/store-data";
import type {
  CategoryInfo,
  CategorySlug,
  CollectionInfo,
  CustomerReview,
  DeliveryZone,
  FaqItem,
  MoodSlug,
  MoodTileInfo,
  Product,
} from "@/data/types";

export interface ProductFilterOptions {
  category?: CategorySlug | "all";
  mood?: MoodSlug | "all";
  colour?: string | "all";
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  query?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
}

/**
 * Returns products sorted with sold-out items pushed to the end (per UX checklist)
 */
export function getProducts(filters?: ProductFilterOptions): Product[] {
  let list = [...PRODUCTS];

  if (filters) {
    if (filters.category && filters.category !== "all") {
      list = list.filter((p) => p.categorySlug === filters.category);
    }

    if (filters.mood && filters.mood !== "all") {
      const targetMood = filters.mood;
      if (targetMood === "under-1000") {
        list = list.filter((p) => p.price <= 1000 || p.moods.includes("under-1000"));
      } else {
        list = list.filter((p) => p.moods.includes(targetMood));
      }
    }

    if (filters.colour && filters.colour !== "all") {
      const colourLower = filters.colour.toLowerCase();
      list = list.filter(
        (p) =>
          p.backdrop.toLowerCase() === colourLower ||
          p.colours.some((c) => c.toLowerCase().includes(colourLower)),
      );
    }

    if (typeof filters.minPrice === "number") {
      const min = filters.minPrice;
      list = list.filter((p) => p.price >= min);
    }

    if (typeof filters.maxPrice === "number") {
      const max = filters.maxPrice;
      list = list.filter((p) => p.price <= max);
    }

    if (filters.inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    if (filters.query && filters.query.trim().length > 0) {
      const q = filters.query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const sortBy = filters.sort ?? "featured";
    list.sort((a, b) => {
      // Always place sold-out items last
      const aSoldOut = a.stock === 0 ? 1 : 0;
      const bSoldOut = b.stock === 0 ? 1 : 0;
      if (aSoldOut !== bSoldOut) return aSoldOut - bSoldOut;

      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") {
        const aNew = a.badges.includes("New") ? 0 : 1;
        const bNew = b.badges.includes("New") ? 0 : 1;
        return aNew - bNew;
      }
      // featured: Bestsellers first
      const aBest = a.badges.includes("Bestseller") ? 0 : 1;
      const bBest = b.badges.includes("Bestseller") ? 0 : 1;
      return aBest - bBest;
    });
  } else {
    list.sort((a, b) => (a.stock === 0 ? 1 : 0) - (b.stock === 0 ? 1 : 0));
  }

  return list;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs.map((slug) => getProductBySlug(slug)).filter((p): p is Product => Boolean(p));
}

export function getNewArrivals(limit = 8): Product[] {
  return getProducts({ sort: "newest" })
    .filter((p) => p.stock > 0 && (p.badges.includes("New") || p.badges.includes("Bestseller")))
    .slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return getProducts()
    .filter((p) => p.badges.includes("Bestseller") && p.stock > 0)
    .slice(0, limit);
}

export function getPairsWellWith(product: Product, limit = 4): Product[] {
  return getProducts()
    .filter((p) => p.slug !== product.slug && p.stock > 0)
    .sort((a, b) => {
      const aSameMood = a.moods.some((m) => product.moods.includes(m)) ? 0 : 1;
      const bSameMood = b.moods.some((m) => product.moods.includes(m)) ? 0 : 1;
      return aSameMood - bSameMood;
    })
    .slice(0, limit);
}

export function getBagAddonSuggestions(excludeSlugs: string[], limit = 2): Product[] {
  return getProducts()
    .filter((p) => p.stock > 0 && p.price <= 650 && !excludeSlugs.includes(p.slug))
    .slice(0, limit);
}

export function getCategories(): CategoryInfo[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getMoodTiles(): MoodTileInfo[] {
  return MOOD_TILES;
}

export function getCollections(): CollectionInfo[] {
  return COLLECTIONS;
}

export function getCollectionBySlug(slug: string): CollectionInfo | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getProductsForCollection(collectionSlug: string): Product[] {
  const all = getProducts();
  switch (collectionSlug) {
    case "new-arrivals":
      return all.filter((p) => p.badges.includes("New"));
    case "bestsellers":
      return all.filter((p) => p.badges.includes("Bestseller"));
    case "sale":
      return all.filter((p) => p.badges.includes("Sale") || typeof p.compareAtPrice === "number");
    case "gifts-under-1000":
      return all.filter((p) => p.price <= 1000);
    case "gifts-under-2000":
      return all.filter((p) => p.price <= 2000);
    case "gifts-under-3000":
      return all.filter((p) => p.price <= 3000);
    case "sets-and-bundles":
      return all.filter(
        (p) =>
          p.categorySlug === "gifting" || p.tags.includes("bundle") || p.tags.includes("tea set"),
      );
    default:
      return all;
  }
}

export function getReviews(): CustomerReview[] {
  return REVIEWS;
}

export function getReviewsForProduct(productSlug: string): CustomerReview[] {
  const exact = REVIEWS.filter((r) => r.productSlug === productSlug);
  if (exact.length >= 2) return exact;
  // Combine exact matches with verified store-wide reviews so every product page has rich social proof
  const fallback = REVIEWS.filter((r) => r.productSlug !== productSlug).slice(0, 3);
  return [...exact, ...fallback];
}

export function getDeliveryZones(): DeliveryZone[] {
  return DELIVERY_ZONES;
}

export function getDeliveryZoneById(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}

export function getFaqs(): FaqItem[] {
  return FAQS;
}

export function getGiftBuilderVessels(): Product[] {
  return PRODUCTS.filter((p) => p.featuredInGiftBuilder === "vessel" && p.stock > 0);
}

export function getGiftBuilderExtras(): Product[] {
  return PRODUCTS.filter((p) => p.featuredInGiftBuilder === "extra" && p.stock > 0);
}
