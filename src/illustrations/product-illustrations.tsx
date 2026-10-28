import * as React from "react";
import Image from "next/image";
import { PRODUCT_PHOTOS } from "@/data/product-photos";
import { cn } from "@/lib/utils";

export type IllustrationKind =
  | "shoulder-bag"
  | "mini-tote"
  | "charm-pouch"
  | "ceramic-plate"
  | "ceramic-mug"
  | "wall-frame"
  | "bedsheet-set"
  | "water-bottle"
  | "house-shoes"
  | "phone-case"
  | "journal"
  | "colouring-book"
  | "makeup-pouch"
  | "bead-kit"
  | "gift-bundle"
  | "hair-clips"
  | "candle-jar"
  | "desk-organiser"
  | "sticker-sheet"
  | "cereal-bowl"
  | "pink-tote"
  | "fluffy-cushion"
  | "throw-blanket"
  | "lunch-box"
  | "mini-mirror"
  | "washi-tape"
  | "gel-pens"
  | "tea-set"
  | "trinket-tray"
  | "mug-journal-set";

export type IllustrationView = "main" | "variant" | "detail" | "lifestyle";

/** Tonal backdrop families (legacy names kept for data compatibility). */
export type PastelBackdrop = "blush" | "lavender" | "mint" | "butter" | "cream";

export interface ProductIllustrationProps {
  kind: IllustrationKind;
  view?: IllustrationView;
  backdrop?: PastelBackdrop;
  alt: string;
  className?: string;
}

const backdropClasses: Record<PastelBackdrop, string> = {
  blush: "bg-blush",
  lavender: "bg-lavender",
  mint: "bg-mint",
  butter: "bg-butter",
  cream: "bg-cream-subtle",
};

const viewImageClasses: Record<IllustrationView, string> = {
  main: "",
  variant: "hue-rotate-30 saturate-90",
  detail: "scale-[1.6] origin-[50%_42%]",
  lifestyle: "scale-[1.18] origin-bottom",
};

const viewLabels: Record<Exclude<IllustrationView, "main">, string> = {
  variant: "Alternate colourway",
  detail: "Detail",
  lifestyle: "In use",
};

/**
 * Product imagery.
 * - When a studio photograph exists for the product kind it is shown full-bleed.
 * - Otherwise a calm tonal "studio tile" with a monoline category glyph is used, so
 *   the grid stays cohesive while photography is being completed.
 * The 4 gallery views reuse the same asset with different crops / grades.
 */
export function ProductIllustration({
  kind,
  view = "main",
  backdrop = "blush",
  alt,
  className,
}: ProductIllustrationProps) {
  const photoConfig = PRODUCT_PHOTOS[kind];
  const photoSrc = photoConfig?.src ?? "/products/shoulder-bag.png";
  const objectPosition = photoConfig?.objectPosition ?? "center center";

  return (
    <div
      className={cn(
        "relative flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded-xl select-none",
        backdropClasses[backdrop],
        className,
      )}
    >
      <Image
        src={photoSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
        style={{ objectPosition }}
        className={cn(
          "object-cover transition-transform duration-500 ease-out",
          photoConfig?.scale,
          viewImageClasses[view],
        )}
      />

      {/* View label when viewing alternate gallery shots */}
      {view !== "main" && (
        <span className="border-line text-plum font-display absolute bottom-2.5 left-2.5 z-20 rounded-full border bg-white/90 px-2.5 py-0.5 text-xs font-medium">
          {viewLabels[view]}
        </span>
      )}
    </div>
  );
}
