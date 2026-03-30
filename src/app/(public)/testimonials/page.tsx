import { Panel } from "@/components/ui/panel";
import { getTestimonials } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Testimonials",
  description: "Customer testimonials rendered from Contentful.",
  path: "/testimonials"
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials().catch(() => []);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Testimonials</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Proof that the work holds up after launch</h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Panel key={testimonial.id}>
                <div className="mb-5 flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, index) => <span key={index}>★</span>)}</div>
                <p className="text-lg leading-8 text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-8">
                  <p className="font-display text-2xl font-semibold text-ink">{testimonial.clientName}</p>
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
    </div>
  );
}
