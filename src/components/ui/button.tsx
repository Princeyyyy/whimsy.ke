import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-display inline-flex max-w-full items-center justify-center gap-2 rounded-pill border border-transparent text-center leading-snug font-medium transition-all duration-200 select-none sm:whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-plum text-cream hover:bg-plum-hover active:scale-[0.98] active:bg-plum",
        secondary:
          "border-line-strong bg-white text-plum hover:border-plum hover:bg-cream-subtle active:scale-[0.98]",
        lavender: "bg-lavender text-plum hover:bg-lavender-hover active:scale-[0.98]",
        mint: "bg-mint text-plum hover:bg-mint-hover active:scale-[0.98]",
        ghost: "bg-transparent text-plum hover:bg-blush/60 active:bg-blush",
        danger: "bg-error text-white hover:opacity-90 active:scale-[0.98]",
      },
      size: {
        sm: "min-h-10 px-4 py-2 text-xs sm:min-h-11 sm:text-small",
        md: "min-h-11 px-5 py-2.5 text-sm sm:px-6 sm:text-body",
        lg: "min-h-12 px-6 py-3 text-base sm:min-h-13 sm:px-8 sm:py-3.5",
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
