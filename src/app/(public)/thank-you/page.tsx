import Link from "next/link";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Confirmation page after form submission.",
  path: "/thank-you"
});

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-clay">Thank You</p>
      <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-ink">We received your message.</h1>
      <p className="mt-4 text-lg text-slate-600">A dashboard user can now review and action the submission.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
        Return home
      </Link>
    </div>
  );
}
