import { cache } from "react";

import { prisma } from "@/lib/prisma";

export type PermissionKey =
  | "dashboard:view"
  | "submissions:view"
  | "submissions:manage"
  | "users:view"
  | "users:manage"
  | "roles:manage"
  | "settings:manage"
  | "activity:view"
  | "content-helper:view"
  | "exports:manage";

export const hasPermission = cache(async (userId: string, permissionKey: PermissionKey) => {
  const [resource, action] = permissionKey.split(":");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      },
      userPermissions: {
        include: {
          permission: true
        }
      }
    }
  });

  if (!user || user.status !== "active") return false;

  const directOverride = user.userPermissions.find(
    (item) => item.permission.resource === resource && item.permission.action === action
  );

  if (directOverride) {
    return directOverride.allowed;
  }

  return user.roles.some((userRole) =>
    userRole.role.rolePermissions.some(
      (rolePermission) =>
        rolePermission.permission.resource === resource &&
        rolePermission.permission.action === action
    )
  );
});

export async function assertPermission(userId: string, permissionKey: PermissionKey) {
  const allowed = await hasPermission(userId, permissionKey);
  if (!allowed) {
    throw new Error(`Forbidden: missing permission ${permissionKey}`);
  }
}
