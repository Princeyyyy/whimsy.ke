import type { Metadata } from "next";
import { GiftBuilderView } from "@/features/gift-builder/gift-builder-view";

export const metadata: Metadata = {
  title: "Custom Gift Box Builder (Save 10%)",
  description:
    "Build your own custom Whimsy.KE pastel gift bundle in 3 steps: pick a vessel, add 1 or 2 cute extras, and choose signature bow wrapping.",
};

export default function GiftBuilderPage() {
  return <GiftBuilderView />;
}
