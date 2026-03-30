import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/content/block-renderer";
import { Panel } from "@/components/ui/panel";
import { getServiceBySlug, getServices } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const services = await getServices().catch(() => []);
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return buildMetadata({
    ...(service ?? {}),
    title: service?.title ?? "Service",
    description: service?.summary,
    path: `/services/${slug}`
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-clay">Service</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">{service.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{service.summary}</p>
      </div>

      <BlockRenderer blocks={service.blocks} />

      {service.relatedServices?.length ? (
        <Panel>
          <h2 className="font-display text-2xl font-semibold text-ink">Related services</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {service.relatedServices.map((related) => (
              <a key={related.id} href={`/services/${related.slug}`} className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-semibold text-ink">{related.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{related.summary}</p>
              </a>
            ))}
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
