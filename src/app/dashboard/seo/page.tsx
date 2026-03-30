import { HelperPage } from "@/components/dashboard/helper-page";
import { requireDashboardPermission } from "@/lib/auth/session";

export default async function DashboardSeoPage() {
  await requireDashboardPermission("settings:manage");
  return (
    <HelperPage
      title="SEO"
      description="Review route-level SEO posture, Contentful field completeness, and optional database overrides for exceptional cases."
      requireContentHelperPermission={false}
    />
  );
}
