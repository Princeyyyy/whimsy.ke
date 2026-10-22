# 🎀 Whimsy.KE — _"Little things, big smiles."_

A polished, fully clickable **Next.js 16 + Tailwind CSS v4** e-commerce Proof of Concept for **Whimsy.KE** (`whimsy.ke`), selling cute pastel home and lifestyle goods to shoppers in Nairobi and across Kenya.

> **POC Notice:** _Demo store. No real orders are processed._ Everything external (Safaricom M-Pesa STK push, Cash on Delivery, order tracking, newsletter, and stock notifications) is convincingly simulated and persisted locally in `localStorage`.

---

## 🚀 Quick Start

Ensure you have **Node.js >= 22** and **pnpm** enabled via Corepack:

```bash
corepack enable
pnpm install
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Available Scripts

| Command             | Description                                                               |
| :------------------ | :------------------------------------------------------------------------ |
| `pnpm dev`          | Starts the Next.js 16 Turbopack dev server on `http://localhost:3000`     |
| `pnpm build`        | Builds the production application                                         |
| `pnpm start`        | Starts the production server                                              |
| `pnpm lint`         | Runs ESLint (Next.js Core Web Vitals + TypeScript + `jsx-a11y`)           |
| `pnpm lint:fix`     | Runs ESLint with `--fix`                                                  |
| `pnpm typecheck`    | Runs `tsc --noEmit` (`strict` + `noUncheckedIndexedAccess`)               |
| `pnpm format`       | Formats all files with Prettier + `prettier-plugin-tailwindcss`           |
| `pnpm format:check` | Verifies formatting without modifying files                               |
| `pnpm test`         | Runs Vitest unit & repository tests                                       |
| `pnpm test:watch`   | Runs Vitest in interactive watch mode                                     |
| `pnpm test:e2e`     | Runs Playwright end-to-end & `axe-core` accessibility checks              |
| `pnpm analyze`      | Builds with `@next/bundle-analyzer` (`ANALYZE=true`)                      |
| `pnpm check`        | Runs `format:check`, `lint`, `typecheck`, `test`, and `build` in sequence |

---

## 🗺️ Key Routes to Explore

- **`/` (Home)**: Hero collage, rotating announcement bar, round category tiles, New Arrivals carousel, "Shop by Mood" sticker tiles, Bestsellers, Gift Builder teaser, verified Kenyan shopper reviews carousel, Instagram-style gallery, FAQ accordion, and one-time welcome offer popup (`WHIMSY10`).
- **`/shop` & `/collections/[slug]`**: URL-synced filterable catalog (`nuqs`), mobile Vaul filter sheet, sort dropdown, sold-out items placed last with local "Notify me" persistence.
- **`/products/[slug]`**: 4-view illustration gallery (Studio, Variant, Detail crop, Lifestyle scene), Hang-Tag price with discount badge, "This is a gift" note card toggle, pre-filled "Order on WhatsApp" button, rating summary bars, "Pairs well with", and "Recently viewed" rails.
- **`/cart` & Bag Drawer**: Free-delivery progress bar (`KES 3,000` threshold), signature gift wrap toggle (`+KES 250`), remove with Undo toast, and two sub-KES 650 add-on suggestions.
- **`/checkout`**: Kenyan phone normalisation (`07XX...` → `+2547XX...`), live Nairobi & Upcountry delivery zone fees/ETAs, promo code (`WHIMSY10`), M-Pesa 4-second animated STK push waiting screen, failure & retry demo toggle (`?pay=fail`), and confetti confirmation screen.
- **`/track`**: Order status timeline (`Placed → Paid → Packed → Out for delivery → Delivered`). Pre-seeded with demo order **`WHIM-2026-8421`** and phone **`0712 345 678`**.
- **`/gift-builder`**: 3-step custom gift bundle builder with live box preview and automatic 10% bundle discount.
- **`/design-system`** _(Development Only)_: Single source of truth for all "Sticker Sheet" OKLCH colour tokens, typography scale, buttons, chips, badges, hang-tag prices, skeletons, Bowberry mascot moods, and vector product illustrations. Automatically hidden and returns `404` in production builds (`NODE_ENV=production`) for Vercel deployment.
- **`/admin`**: Read-only stakeholder demo dashboard with weekly sales charts, low-stock alerts, and live local orders.
- **Static & Support Pages**: `/wishlist`, `/about`, `/contact`, `/faq`, `/delivery-returns`, `/care-guides`, `/privacy`, `/terms`, plus custom mascot `404` and error boundaries.

---

## 📁 Project Structure

