import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { DesignSystemShowcase } from "@/features/catalog/design-system-showcase";

export const metadata: Metadata = {
  title: "Sticker Sheet Design System",
  description:
    "Single source of truth for Whimsy.KE tokens, typography, Sticker Sheet components, mascot moods, and product illustrations.",
};

export default function DesignSystemPage() {
  if (!siteConfig.showDesignSystem) {
    notFound();
  }
  return <DesignSystemShowcase />;
}
