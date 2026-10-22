import type { Metadata } from "next";
import { WishlistView } from "@/features/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Saved Wishes",
  description: "Your saved Whimsy.KE favourites ready for your gift bag.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
