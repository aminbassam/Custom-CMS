import type { Route } from "next";
import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { getBlogPosts, getServices, getTestimonials } from "@/lib/contentful/api";

export default async function HomePage() {
  const [services, posts, testimonials] = await Promise.all([
    getServices().catch(() => []),
    getBlogPosts().catch(() => []),
    getTestimonials().catch(() => [])
  ]);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.35),_transparent_28%),radial-gradient(circle_at_80%_10%,_rgba(20,184,166,0.3),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,1))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-200">Contentful + Next.js + Dashboard</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              Transform your digital presence with a website your team can actually run.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Public content stays structured in Contentful. Internal operations stay secure in PostgreSQL. The result is a cleaner website, stronger publishing flow, and a dashboard built for real follow-through.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10">
                Get Started
              </Link>
              <Link href="/services" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View Services
              </Link>
            </div>
          </div>

          <div className="grid gap-5 self-end sm:grid-cols-2">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "250+", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" }
            ].map((stat) => (
              <div key={stat.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="font-display text-4xl font-semibold">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Our Services</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Comprehensive solutions to elevate your digital presence</h2>
            <p className="mt-4 text-lg text-slate-600">The prototype had a strong marketing rhythm, so we kept that energy and merged it into the Contentful-ready structure.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Panel key={service.id} className="overflow-hidden p-0">
                {service.featuredImage ? (
                  <img src={service.featuredImage.url} alt={service.featuredImage.title ?? service.title} className="h-52 w-full object-cover" />
                ) : null}
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-ink">{service.title}</h3>
                  <p className="mt-3 text-slate-600">{service.summary}</p>
                  <Link href={`/services/${service.slug}` as Route} className="mt-6 inline-flex text-sm font-semibold text-sky-700">
                    Learn more
                  </Link>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Why Choose Us</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">We design with launch quality and long-term operations in mind.</h2>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              The best part of the downloaded source was its confident marketing flow. We kept that tone, but connected it to real CMS and dashboard responsibilities.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Expert team with strategy, design, and implementation depth",
                "Contentful structure that keeps editorial work clean",
                "Operational dashboard for submissions, users, exports, and logs",
                "Performance and SEO baked into the architecture from day one"
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-panel">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500" />
                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-panel">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=1000&fit=crop"
              alt="Team collaboration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Testimonials</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">What clients say after the site actually goes live</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Panel key={testimonial.id}>
                <div className="mb-5 flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, index) => <span key={index}>★</span>)}</div>
                <p className="text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="font-semibold text-ink">{testimonial.clientName}</p>
                  <p className="text-sm text-slate-500">
                    {testimonial.clientTitle}
                    {testimonial.company ? `, ${testimonial.company}` : ""}
                  </p>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Latest Insights</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Tips, trends, and implementation advice from the team</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Panel key={post.id} className="overflow-hidden p-0">
                {post.featuredImage ? (
                  <img src={post.featuredImage.url} alt={post.featuredImage.title ?? post.title} className="h-52 w-full object-cover" />
                ) : null}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>{post.category?.title}</span>
                    <span>•</span>
                    <span>{post.readTime ?? "Article"}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{post.title}</h3>
                  <p className="mt-3 text-slate-600">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}` as Route} className="mt-6 inline-flex text-sm font-semibold text-sky-700">
                    Read article
                  </Link>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-4xl font-semibold tracking-tight">Ready to build something stronger than a brochure site?</h2>
          <p className="mt-4 text-lg text-cyan-50">
            Let’s turn your content, lead flow, and internal operations into one system that is easier to launch and easier to run.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950">
              Contact Us
            </Link>
            <Link href="/dashboard/login" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white">
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
