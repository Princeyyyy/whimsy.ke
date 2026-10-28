"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";
import {
  Bell,
  Check,
  ChevronRight,
  Gift,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import type { CustomerReview, Product } from "@/data/types";
import { copy } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { formatKES } from "@/lib/formatters";
import { getProductsBySlugs } from "@/lib/repositories";
import { fireMiniConfetti } from "@/lib/confetti";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { trackEvent } from "@/lib/analytics";
import { ProductIllustration, type IllustrationView } from "@/illustrations/product-illustrations";
import { Button } from "@/components/ui/button";
import { Badge, Chip } from "@/components/ui/badge";
import { HangTagPrice } from "@/components/ui/hang-tag-price";
import { Checkbox } from "@/components/ui/controls";
import { Textarea } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/shared/product-card";
import { cn } from "@/lib/utils";

const GALLERY_VIEWS: { view: IllustrationView; label: string }[] = [
  { view: "main", label: "Studio View" },
  { view: "variant", label: "Pastel Variant" },
  { view: "detail", label: "Close-up Detail" },
  { view: "lifestyle", label: "Styled Scene" },
];

export interface ProductDetailViewProps {
  product: Product;
  reviews: CustomerReview[];
  pairsWellWith: Product[];
}

export function ProductDetailView({ product, reviews, pairsWellWith }: ProductDetailViewProps) {
  const hydrated = useHydrated();
  const addItem = useShopStore((s) => s.addItem);
  const toggleWishlist = useShopStore((s) => s.toggleWishlist);
  const addRecentlyViewed = useShopStore((s) => s.addRecentlyViewed);
  const addNotifyMe = useShopStore((s) => s.addNotifyMe);
  const wishlistSlugs = useShopStore((s) => s.wishlistSlugs);
  const recentlyViewedSlugs = useShopStore((s) => s.recentlyViewedSlugs);
  const notifyMeSlugs = useShopStore((s) => s.notifyMeSlugs);

  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((group) => {
      if (group.options[0]) {
        initial[group.name] = group.options[0];
      }
    });
    return initial;
  });

  const [quantity, setQuantity] = React.useState(1);
  const [isGift, setIsGift] = React.useState(false);
  const [giftNote, setGiftNote] = React.useState("");
  const [activeSlide, setActiveSlide] = React.useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    addRecentlyViewed(product.slug);
    trackEvent({
      name: "view_item",
      payload: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        category: product.category,
      },
    });
  }, [product, addRecentlyViewed]);

  const isWishlisted = hydrated && wishlistSlugs.includes(product.slug);
  const isNotified = hydrated && notifyMeSlugs.includes(product.slug);
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  const variantSummary = Object.values(selectedOptions).join(" / ");

  const recentlyViewedProducts = React.useMemo(() => {
    if (!hydrated) return [];
    return getProductsBySlugs(recentlyViewedSlugs.filter((s) => s !== product.slug)).slice(0, 4);
  }, [hydrated, recentlyViewedSlugs, product.slug]);

  function handleAddToBag(e?: React.MouseEvent<HTMLButtonElement>) {
    if (isSoldOut) return;
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      fireMiniConfetti({ x, y });
    } else {
      fireMiniConfetti();
    }
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      quantity,
      variant: variantSummary || undefined,
      giftNote: isGift && giftNote.trim() ? giftNote.trim() : undefined,
      illustration: product.illustration,
      backdrop: product.backdrop,
    });
    trackEvent({
      name: "add_to_cart",
      payload: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity,
        variant: variantSummary || undefined,
      },
    });
    toast.success(copy.cart.addedToast(`${quantity}× ${product.name}`));
  }

  const whatsappOrderText = `Hujambo Whimsy.KE! I'd love to order:\n• ${quantity}× ${product.name}${
    variantSummary ? ` (${variantSummary})` : ""
  } — ${formatKES(product.price * quantity)}\n${
    isGift && giftNote ? `• Gift Note: "${giftNote}"\n` : ""
  }Please let me know delivery details!`;

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(
    whatsappOrderText,
  )}`;

  return (
    <div className="w-full max-w-full overflow-x-clip pb-24 lg:pb-16">
      <div className="mx-auto max-w-(--spacing-container) px-4 pt-6 sm:px-6">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="text-soft-plum mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold"
        >
          <Link href="/" className="hover:text-plum">
            Home
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link href="/shop" className="hover:text-plum">
            Shop
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-plum">
            {product.category}
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="text-plum font-bold" aria-current="page">
            {product.name}
          </span>
        </nav>

        {/* Main 12-Column Product Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Swipeable Gallery + Thumbnails */}
          <div className="lg:col-span-6">
            <div className="rounded-feature border-line-strong shadow-sticker-card overflow-hidden border bg-white p-4">
              <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                  {GALLERY_VIEWS.map((g) => (
                    <div key={g.view} className="min-w-0 shrink-0 grow-0 basis-full">
                      <ProductIllustration
                        kind={product.illustration}
                        view={g.view}
                        backdrop={product.backdrop}
                        alt={`${product.name} — ${g.label}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 View Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {GALLERY_VIEWS.map((g, idx) => (
                  <button
                    key={g.view}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(idx)}
                    aria-label={`View ${g.label}`}
                    className={cn(
                      "overflow-hidden rounded-2xl border p-1 transition-all",
                      activeSlide === idx
                        ? "border-line-strong bg-blush/50 shadow-sticker"
                        : "border-plum/20 bg-white opacity-75 hover:opacity-100",
                    )}
                  >
                    <ProductIllustration
                      kind={product.illustration}
                      view={g.view}
                      backdrop={product.backdrop}
                      alt={g.label}
                      className="aspect-square rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info, Variants, Gift Note & Actions */}
          <div className="space-y-6 lg:col-span-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {isSoldOut ? (
                  <Badge variant="soldOut">Sold Out</Badge>
                ) : (
                  product.badges.map((b) => (
                    <Badge
                      key={b}
                      variant={
                        b === "New"
                          ? "new"
                          : b === "Bestseller"
                            ? "bestseller"
                            : b === "Sale"
                              ? "sale"
                              : "lowStock"
                      }
                    >
                      {b}
                    </Badge>
                  ))
                )}

                <span className="text-plum ml-auto inline-flex items-center gap-1 text-xs font-bold">
                  <Star className="fill-butter text-plum size-4" aria-hidden="true" />
                  <span>{product.rating.toFixed(1)}</span>
                  <a
                    href="#product-reviews"
                    className="text-soft-plum hover:text-plum transition-colors"
                  >
                    ({product.reviewCount} reviews)
                  </a>
                </span>
              </div>

              <h1 className="font-display text-plum text-h1 font-bold">{product.name}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-4">
                <HangTagPrice
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  size="lg"
                />

                {/* Stock Status Pill */}
                {isSoldOut ? (
                  <span className="font-display text-error bg-error-bg rounded-full px-3 py-1 text-xs font-bold">
                    Currently Sold Out
                  </span>
                ) : isLowStock ? (
                  <span className="font-display text-error bg-error-bg rounded-full px-3 py-1 text-xs font-bold">
                    Hurry! Only {product.stock} left in Nairobi studio
                  </span>
                ) : (
                  <span className="font-display bg-mint text-plum rounded-full px-3 py-1 text-xs font-bold">
                    ✓ In Stock & Ready for Same-Day Dispatch
                  </span>
                )}
              </div>

              <p className="text-plum/90 text-body mt-4 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                {product.variants.map((group) => (
                  <div key={group.name}>
                    <p className="font-display text-plum text-small mb-2 font-bold">
                      {group.name}:{" "}
                      <span className="text-soft-plum font-semibold">
                        {selectedOptions[group.name]}
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => (
                        <Chip
                          key={opt}
                          selected={selectedOptions[group.name] === opt}
                          onClick={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [group.name]: opt,
                            }))
                          }
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* "This is a gift" Checkbox & Note */}
            <div className="rounded-card border-plum/25 bg-butter/35 space-y-3 border p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="product-is-gift"
                  checked={isGift}
                  onCheckedChange={(checked) => setIsGift(Boolean(checked))}
                />
                <label
                  htmlFor="product-is-gift"
                  className="font-display text-plum flex cursor-pointer items-center gap-1.5 text-sm font-bold"
                >
                  <Gift className="size-4" aria-hidden="true" />
                  <span>This is a gift (Complimentary note card & packaging)</span>
                </label>
              </div>

              {isGift && (
                <div>
                  <label
                    htmlFor="product-gift-note"
                    className="font-display text-plum mb-1 block text-xs font-semibold"
                  >
                    Your Personal Gift Message
                  </label>
                  <Textarea
                    id="product-gift-note"
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="e.g., Happy Birthday! Wishing you a wonderful year ahead."
                    className="min-h-20 bg-white text-sm"
                  />
                </div>
              )}
            </div>

            {/* Quantity Stepper + Add to Bag + Wishlist */}
            <div className="flex flex-wrap items-center gap-3">
              {!isSoldOut && (
                <div className="border-line-strong shadow-sticker inline-flex min-h-12 items-center rounded-full border bg-white px-1 sm:min-h-13">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-plum hover:bg-blush inline-flex size-10 items-center justify-center rounded-full"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="font-display text-plum min-w-10 text-center text-base font-bold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="text-plum hover:bg-blush inline-flex size-10 items-center justify-center rounded-full"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              )}

              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={() => {
                  const added = toggleWishlist(product.slug);
                  toast(
                    added
                      ? `Saved ${product.name} to your wishes`
                      : `Removed ${product.name} from wishes`,
                  );
                }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                className="size-12 sm:order-3 sm:size-13"
              >
                <Heart className={cn("size-5", isWishlisted && "fill-bubblegum text-plum")} />
              </Button>

              {isSoldOut ? (
                <Button
                  type="button"
                  variant="lavender"
                  size="lg"
                  disabled={isNotified}
                  onClick={() => {
                    addNotifyMe(product.slug);
                    toast.success(copy.shop.notifiedSaved);
                  }}
                  className="w-full sm:order-2 sm:w-auto sm:flex-1"
                >
                  {isNotified ? (
                    <>
                      <Check className="size-5 shrink-0" />
                      <span>We&apos;ll Notify You When Restocked</span>
                    </>
                  ) : (
                    <>
                      <Bell className="size-5 shrink-0" />
                      <span>Notify Me When Back in Stock</span>
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleAddToBag}
                  className="w-full sm:order-2 sm:w-auto sm:flex-1"
                >
                  <ShoppingBag className="size-5 shrink-0" aria-hidden="true" />
                  <span>Add to Bag · {formatKES(product.price * quantity)}</span>
                </Button>
              )}
            </div>

            {/* Order on WhatsApp Button */}
            <Button asChild variant="mint" size="md" className="w-full">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-5" aria-hidden="true" />
                <span>Order Instantly via WhatsApp ({siteConfig.contact.phoneDisplay})</span>
              </a>
            </Button>

            {/* Quick Delivery & M-Pesa Reassurance */}
            <div className="border-plum/20 grid grid-cols-1 gap-3 rounded-2xl border bg-white p-3.5 text-xs sm:grid-cols-2">
              <div className="flex items-center gap-2.5">
                <Truck className="text-plum size-5 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-plum block">Same-Day Nairobi</strong>
                  Free delivery over {formatKES(siteConfig.freeDeliveryThreshold)}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-plum size-5 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-plum block">M-Pesa or COD</strong>
                  Safe honeycomb ceramic wrap
                </span>
              </div>
            </div>

            {/* Accordions: Details, Care, Delivery, Returns */}
            <Accordion type="single" collapsible defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger>Dimensions & Materials</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <strong className="text-plum">Size:</strong> {product.details.size}
                    </li>
                    <li>
                      <strong className="text-plum">Material:</strong> {product.details.material}
                    </li>
                    <li>
                      <strong className="text-plum">Packaging:</strong> Wrapped in archival tissue
                      with a bespoke gift card.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care">
                <AccordionTrigger>Care & Maintenance</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">{product.details.care}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery">
                <AccordionTrigger>Kenya Delivery & Fees</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Same-day rider delivery in Nairobi (KES 200 – KES 350) and 1–2 day courier
                    across Kenya (KES 450). Orders over{" "}
                    <strong>{formatKES(siteConfig.freeDeliveryThreshold)}</strong> ship completely
                    FREE!
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="returns">
                <AccordionTrigger>14-Day Easy Returns & Safe Arrival</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Unused items in original packaging can be exchanged or returned within 14 days.
                    If a ceramic item ever arrives chipped in transit, send us a WhatsApp photo
                    within 24 hours and we replace it free of charge.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* REVIEWS WITH RATING SUMMARY BARS */}
        <section id="product-reviews" aria-labelledby="reviews-heading" className="mt-16 pt-8">
          <div className="rounded-feature border-line-strong shadow-sticker border bg-white p-6 md:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Rating Summary Bars */}
              <div className="space-y-4 lg:col-span-4">
                <Badge variant="bestseller">Verified Customer Love</Badge>
                <h2 id="reviews-heading" className="font-display text-plum text-h2 font-bold">
                  Shopper Reviews
                </h2>
                <div className="flex items-center gap-3">
                  <span className="font-display text-plum text-4xl font-bold">
                    {product.rating.toFixed(1)}
                  </span>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="fill-butter text-plum size-4" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-soft-plum text-xs font-semibold">
                      Based on {product.reviewCount} Kenyan reviews
                    </p>
                  </div>
                </div>

                {/* 5-star to 1-star Breakdown Bars */}
                <div className="space-y-2 pt-2">
                  {[
                    { stars: 5, pct: 92 },
                    { stars: 4, pct: 8 },
                    { stars: 3, pct: 0 },
                    { stars: 2, pct: 0 },
                    { stars: 1, pct: 0 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2.5 text-xs font-bold">
                      <span className="text-plum w-10">{row.stars} ★</span>
                      <div className="border-plum/30 bg-cream h-3 flex-1 overflow-hidden rounded-full border">
                        <div
                          className="bg-butter h-full rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-soft-plum w-9 text-right">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                {reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="border-plum/20 bg-cream/60 rounded-2xl border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="fill-butter text-plum size-3.5"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-plum bg-mint rounded-full px-2 py-0.5 text-[10px] font-bold">
                        ✓ Verified
                      </span>
                    </div>
                    <h3 className="font-display text-plum mt-2 text-sm font-bold">{rev.title}</h3>
                    <p className="text-soft-plum mt-1 text-xs leading-relaxed">{rev.comment}</p>
                    <p className="font-display text-plum mt-3 text-xs font-bold">
                      {rev.authorName} ·{" "}
                      <span className="text-soft-plum font-normal">{rev.location}</span>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAIRS WELL WITH RAIL */}
        <section aria-labelledby="pairs-well-heading" className="mt-14">
          <div className="mb-6">
            <Badge variant="lavender">Complete the Vibe</Badge>
            <h2 id="pairs-well-heading" className="font-display text-plum text-h2 mt-1.5 font-bold">
              Pairs So Well With
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {pairsWellWith.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>

        {/* RECENTLY VIEWED RAIL */}
        {recentlyViewedProducts.length > 0 && (
          <section aria-labelledby="recently-viewed-heading" className="mt-14">
            <div className="mb-6">
              <Badge variant="outline">Your Browsing Trail</Badge>
              <h2
                id="recently-viewed-heading"
                className="font-display text-plum text-h2 mt-1.5 font-bold"
              >
                Recently Viewed
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {recentlyViewedProducts.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* STICKY MOBILE ADD-TO-BAG BAR (Positioned above the 64px mobile tab bar) */}
      {!isSoldOut && (
        <div className="border-line-strong fixed right-0 bottom-16 left-0 z-20 flex items-center justify-between gap-3 border-t bg-white/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
          <div className="min-w-0">
            <p className="font-display text-plum truncate text-xs font-bold">{product.name}</p>
            <p className="font-display text-bubblegum-deep text-sm font-bold">
              {formatKES(product.price * quantity)}
            </p>
          </div>
          <Button type="button" variant="primary" size="sm" onClick={handleAddToBag}>
            <ShoppingBag className="size-4" aria-hidden="true" />
            <span>Add to Bag</span>
          </Button>
        </div>
      )}
    </div>
  );
}
