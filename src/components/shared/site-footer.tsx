"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/data/categories";
import { useShopStore } from "@/features/cart/store";
import { BowMascot } from "@/illustrations/bow-mascot";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const addNewsletterEmail = useShopStore((s) => s.addNewsletterEmail);

  function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Pole! Please enter a valid email address.");
      return;
    }
    addNewsletterEmail(email);
    setSubscribed(true);
    setEmail("");
    toast.success("Karibu to the Whimsy Club! Check your welcome code: WHIMSY10 ✨");
  }

  return (
    <footer className="mt-16 pb-20 lg:pb-0">
      <ScallopDivider fill="blush" />
      <div className="bg-blush/55 border-plum/15 border-t pt-12 pb-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          {/* Newsletter Sticker Banner */}
          <div className="rounded-feature border-plum shadow-sticker-plum mb-12 grid gap-6 border-2 bg-white p-6 md:grid-cols-12 md:items-center md:p-8">
            <div className="flex items-center gap-4 md:col-span-7">
              <BowMascot mood="waving" size="md" className="hidden shrink-0 sm:block" />
              <div>
                <span className="font-display border-plum bg-butter text-plum mb-2 inline-flex items-center gap-1 rounded-full border-2 px-3 py-0.5 text-xs font-bold">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Join the Pastel Post Club
                </span>
                <h2 className="font-display text-plum text-h3 font-bold">
                  Get 10% off your first cute haul!
                </h2>
                <p className="text-soft-plum text-small mt-1">
                  Early access to restocks, secret sticker drops & code{" "}
                  <strong className="text-plum font-bold">WHIMSY10</strong> right away.
                </p>
              </div>
            </div>

            <div className="md:col-span-5">
              {subscribed ? (
                <div className="border-plum bg-mint text-plum rounded-2xl border-2 p-4 text-center shadow-[0_3px_0_#4A3552]">
                  <p className="font-display font-bold">Asante sana! You&apos;re on the list 🎀</p>
                  <p className="text-xs">
                    Use promo code <strong>WHIMSY10</strong> at checkout for 10% off!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col gap-2.5 sm:flex-row"
                >
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="footer-newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="wanjiru@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="primary" size="md">
                    <Mail className="size-4" aria-hidden="true" />
                    <span>Join Club</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* 4-Column Footer Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
            {/* Brand Column */}
            <div className="space-y-3 lg:col-span-4">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <BowMascot mood="happy" size="sm" animated={false} className="size-10" />
                <span className="font-display text-plum text-2xl font-bold">
                  Whimsy<span className="text-bubblegum-deep">.KE</span>
                </span>
              </Link>
              <p className="font-display text-plum text-base font-semibold italic">
                &ldquo;{siteConfig.slogan}&rdquo;
              </p>
              <p className="text-soft-plum text-small max-w-sm">{siteConfig.description}</p>
              <div className="text-soft-plum space-y-1.5 pt-2 text-xs font-medium">
                <p className="flex items-center gap-2">
                  <Phone className="text-plum size-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp / Call: {siteConfig.contact.phoneDisplay}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="text-plum size-4 shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contact.email}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="text-plum mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contact.pickupAddress}</span>
                </p>
              </div>
            </div>

            {/* Shop Column */}
            <div className="lg:col-span-3">
              <h3 className="font-display text-plum mb-3 text-base font-bold">Shop Cute Goods</h3>
              <ul className="text-soft-plum space-y-2 text-sm font-medium">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop?category=${c.slug}`}
                      className="hover:text-plum hover:underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/gift-builder" className="text-plum font-bold hover:underline">
                    🎀 Custom Gift Builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/sale"
                    className="text-bubblegum-deep font-bold hover:underline"
                  >
                    ✨ Sweet Little Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care Column */}
            <div className="lg:col-span-3">
              <h3 className="font-display text-plum mb-3 text-base font-bold">
                Customer Care & Info
              </h3>
              <ul className="text-soft-plum space-y-2 text-sm font-medium">
                <li>
                  <Link href="/track" className="hover:text-plum hover:underline">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="/delivery-returns" className="hover:text-plum hover:underline">
                    Delivery Zones & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/care-guides" className="hover:text-plum hover:underline">
                    Ceramic & Bag Care Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-plum hover:underline">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-plum hover:underline">
                    Our Story (About Whimsy.KE)
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-plum hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies & Demo Links Column */}
            <div className="lg:col-span-2">
              <h3 className="font-display text-plum mb-3 text-base font-bold">Legal & Demo</h3>
              <ul className="text-soft-plum space-y-2 text-sm font-medium">
                <li>
                  <Link href="/privacy" className="hover:text-plum hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-plum hover:underline">
                    Terms of Service
                  </Link>
                </li>
                {siteConfig.showDesignSystem && (
                  <li>
                    <Link href="/design-system" className="text-plum font-semibold hover:underline">
                      Sticker Sheet Design System
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/admin" className="text-plum font-semibold hover:underline">
                    Demo Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Badges & Discreet Demo Notice */}
          <div className="border-plum/15 mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center sm:flex-row sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-display border-plum bg-mint text-plum inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold shadow-[0_2px_0_#4A3552]">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                M-Pesa STK Instant
              </span>
              <span className="font-display border-plum bg-butter text-plum inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold shadow-[0_2px_0_#4A3552]">
                Cash on Delivery (Nairobi)
              </span>
              <span className="font-display border-plum/30 text-soft-plum inline-flex items-center gap-1.5 rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold">
                Till: {siteConfig.contact.mpesaTillNumber}
              </span>
            </div>

            <div className="text-soft-plum space-y-1 text-xs">
              <p className="flex items-center justify-center gap-1 sm:justify-end">
                Made with{" "}
                <Heart className="fill-bubblegum text-plum inline size-3.5" aria-hidden="true" /> in
                Nairobi, Kenya · © 2026 {siteConfig.name}
              </p>
              <p className="border-plum/20 text-plum inline-block rounded-full border bg-white/75 px-3 py-0.5 font-semibold">
                {siteConfig.demoNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
