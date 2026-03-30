import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { hasDatabaseConfig } from "@/lib/runtime";

type AuditInput = {
  actorUserId?: string | null;
  eventType: string;
  targetType: string;
  targetId: string;
  payload?: Record<string, unknown>;
  ipAddress?: string | null;
};

export async function createAuditEvent(input: AuditInput) {
  if (!hasDatabaseConfig) {
    return null;
  }

  return prisma.auditEvent.create({
    data: {
      actorUserId: input.actorUserId ?? null,
      eventType: input.eventType,
      targetType: input.targetType,
      targetId: input.targetId,
      payload: input.payload as Prisma.InputJsonValue | undefined,
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
  if (!hasDatabaseConfig) {
    return null;
  }

  return prisma.activityLog.create({
    data: {
      actorUserId: input.actorUserId ?? null,
      entityType: input.entityType,
      entityId: input.entityId,
      action: input.action,
      summary: input.summary,
      metadata: input.metadata as Prisma.InputJsonValue | undefined,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null
    }
  });
}
