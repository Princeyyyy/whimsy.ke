"use client";

import * as React from "react";
import { toast } from "sonner";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { getProducts } from "@/lib/repositories";
import { BowMascot, type MascotMood } from "@/illustrations/bow-mascot";
import {
  ProductIllustration,
  type IllustrationKind,
  type PastelBackdrop,
} from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge, Chip } from "@/components/ui/badge";
import { HangTagPrice } from "@/components/ui/hang-tag-price";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { Checkbox, RadioGroup, RadioGroupItem, Slider } from "@/components/ui/controls";
import { ProductCard } from "@/components/shared/product-card";

const COLOUR_SWATCHES = [
  { name: "Cream", token: "--color-cream", hex: "#FFF8F2", bg: "bg-cream" },
  { name: "Blush", token: "--color-blush", hex: "#FFD9E8", bg: "bg-blush" },
  { name: "Bubblegum", token: "--color-bubblegum", hex: "#FF8FB4", bg: "bg-bubblegum" },
  {
    name: "Deep Bubblegum",
    token: "--color-bubblegum-deep",
    hex: "#C83E6B",
    bg: "bg-bubblegum-deep text-white",
  },
  { name: "Lavender", token: "--color-lavender", hex: "#E7D9FB", bg: "bg-lavender" },
  { name: "Mint", token: "--color-mint", hex: "#D7F5E4", bg: "bg-mint" },
  { name: "Butter", token: "--color-butter", hex: "#F5E1A4", bg: "bg-butter" },
  { name: "Plum (Ink)", token: "--color-plum", hex: "#4A3552", bg: "bg-plum text-white" },
  {
    name: "Soft Plum",
    token: "--color-soft-plum",
    hex: "#7A6685",
    bg: "bg-soft-plum text-white",
  },
  { name: "Error", token: "--color-error", hex: "#B3264E", bg: "bg-error text-white" },
] as const;

const MASCOT_MOODS: { mood: MascotMood; title: string; usage: string }[] = [
  {
    mood: "happy",
    title: "Happy Bowberry",
    usage: "Order confirmation, welcome popup & brand header",
  },
  {
    mood: "waving",
    title: "Waving Bowberry",
    usage: "Hero greeting, newsletter invite & M-Pesa waiting prompt",
  },
  {
    mood: "sleepy",
    title: "Sleepy Bowberry",
    usage: "Empty gift bag & empty wishlist states",
  },
  {
    mood: "confused",
    title: "Confused Bowberry",
    usage: "404 Not Found, empty filter results & error recovery",
  },
];

const ILLUSTRATION_GALLERY: {
  kind: IllustrationKind;
  label: string;
  backdrop: PastelBackdrop;
}[] = [
  { kind: "shoulder-bag", label: "Shoulder Bag", backdrop: "blush" },
  { kind: "mini-tote", label: "Mini Tote", backdrop: "lavender" },
  { kind: "charm-pouch", label: "Charm Pouch", backdrop: "blush" },
  { kind: "ceramic-plate", label: "Ceramic Plate", backdrop: "butter" },
  { kind: "ceramic-mug", label: "Ceramic Mug", backdrop: "blush" },
  { kind: "wall-frame", label: "Wall Frame", backdrop: "lavender" },
  { kind: "bedsheet-set", label: "Bedsheet Set", backdrop: "blush" },
  { kind: "water-bottle", label: "Water Bottle", backdrop: "mint" },
  { kind: "house-shoes", label: "House Shoes", backdrop: "blush" },
  { kind: "phone-case", label: "Phone Case", backdrop: "lavender" },
  { kind: "journal", label: "Dotty Journal", backdrop: "lavender" },
  { kind: "colouring-book", label: "Colouring Book", backdrop: "mint" },
  { kind: "makeup-pouch", label: "Makeup Pouch", backdrop: "blush" },
  { kind: "bead-kit", label: "Beadazzling Kit", backdrop: "lavender" },
  { kind: "gift-bundle", label: "Gift Bundle", backdrop: "butter" },
  { kind: "tea-set", label: "Tea-for-Two Set", backdrop: "butter" },
];

