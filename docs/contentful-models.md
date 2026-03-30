# Contentful Model Map

All content types are non-localized by default in this starter, but field names and route design are localization-ready. If multilingual support is needed later, fields marked as editorial or SEO content should become localized first.

## Page

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Entry title |
| slug | Short text | Yes | unique, regex `^[a-z0-9-]+$` | No | Route segment except reserved slugs |
| internalName | Short text | No | max 120 | No | Editor helper |
| pageType | Short text | Yes | enum: standard, legal, utility | No | Controls templates |
| seoTitle | Short text | No | max 60 | No | SERP title |
| seoDescription | Long text | No | max 160 | No | SERP description |
| ogTitle | Short text | No | max 90 | No | Social title override |
| ogDescription | Long text | No | max 200 | No | Social description override |
| ogImage | Media | No | image only | No | Open Graph image |
| canonicalUrl | Short text | No | URL | No | Canonical override |
| noIndex | Boolean | No | default false | No | Robots control |
| heroImage | Media | No | image only | No | Optional page share image |
| excerpt | Long text | No | max 300 | No | Intro text |
| blocks | Reference, many | No | Block union types | No | Main page builder |
| faqItems | Reference, many | No | FAQ | No | Page-level FAQ |
| relatedServices | Reference, many | No | Service | No | Cross-linking |
| schemaType | Short text | No | enum: WebPage, AboutPage, ContactPage, FAQPage | No | Structured data helper |
| publishedAt | Date/Time | No | | No | Optional marketing timestamp |

## Service

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Entry title |
| slug | Short text | Yes | unique, regex `^[a-z0-9-]+$` | No | Route segment |
| summary | Long text | Yes | max 300 | No | Listing summary |
| seoTitle | Short text | No | max 60 | No | SEO |
| seoDescription | Long text | No | max 160 | No | SEO |
| ogImage | Media | No | image only | No | Social image |
| canonicalUrl | Short text | No | URL | No | Canonical override |
| noIndex | Boolean | No | default false | No | Robots control |
| heroBlock | Reference, one | No | HeroBlock | No | Dedicated hero |
| overview | Rich text | No | | No | Service overview |
| benefitsBlock | Reference, one | No | FeatureGridBlock | No | Benefits grid |
| processBlock | Reference, one | No | RichTextBlock or FeatureGridBlock | No | Delivery steps |
| pricingSummary | Long text | No | max 500 | No | Pricing teaser |
| faqItems | Reference, many | No | FAQ | No | Service FAQ |
| relatedServices | Reference, many | No | Service | No | Cross-links |
| bodyBlocks | Reference, many | No | Block union types | No | Additional content |
| featuredImage | Media | No | image only | No | Listing/media |
| sortOrder | Integer | No | min 0 | No | Listing sort |

## BlogPost

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Entry title |
| slug | Short text | Yes | unique, regex `^[a-z0-9-]+$` | No | Route segment |
| excerpt | Long text | Yes | max 320 | No | Blog cards |
| featuredImage | Media | No | image only | No | Article hero |
| authorName | Short text | No | max 80 | No | Simple author model |
| publishedAt | Date/Time | Yes | | No | Sorting |
| updatedAt | Date/Time | No | | No | Freshness |
| category | Reference, one | No | Category | No | Primary category |
| tags | Reference, many | No | Tag | No | Tags |
| seoTitle | Short text | No | max 60 | No | SEO |
| seoDescription | Long text | No | max 160 | No | SEO |
| ogImage | Media | No | image only | No | Social image |
| canonicalUrl | Short text | No | URL | No | Canonical override |
| noIndex | Boolean | No | default false | No | Robots control |
| content | Rich text | Yes | embedded entries/assets allowed | No | Main body |
| relatedPosts | Reference, many | No | BlogPost | No | Cross-links |
| readingTimeMinutes | Integer | No | min 1 | No | Manual override |
| featured | Boolean | No | default false | No | Editorial flag |

## Category

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 80 | No | Label |
| slug | Short text | Yes | unique | No | Route segment |
| description | Long text | No | max 200 | No | Archive intro |

## Tag

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 80 | No | Label |
| slug | Short text | Yes | unique | No | Route segment |
| description | Long text | No | max 200 | No | Optional helper |

## FAQ

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| question | Short text | Yes | max 180 | No | FAQ prompt |
| answer | Rich text | Yes | | No | FAQ answer |
| categoryLabel | Short text | No | max 80 | No | Editorial grouping |
| sortOrder | Integer | No | min 0 | No | Manual ordering |

## Testimonial

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| quote | Long text | Yes | max 800 | No | Testimonial text |
| clientName | Short text | Yes | max 100 | No | Attribution |
| clientTitle | Short text | No | max 120 | No | Subtitle |
| company | Short text | No | max 120 | No | Organization |
| avatar | Media | No | image only | No | Optional portrait |
| rating | Integer | No | min 1, max 5 | No | Review rating |
| featured | Boolean | No | default false | No | Home highlight |
| sortOrder | Integer | No | min 0 | No | Ordering |

## Gallery

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Gallery label |
| slug | Short text | Yes | unique | No | Route or lookup key |
| description | Long text | No | max 300 | No | Intro |
| items | Reference, many | Yes | GalleryItem | No | Images/videos |
| featured | Boolean | No | default false | No | Home highlight |

## GalleryItem

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Item label |
| media | Media | Yes | image or video thumbnail | No | Asset |
| altText | Short text | No | max 180 | No | Accessibility |
| caption | Long text | No | max 300 | No | Caption |
| linkedUrl | Short text | No | URL | No | Optional external link |
| sortOrder | Integer | No | min 0 | No | Ordering |

