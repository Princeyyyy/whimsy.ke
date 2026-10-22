/**
 * Centralised user-facing strings (English now, Swahili-ready later)
 * Incorporates warm Kenyan & light Swahili microcopy touches (Karibu, Asante, Pole).
 */
export const copy = {
  brand: {
    karibu: "Karibu to Whimsy.KE!",
    asante: "Asante sana!",
    pole: "Pole! Something went a tiny bit sideways.",
    slogan: "Little things, big smiles.",
  },
  header: {
    searchPlaceholder: "Search cute mugs, bags, journals...",
    wishlistLabel: "Saved favourites",
    bagLabel: "Your gift bag",
    skipToContent: "Skip to main content",
  },
  cart: {
    title: "Your Gift Bag",
    emptyTitle: "Your bag is feeling light. Add something cute.",
    emptySubtitle: "Explore our pastel home goods, bags, and sweet little treats.",
    emptyCta: "Explore Cute Things",
    freeDeliveryUnlocked: "Hooray! You've unlocked FREE delivery across Kenya! 🎉",
    freeDeliveryProgress: (remainingFormatted: string) =>
      `Add ${remainingFormatted} more for free delivery!`,
    giftWrapLabel: "Add signature bow gift wrap & tissue",
    orderNoteLabel: "Add a sweet gift note or delivery instruction (optional)",
    orderNotePlaceholder: "e.g., Happy Birthday Wanjiru! With love from Amani 💕",
    checkoutCta: "Proceed to Checkout",
    viewFullBag: "View Full Gift Bag",
    removedToast: (itemName: string) => `Removed ${itemName} from your bag`,
    undoAction: "Undo",
    addedToast: (itemName: string) => `Tucked ${itemName} into your gift bag! 🎀`,
  },
  wishlist: {
    title: "Your Saved Wishes",
    emptyTitle: "No wishes saved just yet!",
    emptySubtitle: "Tap the little heart on anything that makes you smile to save it here.",
    emptyCta: "Discover Favourites",
  },
  shop: {
    emptyFilterTitle: "Pole! No cute finds match those exact filters.",
    emptyFilterSubtitle: "Try clearing a filter or two to see more pastel goodness.",
    resetFilters: "Reset All Filters",
    notifyMe: "Notify me when back",
    notifiedSaved: "We'll ping you when it's back! ✨",
  },
  checkout: {
    title: "Checkout",
    mpesaWaitingTitle: "Check your phone and enter your M-Pesa PIN",
    mpesaWaitingSubtitle:
      "We've sent a simulated STK push to your phone. Hang tight for just a moment...",
    paymentFailedTitle: "Pole! The M-Pesa prompt timed out or was cancelled.",
    paymentRetryCta: "Try Payment Again",
    orderSuccessTitle: "Asante sana! Your order is confirmed!",
  },
  errors: {
    notFoundTitle: "Pole! This sticker peeled off the page.",
    notFoundSubtitle:
      "We couldn't find the page you were looking for, but plenty of cute things are waiting at home.",
    genericErrorTitle: "Pole! Our bow got a little tangled.",
    genericErrorSubtitle: "Something unexpected happened while loading this view.",
    tryAgain: "Try Again",
    backHome: "Back to Home",
  },
} as const;
