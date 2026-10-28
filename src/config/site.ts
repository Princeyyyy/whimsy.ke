import { env } from "@/env";

export const siteConfig = {
  name: "Whimsy.KE",
  domain: "whimsy.ke",
  slogan: "Little things, big smiles.",
  description:
    "Thoughtful objects for home and daily rituals. Ceramics, bags, desk pieces, and curated gift sets crafted for modern living in Nairobi and across Kenya.",
  url: env.NEXT_PUBLIC_SITE_URL,
  isDemoMode: env.NEXT_PUBLIC_DEMO_MODE,
  showDesignSystem: process.env.NODE_ENV !== "production",
  currency: "KES",
  locale: "en-KE",
  freeDeliveryThreshold: 3000,
  giftWrapFee: 250,
  promoCodes: {
    WHIMSY10: {
      code: "WHIMSY10",
      discountPercent: 10,
      description: "10% off your entire order!",
    },
  },
  contact: {
    whatsappNumber: "0705529889",
    whatsappRaw: "254705529889",
    phoneDisplay: "0705 529 889",
    email: "hello@whimsy.ke",
    instagramHandle: "@whimsy.ke",
    instagramUrl: "https://instagram.com/whimsy.ke",
    tiktokHandle: "@whimsy.ke",
    mpesaTillNumber: "000 000 (Demo Till)",
    pickupAddress: "Studio 4B, The Courtyard, Kilimani, Nairobi (Demo Address)",
    hours: "Mon – Sat: 9:00 AM – 6:00 PM EAT",
  },
  announcements: [
    "Complimentary delivery across Kenya on orders over KES 3,000",
    "Signature gift wrap & personalized handwritten note cards available",
    "Same-day courier dispatch across Nairobi for orders placed before 2:00 PM",
  ],
  demoNotice: "Demo store. No real orders are processed.",
} as const;

export type SiteConfig = typeof siteConfig;
