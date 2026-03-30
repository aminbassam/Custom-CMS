import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_NAME: z.string().default("CMS Website"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  CONTENTFUL_SPACE_ID: z.string().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().default("master"),
  CONTENTFUL_DELIVERY_TOKEN: z.string().min(1),
  CONTENTFUL_PREVIEW_TOKEN: z.string().min(1),
  CONTENTFUL_WEBHOOK_SECRET: z.string().min(1),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().optional(),
  RATE_LIMIT_REDIS_URL: z.string().optional(),
  RATE_LIMIT_REDIS_TOKEN: z.string().optional()
});

export const env = envSchema.parse({
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
  RATE_LIMIT_REDIS_TOKEN: process.env.RATE_LIMIT_REDIS_TOKEN
});
