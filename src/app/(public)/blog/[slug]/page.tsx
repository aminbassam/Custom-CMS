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
    <article className="bg-white">
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6">
          {post.category ? <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">{post.category.title}</p> : null}
          <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-xl text-slate-300">{post.excerpt}</p>
          <p className="mt-6 text-sm text-slate-400">
            {post.authorName} • {new Date(post.publishedAt).toLocaleDateString()} • {post.readTime ?? "Article"}
          </p>
        </div>
      </section>

      {post.featuredImage ? (
        <div className="mx-auto -mt-10 max-w-6xl px-6">
          <img src={post.featuredImage.url} alt={post.featuredImage.title ?? post.title} className="w-full rounded-[2rem] object-cover shadow-panel" />
        </div>
      ) : null}

      <div className="mx-auto max-w-4xl px-6 py-14">
        <RichText document={post.content} />
      </div>
    </article>
  );
}
