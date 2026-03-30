import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { requireDashboardPermission } from "@/lib/auth/session";

export async function HelperPage({
  title,
  description,
  contentfulHint = true,
  requireContentHelperPermission = true
}: {
  title: string;
  description: string;
  contentfulHint?: boolean;
  requireContentHelperPermission?: boolean;
}) {
  if (requireContentHelperPermission) {
    await requireDashboardPermission("content-helper:view");
  }

  return (
    <div className="space-y-6">
      <Panel>
        <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
        <p className="mt-3 max-w-3xl text-slate-600">{description}</p>
      </Panel>
      {contentfulHint ? (
        <Panel>
          <h3 className="font-semibold text-ink">Contentful source of truth</h3>
          <p className="mt-2 text-sm text-slate-600">
            This dashboard area is intended to support indexing, preview links, workflow metadata, and editor shortcuts without duplicating canonical content editing.
          </p>
          <Link href="https://app.contentful.com" className="mt-4 inline-flex text-sm font-semibold text-clay">
            Open Contentful
          </Link>
        </Panel>
      ) : null}
    </div>
  );
}
