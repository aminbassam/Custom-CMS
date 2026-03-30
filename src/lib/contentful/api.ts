import { draftMode } from "next/headers";
import { cache } from "react";

import { fetchEntries } from "@/lib/contentful/client";
import {
  aboutValues,
  getLocalBlogPostBySlug,
  getLocalLandingPageBySlug,
  getLocalPageBySlug,
  getLocalServiceBySlug,
  localBlogPosts,
  localFaqs,
  localGalleries,
  localLandingPages,
  localServices,
  localSiteSettings,
  localTestimonials,
  teamMembers
} from "@/lib/local-content";
import {
  mapBlogPost,
  mapGallery,
  mapLandingPage,
  mapPage,
  mapService,
  mapSiteSettings,
  mapTestimonial
} from "@/lib/contentful/mappers";
import { hasContentfulConfig } from "@/lib/runtime";

const includeDepth = 6;

async function isPreviewEnabled() {
  const draft = await draftMode();
  return draft.isEnabled;
}

async function withCmsFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasContentfulConfig) {
    return fallback;
  }

  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}

export const getSiteSettings = cache(async () =>
  withCmsFallback(async () => {
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
  }, localSiteSettings)
);

export const getPageBySlug = cache(async (slug: string) =>
  withCmsFallback(async () => {
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
  }, getLocalPageBySlug(slug))
);

export const getServices = cache(async () =>
  withCmsFallback(async () => {
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
  }, localServices)
);

export const getServiceBySlug = cache(async (slug: string) =>
  withCmsFallback(async () => {
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
  }, getLocalServiceBySlug(slug))
);

export const getBlogPosts = cache(async () =>
  withCmsFallback(async () => {
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
  }, localBlogPosts)
);

export const getBlogPostBySlug = cache(async (slug: string) =>
  withCmsFallback(async () => {
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
  }, getLocalBlogPostBySlug(slug))
);

export const getBlogPostsByCategory = cache(async (slug: string) => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category?.slug === slug);
});

export const getBlogPostsByTag = cache(async (slug: string) => {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.tags?.some((tag) => tag.slug === slug));
});

export const getFaqs = cache(async () =>
  withCmsFallback(async () => {
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
  }, localFaqs)
);

export const getTestimonials = cache(async () =>
  withCmsFallback(async () => {
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
  }, localTestimonials)
);

export const getGalleries = cache(async () =>
  withCmsFallback(async () => {
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
  }, localGalleries)
);

export const getLandingPageBySlug = cache(async (slug: string) =>
  withCmsFallback(async () => {
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
  }, getLocalLandingPageBySlug(slug))
);

export const getLandingPages = cache(async () =>
  withCmsFallback(async () => {
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
  }, localLandingPages)
);

export const getAboutValues = cache(async () => aboutValues);
export const getTeamMembers = cache(async () => teamMembers);
export const getBlogCategories = cache(async () => Array.from(new Set((await getBlogPosts()).map((post) => post.category?.title).filter(Boolean))) as string[]);
