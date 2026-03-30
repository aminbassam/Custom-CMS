import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createActivityLog, createAuditEvent } from "@/lib/security/audit";
import { getClientIp, assertAllowedOrigin } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";
import { contactFormSchema } from "@/lib/validators/contact";

export async function POST(request: Request) {
  try {
    await assertAllowedOrigin();
  } catch {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const ip = await getClientIp();
  const limiter = await rateLimit(`contact:${ip}`, 5, 60_000);

  if (!limiter.success) {
    return NextResponse.json({ message: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid form submission.", issues: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const submission = await prisma.formSubmission.create({
    data: {
      source: "website",
      formType: "contact",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      message: parsed.data.message,
      metadata: {
        referrer: request.headers.get("referer")
      }
    }
  });

  await Promise.all([
    createAuditEvent({
      eventType: "form_submission_created",
      targetType: "form_submission",
      targetId: submission.id,
      payload: { source: "website" },
      ipAddress: ip
    }),
    createActivityLog({
      entityType: "form_submission",
      entityId: submission.id,
      action: "create",
      summary: `New contact submission from ${submission.email}`,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent")
    })
  ]);

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
