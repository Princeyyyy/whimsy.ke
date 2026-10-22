import type { Metadata } from "next";
import { ContactView } from "@/features/catalog/contact-view";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Whimsy.KE via WhatsApp, email, or our Kilimani pickup studio.",
};

export default function ContactPage() {
  return <ContactView />;
}