## SiteSettings

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| siteName | Short text | Yes | max 80 | No | Brand name |
| siteUrl | Short text | Yes | URL | No | Canonical base |
| defaultSeoTitle | Short text | Yes | max 60 | No | Fallback SEO title |
| defaultSeoDescription | Long text | Yes | max 160 | No | Fallback SEO description |
| defaultOgImage | Media | No | image only | No | Fallback social image |
| supportEmail | Short text | No | email | No | Contact |
| phoneNumber | Short text | No | max 30 | No | Contact |
| address | Long text | No | max 250 | No | Contact |
| footerCopyright | Short text | No | max 120 | No | Footer |
| headerMenu | Reference, one | No | NavigationMenu | No | Header menu |
| footerMenu | Reference, one | No | NavigationMenu | No | Footer menu |
| socialLinks | Object | No | JSON object | No | Platform URLs |
| organizationSchema | Object | No | JSON object | No | Schema extension |
| analyticsIds | Object | No | JSON object | No | Measurement IDs |

## NavigationMenu

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 80 | No | Menu label |
| location | Short text | Yes | enum: header, footer, utility | No | Placement |
| items | Reference, many | Yes | NavigationMenuItem | No | Ordered items |

## NavigationMenuItem

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| label | Short text | Yes | max 80 | No | Link text |
| linkType | Short text | Yes | enum: internal, external | No | Link behavior |
| internalPage | Reference, one | No | Page, Service, BlogPost, LandingPage | No | Internal target |
| externalUrl | Short text | No | URL | No | External target |
| openInNewTab | Boolean | No | default false | No | External link helper |
| children | Reference, many | No | NavigationMenuItem | No | Nested menus |
| sortOrder | Integer | No | min 0 | No | Ordering |

## LandingPage

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Entry title |
| slug | Short text | Yes | unique | No | Route segment |
| campaignKey | Short text | No | max 80 | No | Marketing key |
| seoTitle | Short text | No | max 60 | No | SEO |
| seoDescription | Long text | No | max 160 | No | SEO |
| ogImage | Media | No | image only | No | Social image |
| canonicalUrl | Short text | No | URL | No | Canonical override |
| noIndex | Boolean | No | default false | No | Robots control |
| heroBlock | Reference, one | No | HeroBlock | No | Dedicated hero |
| blocks | Reference, many | Yes | Block union types | No | Landing body |
| formVariant | Short text | No | enum: contact, consultation, quote | No | CTA routing |
| faqItems | Reference, many | No | FAQ | No | Landing FAQs |
| expiryDate | Date/Time | No | | No | Campaign control |

## HeroBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| eyebrow | Short text | No | max 60 | No | Small label |
| headline | Short text | Yes | max 140 | No | Main title |
| subheadline | Long text | No | max 280 | No | Support text |
| backgroundImage | Media | No | image only | No | Visual |
| primaryCtaLabel | Short text | No | max 40 | No | CTA |
| primaryCtaUrl | Short text | No | URL or internal path | No | CTA target |
| secondaryCtaLabel | Short text | No | max 40 | No | CTA |
| secondaryCtaUrl | Short text | No | URL or internal path | No | CTA target |
| alignment | Short text | No | enum: left, center | No | Presentation |

## RichTextBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Section title |
| content | Rich text | Yes | | No | Body copy |
| width | Short text | No | enum: narrow, regular, wide | No | Layout helper |

## ImageBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| image | Media | Yes | image only | No | Asset |
| altText | Short text | No | max 180 | No | Accessibility override |
| caption | Short text | No | max 180 | No | Optional caption |
| aspectRatio | Short text | No | enum: square, video, portrait, landscape | No | Layout helper |

## ImageTextBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | Yes | max 120 | No | Section heading |
| body | Rich text | Yes | | No | Content |
| image | Media | Yes | image only | No | Asset |
| imagePosition | Short text | No | enum: left, right | No | Layout |
| ctaLabel | Short text | No | max 40 | No | Optional CTA |
| ctaUrl | Short text | No | URL or internal path | No | CTA target |

## CtaBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| headline | Short text | Yes | max 120 | No | CTA title |
| body | Long text | No | max 240 | No | Support copy |
| buttonLabel | Short text | Yes | max 40 | No | Button text |
| buttonUrl | Short text | Yes | URL or internal path | No | Button target |
| styleVariant | Short text | No | enum: primary, secondary, accent | No | Presentation |

## FaqGroupBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Section heading |
| intro | Long text | No | max 240 | No | Intro |
| faqItems | Reference, many | Yes | FAQ | No | FAQ list |

## TestimonialSliderBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Heading |
| testimonials | Reference, many | Yes | Testimonial | No | Slides |
| autoplay | Boolean | No | default false | No | UX helper |

## GalleryBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Heading |
| gallery | Reference, one | Yes | Gallery | No | Linked gallery |
| layout | Short text | No | enum: grid, masonry, carousel | No | Display helper |

## FeatureGridBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Heading |
| intro | Long text | No | max 240 | No | Intro |
| features | Object | Yes | JSON array of items with title, body, icon | No | Keeps model simple |
| columns | Integer | No | min 2, max 4 | No | Layout |

## StatsBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Heading |
| stats | Object | Yes | JSON array with label and value | No | KPI list |
| styleVariant | Short text | No | enum: light, dark | No | Presentation |

## VideoEmbedBlock

| Field | Type | Required | Validations / Reference | Localized | Notes |
| --- | --- | --- | --- | --- | --- |
| title | Short text | No | max 120 | No | Heading |
| embedUrl | Short text | Yes | URL, allow YouTube/Vimeo | No | Video source |
| thumbnail | Media | No | image only | No | Poster |
| caption | Short text | No | max 180 | No | Optional caption |
