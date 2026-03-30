"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

const groups = [
  {
    title: "Core",
    items: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/submissions", label: "Submissions" },
      { href: "/dashboard/activity-logs", label: "Activity Logs" }
    ]
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
    ]
  },
  {
    title: "Security",
    items: [
      { href: "/dashboard/users", label: "Users" },
      { href: "/dashboard/roles", label: "Roles" },
      { href: "/dashboard/profile", label: "Profile" }
    ]
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
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-slate-950 px-6 py-8 text-slate-200">
          <Link href="/dashboard" className="font-display text-2xl font-semibold text-white">
            Ops Dashboard
          </Link>
          <div className="mt-10 space-y-8">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {group.title}
                </p>
                <nav className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-clay hover:text-white"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="px-6 py-8 lg:px-10">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">{title}</h1>
            {description ? <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
