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
 * Editorial Price Display
 * Clean, modern typographical hierarchy without loud block tags.
 */
export function HangTagPrice({ price, compareAtPrice, size = "md", className }: HangTagPriceProps) {
  const isOnSale = typeof compareAtPrice === "number" && compareAtPrice > price;
  const percentOff = isOnSale ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  return (
    <div className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span
        className={cn(
          "font-display text-plum font-bold tracking-tight",
          size === "sm" && "text-sm sm:text-base",
          size === "md" && "text-base sm:text-lg",
          size === "lg" && "text-h2",
        )}
      >
        {formatKES(price)}
      </span>

      {isOnSale && (
        <div className="inline-flex items-center gap-1.5">
          <span className="text-soft-plum/70 text-xs font-normal line-through">
            {formatKES(compareAtPrice)}
          </span>
          {size !== "sm" && (
            <span className="bg-blush/80 text-bubblegum-deep rounded-full px-2 py-0.5 text-[11px] font-semibold">
              -{percentOff}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}
