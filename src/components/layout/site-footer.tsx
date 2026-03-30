import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 text-sm font-bold text-white">
              NS
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-white">Northstar Studio</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Content + Operations</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            A polished website architecture that keeps Contentful in charge of public content while the dashboard handles the operational side cleanly.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/testimonials">Testimonials</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/about">About</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/dashboard/login">Client Login</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Legal</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
