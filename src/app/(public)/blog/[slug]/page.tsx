import { notFound } from "next/navigation";

import { RichText } from "@/components/content/rich-text";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getBlogPosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  return buildMetadata({
    ...(post ?? {}),
    title: post?.title ?? "Blog post",
    description: post?.excerpt,
    path: `/blog/${slug}`
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-clay">Blog</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">{post.title}</h1>
      <p className="mt-4 text-slate-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
      <div className="mt-8">
        <RichText document={post.content} />
      </div>
    </article>
  );
}
