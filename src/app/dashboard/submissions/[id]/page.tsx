import { notFound } from "next/navigation";

import { Panel } from "@/components/ui/panel";
import { requireDashboardPermission } from "@/lib/auth/session";
import { getDashboardSubmissionById } from "@/lib/dashboard-data";

export default async function DashboardSubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireDashboardPermission("submissions:view");
  const { id } = await params;

  const submission = await getDashboardSubmissionById(id);

  if (!submission) notFound();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <Panel>
        <h2 className="font-display text-2xl font-semibold text-ink">{submission.name}</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="font-medium text-ink">{submission.email}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Phone</dt>
            <dd className="font-medium text-ink">{submission.phone ?? "N/A"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Company</dt>
            <dd className="font-medium text-ink">{submission.company ?? "N/A"}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Status</dt>
            <dd className="font-medium capitalize text-ink">{submission.status.replace("_", " ")}</dd>
          </div>
        </dl>
        <div className="mt-6">
          <p className="text-sm text-slate-500">Message</p>
          <p className="mt-2 whitespace-pre-wrap text-slate-700">{submission.message}</p>
        </div>
      </Panel>
      <Panel>
        <h3 className="font-display text-xl font-semibold text-ink">Internal notes</h3>
        <div className="mt-4 space-y-4">
          {submission.notes.map((note) => (
            <div key={note.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-700">{note.note}</p>
              <p className="mt-2 text-xs text-slate-500">{note.authorUser.name ?? note.authorUser.email}</p>
            </div>
          ))}
          {!submission.notes.length ? <p className="text-sm text-slate-500">No notes yet.</p> : null}
        </div>
      </Panel>
    </div>
  );
}
