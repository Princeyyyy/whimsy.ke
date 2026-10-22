import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic rotation between -2 and 2 degrees based on product slug or ID
 * so Sticker product cards have a playful organic tilt without hydration mismatches.
 */
export function getStickerTiltClass(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const tilts = [
    "motion-safe:-rotate-[1.25deg]",
    "motion-safe:-rotate-[0.75deg]",
    "motion-safe:rotate-[0.75deg]",
    "motion-safe:rotate-[1.25deg]",
  ] as const;
  const index = Math.abs(hash) % tilts.length;
  return tilts[index] ?? "motion-safe:rotate-[0.75deg]";
}
