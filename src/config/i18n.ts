/**
 * Centralised user-facing strings
 * Warm, professional Kenyan & light Swahili touches for a modern lifestyle brand.
 */
export const copy = {
  brand: {
    karibu: "Karibu to Whimsy.KE",
    asante: "Asante sana",
    pole: "Something went wrong on our end.",
    slogan: "Little things, big smiles.",
  },
  header: {
    searchPlaceholder: "Search bags, ceramics, journals, gifts...",
    wishlistLabel: "Saved items",
    bagLabel: "Shopping bag",
    skipToContent: "Skip to main content",
  },
  cart: {
    title: "Shopping Bag",
    emptyTitle: "Your shopping bag is empty",
    emptySubtitle: "Explore our collection of ceramics, bags, and curated lifestyle essentials.",
    emptyCta: "Explore the Collection",
    freeDeliveryUnlocked: "Complimentary delivery across Kenya unlocked",
    freeDeliveryProgress: (remainingFormatted: string) =>
      `Add ${remainingFormatted} more for complimentary delivery`,
    giftWrapLabel: "Add signature gift packaging & note card",
    orderNoteLabel: "Gift note or delivery instructions (optional)",
    orderNotePlaceholder: "Add a personalized message or delivery note...",
    checkoutCta: "Proceed to Checkout",
    viewFullBag: "View Shopping Bag",
    removedToast: (itemName: string) => `${itemName} removed from your bag`,
    undoAction: "Undo",
    addedToast: (itemName: string) => `${itemName} added to your bag`,
  },
  wishlist: {
    title: "Saved Items",
    emptyTitle: "No saved items yet",
    emptySubtitle: "Save items you love to revisit or purchase later.",
    emptyCta: "Browse Products",
  },
  shop: {
    emptyFilterTitle: "No products match your selected filters",
    emptyFilterSubtitle: "Try adjusting your filters or search keywords to see more items.",
    resetFilters: "Clear Filters",
    notifyMe: "Notify me when back in stock",
    notifiedSaved: "We will notify you when this item returns.",
  },
  checkout: {
    title: "Checkout",
    mpesaWaitingTitle: "Check your phone to enter your M-Pesa PIN",
    mpesaWaitingSubtitle: "An M-Pesa STK push prompt has been sent to your mobile device.",
    paymentFailedTitle: "M-Pesa payment prompt timed out or was cancelled.",
    paymentRetryCta: "Try Payment Again",
    orderSuccessTitle: "Asante! Your order has been placed successfully.",
  },
  errors: {
    notFoundTitle: "Page not found",
    notFoundSubtitle: "The page you are looking for doesn't exist or has moved.",
    genericErrorTitle: "Something went wrong",
    genericErrorSubtitle: "An unexpected error occurred while loading this view.",
    tryAgain: "Try Again",
    backHome: "Return to Home",
  },
} as const;
