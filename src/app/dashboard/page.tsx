import { requireDashboardPermission } from "@/lib/auth/session";
import { Panel } from "@/components/ui/panel";
import { getDashboardOverviewData } from "@/lib/dashboard-data";

export default async function DashboardHomePage() {
  await requireDashboardPermission("dashboard:view");

  const metrics = await getDashboardOverviewData();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Form submissions", value: metrics.submissions, tone: "from-sky-500 to-cyan-500" },
          { label: "Dashboard users", value: metrics.users, tone: "from-emerald-500 to-teal-500" },
          { label: "Exports", value: metrics.exports, tone: "from-amber-500 to-orange-500" },
          { label: "Activity events", value: metrics.activity, tone: "from-fuchsia-500 to-pink-500" }
        ].map((metric) => (
          <Panel key={metric.label} className="relative overflow-hidden">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${metric.tone}`} />
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-ink">{metric.value}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Traffic Snapshot</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Weekly momentum</h2>
            </div>
            <p className="text-sm text-slate-500">Prototype-inspired local dashboard view</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Page views</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{metrics.pageViews.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Visitors</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{metrics.visitors.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Conversions</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{metrics.conversions}</p>
            </div>
          </div>
          <div className="mt-8 flex items-end gap-3">
            {[32, 45, 60, 48, 72, 66, 78].map((height, index) => (
              <div key={index} className="flex-1">
                <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-cyan-400" style={{ height: `${height * 2}px` }} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Quick Actions</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Where teams usually go next</h2>
          <div className="mt-6 space-y-3">
            {[
              { label: "Review new submissions", href: "/dashboard/submissions" },
              { label: "Check publishing helpers", href: "/dashboard/posts" },
              { label: "Update site settings", href: "/dashboard/settings" },
              { label: "Manage users and roles", href: "/dashboard/users" }
            ].map((item) => (
              <a key={item.href} href={item.href} className="block rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800">
                {item.label}
              </a>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
