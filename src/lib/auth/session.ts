import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { assertPermission, type PermissionKey } from "@/lib/auth/rbac";

export async function requireDashboardUser() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/dashboard/login");
  }

  return session.user;
}

export async function requireDashboardPermission(permission: PermissionKey) {
  const user = await requireDashboardUser();
  await assertPermission(user.id, permission);
  return user;
}
