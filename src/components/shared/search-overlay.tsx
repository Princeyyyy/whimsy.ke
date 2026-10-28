"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { ArrowRight, Gift, Search, Sparkles, Store, X } from "lucide-react";
import { copy } from "@/config/i18n";
import { formatKES } from "@/lib/formatters";
import { getCategories, getProducts } from "@/lib/repositories";
import { useShopStore } from "@/features/cart/store";
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function SearchOverlay() {
  const router = useRouter();
  const isSearchOpen = useShopStore((s) => s.isSearchOpen);
  const setSearchOpen = useShopStore((s) => s.setSearchOpen);
  const [query, setQuery] = React.useState("");

  const products = React.useMemo(() => getProducts(), []);
  const categories = React.useMemo(() => getCategories(), []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  function handleOpenChange(open: boolean) {
    setSearchOpen(open);
    if (!open) {
      setQuery("");
    }
  }

  function handleNavigate(href: string) {
    setSearchOpen(false);
    setQuery("");
    router.push(href);
  }

  return (
    <Dialog open={isSearchOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        hideCloseButton
        className="border-line-strong bg-cream shadow-sticker-plum-lg sm:rounded-sheet max-w-xl gap-0 overflow-hidden p-0"
      >
        {/* Sticker Header Bar */}
        <div className="border-plum/15 bg-blush/55 flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5 sm:py-3.5">
          <DialogTitle className="font-display text-plum flex items-center gap-2 text-base font-bold sm:text-lg">
            <BrandGlyph mood="happy" size="sm" animated={false} className="size-8 shrink-0" />
            <span>Search Collection</span>
            <Badge variant="bestseller" className="hidden text-[11px] sm:inline-flex">
              30 Products
            </Badge>
          </DialogTitle>

          <DialogClose
            aria-label="Close search"
            className="border-line-strong text-plum hover:bg-blush shadow-sticker inline-flex size-9 shrink-0 items-center justify-center rounded-full border bg-white transition-transform active:translate-y-0.5 sm:size-10"
          >
            <X className="size-4" />
          </DialogClose>
        </div>

        <Command className="bg-cream flex h-full w-full flex-col overflow-hidden">
          {/* Pill Sticker Search Input Box */}
          <div className="border-blush/80 border-b px-4 pt-3.5 pb-3 sm:px-5">
            <div className="border-line-strong focus-within:border-line-strong shadow-sticker focus-within:shadow-sticker flex min-h-12 w-full items-center gap-2.5 rounded-full border bg-white px-4 py-2 transition-all">
              <Search className="text-plum size-5 shrink-0" aria-hidden="true" />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder={copy.header.searchPlaceholder}
                className="font-display text-plum placeholder:text-soft-plum/70 min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none focus-visible:outline-none sm:text-base"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search text"
                  className="border-line-strong bg-blush/70 text-plum hover:bg-blush inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          <Command.List className="max-h-[60dvh] space-y-4 overflow-y-auto px-4 py-3.5 sm:px-5">
            <Command.Empty className="rounded-card border-plum/25 shadow-sticker my-2 flex flex-col items-center border bg-white px-4 py-8 text-center">
              <BrandGlyph mood="confused" size="sm" animated={false} className="mb-2 size-12" />
              <p className="font-display text-plum text-base font-bold">
                No matching products found.
              </p>
              <p className="text-soft-plum mt-1 text-xs">
                Try searching for &ldquo;mug&rdquo;, &ldquo;bag&rdquo;, &ldquo;journal&rdquo;, or
                &ldquo;gift&rdquo;.
              </p>
            </Command.Empty>

            <Command.Group
              heading="Quick Shortcuts"
              className="text-soft-plum [&_[cmdk-group-heading]]:font-display [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Command.Item
                  value="Custom Gift Builder bundle box"
                  onSelect={() => handleNavigate("/gift-builder")}
                  className="border-plum/30 data-[selected=true]:border-line-strong bg-butter/55 data-[selected=true]:bg-butter text-plum font-display shadow-sticker flex cursor-pointer items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="size-4 shrink-0" aria-hidden="true" />
                    <span>Custom Gift Box (-10%)</span>
                  </span>
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                </Command.Item>
                <Command.Item
                  value="Browse all shop products"
                  onSelect={() => handleNavigate("/shop")}
                  className="border-plum/30 data-[selected=true]:border-line-strong data-[selected=true]:bg-blush/55 text-plum font-display shadow-sticker flex cursor-pointer items-center justify-between gap-2 rounded-2xl border bg-white px-3.5 py-2.5 text-xs font-bold transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Store className="size-4 shrink-0" aria-hidden="true" />
                    <span>Explore Full Collection</span>
                  </span>
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                </Command.Item>
              </div>
            </Command.Group>

            <Command.Group
              heading="Departments"
              className="text-soft-plum [&_[cmdk-group-heading]]:font-display [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase"
            >
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <Command.Item
                    key={cat.slug}
                    value={`category ${cat.name} ${cat.description}`}
                    onSelect={() => handleNavigate(`/shop?category=${cat.slug}`)}
                    className="border-plum/30 data-[selected=true]:border-line-strong data-[selected=true]:bg-bubblegum text-plum font-display shadow-sticker inline-flex cursor-pointer items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-bold transition-all"
                  >
                    <Sparkles className="size-3 shrink-0" aria-hidden="true" />
                    <span>{cat.shortName}</span>
                  </Command.Item>
                ))}
              </div>
            </Command.Group>

            <Command.Group
              heading="Products"
              className="text-soft-plum [&_[cmdk-group-heading]]:font-display [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase"
            >
              <div className="space-y-2">
                {products.map((product) => (
                  <Command.Item
                    key={product.slug}
                    value={`${product.name} ${product.category} ${product.shortDescription} ${product.tags.join(" ")}`}
                    onSelect={() => handleNavigate(`/products/${product.slug}`)}
                    className="border-plum/25 data-[selected=true]:border-line-strong data-[selected=true]:bg-blush/35 shadow-sticker flex cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-white p-2.5 transition-all"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="size-12 shrink-0">
                        <ProductIllustration
                          kind={product.illustration}
                          backdrop={product.backdrop}
                          alt={product.name}
                          className="aspect-square rounded-xl"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-plum truncate text-sm font-bold">
                          {product.name}
                        </p>
                        <p className="text-soft-plum line-clamp-1 text-xs">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>
                    <span className="font-display bg-butter border-line-strong text-plum shadow-sticker shrink-0 rounded-xl border px-2.5 py-1 text-xs font-bold">
                      {formatKES(product.price)}
                    </span>
                  </Command.Item>
                ))}
              </div>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
