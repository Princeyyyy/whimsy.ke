import type { Metadata } from "next";
import Link from "next/link";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Care Guides — Ceramic & Pastel Bag Care",
  description:
    "Two short, practical care guides to keep your Whimsy.KE hand-glazed ceramics and pastel bags looking brand new.",
};

export default function CareGuidesPage() {
  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">Keep Everything Cute ✨</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">Whimsy Care Guides</h1>
          <p className="text-soft-plum text-body mt-1 max-w-xl">
            Two quick guides written by our Nairobi studio team to keep your pastel ceramics and
            bags looking fresh for years.
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-4xl space-y-10 px-4 sm:px-6">
        {/* Article 1: Ceramic Tableware Care */}
        <article className="washi-tape rounded-feature border-plum shadow-sticker grid gap-6 border-2 bg-white p-6 sm:p-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <ProductIllustration kind="ceramic-mug" backdrop="butter" alt="Pastel Ceramic Mug" />
          </div>
          <div className="space-y-3 md:col-span-8">
            <Badge variant="new">Guide #1 · Tableware</Badge>
            <h2 className="font-display text-plum text-h2 font-bold">
              Caring for Hand-Glazed Pastel Ceramics
            </h2>
            <p className="text-plum/90 text-body max-w-[65ch]">
              Our Pastel Ceramic Mugs, Heart-Print Plates, and Bunny Ear Bowls are crafted from
              high-fired, lead-free stoneware. Follow these three gentle habits so their pastel
              glazes stay glossy and chip-free:
            </p>
            <ul className="text-plum/90 list-disc space-y-1.5 pl-5 text-sm">
              <li>
                <strong>Dishwasher & Microwave Safe:</strong> Everyday mugs, plates, and bowls are
                top-rack dishwasher and microwave safe! For the Sweetheart Tea-for-Two Set with
                gold-toned accents, hand wash with a soft sponge.
              </li>
              <li>
                <strong>Avoid Sudden Thermal Shock:</strong> Let a mug cool for a minute before
                pouring boiling water into a fridge-cold vessel.
              </li>
              <li>
                <strong>Removing Tea & Coffee Tannins:</strong> A quick rub with a pinch of baking
                soda and warm water lifts stubborn Kenyan chai marks without scratching the glaze.
              </li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="secondary" size="sm">
                <Link href="/shop?category=home-tableware">Shop Ceramic Tableware →</Link>
              </Button>
            </div>
          </div>
        </article>

        {/* Article 2: Pastel Bags & Quilted Pouches Care */}
        <article className="washi-tape rounded-feature border-plum shadow-sticker grid gap-6 border-2 bg-white p-6 sm:p-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <ProductIllustration kind="shoulder-bag" backdrop="blush" alt="Blush Shoulder Bag" />
          </div>
          <div className="space-y-3 md:col-span-8">
            <Badge variant="lavender">Guide #2 · Bags & Pouches</Badge>
            <h2 className="font-display text-plum text-h2 font-bold">
              Keeping Vegan Leather & Canvas Totes Spotless
            </h2>
            <p className="text-plum/90 text-body max-w-[65ch]">
              Light pastel shades look dreamy, and with a tiny bit of TLC they stay clean even
              through busy Nairobi commutes:
            </p>
            <ul className="text-plum/90 list-disc space-y-1.5 pl-5 text-sm">
              <li>
                <strong>Blush Shoulder Bag (Vegan Pebble Leather):</strong> Wipe away dust or makeup
                smudges immediately with a soft damp microfibre cloth and a drop of mild baby
                shampoo. Never use alcohol wipes.
              </li>
              <li>
                <strong>Lavender & Pink Canvas Totes:</strong> Spot clean marks with cool water and
                gentle soap, or hand wash in cold water and air-dry flat in the shade so the canvas
                keeps its crisp shape.
              </li>
              <li>
                <strong>Quilted Pouches:</strong> Stuff with tissue paper when storing so the puffy
                quilting stays cloud-plump!
              </li>
            </ul>
            <div className="pt-2">
              <Button asChild variant="secondary" size="sm">
                <Link href="/shop?category=bags">Shop Pastel Bags →</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
