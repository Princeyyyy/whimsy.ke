import { describe, expect, it } from "vitest";
import { formatKES, isValidKenyanPhone, normalizeKenyanPhone } from "@/lib/formatters";
import { getCategories, getProductBySlug, getProducts } from "@/lib/repositories";
import { calculateBagTotals } from "@/features/cart/store";

describe("Whimsy.KE Formatters & Kenyan Phone Validation", () => {
  it("formats KES prices consistently", () => {
    expect(formatKES(1800)).toBe("KES 1,800");
    expect(formatKES(550)).toBe("KES 550");
  });

  it("normalizes Kenyan phone numbers accurately", () => {
    expect(normalizeKenyanPhone("0712 345 678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("254712345678")).toBe("+254712345678");
    expect(normalizeKenyanPhone("+254 110 222 333")).toBe("+254110222333");
    expect(isValidKenyanPhone("0712345678")).toBe(true);
    expect(isValidKenyanPhone("0112345678")).toBe(true);
    expect(isValidKenyanPhone("12345")).toBe(false);
  });
});

describe("Whimsy.KE Product Catalog Repository", () => {
  it("contains all 6 required categories", () => {
    const categories = getCategories().map((c) => c.name);
    expect(categories).toEqual([
      "Bags",
      "Home & Tableware",
      "On the Go",
      "Paper Goods",
      "Beauty & Hobbies",
      "Gifting",
    ]);
  });

  it("keeps the 15 exact template products and prices intact", () => {
    const templateItems: [string, string, number][] = [
      ["blush-shoulder-bag", "Blush Shoulder Bag", 1800],
      ["lavender-mini-tote", "Lavender Mini Tote", 1200],
      ["heart-charm-pouch", "Heart Charm Pouch", 550],
      ["heart-print-ceramic-plate", "Heart-Print Ceramic Plate", 900],
      ["pastel-ceramic-mug", "Pastel Ceramic Mug", 650],
      ["polka-dot-wall-frame", "Polka Dot Wall Frame", 750],
      ["heart-print-bedsheet-set", "Heart Print Bedsheet Set", 2500],
      ["cute-water-bottle", "Cute Water Bottle", 800],
      ["fluffy-house-shoes", "Fluffy House Shoes", 1000],
      ["heart-phone-case", "Heart Phone Case", 700],
      ["dotty-journal", "Dotty Journal", 450],
      ["colouring-book", "Colouring Book", 350],
      ["makeup-pouch", "Makeup Pouch", 600],
      ["beadazzling-kit", "Beadazzling Kit", 950],
      ["little-joy-gift-bundle", "Little Joy Gift Bundle", 1900],
    ];

    for (const [slug, expectedName, expectedPrice] of templateItems) {
      const product = getProductBySlug(slug);
      expect(product).toBeDefined();
      expect(product?.name).toBe(expectedName);
      expect(product?.price).toBe(expectedPrice);
    }
  });

  it("places sold-out products last when listing catalog items", () => {
    const products = getProducts();
    expect(products.length).toBe(30);
    const lastProduct = products[products.length - 1];
    expect(lastProduct?.stock).toBe(0);
  });
});

describe("Whimsy.KE Bag Totals & Free Delivery Threshold", () => {
  it("calculates free delivery over KES 3,000 and applies WHIMSY10 promo code", () => {
    const totals = calculateBagTotals(
      [
        {
          key: "blush-shoulder-bag::Blush Pink",
          slug: "blush-shoulder-bag",
          name: "Blush Shoulder Bag",
          price: 1800,
          quantity: 2,
          illustration: "shoulder-bag",
          backdrop: "blush",
        },
      ],
      true,
      "WHIMSY10",
      250,
    );

    expect(totals.subtotal).toBe(3600);
    expect(totals.qualifiesForFreeDelivery).toBe(true);
    expect(totals.effectiveDeliveryFee).toBe(0);
    expect(totals.discountAmount).toBe(360);
    expect(totals.wrapCost).toBe(250);
    expect(totals.total).toBe(3600 - 360 + 250);
  });
});
