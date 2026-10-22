"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Search, ShoppingBag, Store } from "lucide-react";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Sticky Mobile Bottom Tab Bar (Home, Shop, Search, Bag)
 * + Floating WhatsApp Chat Button positioned safely above the tab bar on mobile
 */
export function MobileBottomNavAndWhatsApp() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const items = useShopStore((s) => s.items);
  const setBagOpen = useShopStore((s) => s.setBagOpen);
  const setSearchOpen = useShopStore((s) => s.setSearchOpen);

  const totalBagCount = hydrated ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(
    "Hujambo Whimsy.KE! 🎀 I'm browsing your cute shop and had a quick question.",
  )}`;

  return (
    <>
      {/* Floating WhatsApp Button — sits at bottom-22 on mobile so it never collides with the 68px tab bar */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Whimsy.KE on WhatsApp"
        className="border-plum bg-mint text-plum hover:bg-mint-hover fixed right-4 bottom-22 z-30 inline-flex min-h-12 items-center gap-2 rounded-full border-2 px-4 py-2.5 shadow-[0_4px_0_#4A3552] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 lg:right-6 lg:bottom-6"
      >
        <MessageCircle className="fill-plum/10 size-5 shrink-0" aria-hidden="true" />
        <span className="font-display text-xs font-bold sm:text-sm">WhatsApp Us</span>
      </a>

      {/* Sticky Bottom Tab Bar (Mobile & Tablet only) */}
      <nav
        aria-label="Mobile quick navigation"
        className="border-plum bg-cream/95 pb-safe fixed right-0 bottom-0 left-0 z-30 border-t-2 backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto grid h-16 max-w-md grid-cols-4 items-center px-2">
          <Link
            href="/"
            className={cn(
              "font-display flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-xs font-bold transition-colors",
              pathname === "/" ? "bg-blush/70 text-plum" : "text-soft-plum hover:text-plum",
            )}
          >
            <Home className="size-5" aria-hidden="true" />
            <span>Home</span>
          </Link>

          <Link
            href="/shop"
            className={cn(
              "font-display flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-xs font-bold transition-colors",
              pathname.startsWith("/shop") || pathname.startsWith("/collections")
                ? "bg-blush/70 text-plum"
                : "text-soft-plum hover:text-plum",
            )}
          >
            <Store className="size-5" aria-hidden="true" />
            <span>Shop</span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="font-display text-soft-plum hover:text-plum flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-xs font-bold transition-colors"
          >
            <Search className="size-5" aria-hidden="true" />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={() => setBagOpen(true)}
            className="font-display text-plum relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl text-xs font-bold transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="size-5" aria-hidden="true" />
              {totalBagCount > 0 && (
                <span className="border-plum bg-bubblegum text-plum absolute -top-1.5 -right-2.5 flex size-4.5 items-center justify-center rounded-full border text-[10px] font-bold">
                  {totalBagCount}
                </span>
              )}
            </div>
            <span>Bag</span>
          </button>
        </div>
      </nav>
    </>
  );
}
