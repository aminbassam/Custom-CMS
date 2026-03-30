import { HelperPage } from "@/components/dashboard/helper-page";
import { requireDashboardPermission } from "@/lib/auth/session";

export default async function DashboardNewUserPage() {
  await requireDashboardPermission("users:manage");

  return (
    <HelperPage
      title="Create User"
      description="Reserved for an invitation-based user creation flow with role assignment, audit logging, and password setup."
      contentfulHint={false}
      requireContentHelperPermission={false}
    />
  );
}
