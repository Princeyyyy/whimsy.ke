import type { CategoryInfo, CollectionInfo, MoodTileInfo } from "@/data/types";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "bags",
    name: "Bags",
    shortName: "Bags",
    description:
      "Pastel shoulder bags, canvas totes, and quilted pouches for everyday errands and coffee dates.",
    illustration: "shoulder-bag",
    backdrop: "blush",
    featuredProductSlug: "blush-shoulder-bag",
  },
  {
    slug: "home-tableware",
    name: "Home & Tableware",
    shortName: "Home & Table",
    description:
      "Heart-rimmed plates, smiling mugs, scalloped frames, and cozy throws that turn any corner into a warm hug.",
    illustration: "ceramic-mug",
    backdrop: "butter",
    featuredProductSlug: "heart-print-ceramic-plate",
  },
  {
    slug: "on-the-go",
    name: "On the Go",
    shortName: "On the Go",
    description:
      "Sip, stroll, and commute in style with pastel water bottles, bento lunch boxes, and heart phone cases.",
    illustration: "water-bottle",
    backdrop: "mint",
    featuredProductSlug: "cute-water-bottle",
  },
  {
    slug: "paper-goods",
    name: "Paper Goods",
    shortName: "Paper Goods",
    description:
      "Dot-grid journals, relaxing colouring books, washi tapes, and die-cut sticker sheets for desk joy.",
    illustration: "journal",
    backdrop: "lavender",
    featuredProductSlug: "dotty-journal",
  },
  {
    slug: "beauty-hobbies",
    name: "Beauty & Hobbies",
    shortName: "Beauty & Craft",
    description:
      "Quilted makeup pouches, DIY beadazzling kits, ribbon hair clips, and sweet vanity mirrors.",
    illustration: "bead-kit",
    backdrop: "blush",
    featuredProductSlug: "beadazzling-kit",
  },
  {
    slug: "gifting",
    name: "Gifting",
    shortName: "Gifting",
    description:
      "Ready-to-gift curated sets wrapped in tissue paper, bow stickers, and handwritten-style note cards.",
    illustration: "gift-bundle",
    backdrop: "butter",
    featuredProductSlug: "little-joy-gift-bundle",
  },
];

export const MOOD_TILES: MoodTileInfo[] = [
  {
    slug: "cozy-corner",
    title: "Cozy Corner",
    subtitle: "Soft throws, candles, slippers & bedtime joy",
    backdrop: "blush",
    illustration: "house-shoes",
    badge: "Warm & Fuzzy",
  },
  {
    slug: "desk-besties",
    title: "Desk Besties",
    subtitle: "Journals, gel pens, organisers & mugs",
    backdrop: "lavender",
    illustration: "journal",
    badge: "Study & Work",
  },
  {
    slug: "gift-it",
    title: "Gift It",
    subtitle: "Curated bundles & ribbon-wrapped keepsakes",
    backdrop: "butter",
    illustration: "gift-bundle",
    badge: "Ready to Wrap",
  },
  {
    slug: "under-1000",
    title: "Under KES 1,000",
    subtitle: "Sweet pocket-friendly treats & little smiles",
    backdrop: "mint",
    illustration: "ceramic-mug",
    badge: "Pocket Treats",
  },
  {
    slug: "party-table",
    title: "Party Table",
    subtitle: "Heart plates, tea sets & hosting favourites",
    backdrop: "blush",
    illustration: "ceramic-plate",
    badge: "Hostess Picks",
  },
];

export const COLLECTIONS: CollectionInfo[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh off the pastel press!",
    description:
      "Our newest cute home finds, stationery treats, and lifestyle accessories just landed in Nairobi.",
    badgeText: "Just Landed ✨",
    backdrop: "mint",
    illustration: "ceramic-mug",
  },
  {
    slug: "bestsellers",
    title: "Bestsellers",
    subtitle: "Kenya's most-loved Whimsy picks",
    description:
      "Tried, tested, and adored by shoppers from Kilimani to Kisumu. Grab these top-rated favourites before they sell out.",
    badgeText: "Customer Favourites ⭐",
    backdrop: "butter",
    illustration: "shoulder-bag",
  },
  {
    slug: "sale",
    title: "Sweet Little Sale",
    subtitle: "Special treats at joyful prices",
    description:
      "Enjoy limited-time markdowns on selected pastel bags, tableware, and cozy bedroom favourites.",
    badgeText: "Up to 25% Off 🎀",
    backdrop: "blush",
    illustration: "ceramic-plate",
  },
  {
    slug: "gifts-under-1000",
    title: "Gifts Under KES 1,000",
    subtitle: "Big smiles on a sweet little budget",
    description:
      "Thoughtful mugs, journals, pouches, and desk goodies all priced at KES 1,000 or less.",
    badgeText: "Under KES 1,000",
    backdrop: "mint",
    illustration: "charm-pouch",
  },
  {
    slug: "gifts-under-2000",
    title: "Gifts Under KES 2,000",
    subtitle: "Perfect birthday & thank-you presents",
    description:
      "From our Blush Shoulder Bag to the Little Joy Gift Bundle, every pick here is under KES 2,000.",
    badgeText: "Under KES 2,000",
    backdrop: "lavender",
    illustration: "gift-bundle",
  },
  {
    slug: "gifts-under-3000",
    title: "Gifts Under KES 3,000",
    subtitle: "Statement gifts & dreamy room makeovers",
    description:
      "Our complete collection of elevated gifts, bedding sets, and porcelain tea sets under KES 3,000.",
    badgeText: "Under KES 3,000",
    backdrop: "butter",
    illustration: "bedsheet-set",
  },
  {
    slug: "sets-and-bundles",
    title: "Sets & Bundles",
    subtitle: "Curated combinations that save you more",
    description:
      "Matched sets and gift boxes wrapped in pastel tissue paper with a complimentary bow sticker sheet.",
    badgeText: "Bundle & Save 💝",
    backdrop: "blush",
    illustration: "mug-journal-set",
  },
];
