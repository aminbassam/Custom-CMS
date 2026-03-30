import Link from "next/link";

import { getBlogPosts, getServices } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Search",
  description: "Foundation search page across services and blog content.",
  path: "/search"
});

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const [services, posts] = await Promise.all([getServices().catch(() => []), getBlogPosts().catch(() => [])]);
  const query = q.toLowerCase();

  const results = query
    ? [
        ...services
          .filter((service) => service.title.toLowerCase().includes(query) || service.summary.toLowerCase().includes(query))
          .map((service) => ({ href: `/services/${service.slug}`, title: service.title, excerpt: service.summary })),
        ...posts
          .filter((post) => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query))
          .map((post) => ({ href: `/blog/${post.slug}`, title: post.title, excerpt: post.excerpt }))
      ]
    : [];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Search</h1>
      <form className="mt-6">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search services and posts"
          className="w-full rounded-2xl border border-slate-300 px-5 py-4"
        />
      </form>
      <div className="mt-8 space-y-4">
        {results.map((result) => (
          <Link key={result.href} href={result.href} className="block rounded-3xl border border-slate-200 bg-white p-5 shadow-panel">
            <h2 className="font-semibold text-ink">{result.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{result.excerpt}</p>
          </Link>
        ))}
        {!results.length ? <p className="text-slate-600">No results yet. This route is ready for richer indexing later.</p> : null}
      </div>
    </div>
  );
}
