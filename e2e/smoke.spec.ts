import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Whimsy.KE Smoke & Accessibility Suite", () => {
  test("Home, Shop, Product, and Checkout pages render and pass axe accessibility checks", async ({
    page,
  }) => {
    // 1. Home page
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Little things/i })).toBeVisible();

    const homeAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(homeAxe.violations).toEqual([]);

    // 2. Shop page
    await page.goto("/shop");
    await expect(page.getByRole("heading", { name: /Shop All Cute Goods/i })).toBeVisible();

    const shopAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(shopAxe.violations).toEqual([]);

    // 3. Product page + Add to Bag
    await page.goto("/products/blush-shoulder-bag");
    await expect(page.getByRole("heading", { name: "Blush Shoulder Bag" })).toBeVisible();

    const productAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(productAxe.violations).toEqual([]);

    await page
      .getByRole("button", { name: /Add to Gift Bag/i })
      .first()
      .click();

    // 4. Checkout page
    await page.goto("/checkout");
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

    const checkoutAxe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(checkoutAxe.violations).toEqual([]);
  });
});
