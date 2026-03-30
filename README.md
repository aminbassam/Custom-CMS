# Custom CMS Website

Production-ready Next.js + Contentful website scaffold with a secure dashboard for operational management.

This project separates editorial content from business operations:

- Contentful is the source of truth for public website content
- PostgreSQL + Prisma power the internal dashboard, users, submissions, logs, exports, and workflow state
- Next.js App Router handles public rendering, secure dashboard routes, preview mode, SEO metadata, and revalidation

## Highlights

- Next.js App Router with React and strict TypeScript
- Tailwind CSS UI foundation
- Contentful Delivery API + Preview API integration layer
- PostgreSQL data model for internal operations
- Prisma ORM schema and seed scaffold
- Auth.js credentials authentication with RBAC foundations
- Zod validation and React Hook Form for public and dashboard forms
- SEO-ready public routes with sitemap, robots, metadata, and preview support
- Dashboard modules for submissions, users, roles, activity logs, settings helpers, and Contentful-linked operational tools

## Architecture Overview

### Contentful manages

- pages
- services
- blog posts
- categories and tags
- FAQs
- testimonials
- galleries
- navigation menus
- site settings
- SEO fields
- reusable section blocks
- landing pages

### PostgreSQL manages

- dashboard users
- roles and permissions
- form submissions
- submission notes
- activity logs
- audit events
- exports
- optional SEO overrides
- optional media asset index

### Next.js manages

- public route rendering
- dynamic routes for services, blog posts, and landing pages
- preview mode
- webhook-based revalidation
- dashboard UI
- protected routes and server-side permission checks
- form handling and internal server actions

## Route Scope

### Public website

- `/`
- `/about`
- `/services`
- `/services/[slug]`
- `/contact`
- `/blog`
- `/blog/[slug]`
- `/blog/category/[slug]`
- `/blog/tag/[slug]`
- `/faq`
- `/testimonials`
- `/gallery`
- `/landing/[slug]`
- `/privacy-policy`
- `/terms-of-service`
- `/search`
- `/thank-you`

### Dashboard

- `/dashboard`
- `/dashboard/login`
- `/dashboard/forgot-password`
- `/dashboard/reset-password`
- `/dashboard/submissions`
- `/dashboard/submissions/[id]`
- `/dashboard/users`
- `/dashboard/users/new`
- `/dashboard/users/[id]/edit`
- `/dashboard/roles`
- `/dashboard/activity-logs`
- `/dashboard/profile`
- helper modules for pages, posts, services, landing pages, categories, tags, media, menus, SEO, and settings

## Project Structure

```text
.
├─ docs/
├─ prisma/
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  ├─ api/
│  │  └─ dashboard/
│  ├─ components/
│  ├─ lib/
│  └─ types/
├─ middleware.ts
├─ package.json
└─ tailwind.config.ts
```

## Key Files

- `docs/solution-architecture.md`
- `docs/contentful-models.md`
- `docs/database-schema.md`
- `docs/route-and-api-design.md`
- `docs/roadmap.md`
- `prisma/schema.prisma`
- `src/lib/contentful/api.ts`
- `src/lib/auth/config.ts`
- `src/app/api/contact/route.ts`

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Important variables:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `APP_URL`
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN`
- `CONTENTFUL_WEBHOOK_SECRET`

## Local Development

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Deployment Notes

- Deploy the Next.js app to Vercel
- Use managed PostgreSQL for the operational data layer
- Configure Contentful webhooks to call the revalidation endpoint
- Use Contentful preview links to enable draft mode

## Documentation

- [Solution architecture](./docs/solution-architecture.md)
- [Contentful model map](./docs/contentful-models.md)
- [Database schema](./docs/database-schema.md)
- [Route and API design](./docs/route-and-api-design.md)
- [Build roadmap](./docs/roadmap.md)
