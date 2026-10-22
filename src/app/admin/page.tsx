import type { Metadata } from "next";
import { AdminDashboardView } from "@/features/catalog/admin-dashboard-view";

export const metadata: Metadata = {
  title: "Demo Studio Admin Dashboard",
  description: "Read-only stakeholder demo dashboard showing sales, orders, and low-stock items.",
};

export default function AdminPage() {
  return <AdminDashboardView />;
}
