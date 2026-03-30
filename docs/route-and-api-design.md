# Route and API Design

## Public Routes

- `/` home and solution overview
- `/about` CMS-managed static page
- `/services` service listing
- `/services/[slug]` dynamic service detail
- `/contact` validated contact form
- `/blog` post listing
- `/blog/[slug]` post detail
- `/blog/category/[slug]` category archive
- `/blog/tag/[slug]` tag archive
- `/faq` FAQ listing
- `/testimonials` testimonials listing
- `/gallery` galleries listing
- `/landing/[slug]` campaign landing page
- `/privacy-policy` CMS-managed legal page
- `/terms-of-service` CMS-managed legal page
- `/search` foundation search route
- `/thank-you` confirmation route

## Dashboard Routes

- `/dashboard` overview metrics
- `/dashboard/login` auth entry
- `/dashboard/forgot-password` password reset entry point placeholder
- `/dashboard/reset-password` token reset placeholder
- `/dashboard/submissions` submissions table
- `/dashboard/submissions/[id]` submission detail
- `/dashboard/users` user directory
- `/dashboard/users/new` invitation flow placeholder
- `/dashboard/users/[id]/edit` user management placeholder
- `/dashboard/roles` role and permission visibility
- `/dashboard/activity-logs` activity stream
- `/dashboard/profile` current user profile
- `/dashboard/pages*`, `/dashboard/posts*`, `/dashboard/services*`, `/dashboard/landing-pages*`, `/dashboard/categories`, `/dashboard/tags`, `/dashboard/media*`, `/dashboard/menus`, `/dashboard/seo`, `/dashboard/settings`
  - Helper routes for Contentful-linked workflows, previews, QA, indexing, and internal tooling

## API Routes

- `POST /api/contact`
  - Validates contact submissions with Zod
  - Performs origin checks and rate limiting
  - Stores submission in PostgreSQL
  - Creates audit and activity records
- `GET /api/preview`
  - Enables draft mode for Preview API rendering
- `POST /api/revalidate`
  - Verifies Contentful webhook signature
  - Revalidates affected routes
- `GET|POST /api/auth/[...nextauth]`
  - Auth.js handler surface
- `GET /api/dashboard/exports/submissions`
  - Authenticated CSV export for submissions

## Server Actions

- `authenticate` in `src/app/dashboard/login/actions.ts`
  - Rate-limited credentials login
- `updateSubmissionStatusAction` in `src/lib/actions/submissions.ts`
  - Authenticated submission lifecycle update
- `addSubmissionNoteAction` in `src/lib/actions/submissions.ts`
  - Internal note creation with audit and revalidation
