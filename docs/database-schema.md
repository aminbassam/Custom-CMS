# Database Schema

## dashboard_users

- `id` UUID PK
- `email` varchar(320) unique not null
- `name` varchar(120) null
- `password_hash` varchar(255) not null
- `status` varchar(24) not null default `active`
- `avatar_url` varchar(500) null
- `last_login_at` timestamptz null
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()
- Indexes: unique on `email`, index on `status`

## roles

- `id` UUID PK
- `name` varchar(80) unique not null
- `slug` varchar(80) unique not null
- `description` text null
- `is_system` boolean not null default false
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()

## permissions

- `id` UUID PK
- `resource` varchar(80) not null
- `action` varchar(80) not null
- `description` text null
- `created_at` timestamptz not null default now()
- Unique constraint on `resource`, `action`

## role_permissions

- `id` UUID PK
- `role_id` UUID FK -> `roles.id`
- `permission_id` UUID FK -> `permissions.id`
- `created_at` timestamptz not null default now()
- Unique constraint on `role_id`, `permission_id`
- Indexes on `role_id`, `permission_id`

## user_permissions

- `id` UUID PK
- `user_id` UUID FK -> `dashboard_users.id`
- `permission_id` UUID FK -> `permissions.id`
- `allowed` boolean not null default true
- `created_at` timestamptz not null default now()
- Unique constraint on `user_id`, `permission_id`
- Indexes on `user_id`, `permission_id`

## dashboard_user_roles

- `id` UUID PK
- `user_id` UUID FK -> `dashboard_users.id`
- `role_id` UUID FK -> `roles.id`
- `created_at` timestamptz not null default now()
- Unique constraint on `user_id`, `role_id`

## form_submissions

- `id` UUID PK
- `source` varchar(80) not null
- `form_type` varchar(80) not null
- `name` varchar(120) not null
- `email` varchar(320) not null
- `phone` varchar(40) null
- `company` varchar(120) null
- `message` text not null
- `status` varchar(24) not null default `new`
- `metadata` jsonb null
- `assigned_user_id` UUID FK -> `dashboard_users.id` null
- `resolved_at` timestamptz null
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()
- Indexes on `status`, `email`, `created_at desc`

## submission_notes

- `id` UUID PK
- `submission_id` UUID FK -> `form_submissions.id`
- `author_user_id` UUID FK -> `dashboard_users.id`
- `note` text not null
- `created_at` timestamptz not null default now()
- Index on `submission_id`

## activity_logs

- `id` UUID PK
- `actor_user_id` UUID FK -> `dashboard_users.id` null
- `entity_type` varchar(80) not null
- `entity_id` varchar(120) not null
- `action` varchar(80) not null
- `summary` varchar(255) not null
- `metadata` jsonb null
- `ip_address` inet null
- `user_agent` text null
- `created_at` timestamptz not null default now()
- Indexes on `actor_user_id`, `entity_type`, `created_at desc`

## seo_overrides

- `id` UUID PK
- `path` varchar(255) unique not null
- `title` varchar(60) null
- `description` varchar(160) null
- `canonical_url` varchar(500) null
- `no_index` boolean not null default false
- `og_image_url` varchar(500) null
- `created_by_user_id` UUID FK -> `dashboard_users.id` null
- `updated_by_user_id` UUID FK -> `dashboard_users.id` null
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()

## dashboard_sessions

- `id` UUID PK
- `session_token` varchar(255) unique not null
- `user_id` UUID FK -> `dashboard_users.id`
- `expires` timestamptz not null
- Indexes on `session_token`, `user_id`

## auth_accounts

- `id` UUID PK
- `user_id` UUID FK -> `dashboard_users.id`
- `type` varchar(80) not null
- `provider` varchar(80) not null
- `provider_account_id` varchar(120) not null
- `refresh_token` text null
- `access_token` text null
- `expires_at` integer null
- `token_type` varchar(80) null
- `scope` varchar(255) null
- `id_token` text null
- `session_state` varchar(255) null
- Unique constraint on `provider`, `provider_account_id`

## auth_verification_tokens

- `identifier` varchar(320) not null
- `token` varchar(255) unique not null
- `expires` timestamptz not null
- Composite unique on `identifier`, `token`

## media_assets_index

- `id` UUID PK
- `contentful_asset_id` varchar(120) unique not null
- `title` varchar(160) null
- `file_name` varchar(255) null
- `mime_type` varchar(120) null
- `file_size` bigint null
- `width` integer null
- `height` integer null
- `url` varchar(500) not null
- `tags` jsonb null
- `created_at` timestamptz not null default now()
- `updated_at` timestamptz not null default now()

## exports

- `id` UUID PK
- `type` varchar(80) not null
- `status` varchar(24) not null default `queued`
- `requested_by_user_id` UUID FK -> `dashboard_users.id`
- `filters` jsonb null
- `file_url` varchar(500) null
- `started_at` timestamptz null
- `completed_at` timestamptz null
- `created_at` timestamptz not null default now()
- Indexes on `type`, `status`, `created_at desc`

## audit_events

- `id` UUID PK
- `actor_user_id` UUID FK -> `dashboard_users.id` null
- `event_type` varchar(80) not null
- `target_type` varchar(80) not null
- `target_id` varchar(120) not null
- `payload` jsonb null
- `ip_address` inet null
- `created_at` timestamptz not null default now()
- Indexes on `event_type`, `target_type`, `created_at desc`
