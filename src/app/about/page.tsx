import type { Metadata } from "next";
import Link from "next/link";
import { Heart, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story — About Whimsy.KE",
  description:
    "How Whimsy.KE started in Nairobi with a mission to bring little things and big smiles to homes across Kenya.",
};

export default function AboutPage() {
  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-12">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <Badge variant="bestseller">Born in Nairobi 🇰🇪</Badge>
              <h1 className="font-display text-plum text-display mt-2 font-bold">
                Little things, big smiles.
              </h1>
              <p className="text-plum/90 text-body mt-2">
                We started <strong>{siteConfig.name}</strong> because we believed that everyday
                objects—your morning chai mug, your study journal, or the zip pouch in your
                bag—should make you grin every single time you reach for them.
              </p>
            </div>
            <BowMascot mood="waving" size="xl" />
          </div>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-4xl space-y-10 px-4 sm:px-6">
        <article className="rounded-feature border-plum shadow-sticker space-y-4 border-2 bg-white p-6 sm:p-8">
          <h2 className="font-display text-plum text-h2 font-bold">
            Why We Obsess Over the Little Details
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            Whether you live in a Kilimani apartment, a dorm along Thika Road, or a sunny home in
            Mombasa, your space deserves warmth and personality. Every item in the Whimsy.KE
            collection is chosen for its tactile quality, pastel harmony, and everyday usefulness.
          </p>
          <p className="text-plum/90 text-body max-w-[68ch]">
            When you place an order with us, we don&apos;t just toss it into a plain brown mailer.
            We wrap it in polka-dot pastel tissue paper, tuck in a complimentary die-cut vinyl
            sticker sheet, and seal it with our signature Bowberry mascot tag.
          </p>
        </article>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-card border-plum bg-mint/55 border-2 p-5 shadow-[0_4px_0_#4A3552]">
            <Sparkles className="text-plum mb-2 size-6" />
            <h3 className="font-display text-plum text-h4 font-bold">Curated Quality</h3>
            <p className="text-plum/85 text-small mt-1">
              120gsm bleed-free journals, lead-free glazed ceramics, and butter-soft vegan pebble
              leather bags.
            </p>
          </div>

          <div className="rounded-card border-plum bg-butter/60 border-2 p-5 shadow-[0_4px_0_#4A3552]">
            <Heart className="text-plum mb-2 size-6" />
            <h3 className="font-display text-plum text-h4 font-bold">Effortless Gifting</h3>
            <p className="text-plum/85 text-small mt-1">
              We never include price receipts inside gift orders, and every gift note is printed on
              a keepsake bow card.
            </p>
          </div>

          <div className="rounded-card border-plum bg-lavender/60 border-2 p-5 shadow-[0_4px_0_#4A3552]">
            <MapPin className="text-plum mb-2 size-6" />
            <h3 className="font-display text-plum text-h4 font-bold">Proudly Kenyan</h3>
            <p className="text-plum/85 text-small mt-1">
              Same-day dispatch from our Kilimani studio with instant M-Pesa STK checkout and Cash
              on Delivery.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/shop">Explore Our Cute Collection →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
