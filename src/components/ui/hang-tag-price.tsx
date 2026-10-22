import * as React from "react";
import { formatKES } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export interface HangTagPriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Signature Hang-Tag Price Element
 * A rotated butter-yellow or blush tag shape with a punched string hole, rendered in Fredoka.
 */
export function HangTagPrice({ price, compareAtPrice, size = "md", className }: HangTagPriceProps) {
  const isOnSale = typeof compareAtPrice === "number" && compareAtPrice > price;
  const percentOff = isOnSale ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  return (
    <div className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      <div
        className={cn(
          "font-display border-plum relative inline-flex items-center gap-2 rounded-xl border-2 pr-3.5 pl-2.5 font-bold shadow-[0_3px_0_#4A3552] transition-transform duration-150 motion-safe:-rotate-2 hover:motion-safe:rotate-0",
          isOnSale ? "bg-bubblegum text-plum" : "bg-butter text-plum",
          size === "sm" && "text-small py-0.5",
          size === "md" && "text-body py-1",
          size === "lg" && "text-h3 py-1.5",
        )}
      >
        {/* Punched string hole */}
        <span
          aria-hidden="true"
          className="border-plum bg-cream inline-block size-2.5 shrink-0 rounded-full border-2"
        />
        <span>{formatKES(price)}</span>
      </div>

      {isOnSale && (
        <div className="inline-flex items-center gap-1.5">
          <span className="text-soft-plum text-small font-medium line-through">
            {formatKES(compareAtPrice)}
          </span>
          {size !== "sm" && (
            <span className="font-display border-plum bg-mint text-plum rounded-full border-2 px-2 py-0.5 text-xs font-bold">
              -{percentOff}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
