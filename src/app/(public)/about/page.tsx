import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/content/block-renderer";
import { getPageBySlug } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPageBySlug("about");
  return buildMetadata({ ...(page ?? {}), title: page?.title ?? "About", path: "/about" });
}

export default async function AboutPage() {
  const page = await getPageBySlug("about");
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-clay">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">{page.title}</h1>
      </div>
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
}
