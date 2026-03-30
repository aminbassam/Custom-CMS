import { BLOCKS, type Document, type Heading2, type Paragraph } from "@contentful/rich-text-types";

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

function asset(url: string, title: string, width = 1600, height = 900): ContentfulAsset {
  return { url, title, width, height };
}

function paragraph(text: string): Paragraph {
  return {
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: [
      {
        nodeType: "text" as const,
        value: text,
        marks: [],
        data: {}
      }
    ]
  };
}

function heading(text: string): Heading2 {
  return {
    nodeType: BLOCKS.HEADING_2,
    data: {},
    content: [
      {
        nodeType: "text" as const,
        value: text,
        marks: [],
        data: {}
      }
    ]
  };
}

function richText(sections: Array<{ type: "heading" | "paragraph"; text: string }>): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: sections.map((section) =>
      section.type === "heading" ? heading(section.text) : paragraph(section.text)
    )
  };
}

export const localSiteSettings: SiteSettings = {
  siteName: "Northstar Studio",
  siteUrl: "http://localhost:3017",
  defaultSeoTitle: "Northstar Studio | Web, SEO, and Brand Growth",
  defaultSeoDescription:
    "A polished Next.js + Contentful website with an internal dashboard for leads, users, media helpers, and site operations.",
  defaultOgImage: asset(
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop",
    "Northstar Studio team"
  ),
  supportEmail: "hello@northstarstudio.com",
  phoneNumber: "+1 (713) 555-0148"
};

export const localFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How long does a typical website project take?",
    answer: richText([
      { type: "paragraph", text: "Most marketing sites launch in four to eight weeks depending on content readiness, approvals, and integrations." }
    ])
  },
  {
    id: "faq-2",
    question: "Can you work with our marketing team after launch?",
    answer: richText([
      { type: "paragraph", text: "Yes. We support ongoing campaigns, landing pages, SEO improvements, analytics reviews, and conversion optimization." }
    ])
  },
  {
    id: "faq-3",
    question: "Do you provide SEO and content strategy?",
    answer: richText([
      { type: "paragraph", text: "We do. SEO structure, metadata, local landing pages, editorial planning, and conversion-focused content are all part of our growth stack." }
    ])
  },
  {
    id: "faq-4",
    question: "Will my team be able to edit content later?",
    answer: richText([
      { type: "paragraph", text: "Yes. Public content lives in Contentful, while the operational dashboard handles internal workflows and lead management." }
    ])
  }
];

export const localTestimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote: "The redesign gave our team a site we were finally proud to send prospects to, and lead quality improved almost immediately.",
    clientName: "Jennifer Smith",
    clientTitle: "CEO",
    company: "TechStart Inc"
  },
  {
    id: "testimonial-2",
    quote: "They brought structure to our content, clarified our offers, and shipped a polished experience without slowing down the business.",
    clientName: "Robert Anderson",
    clientTitle: "Founder",
    company: "GrowthLabs"
  },
  {
    id: "testimonial-3",
    quote: "This was more than a website project. It gave our marketing and operations teams a system they can actually manage.",
    clientName: "Lisa Thompson",
    clientTitle: "Marketing Director",
    company: "Innovate Co"
  }
];

