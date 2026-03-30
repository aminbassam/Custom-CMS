import { getSiteSettings } from "@/lib/contentful/api";
import { Panel } from "@/components/ui/panel";
import { ContactForm } from "@/components/forms/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Send a message through the validated contact pipeline.",
  path: "/contact"
});

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Get in Touch</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Have a project in mind? Let’s map the right system for it.</h1>
            <p className="mt-5 text-xl text-cyan-50">This page now keeps the stronger contact layout from your source while preserving the real submission pipeline behind it.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-semibold text-ink">Contact Information</h2>
          <p className="mt-4 text-lg text-slate-600">
            We’re happy to talk through websites, landing pages, Contentful modeling, dashboard workflows, and what a realistic rollout would look like.
          </p>
          <div className="mt-8 space-y-4">
            <Panel>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Email</p>
              <p className="mt-2 text-lg font-semibold text-ink">{settings?.supportEmail ?? "hello@northstarstudio.com"}</p>
            </Panel>
            <Panel>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Phone</p>
              <p className="mt-2 text-lg font-semibold text-ink">{settings?.phoneNumber ?? "+1 (713) 555-0148"}</p>
            </Panel>
            <Panel>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Office</p>
              <p className="mt-2 text-lg font-semibold text-ink">{settings?.address ?? "Houston, Texas"}</p>
            </Panel>
          </div>
          <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
            <h3 className="font-display text-2xl font-semibold">Business Hours</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <div className="flex justify-between"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
