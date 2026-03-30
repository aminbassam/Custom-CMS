import { Panel } from "@/components/ui/panel";
import { requireDashboardPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function DashboardActivityLogsPage() {
  await requireDashboardPermission("activity:view");

  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      actorUser: true
    }
  });

  return (
    <Panel>
      <h2 className="font-display text-2xl font-semibold text-ink">Activity logs</h2>
      <div className="mt-6 space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-medium text-ink">{log.summary}</p>
            <p className="mt-1 text-sm text-slate-500">
              {log.actorUser?.name ?? log.actorUser?.email ?? "System"} • {log.entityType} • {log.createdAt.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
