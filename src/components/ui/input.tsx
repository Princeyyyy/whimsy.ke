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
          "border-plum/40 text-plum placeholder:text-soft-plum/75 text-body focus-visible:border-line-strong shadow-sticker focus-visible:shadow-sticker flex min-h-12 w-full rounded-2xl border bg-white px-4 py-2.5 font-medium transition-all duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-error bg-error-bg/35 focus-visible:border-error shadow-sticker",
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
          "border-plum/40 text-plum placeholder:text-soft-plum/75 text-body focus-visible:border-line-strong shadow-sticker focus-visible:shadow-sticker flex min-h-28 w-full rounded-2xl border bg-white p-4 font-medium transition-all duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-error bg-error-bg/35 focus-visible:border-error shadow-sticker",
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
