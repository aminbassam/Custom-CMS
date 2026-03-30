import type { Route } from "next";
import Link from "next/link";

import { Panel } from "@/components/ui/panel";
import { getBlogPostsByTag } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildMetadata({
    title: `Tag: ${slug}`,
    description: `Blog tag archive for ${slug}.`,
    path: `/blog/tag/${slug}`
  });
}

export default async function BlogTagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPostsByTag(slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Tag: {slug}</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <Panel key={post.id}>
            <h2 className="font-display text-2xl font-semibold text-ink">{post.title}</h2>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}` as Route} className="mt-6 inline-flex text-sm font-semibold text-clay">
              Read article
            </Link>
          </Panel>
        ))}
      </div>
    </div>
  );
}
