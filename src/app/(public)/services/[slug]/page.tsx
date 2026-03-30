import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/content/block-renderer";
import { RichText } from "@/components/content/rich-text";
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
    <div className="flex flex-col bg-white">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Service</p>
              <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">{service.title}</h1>
              <p className="mt-5 text-xl text-cyan-50">{service.summary}</p>
              {service.pricingSummary ? <p className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">{service.pricingSummary}</p> : null}
            </div>
            {service.featuredImage ? (
              <img src={service.featuredImage.url} alt={service.featuredImage.title ?? service.title} className="rounded-[2rem] shadow-2xl shadow-sky-900/20" />
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
        {service.featureList?.length ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold text-ink">Key features</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {service.featureList.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500" />
                  {feature}
                </div>
              ))}
            </div>
          </Panel>
        ) : null}

        {service.overview ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold text-ink">Overview</h2>
            <div className="mt-6">
              <RichText document={service.overview} />
            </div>
          </Panel>
        ) : null}

        <BlockRenderer blocks={service.blocks} />

        {service.faqItems?.length ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold text-ink">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {service.faqItems.map((faq) => (
                <div key={faq.id} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-semibold text-ink">{faq.question}</h3>
                  <div className="mt-3">
                    <RichText document={faq.answer} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        ) : null}

        {service.relatedServices?.length ? (
          <Panel>
            <h2 className="font-display text-2xl font-semibold text-ink">Related services</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {service.relatedServices.map((related) => (
                <a key={related.id} href={`/services/${related.slug}`} className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-sky-50">
                  <h3 className="font-semibold text-ink">{related.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{related.summary}</p>
                </a>
              ))}
            </div>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}
