import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/content/block-renderer";
import { getLandingPageBySlug } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landingPage = await getLandingPageBySlug(slug);
  return buildMetadata({
    ...(landingPage ?? {}),
    title: landingPage?.title ?? "Landing Page",
    path: `/landing/${slug}`
  });
}

export default async function LandingPageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landingPage = await getLandingPageBySlug(slug);
  if (!landingPage) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">{landingPage.title}</h1>
      <BlockRenderer blocks={landingPage.blocks} />
    </div>
  );
}
