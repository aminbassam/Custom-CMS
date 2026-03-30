import { getGalleries } from "@/lib/contentful/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: "Gallery collections rendered from Contentful.",
  path: "/gallery"
});

export default async function GalleryPage() {
  const galleries = await getGalleries().catch(() => []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Gallery</h1>
      <div className="mt-10 space-y-10">
        {galleries.map((gallery) => (
          <section key={gallery.id}>
            <h2 className="font-display text-2xl font-semibold text-ink">{gallery.title}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {gallery.items.map((item) => (
                <figure key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-panel">
                  <img src={item.media.url} alt={item.altText ?? item.media.title ?? ""} className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="p-4 text-sm text-slate-600">{item.caption ?? item.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
