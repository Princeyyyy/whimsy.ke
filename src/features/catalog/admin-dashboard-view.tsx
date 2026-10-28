"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, BarChart3, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { formatDate, formatKES } from "@/lib/formatters";
import { getProducts } from "@/lib/repositories";
import { useHydrated, useShopStore } from "@/features/cart/store";
import { ProductIllustration } from "@/illustrations/product-illustrations";
import { ScallopDivider } from "@/illustrations/scallop-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const WEEKLY_SALES = [
  { day: "Mon", revenue: 18400 },
  { day: "Tue", revenue: 24200 },
  { day: "Wed", revenue: 21900 },
  { day: "Thu", revenue: 31500 },
  { day: "Fri", revenue: 42800 },
  { day: "Sat", revenue: 54600 },
  { day: "Sun", revenue: 38900 },
] as const;

export function AdminDashboardView() {
  const hydrated = useHydrated();
  const orders = useShopStore((s) => s.orders);
  const allProducts = React.useMemo(() => getProducts(), []);
  const lowAndOutStock = React.useMemo(
    () => allProducts.filter((p) => p.stock <= 4),
    [allProducts],
  );

  const storedOrders = hydrated ? orders : [];
  const maxDailyRevenue = Math.max(...WEEKLY_SALES.map((d) => d.revenue));

  return (
    <div className="pb-16">
      <section className="bg-lavender/55 border-plum/15 border-b py-10">
        <div className="mx-auto max-w-(--spacing-container) px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="bestseller">Read-Only Stakeholder Demo</Badge>
              <h1 className="font-display text-plum text-h1 mt-2 font-bold">
                Whimsy.KE Studio Dashboard
              </h1>
              <p className="text-soft-plum text-body mt-1">
                Mock weekly sales, live local checkout orders, and low-stock alerts styled with our
                Sticker Sheet tokens.
              </p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/shop">← Back to Storefront</Link>
            </Button>
          </div>
        </div>
      </section>
      <ScallopDivider fill="lavender" flip />

      <div className="mx-auto mt-8 max-w-(--spacing-container) space-y-8 px-4 sm:px-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-card border-line-strong shadow-sticker border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-soft-plum text-xs font-bold uppercase">7-Day Demo Revenue</span>
              <TrendingUp className="text-plum size-5" />
            </div>
            <p className="font-display text-plum mt-2 text-2xl font-bold">{formatKES(232300)}</p>
            <span className="text-plum bg-mint mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold">
              +18.4% vs last week
            </span>
          </div>

          <div className="rounded-card border-line-strong shadow-sticker border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-soft-plum text-xs font-bold uppercase">
                Active Local Orders
              </span>
              <ShoppingBag className="text-plum size-5" />
            </div>
            <p className="font-display text-plum mt-2 text-2xl font-bold">{storedOrders.length}</p>
            <span className="text-soft-plum mt-2 block text-xs font-semibold">
              Includes your live test checkouts
            </span>
          </div>

          <div className="rounded-card border-line-strong shadow-sticker border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-soft-plum text-xs font-bold uppercase">Catalog SKUs</span>
              <Package className="text-plum size-5" />
            </div>
            <p className="font-display text-plum mt-2 text-2xl font-bold">
              {allProducts.length} Active SKUs
            </p>
            <span className="text-soft-plum mt-2 block text-xs font-semibold">
              Across 6 departments
            </span>
          </div>

          <div className="rounded-card border-line-strong shadow-sticker border bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-soft-plum text-xs font-bold uppercase">Restock Alerts</span>
              <AlertTriangle className="text-error size-5" />
            </div>
            <p className="font-display text-error mt-2 text-2xl font-bold">
              {lowAndOutStock.length} Items
            </p>
            <span className="text-soft-plum mt-2 block text-xs font-semibold">
              Low stock (≤4) or sold out
            </span>
          </div>
        </div>

        {/* Weekly Sales Bar Chart + Low Stock Alerts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="rounded-feature border-line-strong shadow-sticker border bg-white p-6 lg:col-span-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-plum flex items-center gap-2 text-lg font-bold">
                  <BarChart3 className="size-5" />
                  <span>Weekly Nairobi & Courier Sales (KES)</span>
                </h2>
                <p className="text-soft-plum text-xs">
                  Simulated daily order volume across M-Pesa & COD
                </p>
              </div>
              <Badge variant="new">M-Pesa 78% · COD 22%</Badge>
            </div>

            <div className="grid h-56 grid-cols-7 items-end gap-3 pt-6">
              {WEEKLY_SALES.map((item) => {
                const heightPct = Math.round((item.revenue / maxDailyRevenue) * 100);
                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-col items-center justify-end gap-2"
                  >
                    <span className="font-display text-plum text-[10px] font-bold">
                      {(item.revenue / 1000).toFixed(1)}k
                    </span>
                    <div
                      className="border-line-strong bg-bubblegum hover:bg-butter w-full rounded-t-xl border transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="font-display text-soft-plum text-xs font-bold">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Low Stock & Sold Out List */}
          <section className="rounded-feature border-line-strong shadow-sticker border bg-white p-6 lg:col-span-5">
            <h2 className="font-display text-plum mb-4 text-lg font-bold">
              Low-Stock & Sold-Out Watchlist
            </h2>
            <ul className="divide-blush divide-y">
              {lowAndOutStock.map((item) => (
                <li key={item.slug} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-11 shrink-0">
                      <ProductIllustration
                        kind={item.illustration}
                        backdrop={item.backdrop}
                        alt={item.name}
                        className="aspect-square rounded-xl"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-display text-plum hover:text-bubblegum-deep text-sm font-bold"
                      >
                        {item.name}
                      </Link>
                      <p className="text-soft-plum text-xs">{item.category}</p>
                    </div>
                  </div>
                  {item.stock === 0 ? (
                    <Badge variant="soldOut">Sold Out (0)</Badge>
                  ) : (
                    <Badge variant="lowStock">{item.stock} left</Badge>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Recent Local Orders Table */}
        <section className="rounded-feature border-line-strong shadow-sticker border bg-white p-6">
          <h2 className="font-display text-plum mb-4 text-lg font-bold">
            Recent Orders (Persisted in Browser)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-blush text-plum font-display border-b">
                  <th className="py-3 pr-4">Order #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="py-3 pl-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-blush divide-y">
                {storedOrders.map((o) => (
                  <tr key={o.orderNumber}>
                    <td className="font-display text-plum py-3 pr-4 font-bold">
                      <Link
                        href={`/track?order=${encodeURIComponent(o.orderNumber)}&phone=${encodeURIComponent(o.phone)}`}
                        className="hover:text-bubblegum-deep font-semibold transition-colors"
                      >
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-plum block font-semibold">{o.customerName}</span>
                      <span className="text-soft-plum text-xs">{formatDate(o.createdAt)}</span>
                    </td>
                    <td className="text-soft-plum px-4 py-3 text-xs">{o.zoneName}</td>
                    <td className="px-4 py-3 text-xs font-bold uppercase">{o.paymentMethod}</td>
                    <td className="font-display text-plum px-4 py-3 font-bold">
                      {formatKES(o.total)}
                    </td>
                    <td className="py-3 pl-4">
                      <Badge variant="new">{o.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
