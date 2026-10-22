import { env } from "@/env";

export const siteConfig = {
  name: "Whimsy.KE",
  domain: "whimsy.ke",
  slogan: "Little things, big smiles.",
  description:
    "Cute home & lifestyle goods in Kenya. Pastel tableware, cozy bags, stationery, and sweet gifts delivered across Nairobi & Kenya.",
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
    pickupAddress: "Studio 4B, The Pastel Courtyard, Kilimani, Nairobi (Demo Address)",
    hours: "Mon – Sat: 9:00 AM – 6:00 PM EAT",
  },
  announcements: [
    "✨ Free delivery across Kenya on orders over KES 3,000!",
    "🎀 Free signature bow gift wrapping on all gift bundles!",
    "💌 Free die-cut sticker sheet tucked inside every single order!",
  ],
  demoNotice: "Demo store. No real orders are processed.",
} as const;

export type SiteConfig = typeof siteConfig;
