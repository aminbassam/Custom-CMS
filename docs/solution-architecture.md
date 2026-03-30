# Solution Architecture

## Executive Summary

This starter uses Contentful as the source of truth for public-facing content and PostgreSQL for operational records. The public website is optimized for SEO and performance with server components, static generation, incremental revalidation, and preview support. The dashboard is a separate authenticated surface for user management, submissions, workflow helpers, exports, settings helpers, and auditing.

## Core Decisions

1. Contentful owns editorial content:
   - pages, services, blog posts, taxonomies, FAQs, testimonials, galleries, landing pages, navigation, SEO fields, reusable blocks
2. PostgreSQL owns business operations:
   - users, roles, permissions, submissions, notes, logs, exports, audit events
3. Next.js owns orchestration:
   - rendering, preview mode, route protection, metadata generation, revalidation, forms, internal actions

## App Layers

### Public Website

- Built with server components by default
- Uses Delivery API for published pages
- Uses Preview API when draft mode is enabled
- Uses dynamic metadata generation and schema markup per route
- Uses ISR for content-driven routes with webhook-driven revalidation

### Dashboard

- Protected under `/dashboard/*`
- Auth.js credentials authentication with bcrypt password hashing
- Role-based access control with route and action checks
- Server actions for authenticated mutations
- Audit logs for sensitive actions

### Integration Layer

- `src/lib/contentful/*` for CMS access and mapping
- `src/lib/auth/*` for auth and permissions
- `src/lib/security/*` for rate limiting, origin checks, and audit helpers
- `src/lib/actions/*` for server-side mutations

## Deployment Topology

- Frontend: Vercel
- Database: Managed PostgreSQL such as Neon, Supabase, or RDS
- Content: Contentful
- Optional rate limiting/cache: Upstash Redis

## Extension Paths

- Multilingual support through Contentful localization and locale-aware routes
- CRM sync through background jobs or webhooks
- Analytics with event sinks to PostHog, GA4, or Segment
- AI-assisted editorial tooling via dashboard workflow helpers rather than direct public rendering
