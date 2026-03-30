import { prisma } from "@/lib/prisma";

type AuditInput = {
  actorUserId?: string | null;
  eventType: string;
  targetType: string;
  targetId: string;
  payload?: Record<string, unknown>;
  ipAddress?: string | null;
};

export async function createAuditEvent(input: AuditInput) {
  return prisma.auditEvent.create({
    data: {
      actorUserId: input.actorUserId ?? null,
      eventType: input.eventType,
      targetType: input.targetType,
      targetId: input.targetId,
      payload: input.payload,
      ipAddress: input.ipAddress ?? null
    }
  });
}

type ActivityInput = {
  actorUserId?: string | null;
  entityType: string;
  entityId: string;
  action: string;
  summary: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export async function createActivityLog(input: ActivityInput) {
  return prisma.activityLog.create({
    data: {
      actorUserId: input.actorUserId ?? null,
      entityType: input.entityType,
      entityId: input.entityId,
      action: input.action,
      summary: input.summary,
      metadata: input.metadata,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null
    }
  });
}
