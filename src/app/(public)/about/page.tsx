import { notFound } from "next/navigation";

import Link from "next/link";

import { BlockRenderer } from "@/components/content/block-renderer";
import { Panel } from "@/components/ui/panel";
import { getAboutValues, getPageBySlug, getTeamMembers } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPageBySlug("about");
  return buildMetadata({ ...(page ?? {}), title: page?.title ?? "About", path: "/about" });
}

export default async function AboutPage() {
  const [page, values, teamMembers] = await Promise.all([
    getPageBySlug("about"),
    getAboutValues(),
    getTeamMembers()
  ]);
  if (!page) notFound();

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">About Us</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">{page.title}</h1>
            <p className="mt-5 text-xl text-cyan-50">{page.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink">Our Mission</h2>
            <div className="mt-6">
              <BlockRenderer blocks={page.blocks} />
            </div>
            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
              Work With Us
            </Link>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-panel">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=1000&fit=crop"
              alt="Team at work"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Our Values</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">The principles behind the work</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Panel key={value.title}>
                <h3 className="font-display text-2xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-3 text-slate-600">{value.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Meet the Team</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">The people who make the system work</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <img src={member.image} alt={member.name} className="mx-auto h-48 w-48 rounded-full object-cover shadow-panel" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-sky-700">{member.role}</p>
                <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
