import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", hasError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={hasError || undefined}
        className={cn(
          "border-plum/40 text-plum placeholder:text-soft-plum/75 text-body focus-visible:border-plum flex min-h-12 w-full rounded-2xl border-2 bg-white px-4 py-2.5 font-medium shadow-[0_3px_0_#FFD9E8] transition-all duration-150 focus-visible:shadow-[0_4px_0_#4A3552] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          hasError &&
            "border-error bg-error-bg/35 focus-visible:border-error shadow-[0_3px_0_#B3264E]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <textarea
        aria-invalid={hasError || undefined}
        className={cn(
          "border-plum/40 text-plum placeholder:text-soft-plum/75 text-body focus-visible:border-plum flex min-h-28 w-full rounded-2xl border-2 bg-white p-4 font-medium shadow-[0_3px_0_#FFD9E8] transition-all duration-150 focus-visible:shadow-[0_4px_0_#4A3552] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          hasError &&
            "border-error bg-error-bg/35 focus-visible:border-error shadow-[0_3px_0_#B3264E]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("font-display text-plum text-small mb-1.5 block font-semibold", className)}
      {...props}
    />
  );
}
