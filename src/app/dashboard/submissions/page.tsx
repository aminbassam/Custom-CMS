import type { Route } from "next";
import Link from "next/link";

import { requireDashboardPermission } from "@/lib/auth/session";
import { Panel } from "@/components/ui/panel";
import { getDashboardSubmissions } from "@/lib/dashboard-data";

export default async function DashboardSubmissionsPage() {
  await requireDashboardPermission("submissions:view");

  const submissions = await getDashboardSubmissions();

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">Recent submissions</h2>
        <Link href="/api/dashboard/exports/submissions" className="text-sm font-semibold text-clay">
          Export CSV
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="py-4">
                  <Link href={`/dashboard/submissions/${submission.id}` as Route} className="font-medium text-ink">
                    {submission.name}
                  </Link>
                </td>
                <td className="py-4 text-slate-600">{submission.email}</td>
                <td className="py-4 capitalize text-slate-600">{submission.status.replace("_", " ")}</td>
                <td className="py-4 text-slate-600">{submission.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
