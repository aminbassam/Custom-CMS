import type { Metadata } from "next";

import type { SeoFields } from "@/lib/contentful/types";
import { absoluteUrl } from "@/lib/utils";

type SeoInput = SeoFields & {
  title?: string;
  description?: string;
  path?: string;
  siteName?: string;
};

export function buildMetadata(input: SeoInput): Metadata {
  const title = input.seoTitle ?? input.title ?? input.siteName ?? "CMS Website";
  const description = input.seoDescription ?? input.description ?? "";
  const canonical = input.canonicalUrl ?? absoluteUrl(input.path ?? "/");

  return {
    title,
    description,
    alternates: {
      canonical
    },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: input.siteName,
      images: input.ogImage
        ? [
            {
              url: input.ogImage.url,
              width: input.ogImage.width,
              height: input.ogImage.height,
              alt: input.ogImage.title ?? title
            }
          ]
        : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: input.ogImage ? [input.ogImage.url] : undefined
    }
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
