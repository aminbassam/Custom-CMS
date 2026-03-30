import Link from "next/link";

import { getGalleries } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Gallery collections rendered from Contentful.",
  path: "/gallery"
});

export default async function GalleryPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "" } = await searchParams;
  const galleries = await getGalleries().catch(() => []);
  const items = galleries.flatMap((gallery) =>
    gallery.items.map((item) => ({
      ...item,
      category: gallery.title
    }))
  );
  const categories = Array.from(new Set(items.map((item) => item.category)));
  const filteredItems = category ? items.filter((item) => item.category === category) : items;

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Our Work</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">A showcase of recent projects and creative work</h1>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-3 px-6 lg:px-8">
          <Link href="/gallery" className={`rounded-full px-4 py-2 text-sm font-medium ${!category ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}>
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item}
              href={`/gallery?category=${encodeURIComponent(item)}`}
              className={`rounded-full px-4 py-2 text-sm font-medium ${category === item ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}
            >
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-8">
          {filteredItems.map((item) => (
            <figure key={item.id} className="group relative aspect-square overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-panel">
              <img src={item.media.url} alt={item.altText ?? item.media.title ?? ""} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-4 text-white">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-slate-200">{item.caption ?? item.category}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
