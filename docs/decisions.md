# Architectural & Product Decisions — Whimsy.KE

This document records the technical choices, package justifications, and design assumptions made for the **Whimsy.KE** Proof of Concept.

---

## 1. Core Stack Choices

| Technology                         | Version Line                          | Justification                                                                                                                                                                                       |
| :--------------------------------- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js**                        | `16.4.x` (App Router, Turbopack)      | Latest stable release. Server Components by default keep client bundles small; uses Next.js 16's `src/proxy.ts` convention instead of the deprecated `middleware.ts`.                               |
| **React**                          | `19.3.x` + React Compiler             | Enables automatic memoisation via `reactCompiler: true` in `next.config.ts`, eliminating manual `useMemo`/`useCallback` boilerplate.                                                                |
| **TypeScript**                     | `strict` + `noUncheckedIndexedAccess` | Catches undefined array/record access at compile time. Zero `any` enforced via ESLint.                                                                                                              |
| **Tailwind CSS**                   | `v4.3.x` (CSS-first `@theme`)         | Zero `tailwind.config.js` overhead. All Sticker Sheet tokens (OKLCH colours, fluid typography, hard shadows, radii, and easing) live natively as CSS custom properties in `src/styles/globals.css`. |
| **Zustand**                        | `5.x` (`persist` middleware)          | Minimal, hook-based client state for Cart, Wishlist, Recently Viewed, Orders, and Stock Notifications with versioned `localStorage` persistence and safe SSR hydration guards.                      |
| **nuqs**                           | `2.x`                                 | Type-safe URL query parameter state for Shop and Collection filters, sorting, and search so every filtered view is shareable and bookmarkable.                                                      |
| **React Hook Form + Zod**          | `7.x` + `4.x`                         | Accessible, inline-validated forms with Kenyan phone number normalisation (`+254 7XX...` / `07XX...`) and zero unnecessary re-renders.                                                              |
| **Radix UI / Vaul / CMDK / Embla** | Latest stable                         | Unstyled, WCAG AA accessible primitives restyled 100% into the "Sticker Sheet" aesthetic (chunky plum borders, hard offset shadows, pill shapes).                                                   |
| **Motion**                         | `14.x` (`motion/react`)               | Hardware-accelerated spring & transform animations (fly-to-bag, sticker card hover straighten, mascot moods) that automatically respect `prefers-reduced-motion`.                                   |

---

## 2. Key Design & Product Assumptions

1. **Contrast & Accessibility on Bubblegum (`#FF8FB4`)**:
   - White text on `#FF8FB4` has a contrast ratio of ~2.3:1, which fails WCAG AA at small sizes.
   - **Decision**: Primary buttons and badges use `plum` (`#4A3552`) ink on `bubblegum` (`#FF8FB4`) for crisp >6.5:1 contrast, and we also provide a `deep-bubblegum` (`#D44275`) token where white text is desired.
2. **Product Imagery via Custom Inline SVG Illustrations**:
   - Since real product photography does not exist yet, every product category and item uses bespoke, reusable vector illustrations (`src/illustrations/`) with consistent 2.5px plum outlines, pastel fills, and decorative sparkles/hearts.
   - Product galleries generate 4 distinct studio/detail/variant/lifestyle views from the product's artwork and palette. If a real photo URL is later added to `product.images`, the UI automatically renders `next/image`.
3. **Kenyan E-Commerce Flow & M-Pesa STK Simulation**:
   - Phone inputs accept `07...`, `01...`, `2547...`, or `+2547...` and normalise to `+2547XXXXXXXX`.
   - M-Pesa checkout simulates a 4-second Daraja STK push waiting screen with our animated Bow Mascot. Stakeholders can test failure and retry states at any time via `?pay=fail` or the built-in Demo Toggle on the checkout screen.
   - One pre-seeded demo order (`WHIM-2026-8421` with phone `0712 345 678`) is available out of the box so stakeholders can test `/track` immediately before placing an order.
4. **POC Indexing & Safety**:
   - Controlled via `ALLOW_INDEXING=false` (default). Both `/robots.txt` and the `X-Robots-Tag` response header block search engine crawlers so demo products are never indexed as real commercial listings.
