import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/content/block-renderer";
import { getPageBySlug } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPageBySlug("terms-of-service");
  return buildMetadata({ ...(page ?? {}), title: page?.title ?? "Terms of Service", path: "/terms-of-service" });
}

export default async function TermsPage() {
  const page = await getPageBySlug("terms-of-service");
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">{page.title}</h1>
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
}
