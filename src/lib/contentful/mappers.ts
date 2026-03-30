import type { Asset, Entry } from "contentful";

import type {
  BlogPost,
  ContentBlock,
  ContentPage,
  ContentfulAsset,
  FaqItem,
  Gallery,
  LandingPage,
  ServicePage,
  SiteSettings,
  Testimonial
} from "@/lib/contentful/types";

function mapAsset(asset?: Asset<any, any>): ContentfulAsset | undefined {
  const file = asset?.fields.file as any;
  if (!file?.url) return undefined;

  return {
    title: asset?.fields.title,
    description: asset?.fields.description,
    url: `https:${file.url}`,
    width: file.details?.image?.width,
    height: file.details?.image?.height
  };
}

function mapFaq(entry: Entry<any>): FaqItem {
  return {
    id: entry.sys.id,
    question: entry.fields.question,
    answer: entry.fields.answer
  };
}

export function mapTestimonial(entry: Entry<any>): Testimonial {
  return {
    id: entry.sys.id,
    quote: entry.fields.quote,
    clientName: entry.fields.clientName,
    clientTitle: entry.fields.clientTitle,
    company: entry.fields.company
  };
}

export function mapGallery(entry: Entry<any>): Gallery {
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    description: entry.fields.description,
    items:
      entry.fields.items?.map((item: Entry<any>) => ({
        id: item.sys.id,
        title: item.fields.title,
        media: mapAsset(item.fields.media)!,
        altText: item.fields.altText,
        caption: item.fields.caption
      })) ?? []
  };
}

export function mapBlock(entry: Entry<any>): ContentBlock {
  const typename = entry.sys.contentType.sys.id;

  switch (typename) {
    case "heroBlock":
      return {
        id: entry.sys.id,
        __typename: "HeroBlock",
        headline: entry.fields.headline,
        subheadline: entry.fields.subheadline
      };
    case "richTextBlock":
      return {
        id: entry.sys.id,
        __typename: "RichTextBlock",
        title: entry.fields.title,
        content: entry.fields.content
      };
    case "imageBlock":
      return {
        id: entry.sys.id,
        __typename: "ImageBlock",
        image: mapAsset(entry.fields.image)!,
        altText: entry.fields.altText
      };
    case "imageTextBlock":
      return {
        id: entry.sys.id,
        __typename: "ImageTextBlock",
        title: entry.fields.title,
        body: entry.fields.body,
        image: mapAsset(entry.fields.image)!,
        imagePosition: entry.fields.imagePosition
      };
    case "ctaBlock":
      return {
        id: entry.sys.id,
        __typename: "CtaBlock",
        headline: entry.fields.headline,
        body: entry.fields.body,
        buttonLabel: entry.fields.buttonLabel,
        buttonUrl: entry.fields.buttonUrl
      };
    case "faqGroupBlock":
      return {
        id: entry.sys.id,
        __typename: "FaqGroupBlock",
        title: entry.fields.title,
        intro: entry.fields.intro,
        faqItems: entry.fields.faqItems?.map(mapFaq) ?? []
      };
    case "testimonialSliderBlock":
      return {
        id: entry.sys.id,
        __typename: "TestimonialSliderBlock",
        title: entry.fields.title,
        testimonials: entry.fields.testimonials?.map(mapTestimonial) ?? []
      };
    case "galleryBlock":
      return {
        id: entry.sys.id,
        __typename: "GalleryBlock",
        title: entry.fields.title,
        gallery: mapGallery(entry.fields.gallery)
      };
    case "featureGridBlock":
      return {
        id: entry.sys.id,
        __typename: "FeatureGridBlock",
        title: entry.fields.title,
        intro: entry.fields.intro,
        features: entry.fields.features ?? []
      };
    case "statsBlock":
      return {
        id: entry.sys.id,
        __typename: "StatsBlock",
        title: entry.fields.title,
        stats: entry.fields.stats ?? []
      };
    case "videoEmbedBlock":
      return {
        id: entry.sys.id,
        __typename: "VideoEmbedBlock",
        title: entry.fields.title,
        embedUrl: entry.fields.embedUrl,
        caption: entry.fields.caption
      };
    default:
      return {
        id: entry.sys.id,
        __typename: "RichTextBlock",
        title: "Unsupported block",
        content: {
          nodeType: "document",
          data: {},
          content: []
        }
      };
  }
}

function commonSeo(entry: Entry<any>) {
  return {
    seoTitle: entry.fields.seoTitle,
    seoDescription: entry.fields.seoDescription,
    canonicalUrl: entry.fields.canonicalUrl,
    noIndex: entry.fields.noIndex,
    ogImage: mapAsset(entry.fields.ogImage)
  };
}

export function mapPage(entry: Entry<any>): ContentPage {
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    excerpt: entry.fields.excerpt,
    blocks: entry.fields.blocks?.map(mapBlock) ?? [],
    faqItems: entry.fields.faqItems?.map(mapFaq) ?? [],
    ...commonSeo(entry)
  };
}

export function mapService(entry: Entry<any>): ServicePage {
  const bodyBlocks = entry.fields.bodyBlocks?.map(mapBlock) ?? [];
  const heroBlock = entry.fields.heroBlock ? [mapBlock(entry.fields.heroBlock)] : [];

  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    summary: entry.fields.summary,
    overview: entry.fields.overview,
    blocks: [...heroBlock, ...bodyBlocks],
    faqItems: entry.fields.faqItems?.map(mapFaq) ?? [],
    relatedServices:
      entry.fields.relatedServices?.map((service: Entry<any>) => ({
        id: service.sys.id,
        title: service.fields.title,
        slug: service.fields.slug,
        summary: service.fields.summary
      })) ?? [],
    ...commonSeo(entry)
  };
}

export function mapBlogPost(entry: Entry<any>): BlogPost {
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    excerpt: entry.fields.excerpt,
    featuredImage: mapAsset(entry.fields.featuredImage),
    authorName: entry.fields.authorName,
    publishedAt: entry.fields.publishedAt,
    updatedAt: entry.fields.updatedAt,
    content: entry.fields.content,
    category: entry.fields.category
      ? {
          title: entry.fields.category.fields.title,
          slug: entry.fields.category.fields.slug
        }
      : undefined,
    tags:
      entry.fields.tags?.map((tag: Entry<any>) => ({
        title: tag.fields.title,
        slug: tag.fields.slug
      })) ?? [],
    ...commonSeo(entry)
  };
}

export function mapLandingPage(entry: Entry<any>): LandingPage {
  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    campaignKey: entry.fields.campaignKey,
    blocks: [
      ...(entry.fields.heroBlock ? [mapBlock(entry.fields.heroBlock)] : []),
      ...(entry.fields.blocks?.map(mapBlock) ?? [])
    ],
    faqItems: entry.fields.faqItems?.map(mapFaq) ?? [],
    ...commonSeo(entry)
  };
}

export function mapSiteSettings(entry: Entry<any>): SiteSettings {
  return {
    siteName: entry.fields.siteName,
    siteUrl: entry.fields.siteUrl,
    defaultSeoTitle: entry.fields.defaultSeoTitle,
    defaultSeoDescription: entry.fields.defaultSeoDescription,
    defaultOgImage: mapAsset(entry.fields.defaultOgImage),
    supportEmail: entry.fields.supportEmail,
    phoneNumber: entry.fields.phoneNumber
  };
}
