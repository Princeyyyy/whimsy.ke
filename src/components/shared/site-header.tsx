"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "vaul";
import {
  ChevronDown,
  Gift,
  Heart,
  Menu,
  PackageSearch,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { getProductBySlug } from "@/lib/repositories";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { HangTagPrice } from "@/components/ui/hang-tag-price";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const items = useShopStore((s) => s.items);
  const wishlistSlugs = useShopStore((s) => s.wishlistSlugs);
  const bagBounceTick = useShopStore((s) => s.bagBounceTick);
  const setBagOpen = useShopStore((s) => s.setBagOpen);
  const setSearchOpen = useShopStore((s) => s.setSearchOpen);

  const [megaMenuOpen, setMegaMenuOpen] = React.useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = React.useState(CATEGORIES[0]?.slug ?? "bags");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const totalBagCount = hydrated ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const wishlistCount = hydrated ? wishlistSlugs.length : 0;

  const activeCategory = CATEGORIES.find((c) => c.slug === activeCategorySlug) ?? CATEGORIES[0]!;
  const featuredProduct = getProductBySlug(activeCategory.featuredProductSlug);

  const [lastPathname, setLastPathname] = React.useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }

  return (
    <header className="border-plum/20 bg-cream/95 sticky top-0 z-30 w-full max-w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-(--spacing-container) items-center justify-between gap-2 px-3 sm:h-18 sm:gap-3 sm:px-6">
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <Drawer.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Drawer.Trigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="border-line-strong text-plum hover:bg-blush shadow-sticker inline-flex size-10 shrink-0 items-center justify-center rounded-full border bg-white transition-transform active:translate-y-0.5 sm:size-11 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="bg-plum/45 fixed inset-0 z-50 backdrop-blur-[2px]" />
              <Drawer.Content
                aria-describedby={undefined}
                className="border-line-strong bg-cream fixed right-0 bottom-0 left-0 z-50 flex max-h-[86dvh] flex-col rounded-t-[28px] border-t outline-none"
              >
                <div className="bg-plum/25 mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full" />
                <div className="border-blush flex items-center justify-between border-b px-5 py-3.5">
                  <Drawer.Title className="font-display text-plum flex items-center gap-2 text-lg font-bold">
                    <BrandGlyph mood="waving" size="sm" animated={false} className="size-9" />
                    <span>Navigation</span>
                  </Drawer.Title>
                  <Drawer.Close asChild>
                    <button
                      type="button"
                      aria-label="Close navigation menu"
                      className="border-line-strong text-plum shadow-sticker inline-flex size-10 items-center justify-center rounded-full border bg-white"
                    >
                      <X className="size-4" />
                    </button>
                  </Drawer.Close>
                </div>

                <div className="overflow-y-auto px-5 py-4 pb-10">
                  <p className="font-display text-soft-plum mb-2.5 text-xs font-bold tracking-wider uppercase">
                    Shop by Category
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop?category=${cat.slug}`}
                        className="border-plum/30 hover:border-line-strong shadow-sticker flex items-center gap-2.5 rounded-2xl border bg-white p-2.5 transition-all"
                      >
                        <div className="size-11 shrink-0">
                          <ProductIllustration
                            kind={cat.illustration}
                            backdrop={cat.backdrop}
                            alt={cat.name}
                            className="aspect-square rounded-xl"
                          />
                        </div>
                        <span className="font-display text-plum text-xs leading-tight font-bold">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2">
                    <Link
                      href="/gift-builder"
                      className="border-line-strong bg-butter text-plum font-display shadow-sticker flex min-h-12 items-center justify-between rounded-2xl border px-4 py-2.5 font-bold"
                    >
                      <span className="flex items-center gap-2">
                        <Gift className="size-5" />
                        Build a Custom Gift Set (Save 10%)
                      </span>
                      <span>→</span>
                    </Link>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href="/collections/new-arrivals"
                        className="border-plum/25 text-plum font-display rounded-xl border bg-white px-3.5 py-2.5 text-sm font-semibold"
                      >
                        New Arrivals
                      </Link>
                      <Link
                        href="/collections/bestsellers"
                        className="border-plum/25 text-plum font-display rounded-xl border bg-white px-3.5 py-2.5 text-sm font-semibold"
                      >
                        Bestsellers
                      </Link>
                      <Link
                        href="/track"
                        className="border-plum/25 text-plum font-display rounded-xl border bg-white px-3.5 py-2.5 text-sm font-semibold"
                      >
                        Track Order
                      </Link>
                      {siteConfig.showDesignSystem ? (
                        <Link
                          href="/design-system"
                          className="border-plum/25 bg-lavender/50 text-plum font-display rounded-xl border px-3.5 py-2.5 text-sm font-semibold"
                        >
                          Design System
                        </Link>
                      ) : (
                        <Link
                          href="/wishlist"
                          className="border-plum/25 bg-blush/50 text-plum font-display rounded-xl border px-3.5 py-2.5 text-sm font-semibold"
                        >
                          Saved Wishes
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>

          <Link
            href="/"
            className="group focus-visible:outline-plum flex min-w-0 items-center gap-2 rounded-2xl py-1 pr-1 sm:gap-2.5 sm:pr-2"
          >
            <BrandGlyph
              mood="happy"
              size="sm"
              animated={false}
              className="size-9 shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-6 sm:size-11"
            />
            <div className="min-w-0">
              <span className="font-display text-plum block truncate text-lg leading-none font-bold tracking-tight sm:text-2xl">
                Whimsy<span className="text-bubblegum-deep">.KE</span>
              </span>
              <span className="text-soft-plum hidden text-xs font-semibold sm:block">
                Little things, big smiles.
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation + Mega-Menu */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button
              type="button"
              aria-expanded={megaMenuOpen}
              aria-haspopup="true"
              onClick={() => setMegaMenuOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setMegaMenuOpen(false);
              }}
              className={cn(
                "font-display text-plum hover:bg-blush/50 rounded-pill inline-flex min-h-11 items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors",
                megaMenuOpen && "bg-blush/60",
              )}
            >
              <Store className="size-4" aria-hidden="true" />
              <span>Shop Categories</span>
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-150",
                  megaMenuOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {megaMenuOpen && (
              <div
                onKeyDown={(e) => {
                  if (e.key === "Escape") setMegaMenuOpen(false);
                }}
                className="rounded-feature border-line-strong bg-cream shadow-sticker-plum-lg absolute top-full left-0 z-50 mt-2 grid w-[min(680px,calc(100vw-2rem))] grid-cols-12 gap-5 border p-5"
              >
                <div className="col-span-7 space-y-1.5">
                  <p className="font-display text-soft-plum px-2 pb-1 text-xs font-bold tracking-wider uppercase">
                    Browse by Category
                  </p>
                  {CATEGORIES.map((cat) => {
                    const isSelected = cat.slug === activeCategorySlug;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/shop?category=${cat.slug}`}
                        onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                        onFocus={() => setActiveCategorySlug(cat.slug)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border px-3 py-2 transition-all",
                          isSelected
                            ? "border-line-strong shadow-sticker bg-white"
                            : "border-transparent hover:bg-white/60",
                        )}
                      >
                        <div className="size-10 shrink-0">
                          <ProductIllustration
                            kind={cat.illustration}
                            backdrop={cat.backdrop}
                            alt={cat.name}
                            className="aspect-square rounded-xl"
                          />
                        </div>
                        <div>
                          <p className="font-display text-plum text-sm font-bold">{cat.name}</p>
                          <p className="text-soft-plum line-clamp-1 text-xs">{cat.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2">
                    <Link
                      href="/shop"
                      className="font-display text-plum hover:text-bubblegum-deep inline-flex items-center gap-1.5 px-2 text-xs font-bold transition-colors"
                    >
                      <span>View all products in Shop</span>
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>

                {/* Featured Tile inside Mega-Menu */}
                <div className="border-plum/20 shadow-sticker col-span-5 flex flex-col justify-between rounded-2xl border bg-white p-4">
                  {featuredProduct ? (
                    <>
                      <div>
                        <Badge variant="bestseller" className="mb-2">
                          Featured in {activeCategory.shortName}
                        </Badge>
                        <Link href={`/products/${featuredProduct.slug}`} className="group block">
                          <ProductIllustration
                            kind={featuredProduct.illustration}
                            backdrop={featuredProduct.backdrop}
                            alt={featuredProduct.name}
                            className="mb-3 aspect-4/3 transition-transform group-hover:scale-[1.02]"
                          />
                          <h3 className="font-display text-plum group-hover:text-bubblegum-deep text-base font-bold">
                            {featuredProduct.name}
                          </h3>
                        </Link>
                        <p className="text-soft-plum mt-1 line-clamp-2 text-xs">
                          {featuredProduct.shortDescription}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between pt-2">
                        <HangTagPrice
                          price={featuredProduct.price}
                          compareAtPrice={featuredProduct.compareAtPrice}
                          size="sm"
                        />
                        <Link
                          href={`/products/${featuredProduct.slug}`}
                          className="font-display text-plum hover:text-bubblegum-deep text-xs font-bold transition-colors"
                        >
                          View →
                        </Link>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/collections/new-arrivals"
            className="font-display text-plum hover:bg-blush/50 rounded-pill inline-flex min-h-11 items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            <span>New Arrivals</span>
          </Link>

          <Link
            href="/gift-builder"
            className="font-display text-plum bg-butter/70 hover:bg-butter border-plum/30 rounded-pill shadow-sticker inline-flex min-h-11 items-center gap-1.5 border px-4 py-1.5 text-sm font-bold transition-all"
          >
            <Gift className="size-4" aria-hidden="true" />
            <span>Gift Builder</span>
          </Link>

          <Link
            href="/track"
            className="font-display text-plum hover:bg-blush/50 rounded-pill inline-flex min-h-11 items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors"
          >
            <PackageSearch className="size-4" aria-hidden="true" />
            <span>Track Order</span>
          </Link>

          {siteConfig.showDesignSystem && (
            <Link
              href="/design-system"
              className="font-display text-soft-plum hover:text-plum hover:bg-lavender/50 rounded-pill inline-flex min-h-11 items-center px-3.5 py-2 text-xs font-bold transition-colors"
            >
              Design System
            </Link>
          )}
        </nav>

        {/* Right: Search, Wishlist, Gift Bag */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search collection (Ctrl+K)"
            className="border-line-strong text-plum hover:bg-blush/50 shadow-sticker inline-flex size-10 items-center justify-center gap-2 rounded-full border bg-white transition-transform active:translate-y-0.5 sm:min-h-11 sm:w-auto sm:px-3.5 sm:py-2"
          >
            <Search className="size-4 shrink-0" aria-hidden="true" />
            <span className="font-display hidden text-xs font-semibold sm:inline">Search...</span>
          </button>

          <Link
            href="/wishlist"
            aria-label={`Saved favourites (${wishlistCount} items)`}
            className="border-line-strong text-plum hover:bg-blush/50 shadow-sticker relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border bg-white transition-transform active:translate-y-0.5 sm:size-11"
          >
            <Heart
              className={cn("size-4 sm:size-5", wishlistCount > 0 && "fill-bubblegum text-plum")}
              aria-hidden="true"
            />
            {wishlistCount > 0 && (
              <span className="font-display border-line-strong bg-lavender text-plum absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full border text-[11px] font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setBagOpen(true)}
            aria-label={`Open your shopping bag (${totalBagCount} items)`}
            key={bagBounceTick}
            className={cn(
              "border-line-strong bg-bubblegum text-plum hover:bg-bubblegum-hover shadow-sticker relative inline-flex min-h-10 items-center gap-1.5 rounded-full border px-2.5 py-1.5 transition-all active:translate-y-0.5 sm:min-h-11 sm:gap-2 sm:px-3.5 sm:py-2",
              bagBounceTick > 0 && "motion-safe:animate-bounce",
            )}
            style={
              bagBounceTick > 0
                ? { animationIterationCount: 2, animationDuration: "320ms" }
                : undefined
            }
          >
            <ShoppingBag className="size-4 shrink-0 sm:size-5" aria-hidden="true" />
            <span className="font-display hidden text-xs font-bold min-[380px]:inline sm:text-sm">
              Bag
            </span>
            <span
              aria-live="polite"
              className="font-display border-line-strong bg-butter text-plum inline-flex min-w-5.5 items-center justify-center rounded-full border px-1.5 py-0.5 text-[11px] font-bold sm:min-w-6 sm:text-xs"
            >
              {totalBagCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
