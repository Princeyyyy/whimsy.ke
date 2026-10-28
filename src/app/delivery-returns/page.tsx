import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatKES } from "@/lib/formatters";
import { getDeliveryZones } from "@/lib/repositories";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Delivery Zones, Fees & Returns Policy",
  description:
    "Nairobi same-day rider fees, upcountry courier rates across Kenya, free delivery over KES 3,000, and our 14-day return policy.",
};

export default function DeliveryReturnsPage() {
  const zones = getDeliveryZones();

  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="new">
            Free Delivery Over {formatKES(siteConfig.freeDeliveryThreshold)}
          </Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">
            Delivery Zones & 14-Day Easy Returns
          </h1>
          <p className="text-soft-plum text-body mt-1 max-w-2xl">
            Every parcel is dispatched from our Kilimani studio wrapped in honeycomb cushioning and
            pastel tissue paper.
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-4xl space-y-10 px-4 sm:px-6">
        <section className="rounded-feature border-line-strong shadow-sticker overflow-hidden border bg-white p-6 sm:p-8">
          <h2 className="font-display text-plum text-h2 mb-4 font-bold">
            Kenya Delivery Zones & Rates
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-blush text-plum font-display border-b">
                  <th className="py-3 pr-4">Zone / Area</th>
                  <th className="px-4 py-3">Fee</th>
                  <th className="px-4 py-3">Estimated Arrival</th>
                  <th className="py-3 pl-4">Cash on Delivery</th>
                </tr>
              </thead>
              <tbody className="divide-blush divide-y">
                {zones.map((zone) => (
                  <tr key={zone.id}>
                    <td className="text-plum py-3 pr-4 font-semibold">{zone.name}</td>
                    <td className="font-display text-plum px-4 py-3 font-bold">
                      {formatKES(zone.fee)}
                    </td>
                    <td className="text-soft-plum px-4 py-3">{zone.eta}</td>
                    <td className="py-3 pl-4">
                      {zone.codAvailable ? (
                        <Badge variant="new">Available</Badge>
                      ) : (
                        <Badge variant="outline">Prepaid M-Pesa</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-feature border-line-strong shadow-sticker space-y-4 border bg-white p-6 sm:p-8">
          <h2 className="font-display text-plum text-h2 font-bold">
            14-Day Easy Returns & Safe Ceramic Guarantee
          </h2>
          <p className="text-plum/90 text-body max-w-[68ch]">
            We want every Whimsy.KE parcel to spark a huge smile. If an item isn&apos;t quite right,
            you can return or exchange unused items in their original packaging within{" "}
            <strong>14 days</strong> of delivery.
          </p>
          <p className="text-plum/90 text-body max-w-[68ch]">
            <strong>Chipped Ceramic Guarantee:</strong> In the rare event that a ceramic mug, plate,
            bowl, or teapot arrives damaged in transit, send a photo to our WhatsApp (
            {siteConfig.contact.phoneDisplay}) within 24 hours and we will dispatch a brand-new
            replacement at zero cost to you.
          </p>
        </section>
      </div>
    </div>
  );
}
