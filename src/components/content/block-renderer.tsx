import type { Route } from "next";
import Link from "next/link";

import type { ContentBlock } from "@/lib/contentful/types";
import { Panel } from "@/components/ui/panel";
import { RichText } from "@/components/content/rich-text";

function isInternalRoute(href: string): href is Route {
  return href.startsWith("/") && !href.startsWith("//");
}

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => {
        switch (block.__typename) {
          case "HeroBlock":
            return (
              <section key={block.id} className="rounded-[2rem] bg-ink px-8 py-16 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-mist">Tailored Growth</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight">
                  {block.headline}
                </h2>
                {block.subheadline ? <p className="mt-4 max-w-2xl text-lg text-slate-300">{block.subheadline}</p> : null}
              </section>
            );
          case "RichTextBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="mb-4 font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                <RichText document={block.content} />
              </Panel>
            );
          case "ImageBlock":
            return (
              <Panel key={block.id}>
                <img
                  src={block.image.url}
                  alt={block.altText ?? block.image.title ?? ""}
                  className="w-full rounded-2xl object-cover"
                />
              </Panel>
            );
          case "ImageTextBlock":
            return (
              <Panel key={block.id} className="grid gap-6 lg:grid-cols-2">
                {block.imagePosition !== "right" ? (
                  <img src={block.image.url} alt={block.image.title ?? ""} className="rounded-2xl object-cover" />
                ) : null}
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink">{block.title}</h2>
                  <div className="mt-4">
                    <RichText document={block.body} />
                  </div>
                </div>
                {block.imagePosition === "right" ? (
                  <img src={block.image.url} alt={block.image.title ?? ""} className="rounded-2xl object-cover" />
                ) : null}
              </Panel>
            );
          case "CtaBlock":
            return (
              <Panel key={block.id} className="bg-clay text-white">
                <h2 className="font-display text-3xl font-semibold">{block.headline}</h2>
                {block.body ? <p className="mt-3 max-w-2xl text-base text-white/85">{block.body}</p> : null}
                {isInternalRoute(block.buttonUrl) ? (
                  <Link
                    href={block.buttonUrl}
                    className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-clay"
                  >
                    {block.buttonLabel}
                  </Link>
                ) : (
                  <a
                    href={block.buttonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-clay"
                  >
                    {block.buttonLabel}
                  </a>
                )}
              </Panel>
            );
          case "FaqGroupBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
                <div className="mt-6 space-y-4">
                  {block.faqItems.map((faq) => (
                    <div key={faq.id} className="rounded-2xl border border-slate-200 p-4">
                      <h3 className="font-semibold text-ink">{faq.question}</h3>
                      <div className="mt-3">
                        <RichText document={faq.answer} />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            );
          case "TestimonialSliderBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {block.testimonials.map((testimonial) => (
                    <blockquote key={testimonial.id} className="rounded-2xl bg-slate-50 p-5">
                      <p className="text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                      <footer className="mt-4 text-sm font-medium text-ink">
                        {testimonial.clientName}
                        {testimonial.company ? `, ${testimonial.company}` : ""}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </Panel>
            );
          case "GalleryBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {block.gallery.items.map((item) => (
                    <figure key={item.id} className="overflow-hidden rounded-2xl bg-slate-100">
                      <img src={item.media.url} alt={item.altText ?? item.media.title ?? ""} className="aspect-[4/3] w-full object-cover" />
                      <figcaption className="p-4 text-sm text-slate-600">{item.caption ?? item.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </Panel>
            );
          case "FeatureGridBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {block.features.map((feature) => (
                    <div key={feature.title} className="rounded-2xl bg-slate-50 p-5">
                      <h3 className="font-semibold text-ink">{feature.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{feature.body}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            );
          case "StatsBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {block.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-slate-50 p-5">
                      <div className="font-display text-3xl font-semibold text-ink">{stat.value}</div>
                      <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            );
          case "VideoEmbedBlock":
            return (
              <Panel key={block.id}>
                {block.title ? <h2 className="mb-4 font-display text-2xl font-semibold text-ink">{block.title}</h2> : null}
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <iframe src={block.embedUrl} title={block.title ?? "Embedded video"} className="h-full w-full" allowFullScreen />
                </div>
                {block.caption ? <p className="mt-3 text-sm text-slate-600">{block.caption}</p> : null}
              </Panel>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
