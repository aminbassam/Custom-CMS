"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: Route;
  label: string;
};

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
] satisfies NavItem[];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
            NS
          </div>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-slate-950">Northstar Studio</p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Custom CMS Website</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition",
                  isActive ? "text-sky-700" : "text-slate-700 hover:text-sky-700"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/dashboard/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-sky-700">
            Sign in
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-sky-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:translate-y-[-1px]"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-sky-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-3">
            <Link href="/dashboard/login" onClick={() => setMobileOpen(false)} className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700">
              Sign in
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl bg-gradient-to-r from-sky-600 to-teal-500 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
