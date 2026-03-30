import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { getServices } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Explore services powered by Contentful and rendered with Next.js.",
  path: "/services"
});

export default async function ServicesPage() {
  const services = await getServices().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-clay">Services</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Dynamic service pages from Contentful</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Panel key={service.id}>
            <h2 className="font-display text-2xl font-semibold text-ink">{service.title}</h2>
            <p className="mt-3 text-slate-600">{service.summary}</p>
            <Link href={`/services/${service.slug}`} className="mt-6 inline-flex text-sm font-semibold text-clay">
              Open service
            </Link>
          </Panel>
        ))}
      </div>
    </div>
  );
}