export const localServices: ServicePage[] = [
  {
    id: "service-1",
    title: "Web Development",
    slug: "web-development",
    summary: "Custom web experiences built for performance, flexibility, and lead generation.",
    seoTitle: "Web Development Services",
    seoDescription: "Custom web development for modern brands that need speed, SEO, and scalable content operations.",
    ogImage: asset("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop", "Web development"),
    featuredImage: asset("https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=900&fit=crop", "Web development"),
    overview: richText([
      { type: "paragraph", text: "We build conversion-focused websites and application surfaces with a strong content architecture, solid performance, and room for your team to grow." },
      { type: "heading", text: "What this usually includes" },
      { type: "paragraph", text: "Discovery, UX architecture, responsive implementation, CMS modeling, analytics hooks, and launch support." }
    ]),
    featureList: ["Responsive design", "SEO-ready architecture", "Performance optimization", "Secure integrations"],
    pricingSummary: "Starting at $5,000",
    blocks: [
      {
        id: "service-1-hero",
        __typename: "HeroBlock",
        headline: "Web experiences that turn traffic into pipeline.",
        subheadline: "Built on a structured content model so your team can publish, scale, and iterate without rebuilding every quarter."
      },
      {
        id: "service-1-benefits",
        __typename: "FeatureGridBlock",
        title: "Why teams hire us for web delivery",
        intro: "We focus on launch quality and operational clarity, not just visual polish.",
        features: [
          { title: "Fast pages", body: "Strong performance baselines for SEO, UX, and conversion." },
          { title: "CMS flexibility", body: "Structured sections and content models that keep publishing clean." },
          { title: "Operational fit", body: "Leads, settings, internal workflows, and visibility live alongside the website." }
        ]
      },
      {
        id: "service-1-stats",
        __typename: "StatsBlock",
        title: "What a healthy site foundation looks like",
        stats: [
          { label: "Core templates", value: "12+" },
          { label: "Reusable content blocks", value: "10" },
          { label: "Operational modules", value: "8" },
          { label: "Launch readiness focus", value: "High" }
        ]
      }
    ],
    faqItems: localFaqs.slice(0, 2)
  },
  {
    id: "service-2",
    title: "Digital Marketing",
    slug: "digital-marketing",
    summary: "Campaign systems and SEO programs designed to grow traffic quality, not just volume.",
    seoTitle: "Digital Marketing Services",
    seoDescription: "SEO, local landing pages, and campaign strategy aligned to measurable revenue goals.",
    ogImage: asset("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop", "Digital marketing"),
    featuredImage: asset("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop", "Digital marketing"),
    overview: richText([
      { type: "paragraph", text: "We connect search intent, landing page structure, and reporting into a system your team can actually operate." }
    ]),
    featureList: ["SEO strategy", "Landing page systems", "Content planning", "Reporting visibility"],
    pricingSummary: "Starting at $2,000/month",
    blocks: [
      {
        id: "service-2-grid",
        __typename: "FeatureGridBlock",
        title: "Growth work with structure",
        intro: "Good marketing operations need the content model and workflow to support them.",
        features: [
          { title: "Campaign architecture", body: "Channel-specific landing pages and CTA flows." },
          { title: "Editorial support", body: "Blog and service content tied to search demand." },
          { title: "Measurement", body: "Dashboards and logs for operational follow-through." }
        ]
      }
    ],
    faqItems: localFaqs.slice(1, 3)
  },
  {
    id: "service-3",
    title: "Brand Design",
    slug: "brand-design",
    summary: "Positioning, messaging, and visual systems that make the website feel unmistakably yours.",
    ogImage: asset("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop", "Brand design"),
    featuredImage: asset("https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop", "Brand design"),
    overview: richText([
      { type: "paragraph", text: "We sharpen your voice and visual system so every page feels aligned, intentional, and conversion ready." }
    ]),
    featureList: ["Positioning", "Messaging systems", "Design language", "Brand guidelines"],
    pricingSummary: "Starting at $3,500",
    blocks: [],
    faqItems: localFaqs.slice(2, 4)
  },
  {
    id: "service-4",
    title: "Content Strategy",
    slug: "content-strategy",
    summary: "Content planning that supports SEO, conversions, and a sane publishing workflow.",
    ogImage: asset("https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&h=900&fit=crop", "Content strategy"),
    featuredImage: asset("https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=1600&h=900&fit=crop", "Content strategy"),
    overview: richText([
      { type: "paragraph", text: "We turn disconnected ideas into an editorial system with clear content types, reusable blocks, and a better publishing cadence." }
    ]),
    featureList: ["Content modeling", "Editorial planning", "Blog strategy", "Conversion messaging"],
    pricingSummary: "Starting at $1,500/month",
    blocks: [],
    faqItems: localFaqs.slice(0, 1)
  }
];

for (const service of localServices) {
  service.relatedServices = localServices
    .filter((candidate) => candidate.id !== service.id)
    .slice(0, 2)
    .map((candidate) => ({
      id: candidate.id,
      title: candidate.title,
      slug: candidate.slug,
      summary: candidate.summary
    }));
}

