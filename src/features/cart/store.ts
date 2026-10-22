"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IllustrationKind, PastelBackdrop } from "@/illustrations/product-illustrations";
import { siteConfig } from "@/config/site";

export interface CartItem {
  key: string; // slug + variant key
  slug: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
  giftNote?: string;
  illustration: IllustrationKind;
  backdrop: PastelBackdrop;
}

export type OrderStatusStep = "Placed" | "Paid" | "Packed" | "Out for delivery" | "Delivered";

export interface StoredOrder {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string; // normalized +254...
  deliveryMethod: "delivery" | "pickup";
  zoneId: string;
  zoneName: string;
  address: string;
  landmark: string;
  paymentMethod: "mpesa" | "cod";
  mpesaReceipt?: string;
  items: CartItem[];
  giftWrap: boolean;
  orderNote: string;
  promoCode?: string;
  discountAmount: number;
  deliveryFee: number;
  subtotal: number;
  total: number;
  eta: string;
  status: OrderStatusStep;
}

const DEMO_SEED_ORDER: StoredOrder = {
  orderNumber: "WHIM-2026-8421",
  createdAt: "2026-10-21T11:30:00.000Z",
  customerName: "Wanjiru Kamau",
  phone: "+254712345678",
  deliveryMethod: "delivery",
  zoneId: "zone-kilimani",
  zoneName: "Kilimani, Kileleshwa & Hurlingham",
  address: "Rose Avenue, Pastel Court Apt 4B",
  landmark: "Opposite Yaya Centre Main Gate",
  paymentMethod: "mpesa",
  mpesaReceipt: "QJK84WHIM2",
  items: [
    {
      key: "blush-shoulder-bag::Blush Pink",
      slug: "blush-shoulder-bag",
      name: "Blush Shoulder Bag",
      price: 1800,
      quantity: 1,
      variant: "Blush Pink",
      illustration: "shoulder-bag",
      backdrop: "blush",
    },
    {
      key: "pastel-ceramic-mug::Blush & Butter",
      slug: "pastel-ceramic-mug",
      name: "Pastel Ceramic Mug",
      price: 650,
      quantity: 2,
      variant: "Blush & Butter",
      illustration: "ceramic-mug",
      backdrop: "blush",
    },
  ],
  giftWrap: true,
  orderNote: "Happy Birthday Wanjiru! Enjoy your cute goodies 🎀",
  discountAmount: 0,
  deliveryFee: 0,
  subtotal: 3100,
  total: 3350,
  eta: "Same-day (1–3 hours)",
  status: "Out for delivery",
};

interface ShopState {
  // Cart state
  items: CartItem[];
  giftWrap: boolean;
  orderNote: string;
  isBagOpen: boolean;
  isSearchOpen: boolean;
  bagBounceTick: number;

  // Wishlist, recently viewed, notify-me, welcome popup, newsletter
  wishlistSlugs: string[];
  recentlyViewedSlugs: string[];
  notifyMeSlugs: string[];
  welcomePopupDismissed: boolean;
  newsletterEmails: string[];

  // Orders
  orders: StoredOrder[];

