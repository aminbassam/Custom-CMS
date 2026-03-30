import type { MetadataRoute } from "next";

import { getBlogPosts, getLandingPages, getServices } from "@/lib/contentful/api";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, landingPages] = await Promise.all([
    getServices().catch(() => []),
    getBlogPosts().catch(() => []),
    getLandingPages().catch(() => [])
  ]);
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/contact",
    "/blog",
    "/faq",
    "/testimonials",
    "/gallery",
    "/privacy-policy",
    "/terms-of-service",
    "/search",
    "/thank-you"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: new Date(),
      changeFrequency: "weekly" as const
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: new Date()
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt)
    })),
    ...landingPages.map((page) => ({
      url: absoluteUrl(`/landing/${page.slug}`),
      lastModified: new Date()
    }))
  ];
}
