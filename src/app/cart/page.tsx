import type { Metadata } from "next";
import { CartPageView } from "@/features/cart/cart-page-view";

export const metadata: Metadata = {
  title: "Your Gift Bag",
  description: "Review your pastel finds, add signature gift wrap, and proceed to checkout.",
};

export default function CartPage() {
  return <CartPageView />;
}
