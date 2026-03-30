import type { Document } from "@contentful/rich-text-types";

export type SeoFields = {
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: ContentfulAsset;
};

export type ContentfulAsset = {
  title?: string;
  description?: string;
  url: string;
  width?: number;
  height?: number;
};

export type ContentBlock =
  | { id: string; __typename: "HeroBlock"; headline: string; subheadline?: string }
  | { id: string; __typename: "RichTextBlock"; title?: string; content: Document }
  | { id: string; __typename: "ImageBlock"; image: ContentfulAsset; altText?: string }
  | { id: string; __typename: "ImageTextBlock"; title: string; body: Document; image: ContentfulAsset; imagePosition?: "left" | "right" }
  | { id: string; __typename: "CtaBlock"; headline: string; body?: string; buttonLabel: string; buttonUrl: string }
  | { id: string; __typename: "FaqGroupBlock"; title?: string; intro?: string; faqItems: FaqItem[] }
  | { id: string; __typename: "TestimonialSliderBlock"; title?: string; testimonials: Testimonial[] }
  | { id: string; __typename: "GalleryBlock"; title?: string; gallery: Gallery }
  | { id: string; __typename: "FeatureGridBlock"; title?: string; intro?: string; features: Array<{ title: string; body: string; icon?: string }> }
  | { id: string; __typename: "StatsBlock"; title?: string; stats: Array<{ label: string; value: string }> }
  | { id: string; __typename: "VideoEmbedBlock"; title?: string; embedUrl: string; caption?: string };

export type FaqItem = {
  id: string;
  question: string;
  answer: Document;
};

export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  clientTitle?: string;
  company?: string;
  avatarUrl?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  media: ContentfulAsset;
  altText?: string;
  caption?: string;
};

export type Gallery = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  items: GalleryItem[];
};

export type ContentPage = SeoFields & {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  blocks: ContentBlock[];
  faqItems?: FaqItem[];
};

export type ServicePage = SeoFields & {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage?: ContentfulAsset;
  overview?: Document;
  featureList?: string[];
  pricingSummary?: string;
  blocks: ContentBlock[];
  faqItems?: FaqItem[];
  relatedServices?: Array<Pick<ServicePage, "id" | "title" | "slug" | "summary">>;
};

export type BlogPost = SeoFields & {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: ContentfulAsset;
  authorName?: string;
  publishedAt: string;
  updatedAt?: string;
  content: Document;
  readTime?: string;
  category?: { title: string; slug: string };
  tags?: Array<{ title: string; slug: string }>;
};

export type LandingPage = SeoFields & {
  id: string;
  title: string;
  slug: string;
  campaignKey?: string;
  blocks: ContentBlock[];
  faqItems?: FaqItem[];
};

export type SiteSettings = {
  siteName: string;
  siteUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage?: ContentfulAsset;
  supportEmail?: string;
  phoneNumber?: string;
  address?: string;
};
