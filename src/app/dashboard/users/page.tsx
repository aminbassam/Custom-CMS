import { Panel } from "@/components/ui/panel";
import { requireDashboardPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function DashboardUsersPage() {
  await requireDashboardPermission("users:view");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      roles: {
        include: {
          role: true
        }
      }
    }
  });

  return (
    <Panel>
      <h2 className="font-display text-2xl font-semibold text-ink">Dashboard users</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Roles</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-4 font-medium text-ink">{user.name ?? "Unnamed"}</td>
                <td className="py-4 text-slate-600">{user.email}</td>
                <td className="py-4 text-slate-600">{user.roles.map((userRole) => userRole.role.name).join(", ") || "None"}</td>
                <td className="py-4 capitalize text-slate-600">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
