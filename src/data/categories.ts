import type { CategoryInfo, CollectionInfo, MoodTileInfo } from "@/data/types";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "bags",
    name: "Bags",
    shortName: "Bags",
    description:
      "Structured shoulder bags, organic canvas totes, and padded carry pouches designed for daily rhythm.",
    illustration: "shoulder-bag",
    backdrop: "blush",
    featuredProductSlug: "blush-shoulder-bag",
  },
  {
    slug: "home-tableware",
    name: "Home & Tableware",
    shortName: "Home & Table",
    description:
      "Hand-glazed stoneware, sculptural tableware, tonal accents, and warm textiles for elevated spaces.",
    illustration: "cereal-bowl",
    backdrop: "butter",
    featuredProductSlug: "heart-print-ceramic-plate",
  },
  {
    slug: "on-the-go",
    name: "On the Go",
    shortName: "On the Go",
    description:
      "Insulated drinkware, tiered bento containers, and tactile daily carry accessories.",
    illustration: "lunch-box",
    backdrop: "mint",
    featuredProductSlug: "cute-water-bottle",
  },
  {
    slug: "paper-goods",
    name: "Paper Goods",
    shortName: "Stationery",
    description:
      "Linen dot-grid journals, mindful illustrated volumes, and refined stationery for intentional work.",
    illustration: "journal",
    backdrop: "lavender",
    featuredProductSlug: "dotty-journal",
  },
  {
    slug: "beauty-hobbies",
    name: "Beauty & Hobbies",
    shortName: "Care & Craft",
    description:
      "Textured cosmetic pouches, artisanal craft kits, and mindful personal grooming objects.",
    illustration: "makeup-pouch",
    backdrop: "blush",
    featuredProductSlug: "beadazzling-kit",
  },
  {
    slug: "gifting",
    name: "Gifting",
    shortName: "Gifting",
    description:
      "Artfully assembled gift sets wrapped in archival tissue paper with bespoke letterpress note cards.",
    illustration: "tea-set",
    backdrop: "butter",
    featuredProductSlug: "little-joy-gift-bundle",
  },
];

export const MOOD_TILES: MoodTileInfo[] = [
  {
    slug: "cozy-corner",
    title: "Quiet Living",
    subtitle: "Organic throws, hand-poured candles, and warm room essentials",
    backdrop: "blush",
    illustration: "candle-jar",
    badge: "Sanctuary",
  },
  {
    slug: "desk-besties",
    title: "Desk & Focus",
    subtitle: "Linen journals, stoneware mugs, and tactile workspace objects",
    backdrop: "lavender",
    illustration: "journal",
    badge: "Workspace",
  },
  {
    slug: "gift-it",
    title: "Curated Sets",
    subtitle: "Artfully packaged bundles with personalized notes",
    backdrop: "butter",
    illustration: "tea-set",
    badge: "Gift Ready",
  },
  {
    slug: "under-1000",
    title: "Under KES 1,000",
    subtitle: "Thoughtful everyday objects and accessible design",
    backdrop: "mint",
    illustration: "cereal-bowl",
    badge: "Accessible",
  },
  {
    slug: "party-table",
    title: "Hosting & Table",
    subtitle: "Sculptural ceramic plates, tea sets & entertaining pieces",
    backdrop: "blush",
    illustration: "trinket-tray",
    badge: "Tabletop",
  },
];

export const COLLECTIONS: CollectionInfo[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh additions to the collection",
    description:
      "Our newest home goods, studio ceramics, and lifestyle accessories, delivered across Kenya.",
    badgeText: "Just In",
    backdrop: "mint",
    illustration: "ceramic-mug",
  },
  {
    slug: "bestsellers",
    title: "Bestsellers",
    subtitle: "Most coveted pieces",
    description:
      "Our most sought-after essentials, loved by design-conscious homes from Kilimani to Kisumu.",
    badgeText: "Most Loved",
    backdrop: "butter",
    illustration: "shoulder-bag",
  },
  {
    slug: "sale",
    title: "Seasonal Archival Sale",
    subtitle: "Select pieces at special value",
    description:
      "Enjoy limited-time pricing on selected carry goods, ceramic tableware, and textile favourites.",
    badgeText: "Special Value",
    backdrop: "blush",
    illustration: "ceramic-plate",
  },
  {
    slug: "gifts-under-1000",
    title: "Gifts Under KES 1,000",
    subtitle: "Thoughtful tokens under KES 1,000",
    description: "Studio mugs, linen notebooks, pouches, and desk essentials under KES 1,000.",
    badgeText: "Under KES 1,000",
    backdrop: "mint",
    illustration: "charm-pouch",
  },
  {
    slug: "gifts-under-2000",
    title: "Gifts Under KES 2,000",
    subtitle: "Refined gifts for every occasion",
    description:
      "From structured shoulder bags to our Little Joy Gift Set, curated under KES 2,000.",
    badgeText: "Under KES 2,000",
    backdrop: "lavender",
    illustration: "gift-bundle",
  },
  {
    slug: "gifts-under-3000",
    title: "Gifts Under KES 3,000",
    subtitle: "Statement pieces & living upgrades",
    description:
      "Complete bedding sets, porcelain tea services, and elevated home goods under KES 3,000.",
    badgeText: "Under KES 3,000",
    backdrop: "butter",
    illustration: "bedsheet-set",
  },
  {
    slug: "sets-and-bundles",
    title: "Sets & Bundles",
    subtitle: "Curated pairings with automatic savings",
    description:
      "Coordinated sets and gift boxes presented in archival tissue with bespoke note cards.",
    badgeText: "Bundle & Save",
    backdrop: "blush",
    illustration: "mug-journal-set",
  },
];
