"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: Route;
  label: string;
};

const groups = [
  {
    title: "Core",
    items: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/submissions", label: "Submissions" },
      { href: "/dashboard/activity-logs", label: "Activity Logs" }
    ] satisfies NavItem[]
  },
  {
    title: "Content Helpers",
    items: [
      { href: "/dashboard/pages", label: "Pages" },
      { href: "/dashboard/posts", label: "Posts" },
      { href: "/dashboard/services", label: "Services" },
      { href: "/dashboard/landing-pages", label: "Landing Pages" },
      { href: "/dashboard/categories", label: "Categories" },
      { href: "/dashboard/tags", label: "Tags" },
      { href: "/dashboard/media", label: "Media" },
      { href: "/dashboard/menus", label: "Menus" },
      { href: "/dashboard/seo", label: "SEO" },
      { href: "/dashboard/settings", label: "Settings" }
    ] satisfies NavItem[]
  },
  {
    title: "Security",
    items: [
      { href: "/dashboard/users", label: "Users" },
      { href: "/dashboard/roles", label: "Roles" },
      { href: "/dashboard/profile", label: "Profile" }
    ] satisfies NavItem[]
  }
];

export function DashboardShell({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {sidebarOpen ? (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-slate-950 text-slate-200 transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500 text-sm font-bold text-white">
                NS
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-white">Ops Dashboard</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Local + CMS Ready</p>
              </div>
            </Link>
            <button type="button" onClick={() => setSidebarOpen(false)} className="text-sm text-slate-400 lg:hidden">
              Close
            </button>
          </div>

          <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                          isActive
                            ? "bg-sky-500/15 text-sky-300"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Demo-ready workspace</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                This dashboard can run against PostgreSQL or local fallback data while the merged design is being refined.
              </p>
            </div>
            <div className="mt-4 grid gap-3">
              <Link href="/" className="rounded-2xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-slate-200 transition hover:border-sky-400/40 hover:text-white">
                View site
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur lg:px-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-600">Northstar Studio</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">{title}</h1>
            {description ? <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 lg:hidden"
          >
            Menu
          </button>
        </header>

        <main className="px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
