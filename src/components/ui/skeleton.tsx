import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("border-blush bg-blush/45 animate-pulse rounded-2xl border-2", className)}
      {...props}
    />
  );
}

/**
 * Shaped Product Card Skeleton that matches our Sticker Product Card anatomy
 */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-card border-plum/15 shadow-sticker bg-white p-3.5">
      <Skeleton className="aspect-4/5 w-full rounded-2xl" />
      <div className="mt-3.5 space-y-2.5">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-6 w-3/4 rounded-xl" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-11 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