export const localBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "10 Web Design Trends for 2026",
    slug: "web-design-trends-2026",
    excerpt: "A practical look at the design patterns reshaping modern marketing sites, from flexible storytelling layouts to more useful motion.",
    featuredImage: asset("https://images.unsplash.com/photo-1547658719-da2b51169166?w=1600&h=900&fit=crop", "Web design trends"),
    authorName: "Sarah Johnson",
    publishedAt: "2026-03-25T10:00:00.000Z",
    updatedAt: "2026-03-27T10:00:00.000Z",
    category: { title: "Design", slug: "design" },
    tags: [
      { title: "UI", slug: "ui" },
      { title: "Conversion", slug: "conversion" }
    ],
    readTime: "8 min read",
    seoTitle: "10 Web Design Trends for 2026",
    seoDescription: "The most relevant design moves shaping modern websites this year.",
    content: richText([
      { type: "paragraph", text: "Design trends matter when they improve comprehension, trust, or conversion. The strongest ones this year are less about novelty and more about clarity." },
      { type: "heading", text: "Story-first layouts" },
      { type: "paragraph", text: "Sections are becoming more modular, helping teams mix proof, explanation, and action without redesigning every page." },
      { type: "heading", text: "Motion with a purpose" },
      { type: "paragraph", text: "Animation works best when it guides attention, explains a change, or makes a CTA feel more intentional." }
    ])
  },
  {
    id: "post-2",
    title: "The Complete Guide to SEO in 2026",
    slug: "complete-guide-seo-2026",
    excerpt: "SEO in 2026 is less about keyword stuffing and more about content architecture, search intent, and technical trust signals.",
    featuredImage: asset("https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1600&h=900&fit=crop", "SEO guide"),
    authorName: "Michael Chen",
    publishedAt: "2026-03-20T10:00:00.000Z",
    category: { title: "Marketing", slug: "marketing" },
    tags: [
      { title: "SEO", slug: "seo" },
      { title: "Content", slug: "content" }
    ],
    readTime: "12 min read",
    content: richText([
      { type: "paragraph", text: "Good SEO starts with good structure. Your content types, internal links, metadata, and landing page strategy all matter." },
      { type: "heading", text: "Search intent first" },
      { type: "paragraph", text: "Every page should answer a real user job, whether that is learning, comparing, or contacting." }
    ])
  },
  {
    id: "post-3",
    title: "Building High-Converting Landing Pages",
    slug: "high-converting-landing-pages",
    excerpt: "How to combine clarity, proof, and intent-specific CTAs into landing pages that earn real action.",
    featuredImage: asset("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop", "Landing pages"),
    authorName: "Emma Williams",
    publishedAt: "2026-03-15T10:00:00.000Z",
    category: { title: "Conversion", slug: "conversion" },
    tags: [
      { title: "Landing Pages", slug: "landing-pages" },
      { title: "UX", slug: "ux" }
    ],
    readTime: "10 min read",
    content: richText([
      { type: "paragraph", text: "Strong landing pages reduce decision friction. The headline, proof, and form flow need to work together." },
      { type: "heading", text: "Proof placement" },
      { type: "paragraph", text: "Testimonials, examples, and trust indicators should appear before the user has to take the largest leap of faith." }
    ])
  },
  {
    id: "post-4",
    title: "Creating Accessible Websites",
    slug: "creating-accessible-websites",
    excerpt: "Accessibility is part of quality, not a final checklist. Here is how to design and build with it from the start.",
    featuredImage: asset("https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1600&h=900&fit=crop", "Accessible websites"),
    authorName: "Michael Chen",
    publishedAt: "2026-03-01T10:00:00.000Z",
    category: { title: "Development", slug: "development" },
    tags: [
      { title: "Accessibility", slug: "accessibility" }
    ],
    readTime: "11 min read",
    content: richText([
      { type: "paragraph", text: "Accessibility improves usability, reach, and confidence. It also tends to produce simpler and stronger interfaces." }
    ])
  }
];

export const localGalleries: Gallery[] = [
  {
    id: "gallery-1",
    title: "Recent Launches",
    slug: "recent-launches",
    description: "Selected website and campaign work.",
    items: [
      {
        id: "gallery-1-item-1",
        title: "Project dashboard",
        media: asset("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop", "Project dashboard", 1200, 900),
        caption: "Analytics-friendly campaign dashboard"
      },
      {
        id: "gallery-1-item-2",
        title: "Team strategy",
        media: asset("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop", "Team strategy", 1200, 900),
        caption: "Workshops and planning sessions"
      },
      {
        id: "gallery-1-item-3",
        title: "Design system",
        media: asset("https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=900&fit=crop", "Design system", 1200, 900),
        caption: "Intentional design language"
      }
    ]
  }
];

