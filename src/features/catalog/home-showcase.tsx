"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Gift,
  Heart,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Undo2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatKES } from "@/lib/formatters";
import {
  getBestsellers,
  getCategories,
  getFaqs,
  getMoodTiles,
  getNewArrivals,
  getProducts,
  getReviews,
} from "@/lib/repositories";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductCard } from "@/components/shared/product-card";
import { motion } from "motion/react";

export function HomeShowcase() {
  const categories = React.useMemo(() => getCategories(), []);
  const newArrivals = React.useMemo(() => getNewArrivals(8), []);
  const bestsellers = React.useMemo(() => getBestsellers(8), []);
  const moodTiles = React.useMemo(() => getMoodTiles(), []);
  const reviews = React.useMemo(() => getReviews().slice(0, 10), []);
  const faqs = React.useMemo(() => getFaqs().slice(0, 6), []);
  const instaTiles = React.useMemo(() => getProducts().slice(0, 6), []);

  // Embla Carousels
  const [newArrivalsRef, newArrivalsApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [reviewsRef, reviewsApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  // One-time Welcome Offer Popup
  const hydrated = useHydrated();
  const welcomePopupDismissed = useShopStore((s) => s.welcomePopupDismissed);
  const dismissWelcomePopup = useShopStore((s) => s.dismissWelcomePopup);
  const [welcomeOpen, setWelcomeOpen] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  React.useEffect(() => {
    if (!hydrated || welcomePopupDismissed) return;
    const timer = window.setTimeout(() => {
      setWelcomeOpen(true);
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [hydrated, welcomePopupDismissed]);

  function handleCloseWelcome(open: boolean) {
    setWelcomeOpen(open);
    if (!open) {
      dismissWelcomePopup();
    }
  }

  function handleCopyPromo() {
    navigator.clipboard?.writeText(siteConfig.promoCodes.WHIMSY10.code);
    setCopiedCode(true);
    toast.success("Copied code WHIMSY10! Use it at checkout for 10% off");
  }

  return (
    <div className="w-full max-w-full overflow-x-clip">
      {/* 1. HERO SECTION */}
      <section className="bg-blush/55 relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Hero Copy */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.05 },
                },
              }}
              className="min-w-0 space-y-6 lg:col-span-7"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                className="border-line/70 text-plum inline-flex max-w-full items-center gap-2.5 rounded-full border bg-white px-3.5 py-1.5 shadow-sm sm:px-4"
              >
                <span className="size-2 shrink-0 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                <span className="font-display text-xs font-semibold sm:text-sm">
                  Curated Lifestyle Goods · Nairobi, Kenya
                </span>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="font-display text-plum text-display font-bold text-balance"
              >
                Little things,{" "}
                <span className="bg-butter border-line-strong shadow-sticker inline-block rounded-2xl border px-3 py-0.5">
                  big smiles.
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="text-plum/90 text-body max-w-xl font-medium text-pretty sm:text-lg"
              >
                Thoughtfully crafted ceramics, modern carry goods, quiet stationery, and curated
                gifts for intentional living in Nairobi & across Kenya.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5"
              >
                <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/shop">
                    <span>Explore Collection</span>
                    <ArrowRight className="size-5" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Link href="/gift-builder">
                    <Gift className="size-5" aria-hidden="true" />
                    <span>Build a Gift Set (-10%)</span>
                  </Link>
                </Button>
              </motion.div>

              {/* Mini Trust Pills */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold sm:gap-3"
              >
                <span className="border-plum/25 text-plum inline-flex items-center gap-1.5 rounded-full border bg-white/85 px-3 py-1.5 transition-transform hover:-translate-y-0.5">
                  Same-Day Nairobi Delivery
                </span>
                <span className="border-plum/25 text-plum inline-flex items-center gap-1.5 rounded-full border bg-white/85 px-3 py-1.5 transition-transform hover:-translate-y-0.5">
                  Instant M-Pesa & COD
                </span>
                <span className="border-plum/25 text-plum inline-flex items-center gap-1.5 rounded-full border bg-white/85 px-3 py-1.5 transition-transform hover:-translate-y-0.5">
                  Complimentary Packaging
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Sticker Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative min-w-0 lg:col-span-5"
            >
              <div className="rounded-feature border-line-strong shadow-sticker-plum-lg relative mx-auto max-w-md border bg-white p-3.5 sm:p-5">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  <Link
                    href="/products/blush-shoulder-bag"
                    className="group border-line/60 hover:border-line-strong bg-cream/70 min-w-0 rounded-2xl border p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-2.5"
                  >
                    <ProductIllustration
                      kind="shoulder-bag"
                      backdrop="blush"
                      alt="Blush Shoulder Bag"
                      className="aspect-square transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="mt-2 flex items-center justify-between gap-1 px-0.5">
                      <span className="font-display text-plum text-xs font-semibold">
                        Shoulder Bag
                      </span>
                      <span className="text-soft-plum text-[11px] font-medium">
                        {formatKES(1800)}
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/products/pastel-ceramic-mug"
                    className="group border-line/60 hover:border-line-strong bg-cream/70 min-w-0 rounded-2xl border p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-2.5"
                  >
                    <ProductIllustration
                      kind="ceramic-mug"
                      backdrop="butter"
                      alt="Pastel Ceramic Mug"
                      className="aspect-square transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="mt-2 flex items-center justify-between gap-1 px-0.5">
                      <span className="font-display text-plum text-xs font-semibold">
                        Pastel Mug
                      </span>
                      <span className="text-soft-plum text-[11px] font-medium">
                        {formatKES(650)}
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/products/dotty-journal"
                    className="group border-line/60 hover:border-line-strong bg-cream/70 min-w-0 rounded-2xl border p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-2.5"
                  >
                    <ProductIllustration
                      kind="journal"
                      backdrop="lavender"
                      alt="Dotty Journal"
                      className="aspect-square transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="mt-2 flex items-center justify-between gap-1 px-0.5">
                      <span className="font-display text-plum text-xs font-semibold">
                        Dotty Journal
                      </span>
                      <span className="text-soft-plum text-[11px] font-medium">
                        {formatKES(450)}
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/products/little-joy-gift-bundle"
                    className="group border-line/60 hover:border-line-strong bg-cream/70 min-w-0 rounded-2xl border p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-2.5"
                  >
                    <ProductIllustration
                      kind="gift-bundle"
                      backdrop="mint"
                      alt="Little Joy Gift Bundle"
                      className="aspect-square transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="mt-2 flex items-center justify-between gap-1 px-0.5">
                      <span className="font-display text-plum text-xs font-semibold">
                        Gift Bundle
                      </span>
                      <span className="text-soft-plum text-[11px] font-medium">
                        {formatKES(1900)}
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Floating Hang-Tag Callout */}
                <div className="border-line-strong bg-mint/80 text-plum font-display shadow-sticker mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold sm:mt-4 sm:px-4">
                  <span>Free delivery over {formatKES(siteConfig.freeDeliveryThreshold)}</span>
                  <Link href="/shop" className="hover:text-plum/70 font-semibold transition-colors">
                    Explore collection →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      {/* 2. TRUST STRIP */}
      <section aria-label="Store highlights" className="py-8">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-card border-plum/25 shadow-sticker flex items-center gap-3.5 border bg-white p-4 transition-transform duration-200 hover:-translate-y-1">
              <div className="border-line-strong bg-mint text-plum flex size-11 shrink-0 items-center justify-center rounded-2xl border">
                <Truck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-plum text-sm font-bold">Fast Kenya Delivery</h2>
                <p className="text-soft-plum text-xs">Same-day Nairobi & 1–2 day courier</p>
              </div>
            </div>

            <div className="rounded-card border-plum/25 shadow-sticker flex items-center gap-3.5 border bg-white p-4 transition-transform duration-200 hover:-translate-y-1">
              <div className="border-line-strong bg-blush text-plum flex size-11 shrink-0 items-center justify-center rounded-2xl border">
                <Gift className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-plum text-sm font-bold">Signature Gift Wrap</h2>
                <p className="text-soft-plum text-xs">Pastel tissue, bow & custom note card</p>
              </div>
            </div>

            <div className="rounded-card border-plum/25 shadow-sticker flex items-center gap-3.5 border bg-white p-4 transition-transform duration-200 hover:-translate-y-1">
              <div className="border-line-strong bg-butter text-plum flex size-11 shrink-0 items-center justify-center rounded-2xl border">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-plum text-sm font-bold">Instant M-Pesa & COD</h2>
                <p className="text-soft-plum text-xs">STK push or pay rider on delivery</p>
              </div>
            </div>

            <div className="rounded-card border-plum/25 shadow-sticker flex items-center gap-3.5 border bg-white p-4 transition-transform duration-200 hover:-translate-y-1">
              <div className="border-line-strong bg-lavender text-plum flex size-11 shrink-0 items-center justify-center rounded-2xl border">
                <Undo2 className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-plum text-sm font-bold">14-Day Easy Returns</h2>
                <p className="text-soft-plum text-xs">Safe ceramic guarantee & WhatsApp care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROUND CATEGORY TILES */}
      <section aria-labelledby="home-categories" className="py-10 md:py-14">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <Badge variant="lavender">6 Curated Categories</Badge>
              <h2 id="home-categories" className="font-display text-plum text-h2 mt-2 font-bold">
                Browse by Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-display text-plum hover:text-bubblegum-deep inline-flex items-center gap-1 text-sm font-bold transition-colors"
            >
              <span>View all categories</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="border-line-strong shadow-sticker group-hover:shadow-sticker-plum relative size-28 overflow-hidden rounded-full border bg-white p-2.5 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-105 sm:size-32 xl:size-36">
                  <ProductIllustration
                    kind={cat.illustration}
                    backdrop={cat.backdrop}
                    alt={cat.name}
                    className="size-full rounded-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-plum group-hover:text-bubblegum-deep mt-3.5 text-base font-bold transition-colors">
                  {cat.name}
                </h3>
                <span className="text-soft-plum group-hover:text-plum text-xs font-medium transition-colors">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS CAROUSEL */}
      <section aria-labelledby="home-new-arrivals" className="py-10 md:py-14">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge variant="new">Just In</Badge>
              <h2 id="home-new-arrivals" className="font-display text-plum text-h2 mt-2 font-bold">
                New Arrivals & Recent Restocks
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => newArrivalsApi?.scrollPrev()}
                aria-label="Previous new arrivals"
                className="border-line-strong text-plum hover:bg-blush shadow-sticker inline-flex size-11 items-center justify-center rounded-full border bg-white active:translate-y-0.5"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => newArrivalsApi?.scrollNext()}
                aria-label="Next new arrivals"
                className="border-line-strong text-plum hover:bg-blush shadow-sticker inline-flex size-11 items-center justify-center rounded-full border bg-white active:translate-y-0.5"
              >
                <ChevronRight className="size-5" />
              </button>
              <Button asChild variant="secondary" size="sm" className="ml-1">
                <Link href="/collections/new-arrivals">See All</Link>
              </Button>
            </div>
          </div>

          <div className="w-full overflow-hidden px-1.5 py-4 sm:px-2" ref={newArrivalsRef}>
            <div className="-ml-4 flex items-stretch sm:-ml-5">
              {newArrivals.map((product) => (
                <div
                  key={product.slug}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] py-1 pl-4 sm:basis-1/2 sm:pl-5 md:basis-1/3 xl:basis-1/4"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY MOOD STICKER TILES */}
      <ScallopDivider fill="lavender" />
      <section aria-labelledby="home-moods" className="bg-lavender/55 py-12 md:py-16">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="mb-8 text-center">
            <Badge variant="bestseller">Curated Spaces</Badge>
            <h2 id="home-moods" className="font-display text-plum text-h2 mt-2 font-bold">
              Shop by Space & Occasion
            </h2>
            <p className="text-soft-plum text-body mx-auto mt-1 max-w-xl">
              Thoughtfully curated pieces designed for your living room, morning ritual, focus desk,
              or intentional gifting.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {moodTiles.map((mood) => (
              <Link
                key={mood.slug}
                href={`/shop?mood=${mood.slug}`}
                className="group rounded-card border-line-strong shadow-sticker-card hover:shadow-sticker-card-hover flex flex-col justify-between border bg-white p-4 transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <Badge variant="outline" className="mb-2.5 text-[11px]">
                    {mood.badge}
                  </Badge>
                  <ProductIllustration
                    kind={mood.illustration}
                    backdrop={mood.backdrop}
                    alt={mood.title}
                    className="aspect-square transition-transform group-hover:scale-[1.03]"
                  />
                  <h3 className="font-display text-plum group-hover:text-bubblegum-deep mt-3.5 text-lg font-bold">
                    {mood.title}
                  </h3>
                  <p className="text-soft-plum mt-1 text-xs leading-relaxed">{mood.subtitle}</p>
                </div>
                <span className="font-display text-plum group-hover:text-bubblegum-deep mt-3 inline-flex items-center gap-1.5 text-xs font-bold transition-colors">
                  <span>Explore collection</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ScallopDivider fill="lavender" flip />

      {/* 6. BESTSELLERS GRID */}
      <section aria-labelledby="home-bestsellers" className="py-12 md:py-16">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge variant="bestseller">Most Loved in Kenya</Badge>
              <h2 id="home-bestsellers" className="font-display text-plum text-h2 mt-2 font-bold">
                Customer Bestsellers
              </h2>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/collections/bestsellers">View All Bestsellers →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. GIFT BUILDER TEASER BANNER */}
      <section aria-labelledby="home-gift-builder" className="py-8">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="rounded-feature border-line-strong bg-butter/65 shadow-sticker-plum-lg grid items-center gap-8 border p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
            <div className="space-y-4 lg:col-span-7">
              <Badge variant="sale">Automatic 10% Bundle Discount</Badge>
              <h2
                id="home-gift-builder"
                className="font-display text-plum text-h1 font-bold text-balance"
              >
                Curate a Custom Gift Box in Three Simple Steps
              </h2>
              <p className="text-plum/90 text-body max-w-xl font-medium">
                1. Select a foundation vessel (Mug, Tote, Bag, or Pouch) · 2. Pair with
                complementary studio essentials · 3. We wrap in archival tissue with a bespoke note.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg">
                  <Link href="/gift-builder">
                    <Gift className="size-5" aria-hidden="true" />
                    <span>Launch Gift Builder</span>
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-soft-plum text-xs">Curated sets from</span>
                  <span className="font-display text-plum font-bold">{formatKES(1450)}</span>
                  <span className="text-soft-plum text-xs line-through">{formatKES(1650)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 lg:col-span-5">
              <div className="border-line-strong shadow-sticker rounded-2xl border bg-white p-2.5 text-center">
                <ProductIllustration kind="ceramic-mug" backdrop="blush" alt="Step 1 Vessel" />
                <p className="font-display text-plum mt-2 text-xs font-bold">1. Pick Vessel</p>
              </div>
              <div className="border-line-strong shadow-sticker rounded-2xl border bg-white p-2.5 text-center">
                <ProductIllustration kind="journal" backdrop="lavender" alt="Step 2 Extras" />
                <p className="font-display text-plum mt-2 text-xs font-bold">2. Add Essentials</p>
              </div>
              <div className="border-line-strong shadow-sticker rounded-2xl border bg-white p-2.5 text-center">
                <ProductIllustration kind="gift-bundle" backdrop="mint" alt="Step 3 Wrap & Card" />
                <p className="font-display text-plum mt-2 text-xs font-bold">3. Wrap & Note</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REVIEWS CAROUSEL NAMING THE PRODUCT */}
      <section aria-labelledby="home-reviews" className="py-12 md:py-16">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge variant="new">4.9 ★ Average from Kenyan Shoppers</Badge>
              <h2 id="home-reviews" className="font-display text-plum text-h2 mt-2 font-bold">
                Reflections from Our Community
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => reviewsApi?.scrollPrev()}
                aria-label="Previous customer review"
                className="border-line-strong text-plum hover:bg-blush shadow-sticker inline-flex size-11 items-center justify-center rounded-full border bg-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => reviewsApi?.scrollNext()}
                aria-label="Next customer review"
                className="border-line-strong text-plum hover:bg-blush shadow-sticker inline-flex size-11 items-center justify-center rounded-full border bg-white"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="w-full overflow-hidden px-1.5 py-4 sm:px-2" ref={reviewsRef}>
            <div className="-ml-4 flex items-stretch sm:-ml-5">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] py-1 pl-4 sm:basis-1/2 sm:pl-5 lg:basis-1/3"
                >
                  <article className="rounded-card border-line-strong shadow-sticker flex h-full flex-col justify-between border bg-white p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className="flex items-center gap-0.5"
                          aria-label={`${rev.rating} out of 5 stars`}
                        >
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="fill-butter text-plum size-4"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="border-plum/20 bg-mint/70 text-plum rounded-full border px-2.5 py-0.5 text-[11px] font-bold">
                          ✓ Verified Buyer
                        </span>
                      </div>

                      <h3 className="font-display text-plum mt-3 text-base font-bold">
                        &ldquo;{rev.title}&rdquo;
                      </h3>
                      <p className="text-soft-plum text-small mt-1.5 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="border-blush mt-4 border-t pt-3 text-xs">
                      <p className="font-display text-plum font-bold">
                        {rev.authorName}{" "}
                        <span className="text-soft-plum font-normal">· {rev.location}</span>
                      </p>
                      <Link
                        href={`/products/${rev.productSlug}`}
                        className="font-display text-bubblegum-deep hover:text-plum mt-1 inline-block font-semibold transition-colors"
                      >
                        Purchased: {rev.productName} →
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM-STYLE ILLUSTRATION GALLERY */}
      <section aria-labelledby="home-insta" className="py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="mb-6 text-center">
            <Badge variant="lavender">{siteConfig.contact.instagramHandle}</Badge>
            <h2 id="home-insta" className="font-display text-plum text-h2 mt-2 font-bold">
              Living with Whimsy
            </h2>
            <p className="text-soft-plum text-small mt-1">
              Tag <strong>{siteConfig.contact.instagramHandle}</strong> on Instagram to share how
              you style our pieces in your space.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
            {instaTiles.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group border-line-strong shadow-sticker relative overflow-hidden rounded-2xl border bg-white p-2 transition-transform hover:-translate-y-1"
              >
                <ProductIllustration
                  kind={item.illustration}
                  view="lifestyle"
                  backdrop={item.backdrop}
                  alt={`${item.name} styled in a pastel room`}
                  className="aspect-square"
                />
                <div className="mt-2 flex items-center justify-between px-1 text-xs">
                  <span className="font-display text-plum truncate font-bold">{item.name}</span>
                  <Heart
                    className="fill-bubblegum text-plum size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section aria-labelledby="home-faq" className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <Badge variant="bestseller">Got Questions?</Badge>
            <h2 id="home-faq" className="font-display text-plum text-h2 mt-2 font-bold">
              Quick Answers Before You Order
            </h2>
          </div>

          <Accordion type="single" collapsible defaultValue="faq-01">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="font-display text-plum hover:text-bubblegum-deep inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
            >
              <span>Read all FAQs & Delivery Policies</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ONE-TIME WELCOME OFFER POPUP WITH CODE COPY BUTTON */}
      <Dialog open={welcomeOpen} onOpenChange={handleCloseWelcome}>
        <DialogContent className="text-center sm:max-w-md">
          <div className="mx-auto">
            <BrandGlyph mood="happy" size="lg" />
          </div>
          <DialogHeader className="text-center sm:text-center">
            <Badge variant="bestseller" className="mx-auto mb-1 w-fit">
              Welcome to Whimsy.KE
            </Badge>
            <DialogTitle className="text-h2">Enjoy 10% Off Your First Order</DialogTitle>
            <DialogDescription className="text-body pt-1">
              Welcome to <strong>Whimsy.KE</strong>. Use code <strong>WHIMSY10</strong> at checkout
              for 10% off your initial order.
            </DialogDescription>
          </DialogHeader>

          <div className="border-line-strong bg-butter/60 my-2 flex items-center justify-between rounded-2xl border border-dashed p-3.5">
            <div className="text-left">
              <span className="text-soft-plum block text-[11px] font-bold uppercase">
                Promo Code
              </span>
              <span className="font-display text-plum text-xl font-bold tracking-wider">
                {siteConfig.promoCodes.WHIMSY10.code}
              </span>
            </div>
            <Button type="button" variant="primary" size="sm" onClick={handleCopyPromo}>
              {copiedCode ? (
                <>
                  <Check className="size-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy Code</span>
                </>
              )}
            </Button>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => handleCloseWelcome(false)}
            className="w-full"
          >
            <Sparkles className="size-4" />
            <span>Explore the Collection</span>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
