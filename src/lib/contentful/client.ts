import { createClient, type EntrySkeletonType } from "contentful";

import { env } from "@/lib/env";

function getClient(preview = false) {
  return createClient({
    space: env.CONTENTFUL_SPACE_ID,
    environment: env.CONTENTFUL_ENVIRONMENT,
    accessToken: preview ? env.CONTENTFUL_PREVIEW_TOKEN : env.CONTENTFUL_DELIVERY_TOKEN,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com"
  });
}

export const contentfulDeliveryClient = getClient(false);
export const contentfulPreviewClient = getClient(true);

export async function fetchEntries<T extends EntrySkeletonType>(
  query: Parameters<typeof contentfulDeliveryClient.getEntries<T>>[0],
  preview = false
) {
  const client = preview ? contentfulPreviewClient : contentfulDeliveryClient;
  return client.getEntries<T>(query);
}
