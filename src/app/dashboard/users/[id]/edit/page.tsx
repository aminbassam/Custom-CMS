import { HelperPage } from "@/components/dashboard/helper-page";
import { requireDashboardPermission } from "@/lib/auth/session";

export default async function DashboardEditUserPage({ params }: { params: Promise<{ id: string }> }) {
  await requireDashboardPermission("users:manage");
  const { id } = await params;
  return (
    <HelperPage
      title={`Edit User ${id}`}
      description="Reserved for a user management surface covering status changes, role assignment, and access reviews."
      contentfulHint={false}
      requireContentHelperPermission={false}
    />
  );
}
