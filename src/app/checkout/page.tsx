import * as React from "react";
import type { Metadata } from "next";
import { CheckoutView } from "@/features/checkout/checkout-view";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Checkout — M-Pesa & Cash on Delivery",
  description: "Complete your Whimsy.KE order with M-Pesa STK or Cash on Delivery.",
};

export default function CheckoutPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto max-w-(--spacing-container) px-4 py-12 sm:px-6">
          <Skeleton className="h-96 w-full" />
        </div>
      }
    >
      <CheckoutView />
    </React.Suspense>
  );
}
