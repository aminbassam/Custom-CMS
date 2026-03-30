import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const permissionPairs = [
    ["dashboard", "view"],
    ["submissions", "view"],
    ["submissions", "manage"],
    ["users", "view"],
    ["users", "manage"],
    ["roles", "manage"],
    ["settings", "manage"],
    ["activity", "view"],
    ["content-helper", "view"],
    ["exports", "manage"]
  ];

  const permissions = await Promise.all(
    permissionPairs.map(([resource, action]) =>
      prisma.permission.upsert({
        where: { resource_action: { resource, action } },
        update: {},
        create: { resource, action }
      })
    )
  );

  const adminRole = await prisma.role.upsert({
    where: { slug: "admin" },
    update: {},
    create: {
      name: "Administrator",
      slug: "admin",
      description: "Full operational access",
      isSystem: true
    }
  });

  await Promise.all(
    permissions.map((permission) =>
      prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: permission.id
        }
      })
    )
  );

  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      passwordHash
    }
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: admin.id,
        roleId: adminRole.id
      }
    },
    update: {},
    create: {
      userId: admin.id,
      roleId: adminRole.id
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
