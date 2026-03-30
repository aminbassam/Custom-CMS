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
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Frequently Asked Questions</h1>
      <div className="mt-10 space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel">
            <h2 className="text-lg font-semibold text-ink">{faq.question}</h2>
            <div className="mt-4">
              <RichText document={faq.answer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
