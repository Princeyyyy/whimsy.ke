import * as React from "react";
import type { Metadata } from "next";
import { OrderTrackingView } from "@/features/checkout/order-tracking-view";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track your Whimsy.KE parcel status with your order number and Kenyan phone number.",
};

export default function TrackOrderPage() {
  return (
    <React.Suspense
      fallback={
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <Skeleton className="h-80 w-full" />
        </div>
      }
    >
      <OrderTrackingView />
    </React.Suspense>
  );
}
