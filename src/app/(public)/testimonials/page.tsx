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
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Testimonials</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Panel key={testimonial.id}>
            <p className="text-slate-700">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-ink">{testimonial.clientName}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
