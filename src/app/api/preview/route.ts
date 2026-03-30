import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  if (secret !== env.CONTENTFUL_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Invalid preview secret." }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(slug, request.url));
}
