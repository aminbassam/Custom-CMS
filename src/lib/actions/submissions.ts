"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireDashboardPermission, requireDashboardUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { createActivityLog, createAuditEvent } from "@/lib/security/audit";

const submissionStatusSchema = z.object({
  submissionId: z.string().uuid(),
  status: z.enum(["new", "in_review", "contacted", "resolved", "spam"])
});

const submissionNoteSchema = z.object({
  submissionId: z.string().uuid(),
  note: z.string().trim().min(2).max(2000)
});

export async function updateSubmissionStatusAction(input: z.infer<typeof submissionStatusSchema>) {
  const user = await requireDashboardPermission("submissions:manage");
  const parsed = submissionStatusSchema.parse(input);

  const submission = await prisma.formSubmission.update({
    where: { id: parsed.submissionId },
    data: {
      status: parsed.status,
      resolvedAt: parsed.status === "resolved" ? new Date() : null
    }
  });

  await Promise.all([
    createAuditEvent({
      actorUserId: user.id,
      eventType: "submission_status_updated",
      targetType: "form_submission",
      targetId: submission.id,
      payload: { status: parsed.status }
    }),
    createActivityLog({
      actorUserId: user.id,
      entityType: "form_submission",
      entityId: submission.id,
      action: "update_status",
      summary: `Submission ${submission.id} moved to ${parsed.status}`
    })
  ]);

  revalidatePath("/dashboard/submissions");
  revalidatePath(`/dashboard/submissions/${submission.id}`);
}

export async function addSubmissionNoteAction(input: z.infer<typeof submissionNoteSchema>) {
  const user = await requireDashboardUser();
  await requireDashboardPermission("submissions:manage");
  const parsed = submissionNoteSchema.parse(input);

  const note = await prisma.submissionNote.create({
    data: {
      submissionId: parsed.submissionId,
      authorUserId: user.id,
      note: parsed.note
    }
  });

  await Promise.all([
    createAuditEvent({
      actorUserId: user.id,
      eventType: "submission_note_created",
      targetType: "submission_note",
      targetId: note.id,
      payload: { submissionId: parsed.submissionId }
    }),
    createActivityLog({
      actorUserId: user.id,
      entityType: "submission_note",
      entityId: note.id,
      action: "create",
      summary: `Internal note added to submission ${parsed.submissionId}`
    })
  ]);

  revalidatePath(`/dashboard/submissions/${parsed.submissionId}`);
}
