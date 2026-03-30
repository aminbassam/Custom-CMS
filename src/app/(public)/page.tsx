import Link from "next/link";

import { BlockRenderer } from "@/components/content/block-renderer";
import { Panel } from "@/components/ui/panel";
import { getServices } from "@/lib/contentful/api";

export default async function HomePage() {
  const services = await getServices().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
      <section className="rounded-[2rem] bg-ink px-8 py-20 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-mist">Contentful + Next.js</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-tight md:text-6xl">
          A production-ready marketing site and secure client dashboard in one architecture.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Public content stays in Contentful. Operational workflows stay in PostgreSQL. The result is clean ownership, better security, and simpler long-term scaling.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/services" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">
            Explore Services
          </Link>
          <Link href="/dashboard/login" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white">
            Open Dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {services.slice(0, 3).map((service) => (
          <Panel key={service.id}>
            <h2 className="font-display text-2xl font-semibold text-ink">{service.title}</h2>
            <p className="mt-3 text-slate-600">{service.summary}</p>
            <Link href={`/services/${service.slug}`} className="mt-6 inline-flex text-sm font-semibold text-clay">
              View service
            </Link>
          </Panel>
        ))}
      </section>

      <BlockRenderer
        blocks={[
          {
            id: "home-feature-grid",
            __typename: "FeatureGridBlock",
            title: "What this starter already solves",
            intro: "The scaffold is opinionated where it matters and flexible where teams usually need room.",
            features: [
              { title: "Contentful source of truth", body: "Editorial content is modeled once and rendered across the site." },
              { title: "Secure dashboard", body: "Users, roles, submissions, exports, and logs live in Postgres with RBAC." },
              { title: "SEO and preview ready", body: "Draft mode, metadata, sitemap, robots, and revalidation are already wired." }
            ]
          }
        ]}
      />
    </div>
  );
}
