import { prisma } from "@/lib/prisma";
import {
  localDashboardActivity,
  localDashboardMetrics,
  localRoles,
  localSubmissions,
  localUsers
} from "@/lib/local-dashboard";
import { hasDatabaseConfig } from "@/lib/runtime";

export async function getDashboardOverviewData() {
  if (!hasDatabaseConfig) {
    return localDashboardMetrics;
  }

  try {
    const [submissionCount, userCount, exportCount, activityCount] = await Promise.all([
      prisma.formSubmission.count(),
      prisma.user.count(),
      prisma.export.count(),
      prisma.activityLog.count()
    ]);

    return {
      ...localDashboardMetrics,
      submissions: submissionCount,
      users: userCount,
      exports: exportCount,
      activity: activityCount
    };
  } catch {
    return localDashboardMetrics;
  }
}

export async function getDashboardSubmissions() {
  if (!hasDatabaseConfig) {
    return localSubmissions;
  }

  try {
    return await prisma.formSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 25
    });
  } catch {
    return localSubmissions;
  }
}

export async function getDashboardSubmissionById(id: string) {
  if (!hasDatabaseConfig) {
    const submission = localSubmissions.find((entry) => entry.id === id);
    if (!submission) {
      return null;
    }

    return {
      ...submission,
      notes: submission.notes.map((note) => ({
        id: note.id,
        note: note.note,
        authorUser: {
          name: note.authorName,
          email: "admin@example.com"
        }
      }))
    };
  }

  try {
    return await prisma.formSubmission.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
          include: {
            authorUser: true
          }
        }
      }
    });
  } catch {
    const submission = localSubmissions.find((entry) => entry.id === id);
    if (!submission) {
      return null;
    }

    return {
      ...submission,
      notes: submission.notes.map((note) => ({
        id: note.id,
        note: note.note,
        authorUser: {
          name: note.authorName,
          email: "admin@example.com"
        }
      }))
    };
  }
}

export async function getDashboardUsers() {
  if (!hasDatabaseConfig) {
    return localUsers.map((user) => ({
      ...user,
      roles: user.roles.map((roleName) => ({ role: { name: roleName } }))
    }));
  }

  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  } catch {
    return localUsers.map((user) => ({
      ...user,
      roles: user.roles.map((roleName) => ({ role: { name: roleName } }))
    }));
  }
}

export async function getDashboardRoles() {
  if (!hasDatabaseConfig) {
    return localRoles.map((role) => ({
      ...role,
      rolePermissions: role.permissions.map((permission, index) => {
        const [resource, action] = permission.split(":");
        return {
          id: `${role.id}-${index}`,
          permission: {
            resource,
            action
          }
        };
      })
    }));
  }

  try {
    return await prisma.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      }
    });
  } catch {
    return localRoles.map((role) => ({
      ...role,
      rolePermissions: role.permissions.map((permission, index) => {
        const [resource, action] = permission.split(":");
        return {
          id: `${role.id}-${index}`,
          permission: {
            resource,
            action
          }
        };
      })
    }));
  }
}

export async function getDashboardActivityLogs() {
  if (!hasDatabaseConfig) {
    return localDashboardActivity.map((activity) => ({
      ...activity,
      actorUser: {
        name: activity.actorName,
        email: `${activity.actorName.toLowerCase().replaceAll(" ", ".")}@example.com`
      }
    }));
  }

  try {
    return await prisma.activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        actorUser: true
      }
    });
  } catch {
    return localDashboardActivity.map((activity) => ({
      ...activity,
      actorUser: {
        name: activity.actorName,
        email: `${activity.actorName.toLowerCase().replaceAll(" ", ".")}@example.com`
      }
    }));
  }
}
