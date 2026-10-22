"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { parseAsBoolean, parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { copy } from "@/config/i18n";
import { formatKES } from "@/lib/formatters";
import { getCategories, getMoodTiles, getProducts } from "@/lib/repositories";
import type { CategorySlug, MoodSlug, Product } from "@/data/types";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Badge, Chip } from "@/components/ui/badge";
import { Label } from "@/components/ui/input";
import { Checkbox, Slider } from "@/components/ui/controls";
import { ProductCard } from "@/components/shared/product-card";

const COLOUR_FILTERS = [
  { id: "all", label: "All Colours" },
  { id: "blush", label: "Blush Pink" },
  { id: "lavender", label: "Lavender" },
  { id: "mint", label: "Mint" },
  { id: "butter", label: "Butter Yellow" },
  { id: "cream", label: "Cream" },
] as const;

export interface ShopCatalogProps {
  initialProducts?: Product[];
  heading?: string;
  subheading?: string;
  badgeText?: string;
  lockedCollectionSlug?: string;
}

export function ShopCatalog({
  initialProducts,
  heading = "Shop All Cute Goods",
  subheading = "Every pastel bag, ceramic mug, journal, and gift box in one happy place.",
  badgeText = "30 Pastel Finds ✨",
}: ShopCatalogProps) {
  const categories = React.useMemo(() => getCategories(), []);
  const moods = React.useMemo(() => getMoodTiles(), []);

  const [filters, setFilters] = useQueryStates(
    {
      category: parseAsString.withDefault("all"),
      mood: parseAsString.withDefault("all"),
      colour: parseAsString.withDefault("all"),
      maxPrice: parseAsInteger.withDefault(3500),
      inStock: parseAsBoolean.withDefault(false),
      q: parseAsString.withDefault(""),
      sort: parseAsString.withDefault("featured"),
    },
    {
      shallow: true,
    },
  );

  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  const filteredProducts = React.useMemo(() => {
    const base = getProducts({
      category: filters.category as CategorySlug | "all",
      mood: filters.mood as MoodSlug | "all",
      colour: filters.colour,
      maxPrice: filters.maxPrice,
      inStockOnly: filters.inStock,
      query: filters.q,
      sort: filters.sort as "featured" | "price-asc" | "price-desc" | "rating" | "newest",
    });

    if (!initialProducts) return base;
    const allowedSlugs = new Set(initialProducts.map((p) => p.slug));
    return base.filter((p) => allowedSlugs.has(p.slug));
  }, [filters, initialProducts]);

  function handleResetFilters() {
    void setFilters({
      category: "all",
      mood: "all",
      colour: "all",
      maxPrice: 3500,
      inStock: false,
      q: "",
      sort: "featured",
    });
  }

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.mood !== "all" ||
    filters.colour !== "all" ||
    filters.maxPrice < 3500 ||
    filters.inStock ||
    filters.q.trim().length > 0;

  const filterControls = (
    <div className="space-y-6">
      {/* Search inside Catalog */}
      <div>
        <Label htmlFor="shop-search-input">Keyword Search</Label>
        <div className="border-plum focus-within:border-plum flex min-h-12 w-full items-center gap-2.5 rounded-full border-2 bg-white px-4 py-2 shadow-[0_3px_0_#FFD9E8] transition-all focus-within:shadow-[0_4px_0_#4A3552]">
          <Search className="text-plum size-4 shrink-0" aria-hidden="true" />
          <input
            id="shop-search-input"
            type="text"
            value={filters.q}
            onChange={(e) => void setFilters({ q: e.target.value })}
            placeholder="Mug, tote, heart..."
            className="font-display text-plum placeholder:text-soft-plum/70 min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none focus-visible:outline-none"
          />
          {filters.q.length > 0 && (
            <button
              type="button"
              onClick={() => void setFilters({ q: "" })}
              aria-label="Clear search keyword"
              className="border-plum bg-blush/70 text-plum hover:bg-blush inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <p className="font-display text-plum text-small mb-2 font-bold">Category</p>
        <div className="flex flex-wrap gap-2">
          <Chip
            selected={filters.category === "all"}
            onClick={() => void setFilters({ category: "all" })}
          >
            All
          </Chip>
          {categories.map((cat) => (
            <Chip
              key={cat.slug}
              selected={filters.category === cat.slug}
              onClick={() => void setFilters({ category: cat.slug })}
            >
              {cat.shortName}
            </Chip>
          ))}
        </div>
      </div>

      {/* Mood Filter */}
      <div>
        <p className="font-display text-plum text-small mb-2 font-bold">Shop by Mood</p>
        <div className="flex flex-wrap gap-2">
          <Chip selected={filters.mood === "all"} onClick={() => void setFilters({ mood: "all" })}>
            Any Mood
          </Chip>
          {moods.map((m) => (
            <Chip
              key={m.slug}
              selected={filters.mood === m.slug}
              onClick={() => void setFilters({ mood: m.slug })}
            >
              {m.title}
            </Chip>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <span className="font-display text-plum text-small font-bold">Max Price</span>
          <span className="font-display border-plum bg-butter text-plum rounded-lg border px-2 py-0.5 text-xs font-bold">
            Up to {formatKES(filters.maxPrice)}
          </span>
        </div>
        <Slider
          value={[filters.maxPrice]}
          onValueChange={(vals) => void setFilters({ maxPrice: vals[0] ?? 3500 })}
          min={250}
          max={3500}
          step={50}
        />
        <div className="text-soft-plum flex justify-between text-xs font-semibold">
          <span>KES 250</span>
          <span>KES 3,500</span>
        </div>
      </div>

      {/* Pastel Colour Filter */}
      <div>
        <p className="font-display text-plum text-small mb-2 font-bold">Pastel Palette</p>
        <div className="flex flex-wrap gap-2">
          {COLOUR_FILTERS.map((col) => (
            <Chip
              key={col.id}
              selected={filters.colour === col.id}
              onClick={() => void setFilters({ colour: col.id })}
            >
              {col.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* In Stock Checkbox */}
      <div className="border-blush flex items-center gap-3 border-t pt-4">
        <Checkbox
          id="filter-in-stock"
          checked={filters.inStock}
          onCheckedChange={(checked) => void setFilters({ inStock: Boolean(checked) })}
        />
        <label
          htmlFor="filter-in-stock"
          className="font-display text-plum cursor-pointer text-sm font-semibold"
        >
          In stock only (hide sold-out items)
        </label>
      </div>

      {hasActiveFilters && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleResetFilters}
          className="w-full"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          <span>{copy.shop.resetFilters}</span>
        </Button>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-full overflow-x-clip pb-14">
      {/* Header Banner */}
      <section className="bg-blush/55 border-plum/15 border-b py-10 md:py-14">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">{badgeText}</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">{heading}</h1>
          <p className="text-soft-plum text-body mt-1 max-w-2xl">{subheading}</p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-8 max-w-(--spacing-container) px-4 sm:px-6">
        {/* Top Toolbar (Result count, Mobile Filter Drawer Button, Sort Dropdown) */}
        <div className="rounded-card border-plum/25 mb-6 flex flex-wrap items-center justify-between gap-3 border-2 bg-white p-3.5 shadow-[0_3px_0_#FFD9E8]">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer Trigger */}
            <Drawer.Root open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <Drawer.Trigger asChild>
                <Button type="button" variant="secondary" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="size-4" aria-hidden="true" />
                  <span>Filters</span>
                </Button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="bg-plum/45 fixed inset-0 z-50 backdrop-blur-[2px]" />
                <Drawer.Content
                  aria-describedby={undefined}
                  className="border-plum bg-cream fixed right-0 bottom-0 left-0 z-50 flex max-h-[88dvh] flex-col rounded-t-[28px] border-t-2 outline-none"
                >
                  <div className="bg-plum/25 mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full" />
                  <div className="border-blush flex items-center justify-between border-b px-5 py-3.5">
                    <Drawer.Title className="font-display text-plum text-lg font-bold">
                      Filter Cute Finds ({filteredProducts.length})
                    </Drawer.Title>
                    <Drawer.Close asChild>
                      <button
                        type="button"
                        aria-label="Close filters"
                        className="border-plum text-plum inline-flex size-10 items-center justify-center rounded-full border-2 bg-white"
                      >
                        <X className="size-4" />
                      </button>
                    </Drawer.Close>
                  </div>
                  <div className="overflow-y-auto px-5 py-5 pb-10">
                    {filterControls}
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={() => setMobileFilterOpen(false)}
                      className="mt-6 w-full"
                    >
                      Show {filteredProducts.length} Results
                    </Button>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>

            <p aria-live="polite" className="font-display text-plum text-sm font-bold">
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "cute find" : "cute finds"}
            </p>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <label
              htmlFor="shop-sort-select"
              className="font-display text-soft-plum shrink-0 text-xs font-bold"
            >
              Sort by:
            </label>
            <select
              id="shop-sort-select"
              value={filters.sort}
              onChange={(e) => void setFilters({ sort: e.target.value })}
              className="font-display border-plum bg-cream text-plum focus-visible:outline-plum min-h-10 min-w-0 flex-1 rounded-full border-2 px-3.5 py-1.5 text-xs font-bold shadow-[0_2px_0_#4A3552] sm:min-h-11 sm:flex-initial sm:px-4"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
            </select>
          </div>
        </div>

        {/* Main 12-Column Layout: Sidebar Filters (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside aria-label="Product filters" className="hidden lg:col-span-3 lg:block">
            <div className="rounded-card border-plum shadow-sticker sticky top-24 border-2 bg-white p-5">
              {filterControls}
            </div>
          </aside>

          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="rounded-feature border-plum shadow-sticker flex flex-col items-center justify-center border-2 bg-white px-6 py-16 text-center">
                <BowMascot mood="confused" size="lg" />
                <h2 className="font-display text-plum text-h3 mt-4 font-bold">
                  {copy.shop.emptyFilterTitle}
                </h2>
                <p className="text-soft-plum text-body mt-1.5 max-w-md">
                  {copy.shop.emptyFilterSubtitle}
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleResetFilters}
                  className="mt-6"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  <span>{copy.shop.resetFilters}</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
