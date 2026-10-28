import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic rotation between -2 and 2 degrees based on product slug or ID
 * so Sticker product cards have a playful organic tilt without hydration mismatches.
 */
/** Retained for API stability; the refined system no longer tilts cards. */
export function getStickerTiltClass(_seed: string): string {
  return "";
}
