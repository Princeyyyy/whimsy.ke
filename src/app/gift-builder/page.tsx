import type { Metadata } from "next";
import { GiftBuilderView } from "@/features/gift-builder/gift-builder-view";

export const metadata: Metadata = {
  title: "Custom Gift Box Builder (Save 10%)",
  description:
    "Build your own custom Whimsy.KE gift set in three steps: select a foundation vessel, add companion essentials, and choose bespoke wrapping.",
};

export default function GiftBuilderPage() {
  return <GiftBuilderView />;
}
