import { z } from "zod";

const rawEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_NAME: z.string().optional(),
  APP_URL: z.string().url().optional(),
  DATABASE_URL: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  CONTENTFUL_SPACE_ID: z.string().optional(),
  CONTENTFUL_ENVIRONMENT: z.string().optional(),
  CONTENTFUL_DELIVERY_TOKEN: z.string().optional(),
  CONTENTFUL_PREVIEW_TOKEN: z.string().optional(),
  CONTENTFUL_WEBHOOK_SECRET: z.string().optional(),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().optional(),
  RATE_LIMIT_REDIS_URL: z.string().optional(),
  RATE_LIMIT_REDIS_TOKEN: z.string().optional(),
  NEXT_PUBLIC_DEMO_MODE: z.string().optional()
});

const rawEnv = rawEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.APP_NAME,
  APP_URL: process.env.APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_WEBHOOK_SECRET: process.env.CONTENTFUL_WEBHOOK_SECRET,
  CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,
  RATE_LIMIT_REDIS_URL: process.env.RATE_LIMIT_REDIS_URL,
  RATE_LIMIT_REDIS_TOKEN: process.env.RATE_LIMIT_REDIS_TOKEN,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE
});

export const missingProductionEnv = [
  ["DATABASE_URL", rawEnv.DATABASE_URL],
  ["NEXTAUTH_SECRET", rawEnv.NEXTAUTH_SECRET],
  ["NEXTAUTH_URL", rawEnv.NEXTAUTH_URL],
  ["CONTENTFUL_SPACE_ID", rawEnv.CONTENTFUL_SPACE_ID],
  ["CONTENTFUL_DELIVERY_TOKEN", rawEnv.CONTENTFUL_DELIVERY_TOKEN],
  ["CONTENTFUL_PREVIEW_TOKEN", rawEnv.CONTENTFUL_PREVIEW_TOKEN],
  ["CONTENTFUL_WEBHOOK_SECRET", rawEnv.CONTENTFUL_WEBHOOK_SECRET]
]
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const env = {
  NODE_ENV: rawEnv.NODE_ENV,
  APP_NAME: rawEnv.APP_NAME ?? "Custom CMS Website",
  APP_URL: rawEnv.APP_URL ?? "http://localhost:3000",
  DATABASE_URL: rawEnv.DATABASE_URL,
  NEXTAUTH_URL: rawEnv.NEXTAUTH_URL ?? rawEnv.APP_URL ?? "http://localhost:3000",
  NEXTAUTH_SECRET: rawEnv.NEXTAUTH_SECRET ?? "development-only-nextauth-secret-please-change",
  CONTENTFUL_SPACE_ID: rawEnv.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT: rawEnv.CONTENTFUL_ENVIRONMENT ?? "master",
  CONTENTFUL_DELIVERY_TOKEN: rawEnv.CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN: rawEnv.CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_WEBHOOK_SECRET: rawEnv.CONTENTFUL_WEBHOOK_SECRET ?? "local-preview-secret",
  CONTACT_NOTIFICATION_EMAIL: rawEnv.CONTACT_NOTIFICATION_EMAIL,
  RATE_LIMIT_REDIS_URL: rawEnv.RATE_LIMIT_REDIS_URL,
  RATE_LIMIT_REDIS_TOKEN: rawEnv.RATE_LIMIT_REDIS_TOKEN,
  NEXT_PUBLIC_DEMO_MODE: rawEnv.NEXT_PUBLIC_DEMO_MODE ?? "false"
} as const;
