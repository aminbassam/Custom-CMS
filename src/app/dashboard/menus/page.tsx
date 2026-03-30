import { HelperPage } from "@/components/dashboard/helper-page";
import { requireDashboardPermission } from "@/lib/auth/session";

export default async function DashboardMenusPage() {
  await requireDashboardPermission("settings:manage");
  return (
    <HelperPage
      title="Menus"
      description="Menu helper for visualizing navigation trees and validating linked content without duplicating canonical menu editing."
      requireContentHelperPermission={false}
    />
  );
}
