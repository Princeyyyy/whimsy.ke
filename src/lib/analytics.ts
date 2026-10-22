export type AnalyticsEvent =
  | {
      name: "view_item";
      payload: { slug: string; name: string; price: number; category: string };
    }
  | {
      name: "add_to_cart";
      payload: { slug: string; name: string; price: number; quantity: number; variant?: string };
    }
  | {
      name: "begin_checkout";
      payload: { itemCount: number; subtotal: number };
    }
  | {
      name: "purchase";
      payload: {
        orderNumber: string;
        total: number;
        paymentMethod: "mpesa" | "cod";
        itemCount: number;
      };
    };

/**
 * Thin analytics wrapper for POC. Logs structured events in development; no external vendor wired.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[Whimsy Analytics] ${event.name}`, event.payload);
  }
}
