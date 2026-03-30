import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { demoCredentials, hasDatabaseConfig, isDemoMode } from "@/lib/runtime";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/dashboard/login"
  },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        if (
          isDemoMode &&
          parsed.data.email === demoCredentials.email &&
          parsed.data.password === demoCredentials.password
        ) {
          return {
            id: "demo-admin",
            email: demoCredentials.email,
            name: "Demo Admin",
            roles: ["admin"]
          };
        }

        if (!hasDatabaseConfig) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: parsed.data.email },
            include: {
              roles: {
                include: {
                  role: true
                }
              }
            }
          });

          if (!user || user.status !== "active") {
            return null;
          }

          const passwordMatches = await bcrypt.compare(parsed.data.password, user.passwordHash);
          if (!passwordMatches) {
            return null;
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles.map((userRole) => userRole.role.slug)
          };
        } catch {
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.roles = (token.roles as string[] | undefined) ?? [];
      }

      return session;
    }
  }
} satisfies NextAuthConfig;
