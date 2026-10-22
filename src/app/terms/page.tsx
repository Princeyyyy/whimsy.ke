import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service and demo notice for Whimsy.KE.",
};

export default function TermsPage() {
  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="lavender">Terms & Conditions</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">Terms of Service</h1>
          <p className="text-soft-plum text-small mt-1">
            Last updated: October 2026 · {siteConfig.demoNotice}
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <article className="rounded-feature border-plum shadow-sticker space-y-4 border-2 bg-white p-6 sm:p-8">
          <h2 className="font-display text-plum text-h3 font-bold">
            1. Proof of Concept Demonstration
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            <strong>{siteConfig.demoNotice}</strong> All prices in Kenyan Shillings (KES), M-Pesa
            prompts, and delivery timelines shown on this demonstration environment are for
            stakeholder evaluation.
          </p>

          <h2 className="font-display text-plum text-h3 pt-2 font-bold">
            2. Pricing & Availability
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            All prices are displayed in KES inclusive of VAT where applicable. Orders exceeding KES
            3,000 qualify for complimentary standard delivery across Kenya.
          </p>

          <h2 className="font-display text-plum text-h3 pt-2 font-bold">3. Governing Law</h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            These terms are governed by the laws of the Republic of Kenya.
          </p>
        </article>
      </div>
    </div>
  );
}
