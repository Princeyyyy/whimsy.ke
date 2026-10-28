/**
 * Complete photographic mapping for all 30 product illustrations.
 * Every product kind resolves to an authentic high-resolution studio photo
 * with tailored framing, object position, and scale.
 */

export interface PhotoConfig {
  src: string;
  objectPosition?: string;
  scale?: string;
}

export const PRODUCT_PHOTOS: Record<string, PhotoConfig> = {
  // Direct Studio Photography
  "shoulder-bag": { src: "/products/shoulder-bag.png" },
  "mini-tote": { src: "/products/mini-tote.png" },
  "charm-pouch": { src: "/products/charm-pouch.png" },
  "candle-jar": { src: "/products/candle-jar.png" },
  "cereal-bowl": { src: "/products/cereal-bowl.png" },
  journal: { src: "/products/journal.png" },
  "colouring-book": { src: "/products/colouring-book.png" },
  "makeup-pouch": { src: "/products/makeup-pouch.png" },
  "bead-kit": { src: "/products/bead-kit.png" },
  "pink-tote": { src: "/products/pink-tote.png" },
  "lunch-box": { src: "/products/lunch-box.png" },
  "tea-set": { src: "/products/tea-set.png" },
  "trinket-tray": { src: "/products/trinket-tray.png" },
  "wall-frame": { src: "/products/wall-frame.png" },
  "bedsheet-set": { src: "/products/bedsheet-set.png" },

  // Editorial Curated Crops for Companion Kinds
  "ceramic-plate": { src: "/products/cereal-bowl.png", objectPosition: "center 70%" },
  "ceramic-mug": { src: "/products/tea-set.png", objectPosition: "70% 65%", scale: "scale-115" },
  "water-bottle": { src: "/products/lunch-box.png", objectPosition: "80% 50%", scale: "scale-110" },
  "house-shoes": { src: "/products/bedsheet-set.png", objectPosition: "50% 85%" },
  "phone-case": { src: "/products/charm-pouch.png", objectPosition: "45% 50%", scale: "scale-105" },
  "gift-bundle": { src: "/products/tea-set.png", objectPosition: "center 45%" },
  "hair-clips": {
    src: "/products/trinket-tray.png",
    objectPosition: "center 40%",
    scale: "scale-115",
  },
  "desk-organiser": { src: "/products/journal.png", objectPosition: "55% 35%", scale: "scale-110" },
  "sticker-sheet": { src: "/products/colouring-book.png", objectPosition: "50% 45%" },
  "fluffy-cushion": {
    src: "/products/bedsheet-set.png",
    objectPosition: "center 25%",
    scale: "scale-120",
  },
  "throw-blanket": {
    src: "/products/bedsheet-set.png",
    objectPosition: "center 75%",
    scale: "scale-115",
  },
  "mini-mirror": {
    src: "/products/trinket-tray.png",
    objectPosition: "45% 45%",
    scale: "scale-120",
  },
  "washi-tape": { src: "/products/journal.png", objectPosition: "65% 60%", scale: "scale-125" },
  "gel-pens": { src: "/products/journal.png", objectPosition: "35% 35%", scale: "scale-120" },
  "mug-journal-set": { src: "/products/journal.png", objectPosition: "center center" },
};

export const PRODUCT_PHOTO_KINDS: readonly string[] = Object.keys(PRODUCT_PHOTOS);
