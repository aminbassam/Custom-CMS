import { draftMode } from "next/headers";
import { cache } from "react";

import { fetchEntries } from "@/lib/contentful/client";
import {
  mapBlogPost,
  mapGallery,
  mapLandingPage,
  mapPage,
  mapService,
  mapSiteSettings,
  mapTestimonial
} from "@/lib/contentful/mappers";

const includeDepth = 6;

async function isPreviewEnabled() {
  const draft = await draftMode();
  return draft.isEnabled;
}

export const getSiteSettings = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "siteSettings",
      limit: 1,
      include: includeDepth
    },
    preview
  );

  const entry = response.items[0];
  return entry ? mapSiteSettings(entry as any) : null;
});

export const getPageBySlug = cache(async (slug: string) => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
      include: includeDepth
    },
    preview
  );

  return response.items[0] ? mapPage(response.items[0] as any) : null;
});

export const getServices = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "service",
      order: ["fields.sortOrder", "fields.title"],
      include: includeDepth
    },
    preview
  );

  return response.items.map((item) => mapService(item as any));
});

export const getServiceBySlug = cache(async (slug: string) => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "service",
      "fields.slug": slug,
      limit: 1,
      include: includeDepth
    },
    preview
  );

  return response.items[0] ? mapService(response.items[0] as any) : null;
});

export const getBlogPosts = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "blogPost",
      order: ["-fields.publishedAt"],
      include: includeDepth
    },
    preview
  );

  return response.items.map((item) => mapBlogPost(item as any));
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
      include: includeDepth
    },
    preview
  );

  return response.items[0] ? mapBlogPost(response.items[0] as any) : null;
});

export const getBlogPostsByCategory = cache(async (slug: string) => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category?.slug === slug);
});

export const getBlogPostsByTag = cache(async (slug: string) => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.tags?.some((tag) => tag.slug === slug));
});

export const getFaqs = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "faq",
      order: ["fields.sortOrder", "fields.question"],
      include: includeDepth
    },
    preview
  );

  return response.items.map((item: any) => ({
    id: item.sys.id,
    question: item.fields.question,
    answer: item.fields.answer
  }));
});

export const getTestimonials = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "testimonial",
      order: ["fields.sortOrder", "fields.clientName"],
      include: includeDepth
    },
    preview
  );

  return response.items.map((item) => mapTestimonial(item as any));
});

export const getGalleries = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "gallery",
      order: ["fields.title"],
      include: includeDepth
    },
    preview
  );

  return response.items.map((item) => mapGallery(item as any));
});

export const getLandingPageBySlug = cache(async (slug: string) => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "landingPage",
      "fields.slug": slug,
      limit: 1,
      include: includeDepth
    },
    preview
  );

  return response.items[0] ? mapLandingPage(response.items[0] as any) : null;
});

export const getLandingPages = cache(async () => {
  const preview = await isPreviewEnabled();
  const response = await fetchEntries(
    {
      content_type: "landingPage",
      order: ["fields.title"],
      include: includeDepth
    },
    preview
  );

  return response.items.map((item) => mapLandingPage(item as any));
});
