import type { IllustrationKind, PastelBackdrop } from "@/illustrations/product-illustrations";

export type CategorySlug =
  "bags" | "home-tableware" | "on-the-go" | "paper-goods" | "beauty-hobbies" | "gifting";

export type CategoryName =
  "Bags" | "Home & Tableware" | "On the Go" | "Paper Goods" | "Beauty & Hobbies" | "Gifting";

export type MoodSlug = "cozy-corner" | "desk-besties" | "gift-it" | "under-1000" | "party-table";

export type ProductBadge = "New" | "Bestseller" | "Sale" | "Low stock";

export interface ProductVariantGroup {
  name: "Colour" | "Size" | "Phone Model" | "Style";
  options: string[];
}

export interface ProductDetailsSpec {
  size: string;
  material: string;
  care: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: CategorySlug;
  category: CategoryName;
  price: number; // KES
  compareAtPrice?: number; // KES (present on sale items)
  shortDescription: string;
  longDescription: string;
  details: ProductDetailsSpec;
  illustration: IllustrationKind;
  backdrop: PastelBackdrop;
  images?: string[]; // Optional real photo URLs; falls back to SVG illustration when empty
  tags: string[];
  moods: MoodSlug[];
  colours: string[];
  variants?: ProductVariantGroup[];
  stock: number; // 0 = sold out, 1-4 = low stock
  rating: number;
  reviewCount: number;
  badges: ProductBadge[];
  featuredInGiftBuilder?: "vessel" | "extra";
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: CategoryName;
  shortName: string;
  description: string;
  illustration: IllustrationKind;
  backdrop: PastelBackdrop;
  featuredProductSlug: string;
}

export interface CollectionInfo {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badgeText: string;
  backdrop: PastelBackdrop;
  illustration: IllustrationKind;
}

export interface MoodTileInfo {
  slug: MoodSlug;
  title: string;
  subtitle: string;
  backdrop: PastelBackdrop;
  illustration: IllustrationKind;
  badge: string;
}

export interface CustomerReview {
  id: string;
  productSlug: string;
  productName: string;
  authorName: string;
  location: string;
  rating: 4 | 5;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  region: "Nairobi" | "Upcountry";
  fee: number; // KES
  eta: string;
  codAvailable: boolean;
  landmarksHint: string;
}

export interface FaqItem {
  id: string;
  category: "Delivery" | "Payments" | "Gifting" | "Returns";
  question: string;
  answer: string;
}
