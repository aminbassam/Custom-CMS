import { createClient, type EntrySkeletonType } from "contentful";

import { env } from "@/lib/env";
import { hasContentfulConfig } from "@/lib/runtime";

function getClient(preview = false) {
  if (!hasContentfulConfig) {
    return null;
  }

  return createClient({
    space: env.CONTENTFUL_SPACE_ID!,
    environment: env.CONTENTFUL_ENVIRONMENT,
    accessToken: preview ? env.CONTENTFUL_PREVIEW_TOKEN! : env.CONTENTFUL_DELIVERY_TOKEN!,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com"
  });
}

export const contentfulDeliveryClient = getClient(false);
export const contentfulPreviewClient = getClient(true);

export async function fetchEntries<T extends EntrySkeletonType>(
  query: Record<string, unknown>,
  preview = false
) {
  const client = preview ? contentfulPreviewClient : contentfulDeliveryClient;
  if (!client) {
    throw new Error("Contentful is not configured.");
  }
  return client.getEntries<T>(query);
}
