"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Sticker Sheet restyled Sonner Toaster
 */
export function StickerToaster() {
  return (
    <SonnerToaster
      position="top-center"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-full max-w-md flex items-center gap-3 rounded-2xl border border-line-strong bg-white px-4 py-3.5 text-plum shadow-sticker font-sans text-small font-semibold",
          title: "font-display text-plum text-body font-bold",
          description: "text-soft-plum text-xs",
          actionButton:
            "ml-auto rounded-pill border border-line-strong bg-butter px-3.5 py-1.5 font-display text-xs font-bold text-plum shadow-sticker hover:bg-butter-hover",
          cancelButton:
            "rounded-pill border border-plum/30 bg-cream px-3 py-1 font-display text-xs font-semibold text-soft-plum",
        },
      }}
    />
  );
}
