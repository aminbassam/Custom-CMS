import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";

function verifySignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", env.CONTENTFUL_WEBHOOK_SECRET).update(rawBody).digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-contentful-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    contentType?: string;
    fields?: { slug?: { "en-US"?: string } };
  };

  const slug = payload.fields?.slug?.["en-US"];
  const contentType = payload.contentType;

  switch (contentType) {
    case "page":
      if (slug) revalidatePath(`/${slug === "home" ? "" : slug}`);
      break;
    case "service":
      if (slug) revalidatePath(`/services/${slug}`);
      revalidatePath("/services");
      break;
    case "blogPost":
      if (slug) revalidatePath(`/blog/${slug}`);
      revalidatePath("/blog");
      break;
    case "landingPage":
      if (slug) revalidatePath(`/landing/${slug}`);
      break;
    default:
      revalidatePath("/");
  }

  return NextResponse.json({ revalidated: true });
}
