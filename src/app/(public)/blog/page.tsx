import type { Route } from "next";
import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { getBlogPosts } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Published blog content from Contentful.",
  path: "/blog"
});

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;
  const posts = await getBlogPosts().catch(() => []);
  const categories = Array.from(new Set(posts.map((post) => post.category?.title).filter(Boolean))) as string[];
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = !category || post.category?.title === category;
    return matchesSearch && matchesCategory;
  });
  const featuredPost = filteredPosts[0];

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Blog</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">Insights, trends, and practical guidance from the team</h1>
            <form className="mx-auto mt-8 grid max-w-3xl gap-3 rounded-[2rem] bg-white/10 p-3 backdrop-blur sm:grid-cols-[1fr_auto]">
              <input
                name="q"
                defaultValue={q}
                placeholder="Search articles..."
                className="rounded-2xl border border-white/15 bg-white px-5 py-4 text-slate-950 outline-none"
              />
              <button type="submit" className="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6 lg:px-8">
          <Link href="/blog" className={`rounded-full px-4 py-2 text-sm font-medium ${!category ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}>
            All Posts
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={{ pathname: "/blog", query: { category: item } }}
              className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {featuredPost ? (
            <Panel className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-2">
                {featuredPost.featuredImage ? (
                  <img src={featuredPost.featuredImage.url} alt={featuredPost.featuredImage.title ?? featuredPost.title} className="h-full min-h-[320px] w-full object-cover" />
                ) : null}
                <div className="p-8 lg:p-10">
                  {featuredPost.category ? (
                    <p className="text-sm uppercase tracking-[0.2em] text-sky-600">{featuredPost.category.title}</p>
                  ) : null}
                  <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">{featuredPost.title}</h2>
                  <p className="mt-4 text-lg text-slate-600">{featuredPost.excerpt}</p>
                  <p className="mt-6 text-sm text-slate-500">
                    {featuredPost.authorName} • {new Date(featuredPost.publishedAt).toLocaleDateString()} • {featuredPost.readTime ?? "Article"}
                  </p>
                  <Link href={`/blog/${featuredPost.slug}` as Route} className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                    Read More
                  </Link>
                </div>
              </div>
            </Panel>
          ) : (
            <Panel>
              <p className="text-slate-600">No articles found matching your filters.</p>
            </Panel>
          )}

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(1).map((post) => (
              <Panel key={post.id} className="overflow-hidden p-0">
                {post.featuredImage ? (
                  <img src={post.featuredImage.url} alt={post.featuredImage.title ?? post.title} className="h-52 w-full object-cover" />
                ) : null}
                <div className="p-6">
                  {post.category ? <p className="text-sm uppercase tracking-[0.2em] text-sky-600">{post.category.title}</p> : null}
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{post.title}</h3>
                  <p className="mt-3 text-slate-600">{post.excerpt}</p>
                  <p className="mt-4 text-sm text-slate-500">{post.readTime ?? "Article"}</p>
                  <Link href={`/blog/${post.slug}` as Route} className="mt-6 inline-flex text-sm font-semibold text-sky-700">
                    Read more
                  </Link>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
