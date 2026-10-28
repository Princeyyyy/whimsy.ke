"use client";

import * as React from "react";
import Link from "next/link";
import { copy } from "@/config/i18n";
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[Whimsy Error Boundary]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <div className="rounded-feature border-line-strong shadow-sticker-plum-lg flex flex-col items-center border bg-white p-8 sm:p-10">
        <BrandGlyph mood="confused" size="xl" />
        <h1 className="font-display text-plum text-h2 mt-4 font-bold">
          {copy.errors.genericErrorTitle}
        </h1>
        <p className="text-soft-plum text-body mt-2">{copy.errors.genericErrorSubtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="primary" size="md" onClick={reset}>
            {copy.errors.tryAgain}
          </Button>
          <Button asChild variant="secondary" size="md">
            <Link href="/">{copy.errors.backHome}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
