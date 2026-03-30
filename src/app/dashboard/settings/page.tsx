import { HelperPage } from "@/components/dashboard/helper-page";
import { requireDashboardPermission } from "@/lib/auth/session";

export default async function DashboardSettingsPage() {
  await requireDashboardPermission("settings:manage");
  return (
    <HelperPage
      title="Settings"
      description="Global operational settings and helper controls for site configuration, notifications, integrations, and environment-aware tooling."
      requireContentHelperPermission={false}
    />
  );
}
