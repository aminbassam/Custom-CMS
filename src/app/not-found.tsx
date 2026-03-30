import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-clay">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 text-lg text-slate-600">The route exists in the architecture, but the requested content was not found.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
        Go home
      </Link>
    </div>
  );
}
