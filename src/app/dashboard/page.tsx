import { requireDashboardPermission } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { Panel } from "@/components/ui/panel";

export default async function DashboardHomePage() {
  await requireDashboardPermission("dashboard:view");

  const [submissionCount, userCount, exportCount, activityCount] = await Promise.all([
    prisma.formSubmission.count().catch(() => 0),
    prisma.user.count().catch(() => 0),
    prisma.export.count().catch(() => 0),
    prisma.activityLog.count().catch(() => 0)
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        { label: "Form submissions", value: submissionCount },
        { label: "Dashboard users", value: userCount },
        { label: "Exports", value: exportCount },
        { label: "Activity events", value: activityCount }
      ].map((metric) => (
        <Panel key={metric.label}>
          <p className="text-sm text-slate-500">{metric.label}</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">{metric.value}</p>
        </Panel>
      ))}
    </div>
  );
}
