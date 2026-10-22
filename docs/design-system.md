# Whimsy.KE — "Sticker Sheet" Design System

> **Slogan:** _"Little things, big smiles."_

The **Sticker Sheet** design system brings tactile stationery, pastel Kenyan home goods, and joyful gifting into a responsive digital experience. Visit `/design-system` in the running app to inspect all live tokens and components interactively.

---

## 1. Colour Palette (OKLCH & Hex Tokens)

All colours are defined in `src/styles/globals.css` inside the `@theme` block:

| Token                     | Hex Equivalent | OKLCH                      | Role                                                                    |
| :------------------------ | :------------- | :------------------------- | :---------------------------------------------------------------------- |
| `--color-cream`           | `#FFF8F2`      | `oklch(0.982 0.012 67.5)`  | Primary page background (with subtle polka-dot pattern)                 |
| `--color-blush`           | `#FFD9E8`      | `oklch(0.912 0.048 352.4)` | Borders, soft card accents, hard sticker shadows                        |
| `--color-bubblegum`       | `#FF8FB4`      | `oklch(0.768 0.142 354.8)` | Primary interactive brand fill (paired with `plum` ink for AA contrast) |
| `--color-bubblegum-hover` | `#FF75A3`      | `oklch(0.722 0.168 354.8)` | Hover state for primary buttons                                         |
| `--color-bubblegum-deep`  | `#C83E6B`      | `oklch(0.562 0.176 355.2)` | High-contrast berry accent where white text is used                     |
| `--color-lavender`        | `#E7D9FB`      | `oklch(0.902 0.046 302.5)` | Secondary pastel surface, category badges, mood tiles                   |
| `--color-mint`            | `#D7F5E4`      | `oklch(0.942 0.042 154.2)` | Success badges, M-Pesa confirmation accents, free delivery ribbon       |
| `--color-butter`          | `#F5E1A4`      | `oklch(0.908 0.082 88.5)`  | Hang-tag prices, Bestseller & Star rating highlights, washi tape        |
| `--color-plum`            | `#4A3552`      | `oklch(0.352 0.046 322.8)` | Primary ink, outlines, headings, high-contrast button text              |
| `--color-soft-plum`       | `#7A6685`      | `oklch(0.538 0.042 321.4)` | Secondary body copy, captions, muted metadata                           |
| `--color-error`           | `#B3264E`      | `oklch(0.495 0.175 12.5)`  | Validation errors, Low Stock / Sold Out alerts                          |

---

## 2. Typography

Self-hosted via `next/font/google` (`display: swap`):

- **Headings, Prices, Buttons & Badges (`--font-display`)**: **Fredoka** (weights 500, 600, 700). Rounded, friendly, unmistakable character.
- **Body & UI Prose (`--font-sans`)**: **Quicksand** (weights 500, 600, 700). Warm geometric sans-serif with generous x-height.

### Fluid Type Scale

- `text-display`: `clamp(2.25rem, 4vw + 1rem, 3.75rem)` / `line-height: 1.08`
- `text-h1`: `clamp(1.875rem, 3vw + 0.75rem, 2.75rem)` / `line-height: 1.15`
- `text-h2`: `clamp(1.5rem, 2vw + 0.5rem, 2.125rem)` / `line-height: 1.2`
- `text-h3`: `clamp(1.25rem, 1.2vw + 0.5rem, 1.5rem)` / `line-height: 1.28`
- `text-h4`: `1.125rem` / `line-height: 1.35`
- `text-body`: `1rem` (16px minimum on mobile) / `line-height: 1.6`
- `text-small`: `0.875rem` / `line-height: 1.5`
- `text-caption`: `0.75rem` / `line-height: 1.4`

---

## 3. Shape, Depth & Signature Sticker Elements

1. **Radii**: Cards & sheets use `rounded-card` (`24px`) and `rounded-feature` (`28px`). Buttons and chips use `rounded-pill` (`9999px`).
2. **Hard Offset Shadows (No blurry grey drop-shadows)**:
   - `--shadow-sticker`: `0 5px 0 var(--color-blush)`
   - `--shadow-sticker-plum`: `0 4px 0 var(--color-plum)`
   - `--shadow-sticker-pressed`: `0 1px 0 var(--color-plum)` (coupled with `translate-y-[3px]` on `:active` so buttons physically press down).
3. **Die-Cut Sticker Product Cards**:
   - Framed in a thick white border (`ring-4 ring-white`) with a 2px `plum/15` contour and a deterministic `-2deg` to `2deg` tilt that straightens and lifts on hover/focus-visible.
4. **Hang-Tag Price**:
   - Butter-yellow or blush tag with a punched string-hole circle, rendered in `Fredoka` bold.
5. **Washi Tape & Scalloped Dividers**:
   - Semi-translucent pastel tape strips with jagged edges pinning featured cards, plus SVG scalloped waves separating home page sections.