export function DesignSystemShowcase() {
  const sampleProducts = React.useMemo(() => getProducts().slice(0, 2), []);
  const [selectedChip, setSelectedChip] = React.useState("bags");
  const [sliderValue, setSliderValue] = React.useState([1800]);

  return (
    <div className="pb-16">
      {/* Hero Banner */}
      <section className="bg-blush/55 border-plum/15 border-b py-12 md:py-16">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl space-y-3">
              <Badge variant="bestseller">Single Source of Truth</Badge>
              <h1 className="font-display text-plum text-display font-bold">
                &ldquo;Sticker Sheet&rdquo; Design System
              </h1>
              <p className="text-soft-plum text-body">
                Built with Tailwind CSS v4 (<code>@theme</code> OKLCH tokens), Fredoka & Quicksand
                variable fonts, chunky hard offset shadows, die-cut borders, and accessible
                interactive primitives.
              </p>
            </div>
            <BowMascot mood="happy" size="xl" />
          </div>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-(--spacing-container) space-y-16 px-4 sm:px-6">
        {/* 1. Colour Palette */}
        <section aria-labelledby="ds-colours">
          <div className="mb-6">
            <h2 id="ds-colours" className="font-display text-plum text-h2 font-bold">
              1. Brand Colour Tokens (OKLCH + Contrast Checked)
            </h2>
            <p className="text-soft-plum text-small mt-1">
              Note: Primary bubblegum buttons pair with deep Plum ink (<code>#4A3552</code>) for a
              6.7:1 WCAG AAA contrast ratio at all text sizes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {COLOUR_SWATCHES.map((swatch) => (
              <div
                key={swatch.token}
                className="rounded-card border-plum overflow-hidden border-2 bg-white p-3 shadow-[0_4px_0_#FFD9E8]"
              >
                <div
                  className={`border-plum/30 mb-3 flex h-20 items-end rounded-xl border-2 p-2.5 ${swatch.bg}`}
                >
                  <span className="font-display text-xs font-bold">{swatch.hex}</span>
                </div>
                <p className="font-display text-plum text-sm font-bold">{swatch.name}</p>
                <code className="text-soft-plum block truncate text-[11px]">{swatch.token}</code>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Fluid Type Scale */}
        <section aria-labelledby="ds-typography">
          <h2 id="ds-typography" className="font-display text-plum text-h2 mb-6 font-bold">
            2. Fluid Typography Scale (Fredoka & Quicksand)
          </h2>
          <div className="rounded-feature border-plum shadow-sticker space-y-5 border-2 bg-white p-6 md:p-8">
            <div className="border-blush border-b pb-4">
              <span className="text-soft-plum text-xs font-bold uppercase">
                Display · Fredoka Bold · clamp(2.25rem, 4vw + 1rem, 3.75rem)
              </span>
              <p className="font-display text-plum text-display mt-1 font-bold">
                Little things, big smiles.
              </p>
            </div>
            <div className="border-blush border-b pb-4">
              <span className="text-soft-plum text-xs font-bold uppercase">
                H1 · Fredoka Bold · clamp(1.875rem, 3vw + 0.75rem, 2.75rem)
              </span>
              <p className="font-display text-plum text-h1 mt-1 font-bold">
                Pastel Home & Lifestyle Goods in Kenya
              </p>
            </div>
            <div className="border-blush border-b pb-4">
              <span className="text-soft-plum text-xs font-bold uppercase">
                H2 · Fredoka Bold · clamp(1.5rem, 2vw + 0.5rem, 2.125rem)
              </span>
              <p className="font-display text-plum text-h2 mt-1 font-bold">
                Shop by Mood & Curated Gift Boxes
              </p>
            </div>
            <div className="border-blush border-b pb-4">
              <span className="text-soft-plum text-xs font-bold uppercase">
                H3 & H4 · Fredoka Semibold
              </span>
              <p className="font-display text-plum text-h3 mt-1 font-bold">
                H3: Heart-Print Ceramic Plate — KES 900
              </p>
              <p className="font-display text-plum text-h4 mt-1 font-semibold">
                H4: Same-day delivery across Nairobi zones
              </p>
            </div>
            <div>
              <span className="text-soft-plum text-xs font-bold uppercase">
                Body (16px) & Small (14px) · Quicksand Medium/Semibold
              </span>
              <p className="text-plum text-body mt-1 max-w-[68ch]">
                Karibu to Whimsy.KE! Every parcel is wrapped in pastel tissue paper, sealed with a
                complimentary kiss-cut bow sticker, and delivered right to your doorstep in Nairobi
                or via courier across Kenya.
              </p>
              <p className="text-soft-plum text-small mt-2">
                Small caption text: Free delivery on orders over KES 3,000 · M-Pesa STK instant
                checkout.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Buttons, Chips, Badges, Hang-Tags & Toasts */}
        <section aria-labelledby="ds-primitives">
          <h2 id="ds-primitives" className="font-display text-plum text-h2 mb-6 font-bold">
            3. Interactive Primitives (Buttons, Hang-Tags, Chips, Badges & Toasts)
          </h2>
          <div className="rounded-feature border-plum shadow-sticker space-y-8 border-2 bg-white p-6 md:p-8">
            {/* Button Variants */}
            <div>
              <h3 className="font-display text-plum text-h4 mb-3 font-bold">
                Button Variants & States (Press down to feel shadow compression)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">
                  <ShoppingBag className="size-4" />
                  Primary Bubblegum
                </Button>
                <Button variant="secondary">Secondary White</Button>
                <Button variant="lavender">Lavender Soft</Button>
                <Button variant="mint">Mint Success</Button>
                <Button variant="ghost">Ghost Pill</Button>
                <Button variant="danger">Danger Berry</Button>
                <Button variant="primary" isLoading>
                  Processing...
                </Button>
                <Button variant="primary" disabled>
                  Disabled State
                </Button>
                <Button variant="secondary" size="icon" aria-label="Heart icon button">
                  <Heart className="size-5" />
                </Button>
              </div>
            </div>

            {/* Hang-Tag Prices */}
            <div>
              <h3 className="font-display text-plum text-h4 mb-3 font-bold">
                Signature Hang-Tag Prices
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                <HangTagPrice price={550} size="sm" />
                <HangTagPrice price={1200} size="md" />
                <HangTagPrice price={1800} compareAtPrice={2200} size="lg" />
              </div>
            </div>

            {/* Badges & Interactive Filter Chips */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-plum text-h4 mb-3 font-bold">Sticker Badges</h3>
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="new">New</Badge>
                  <Badge variant="bestseller">Bestseller</Badge>
                  <Badge variant="sale">Sale -20%</Badge>
                  <Badge variant="lowStock">Low stock (2 left)</Badge>
                  <Badge variant="soldOut">Sold Out</Badge>
                  <Badge variant="lavender">Gift Ready</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-display text-plum text-h4 mb-3 font-bold">
                  Interactive Filter Chips & Toast Trigger
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <Chip
                    selected={selectedChip === "bags"}
                    count={4}
                    onClick={() => setSelectedChip("bags")}
                  >
                    Bags
                  </Chip>
                  <Chip
                    selected={selectedChip === "tableware"}
                    count={10}
                    onClick={() => setSelectedChip("tableware")}
                  >
                    Home & Tableware
                  </Chip>
                  <Button
                    variant="lavender"
                    size="sm"
                    onClick={() => toast.success("Karibu! Here is a styled Sticker Sheet toast ✨")}
                  >
                    <Sparkles className="size-4" />
                    Trigger Demo Toast
                  </Button>
                </div>
              </div>
            </div>

            {/* Inputs & Controls */}
            <div className="border-blush grid gap-6 border-t pt-6 md:grid-cols-3">
              <div>
                <Label htmlFor="ds-input-normal">Standard Input</Label>
                <Input
                  id="ds-input-normal"
                  placeholder="e.g. Wanjiru Kamau"
                  defaultValue="Wanjiru Kamau"
                />
              </div>
              <div>
                <Label htmlFor="ds-input-error">Error State Input</Label>
                <Input id="ds-input-error" hasError defaultValue="0700-invalid" />
                <p className="text-error mt-1 text-xs font-semibold">
                  Pole! Enter a valid 10-digit Kenyan phone number.
                </p>
              </div>
              <div className="space-y-3">
                <Label>Checkbox, Radio & Price Slider</Label>
                <div className="flex items-center gap-3">
                  <Checkbox id="ds-check" defaultChecked />
                  <label htmlFor="ds-check" className="text-sm font-semibold">
                    This order is a gift
                  </label>
                </div>
                <RadioGroup defaultValue="mpesa" className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="mpesa" id="r-mpesa" />
                    <label htmlFor="r-mpesa" className="text-xs font-bold">
                      M-Pesa
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="cod" id="r-cod" />
                    <label htmlFor="r-cod" className="text-xs font-bold">
                      Cash on Delivery
                    </label>
                  </div>
                </RadioGroup>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  min={250}
                  max={3500}
                  step={50}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ds-textarea">Gift Note Textarea</Label>
              <Textarea
                id="ds-textarea"
                placeholder="Write a sweet message to be printed on our pastel bow card..."
                rows={2}
              />
            </div>
          </div>
        </section>

        {/* 4. Bowberry Mascot Moods */}
        <section aria-labelledby="ds-mascot">
          <h2 id="ds-mascot" className="font-display text-plum text-h2 mb-6 font-bold">
            4. Signature Mascot (&ldquo;Bowberry&rdquo;) in 4 Moods
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MASCOT_MOODS.map((item) => (
              <div
                key={item.mood}
                className="washi-tape rounded-card border-plum shadow-sticker flex flex-col items-center border-2 bg-white p-6 text-center"
              >
                <BowMascot mood={item.mood} size="lg" />
                <h3 className="font-display text-plum text-h4 mt-4 font-bold">{item.title}</h3>
                <Badge variant="lavender" className="mt-1">
                  mood=&ldquo;{item.mood}&rdquo;
                </Badge>
                <p className="text-soft-plum text-small mt-2">{item.usage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Sticker Product Cards & Skeleton */}
        <section aria-labelledby="ds-cards">
          <h2 id="ds-cards" className="font-display text-plum text-h2 mb-6 font-bold">
            5. Die-Cut Sticker Product Cards & Loading Skeleton
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sampleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
            <ProductCardSkeleton />
          </div>
        </section>

        {/* 6. Custom Vector Illustration System */}
        <section aria-labelledby="ds-illustrations">
          <h2 id="ds-illustrations" className="font-display text-plum text-h2 mb-2 font-bold">
            6. Bespoke Vector Product Illustrations
          </h2>
          <p className="text-soft-plum text-small mb-6">
            Consistent 3.5px plum outlines, white sticker die-cuts, and pastel fills across all
            product archetypes.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {ILLUSTRATION_GALLERY.map((item) => (
              <div
                key={item.kind}
                className="border-plum/25 rounded-2xl border-2 bg-white p-2 text-center shadow-[0_3px_0_#FFD9E8]"
              >
                <ProductIllustration kind={item.kind} backdrop={item.backdrop} alt={item.label} />
                <p className="font-display text-plum mt-2 truncate text-xs font-bold">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