export const localPages: Record<string, ContentPage> = {
  "privacy-policy": {
    id: "page-privacy",
    title: "Privacy Policy",
    slug: "privacy-policy",
    blocks: [
      {
        id: "privacy-text",
        __typename: "RichTextBlock",
        title: "How we handle data",
        content: richText([
          { type: "paragraph", text: "This starter stores operational records like contact submissions, users, and activity logs in PostgreSQL. Public content is managed in Contentful." },
          { type: "paragraph", text: "When you turn on analytics, CRM integrations, or exports, update this policy to reflect the live deployment accurately." }
        ])
      }
    ]
  },
  "terms-of-service": {
    id: "page-terms",
    title: "Terms of Service",
    slug: "terms-of-service",
    blocks: [
      {
        id: "terms-text",
        __typename: "RichTextBlock",
        title: "Starter terms placeholder",
        content: richText([
          { type: "paragraph", text: "Use this route as the legal terms page for your deployed website. Replace this draft copy with counsel-approved language before launch." }
        ])
      }
    ]
  },
  about: {
    id: "page-about",
    title: "About Northstar Studio",
    slug: "about",
    excerpt: "We help teams turn scattered digital efforts into clear, high-performing website systems.",
    blocks: [
      {
        id: "about-story",
        __typename: "RichTextBlock",
        title: "Our approach",
        content: richText([
          { type: "paragraph", text: "We combine strategy, design, and implementation so your marketing site does not become an isolated design artifact or an operational burden." },
          { type: "paragraph", text: "The goal is a site your team can publish through confidently and a dashboard your operators can actually use." }
        ])
      }
    ]
  }
};

export const localLandingPages: LandingPage[] = [
  {
    id: "landing-1",
    title: "Houston Web Design",
    slug: "houston-web-design",
    campaignKey: "houston-web-design",
    blocks: [
      {
        id: "landing-hero",
        __typename: "HeroBlock",
        headline: "Houston web design for teams that need more than a brochure site.",
        subheadline: "Designed for local search visibility, cleaner messaging, and stronger lead capture."
      },
      {
        id: "landing-cta",
        __typename: "CtaBlock",
        headline: "Need a campaign-ready landing page system?",
        body: "We can build reusable page patterns and a workflow your team can sustain after launch.",
        buttonLabel: "Book a consultation",
        buttonUrl: "/contact"
      }
    ],
    faqItems: localFaqs.slice(0, 2)
  }
];

export const aboutValues = [
  {
    title: "Results-driven",
    description: "Every page should help the business move, whether that means lead quality, clarity, or editorial efficiency."
  },
  {
    title: "Client-focused",
    description: "We design for the people who have to use and maintain the system after launch, not just the launch moment."
  },
  {
    title: "Quality first",
    description: "Solid structure, readable content, and thoughtful interfaces age better than flashy shortcuts."
  },
  {
    title: "Continuous improvement",
    description: "Good websites get sharper over time through data, content iteration, and better internal workflows."
  }
];

export const teamMembers = [
  {
    id: "team-1",
    name: "Sarah Johnson",
    role: "Creative Director",
    bio: "Shapes the narrative, content direction, and visual language across launch projects.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop"
  },
  {
    id: "team-2",
    name: "Michael Chen",
    role: "Technical Lead",
    bio: "Designs the content architecture, performance model, and integration strategy.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
  },
  {
    id: "team-3",
    name: "Emma Williams",
    role: "Growth Strategist",
    bio: "Aligns landing pages, SEO structure, and campaign workflows with the sales motion.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop"
  },
  {
    id: "team-4",
    name: "David Martinez",
    role: "Operations Designer",
    bio: "Turns internal admin and client workflows into tools that people actually want to use.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop"
  }
];

export function getLocalPageBySlug(slug: string) {
  return localPages[slug] ?? null;
}

export function getLocalServiceBySlug(slug: string) {
  return localServices.find((service) => service.slug === slug) ?? null;
}

export function getLocalBlogPostBySlug(slug: string) {
  return localBlogPosts.find((post) => post.slug === slug) ?? null;
}

export function getLocalLandingPageBySlug(slug: string) {
  return localLandingPages.find((page) => page.slug === slug) ?? null;
}

export function getLocalBlogPostsByCategory(slug: string) {
  return localBlogPosts.filter((post) => post.category?.slug === slug);
}

export function getLocalBlogPostsByTag(slug: string) {
  return localBlogPosts.filter((post) => post.tags?.some((tag) => tag.slug === slug));
}
