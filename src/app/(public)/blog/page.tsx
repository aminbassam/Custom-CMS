import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { getBlogPosts } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Published blog content from Contentful.",
  path: "/blog"
});

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-clay">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">SEO-friendly article listing with category and tag support</h1>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <Panel key={post.id}>
            <p className="text-sm text-slate-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{post.title}</h2>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
              {post.category ? <Link href={`/blog/category/${post.category.slug}`}>{post.category.title}</Link> : null}
              {post.tags?.map((tag) => (
                <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                  #{tag.title}
                </Link>
              ))}
            </div>
            <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-clay">
              Read article
            </Link>
          </Panel>
        ))}
      </div>
    </div>
  );
}
