import { Panel } from "@/components/ui/panel";
import { requireDashboardPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function DashboardRolesPage() {
  await requireDashboardPermission("roles:manage");

  const roles = await prisma.role.findMany({
    include: {
      rolePermissions: {
        include: {
          permission: true
        }
      }
    }
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {roles.map((role) => (
        <Panel key={role.id}>
          <h2 className="font-display text-2xl font-semibold text-ink">{role.name}</h2>
          <p className="mt-2 text-sm text-slate-600">{role.description ?? "No description."}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {role.rolePermissions.map((item) => (
              <span key={item.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {item.permission.resource}:{item.permission.action}
              </span>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}
