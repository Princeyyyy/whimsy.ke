import type { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { fredoka, quicksand } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { copy } from "@/config/i18n";
import { env } from "@/env";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { MobileBottomNavAndWhatsApp } from "@/components/shared/mobile-bottom-nav";
import { BagDrawer } from "@/features/cart/bag-drawer";
import { SearchOverlay } from "@/components/shared/search-overlay";
import { StickerToaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#FFF8F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.slogan}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: env.ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main-content"
          className="font-display border-plum bg-butter text-plum sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:border-2 focus:px-4 focus:py-2 focus:font-bold focus:shadow-[0_4px_0_#4A3552]"
        >
          {copy.header.skipToContent}
        </a>

        <NuqsAdapter>
          <AnnouncementBar />
          <SiteHeader />

          <main id="main-content" className="w-full max-w-full min-w-0 flex-1 overflow-x-clip">
            {children}
          </main>

          <SiteFooter />
          <MobileBottomNavAndWhatsApp />
          <BagDrawer />
          <SearchOverlay />
          <StickerToaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
