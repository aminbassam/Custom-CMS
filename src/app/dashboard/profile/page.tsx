import { Panel } from "@/components/ui/panel";
import { requireDashboardUser } from "@/lib/auth/session";

export default async function DashboardProfilePage() {
  const user = await requireDashboardUser();

  return (
    <Panel className="max-w-2xl">
      <h2 className="font-display text-2xl font-semibold text-ink">Profile</h2>
      <dl className="mt-6 grid gap-4">
        <div>
          <dt className="text-sm text-slate-500">Name</dt>
          <dd className="font-medium text-ink">{user.name ?? "Unnamed"}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Email</dt>
          <dd className="font-medium text-ink">{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">User ID</dt>
          <dd className="font-mono text-sm text-slate-700">{user.id}</dd>
        </div>
      </dl>
    </Panel>
  );
}
