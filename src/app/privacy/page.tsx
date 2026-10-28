import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Whimsy.KE handles your data in accordance with the Kenya Data Protection Act.",
};

export default function PrivacyPage() {
  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="lavender">Legal & Privacy</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">Privacy Policy</h1>
          <p className="text-soft-plum text-small mt-1">
            Last updated: October 2026 · {siteConfig.demoNotice}
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <article className="rounded-feature border-line-strong shadow-sticker space-y-4 border bg-white p-6 sm:p-8">
          <h2 className="font-display text-plum text-h3 font-bold">
            1. Demo Store Notice (Local Browser Storage Only)
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            This website is an interactive Proof of Concept for <strong>{siteConfig.name}</strong>.
            All cart items, saved wishes, newsletter emails, and demo checkout orders are stored
            strictly in your own browser&apos;s <code>localStorage</code> and are never transmitted
            to an external server or third party.
          </p>

          <h2 className="font-display text-plum text-h3 pt-2 font-bold">
            2. Production Privacy Commitment (Kenya Data Protection Act)
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            When {siteConfig.name} launches for live commercial orders, we only collect your name,
            Kenyan phone number, and delivery landmark to fulfil your order via Safaricom M-Pesa and
            our Nairobi courier riders. We never sell or rent customer details.
          </p>

          <h2 className="font-display text-plum text-h3 pt-2 font-bold">
            3. Contact Our Data Team
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            For any questions, reach us at <strong>{siteConfig.contact.email}</strong> or{" "}
            <strong>{siteConfig.contact.phoneDisplay}</strong>.
          </p>
        </article>
      </div>
    </div>
  );
}
