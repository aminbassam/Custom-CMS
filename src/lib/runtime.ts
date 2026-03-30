import { env } from "@/lib/env";

export const hasDatabaseConfig = Boolean(env.DATABASE_URL);
export const hasContentfulConfig = Boolean(
  env.CONTENTFUL_SPACE_ID && env.CONTENTFUL_DELIVERY_TOKEN && env.CONTENTFUL_PREVIEW_TOKEN
);

export const isDemoMode =
  env.NODE_ENV !== "production" &&
  (env.NEXT_PUBLIC_DEMO_MODE === "true" || !hasDatabaseConfig || !hasContentfulConfig);

export const demoCredentials = {
  email: "admin@example.com",
  password: "ChangeMe123!"
} as const;
