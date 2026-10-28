import Link from "next/link";
import { copy } from "@/config/i18n";
import { BrandGlyph } from "@/illustrations/brand-glyph";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <div className="rounded-feature border-line-strong shadow-sticker-plum-lg flex flex-col items-center border bg-white p-8 sm:p-10">
        <BrandGlyph mood="confused" size="xl" />
        <span className="font-display border-line-strong bg-butter text-plum mt-4 rounded-full border px-3.5 py-0.5 text-xs font-bold">
          404 · Page Not Found
        </span>
        <h1 className="font-display text-plum text-h2 mt-3 font-bold">
          {copy.errors.notFoundTitle}
        </h1>
        <p className="text-soft-plum text-body mt-2">{copy.errors.notFoundSubtitle}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href="/">{copy.errors.backHome}</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/shop">Explore Collection</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
