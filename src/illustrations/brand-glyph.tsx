import * as React from "react";
import { Moon, SearchX, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export type MascotMood = "happy" | "sleepy" | "waving" | "confused";

export interface BrandGlyphProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl";
  /** Kept for API compatibility */
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "size-9",
  md: "size-14",
  lg: "size-18",
  xl: "size-22",
} as const;

/**
 * Editorial Whimsy Monogram & State Emblem
 * - Precision-centered SVG vector "W" crest for brand identity
 * - Quiet, refined centered icons for empty/modal states
 */
export function BrandGlyph({ mood = "happy", size = "md", className }: BrandGlyphProps) {
  if (mood === "happy" || mood === "waving") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center select-none",
          sizeClasses[size],
          className,
        )}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full drop-shadow-xs"
        >
          {/* Outer Rounded Tile */}
          <rect width="48" height="48" rx="14" fill="#352438" />

          {/* Delicate Hairline Inner Inset Ring */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="11"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="1"
          />

          {/* Centered Modern Geometric Monogram "W" */}
          <path
            d="M12 15L17.5 33.5L24 19.5L30.5 33.5L36 15"
            stroke="#F8F4F2"
            strokeWidth="3.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Subtle Warm Accent Dot */}
          <circle cx="24" cy="14" r="1.75" fill="#F4D35E" />
        </svg>
      </span>
    );
  }

  const Icon = mood === "confused" ? SearchX : mood === "sleepy" ? ShoppingBag : Moon;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "border-line-strong/20 bg-blush/60 text-plum inline-flex shrink-0 items-center justify-center rounded-2xl border shadow-xs select-none",
        sizeClasses[size],
        className,
      )}
    >
      <Icon className="text-plum/85 size-1/2" strokeWidth={1.5} />
    </span>
  );
}