  // Actions
  setBagOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "key">) => void;
  restoreItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  setGiftWrap: (enabled: boolean) => void;
  setOrderNote: (note: string) => void;
  clearCart: () => void;

  toggleWishlist: (slug: string) => boolean; // returns true if added
  addRecentlyViewed: (slug: string) => void;
  addNotifyMe: (slug: string) => void;
  dismissWelcomePopup: () => void;
  addNewsletterEmail: (email: string) => void;
  saveOrder: (order: StoredOrder) => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      items: [],
      giftWrap: false,
      orderNote: "",
      isBagOpen: false,
      isSearchOpen: false,
      bagBounceTick: 0,

      wishlistSlugs: ["blush-shoulder-bag", "pastel-ceramic-mug"],
      recentlyViewedSlugs: [],
      notifyMeSlugs: [],
      welcomePopupDismissed: false,
      newsletterEmails: [],

      orders: [DEMO_SEED_ORDER],

      setBagOpen: (open) => set({ isBagOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      addItem: (incoming) => {
        const key = `${incoming.slug}::${incoming.variant ?? "default"}`;
        const current = get().items;
        const existing = current.find((i) => i.key === key);

        if (existing) {
          set({
            items: current.map((i) =>
              i.key === key
                ? {
                    ...i,
                    quantity: i.quantity + incoming.quantity,
                    giftNote: incoming.giftNote ?? i.giftNote,
                  }
                : i,
            ),
            bagBounceTick: get().bagBounceTick + 1,
          });
        } else {
          set({
            items: [...current, { ...incoming, key }],
            bagBounceTick: get().bagBounceTick + 1,
          });
        }
      },

      restoreItem: (item) => {
        const current = get().items;
        if (!current.some((i) => i.key === item.key)) {
          set({ items: [...current, item] });
        }
      },

      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.key !== key) });
          return;
        }
        set({
          items: get().items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        });
      },

      setGiftWrap: (enabled) => set({ giftWrap: enabled }),
      setOrderNote: (note) => set({ orderNote: note }),
      clearCart: () => set({ items: [], giftWrap: false, orderNote: "" }),

      toggleWishlist: (slug) => {
        const current = get().wishlistSlugs;
        const exists = current.includes(slug);
        if (exists) {
          set({ wishlistSlugs: current.filter((s) => s !== slug) });
          return false;
        }
        set({ wishlistSlugs: [slug, ...current] });
        return true;
      },

      addRecentlyViewed: (slug) => {
        const current = get().recentlyViewedSlugs.filter((s) => s !== slug);
        set({ recentlyViewedSlugs: [slug, ...current].slice(0, 8) });
      },

      addNotifyMe: (slug) => {
        const current = get().notifyMeSlugs;
        if (!current.includes(slug)) {
          set({ notifyMeSlugs: [...current, slug] });
        }
      },

      dismissWelcomePopup: () => set({ welcomePopupDismissed: true }),

      addNewsletterEmail: (email) => {
        const clean = email.trim().toLowerCase();
        const current = get().newsletterEmails;
        if (!current.includes(clean)) {
          set({ newsletterEmails: [...current, clean] });
        }
      },

      saveOrder: (order) => {
        const existing = get().orders.filter((o) => o.orderNumber !== order.orderNumber);
        set({ orders: [order, ...existing] });
      },
    }),
    {
      name: "whimsy-ke-store-v1",
      version: 1,
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          };
        }
        return window.localStorage;
      }),
      partialize: (state) => ({
        items: state.items,
        giftWrap: state.giftWrap,
        orderNote: state.orderNote,
        wishlistSlugs: state.wishlistSlugs,
        recentlyViewedSlugs: state.recentlyViewedSlugs,
        notifyMeSlugs: state.notifyMeSlugs,
        welcomePopupDismissed: state.welcomePopupDismissed,
        newsletterEmails: state.newsletterEmails,
        orders: state.orders,
      }),
      migrate: (persistedState: unknown, version) => {
        if (version !== 1 || !persistedState || typeof persistedState !== "object") {
          return {
            items: [],
            giftWrap: false,
            orderNote: "",
            wishlistSlugs: ["blush-shoulder-bag", "pastel-ceramic-mug"],
            recentlyViewedSlugs: [],
            notifyMeSlugs: [],
            welcomePopupDismissed: false,
            newsletterEmails: [],
            orders: [DEMO_SEED_ORDER],
          };
        }
        return persistedState as Partial<ShopState>;
      },
    },
  ),
);

const emptySubscribe = () => () => {};

/**
 * Hydration-safe hook using React 19 useSyncExternalStore so persisted localStorage counts never trigger SSR mismatch
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function calculateBagTotals(
  items: CartItem[],
  giftWrap: boolean,
  promoCode?: string,
  deliveryFee = 0,
) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wrapCost = giftWrap && items.length > 0 ? siteConfig.giftWrapFee : 0;
  const isPromoValid = promoCode?.trim().toUpperCase() === siteConfig.promoCodes.WHIMSY10.code;
  const discountAmount = isPromoValid
    ? Math.round(subtotal * (siteConfig.promoCodes.WHIMSY10.discountPercent / 100))
    : 0;
  const qualifiesForFreeDelivery = subtotal >= siteConfig.freeDeliveryThreshold;
  const effectiveDeliveryFee = items.length === 0 || qualifiesForFreeDelivery ? 0 : deliveryFee;
  const remainingForFreeDelivery = Math.max(0, siteConfig.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgressPercent = Math.min(
    100,
    Math.round((subtotal / siteConfig.freeDeliveryThreshold) * 100),
  );
  const total = Math.max(0, subtotal - discountAmount + wrapCost + effectiveDeliveryFee);

  return {
    subtotal,
    wrapCost,
    discountAmount,
    effectiveDeliveryFee,
    qualifiesForFreeDelivery,
    remainingForFreeDelivery,
    freeDeliveryProgressPercent,
    total,
  };
}
