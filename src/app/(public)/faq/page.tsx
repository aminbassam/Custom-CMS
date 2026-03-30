import { RichText } from "@/components/content/rich-text";
import { getFaqs } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Frequently asked questions rendered from Contentful.",
  path: "/faq"
});

export default async function FaqPage() {
  const faqs = await getFaqs().catch(() => []);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">FAQ</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Frequently asked questions</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-panel">
              <h2 className="text-xl font-semibold text-ink">{faq.question}</h2>
              <div className="mt-4">
                <RichText document={faq.answer} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