```text
src/
├── app/                  # App Router pages, metadata, robots.ts, sitemap.ts, OG images
├── components/
│   ├── shared/           # SiteHeader, SiteFooter, AnnouncementBar, ProductCard, SearchOverlay
│   └── ui/               # Sticker Sheet primitives (Button, Badge, Chip, HangTagPrice, Dialog, etc.)
├── config/
│   ├── site.ts           # Single source of truth for business contact details, fees & thresholds
│   └── i18n.ts           # Typed user-facing copy with warm Kenyan/Swahili touches
├── data/                 # Typed mock catalog (30 products, 6 categories, 26 reviews, 8 zones, FAQs)
├── features/
│   ├── cart/             # Zustand persisted store, BagDrawer, CartPageView
│   ├── catalog/          # HomeShowcase, ShopCatalog, ProductDetailView, DesignSystemShowcase, Admin
│   ├── checkout/         # CheckoutView, OrderTrackingView, PaymentProvider interface
│   ├── gift-builder/     # 3-step GiftBuilderView
│   └── wishlist/         # WishlistView
├── illustrations/        # BowMascot (4 moods), ProductIllustration (30 items × 4 views), ScallopDivider
├── lib/                  # Repository functions (getProducts, etc.), KES/phone formatters, fonts, utils
├── styles/
│   └── globals.css       # Tailwind CSS v4 @theme tokens, polka-dot background, washi-tape utilities
├── env.ts                # Zod-validated environment variables
└── proxy.ts              # Next.js 16 request proxy setting X-Robots-Tag noindex when ALLOW_INDEXING=false
```

---

## 🔌 How to Swap Dummy Data for Real Photos, Database & M-Pesa Later

### 1. Swapping Vector Illustrations for Real Product Photos

Each product in `src/data/products.ts` supports an optional `images?: string[]` array.

- Add your real product image URLs (hosted on Cloudinary, S3, or `/public/images/...`) to `product.images` and whitelist the host in `next.config.ts` (`images.remotePatterns`).
- Update `ProductIllustration` (or `ProductCard` / `ProductDetailView`) to render `<Image src={product.images[0]} ... />` whenever `product.images?.length` is non-empty, keeping the SVG illustration as an automatic fallback.

### 2. Plugging In a Real Database (PostgreSQL / Prisma / Drizzle)

All UI components read catalog data exclusively through the repository functions in `src/lib/repositories.ts` (`getProducts`, `getProductBySlug`, `getCategories`, `getDeliveryZones`, `getReviewsForProduct`, etc.).

- Replace the synchronous array lookups inside `src/lib/repositories.ts` with database queries (e.g. Drizzle or Prisma against PostgreSQL/Supabase) without changing component props.

### 3. Plugging In Real Safaricom Daraja M-Pesa STK Push

Payments are abstracted behind the `PaymentProvider` interface in `src/features/checkout/payment-provider.ts`.

- Create a Next.js Route Handler (`src/app/api/mpesa/stkpush/route.ts`) that authenticates with Safaricom Daraja using `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, and `MPESA_PASSKEY` from `.env`, initiates the `mpesaExpress` request, and polls/listens to the callback webhook.
- Swap `simulatedPaymentProvider` in `src/features/checkout/payment-provider.ts` to call `/api/mpesa/stkpush`.

---

## 📋 Checklist of Real Business Inputs Needed Before Production Launch

All placeholder business values currently live in **`src/config/site.ts`**. Before setting `ALLOW_INDEXING=true` and going live, please provide:

1. **Brand Assets**: Final high-resolution vector logo (if replacing or pairing with the Bowberry mascot) and brand social handles.
2. **Product Photography & Inventory**: Real studio/lifestyle product photos (`<200KB` WebP/AVIF), final KES retail prices, exact variant names, and live stock counts.
3. **Contact & Pickup Details** (`src/config/site.ts`):
   - WhatsApp business phone number (configured as `0705 529 889` / `254705529889`)
   - Customer support email (currently `hello@whimsy.ke`)
   - Physical pickup studio/shop address in Nairobi
4. **Delivery Rider & Courier Rates** (`src/data/store-data.ts`): Final negotiated zone fees and ETAs with your Nairobi rider partner and upcountry courier (e.g. Fargo / Wells Fargo / Pickup Mtaani).
5. **Payment Credentials** (`.env`): Safaricom Daraja Paybill or Buy Goods Till number, Consumer Key, Consumer Secret, and Passkey.
6. **Legal & Policy Copy**: Final lawyer-reviewed Privacy Policy (Kenya Data Protection Act) and Terms of Service.

---

## 📜 Credits & Licences

- **Typography**: [Fredoka](https://fonts.google.com/specimen/Fredoka) and [Quicksand](https://fonts.google.com/specimen/Quicksand) are open-licensed under the **SIL Open Font License (OFL)** and self-hosted via `next/font/google`.
- **Illustrations**: All product SVG illustrations and the "Bowberry" bow mascot in `src/illustrations/` are original vector artwork created specifically for the Whimsy.KE project.
