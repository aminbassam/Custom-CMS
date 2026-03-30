import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-display text-xl font-semibold">CMS Website</p>
          <p className="max-w-sm text-sm text-slate-400">
            Production starter for a Contentful-powered website and secure operational dashboard.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-medium text-white">Explore</p>
          <div className="flex flex-col gap-2 text-slate-400">
            <Link href="/services">Services</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/testimonials">Testimonials</Link>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-medium text-white">Legal</p>
          <div className="flex flex-col gap-2 text-slate-400">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
