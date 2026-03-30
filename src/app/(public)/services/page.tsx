import type { Route } from "next";
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
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Our Services</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Comprehensive digital solutions tailored to your growth goals</h1>
            <p className="mt-5 text-xl text-cyan-50">We merged the prototype’s richer presentation into the dynamic service architecture, so this page now feels like a real service catalog instead of a placeholder list.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Panel key={service.id} className="overflow-hidden p-0">
                {service.featuredImage ? (
                  <img src={service.featuredImage.url} alt={service.featuredImage.title ?? service.title} className="h-72 w-full object-cover" />
                ) : null}
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-3xl font-semibold text-ink">{service.title}</h2>
                      <p className="mt-3 text-lg text-slate-600">{service.summary}</p>
                    </div>
                    {service.pricingSummary ? (
                      <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">{service.pricingSummary}</span>
                    ) : null}
                  </div>
                  {service.featureList?.length ? (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {service.featureList.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <Link href={`/services/${service.slug}` as Route} className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                    Learn More
                  </Link>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Our Process</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">A delivery rhythm that keeps strategy, design, and execution aligned</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Discovery", description: "We define goals, audiences, offers, and the content structure needed to support them." },
              { step: "02", title: "Design", description: "We turn the message into a clear interface system with strong hierarchy and usable page patterns." },
              { step: "03", title: "Implementation", description: "The site is built in Next.js with Contentful and operational tooling wired in cleanly." },
              { step: "04", title: "Launch + Support", description: "We help your team launch smoothly and keep improving the system after go-live." }
            ].map((item) => (
              <div key={item.step}>
                <p className="font-display text-6xl font-semibold text-sky-100">{item.step}</p>
                <h3 className="mt-4 text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
