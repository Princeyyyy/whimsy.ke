import { siteConfig } from "@/config/site";

const kesFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Formats an integer amount in KES consistently across the app (e.g. "KES 1,800")
 */
export function formatKES(amount: number): string {
  // Ensure consistent "KES 1,800" spacing across environments
  const formatted = kesFormatter.format(Math.round(amount));
  return formatted.replace(/^Ksh\s?/i, "KES ").replace(/^KES\s?/, "KES ");
}

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return dateFormatter.format(date);
}

/**
 * Normalises Kenyan phone numbers to +2547XXXXXXXX or +2541XXXXXXXX
 */
export function normalizeKenyanPhone(input: string): string {
  const digits = input.replace(/[\s\-()]/g, "");
  if (digits.startsWith("+254") && digits.length === 13) {
    return digits;
  }
  if (digits.startsWith("254") && digits.length === 12) {
    return `+${digits}`;
  }
  if ((digits.startsWith("07") || digits.startsWith("01")) && digits.length === 10) {
    return `+254${digits.slice(1)}`;
  }
  if ((digits.startsWith("7") || digits.startsWith("1")) && digits.length === 9) {
    return `+254${digits}`;
  }
  return input.trim();
}

export function isValidKenyanPhone(input: string): boolean {
  const normalized = normalizeKenyanPhone(input);
  return /^\+254[17]\d{8}$/.test(normalized);
}
