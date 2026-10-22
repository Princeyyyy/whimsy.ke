import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-display inline-flex max-w-full items-center justify-center gap-2 rounded-pill border-2 border-plum text-center leading-snug font-semibold transition-all duration-150 select-none sm:whitespace-nowrap focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-plum disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-bubblegum text-plum shadow-sticker-plum hover:bg-bubblegum-hover active:translate-y-0.75 active:bg-bubblegum-pressed active:shadow-sticker-pressed",
        secondary:
          "bg-white text-plum shadow-sticker-plum hover:bg-blush/50 active:translate-y-0.75 active:bg-blush active:shadow-sticker-pressed",
        lavender:
          "bg-lavender text-plum shadow-sticker-plum hover:bg-lavender-hover active:translate-y-0.75 active:bg-lavender-pressed active:shadow-sticker-pressed",
        mint: "bg-mint text-plum shadow-sticker-plum hover:bg-mint-hover active:translate-y-0.75 active:shadow-sticker-pressed",
        ghost:
          "border-transparent bg-transparent text-plum shadow-none hover:border-blush hover:bg-blush/40 active:bg-blush/70",
        danger:
          "bg-error text-white shadow-sticker-plum hover:opacity-95 active:translate-y-0.75 active:shadow-sticker-pressed",
      },
      size: {
        sm: "min-h-10 px-3.5 py-2 text-xs sm:min-h-11 sm:px-4 sm:text-small",
        md: "min-h-11 px-4 py-2.5 text-sm sm:px-6 sm:text-body",
        lg: "min-h-12 px-5 py-3 text-base sm:min-h-13 sm:px-8 sm:py-3.5 sm:text-h4",
        icon: "size-11 shrink-0 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
