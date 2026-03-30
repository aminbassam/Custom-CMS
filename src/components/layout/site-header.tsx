import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          CMS Website
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-clay">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard/login"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-clay hover:text-clay"
        >
          Client Login
        </Link>
      </div>
    </header>
  );
}
