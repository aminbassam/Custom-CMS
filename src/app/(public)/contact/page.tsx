import { ContactForm } from "@/components/forms/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Send a message through the validated contact pipeline.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_420px]">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-clay">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Contact form with persistence, validation, and rate limiting</h1>
        <p className="mt-4 text-lg text-slate-600">
          Public submissions are stored in PostgreSQL, logged for auditability, and exposed to the dashboard for follow-up.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
