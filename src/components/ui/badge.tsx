import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-display inline-flex items-center gap-1.5 rounded-pill border-2 border-plum px-3 py-1 text-caption font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        new: "bg-mint text-plum shadow-[0_2px_0_#4A3552]",
        bestseller: "bg-butter text-plum shadow-[0_2px_0_#4A3552]",
        sale: "bg-bubblegum text-plum shadow-[0_2px_0_#4A3552]",
        lowStock: "bg-error-bg text-error border-error shadow-[0_2px_0_#B3264E]",
        soldOut: "bg-cream-subtle text-soft-plum border-soft-plum",
        lavender: "bg-lavender text-plum shadow-[0_2px_0_#4A3552]",
        outline: "bg-white text-plum",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  count?: number;
}

/**
 * Interactive Filter / Variant Chip with 44px minimum touch target height
 */
export function Chip({ selected = false, count, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "font-display rounded-pill text-small inline-flex min-h-10 max-w-full items-center gap-2 border-2 px-3.5 py-1.5 text-left font-semibold transition-all duration-150 select-none sm:min-h-11 sm:px-4 sm:py-2",
        selected
          ? "border-plum bg-bubblegum text-plum shadow-[0_3px_0_#4A3552]"
          : "border-plum/30 text-plum hover:border-plum hover:bg-blush/35 bg-white active:translate-y-0.5",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={cn(
            "rounded-pill px-2 py-0.5 text-xs",
            selected ? "text-plum bg-white/80" : "bg-blush/60 text-plum",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
