"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Rotating Announcement Bar with fixed height (min-h-10) so zero layout shift occurs.
 */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % siteConfig.announcements.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      role="region"
      aria-label="Store announcements"
      className="border-line-strong bg-butter text-plum relative z-40 flex min-h-10 w-full items-center justify-center border-b px-4 py-1.5 text-center"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
        <Sparkles className="text-plum size-4 shrink-0" aria-hidden="true" />
        <p
          aria-live="polite"
          className="font-display text-xs font-semibold tracking-wide sm:text-sm"
        >
          {siteConfig.announcements[index]}
        </p>
      </div>
    </div>
  );
}
