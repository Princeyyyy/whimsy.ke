import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/repositories";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Nairobi same-day delivery, M-Pesa STK checkout, gift wrapping, and returns.",
};

export default function FaqPage() {
  const faqs = getFaqs();

  return (
    <div className="pb-16">
      <section className="bg-blush/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <Badge variant="bestseller">Everything You Need to Know ✨</Badge>
          <h1 className="font-display text-plum text-h1 mt-2 font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-soft-plum text-body mt-1 max-w-xl">
            From M-Pesa payments to ceramic packaging and same-day Nairobi riders—here are all the
            details.
          </p>
        </div>
      </section>
      <ScallopDivider fill="blush" flip />

      <div className="mx-auto mt-10 max-w-3xl space-y-6 px-4 sm:px-6">
        <Accordion type="single" collapsible defaultValue={faqs[0]?.id}>
          {faqs.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>
                <span>
                  <Badge variant="lavender" className="mr-2.5 text-[10px]">
                    {item.category}
                  </Badge>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="rounded-card border-plum bg-butter/50 border-2 p-6 text-center shadow-[0_4px_0_#4A3552]">
          <h2 className="font-display text-plum text-h3 font-bold">Still have a question?</h2>
          <p className="text-plum/85 text-small mt-1">
            Message our friendly team in Kilimani and we&apos;ll help right away.
          </p>
          <Button asChild variant="primary" size="md" className="mt-4">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
