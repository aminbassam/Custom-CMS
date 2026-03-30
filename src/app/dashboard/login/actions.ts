"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { getClientIp } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";

export async function authenticate(_: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const ip = await getClientIp();
  const limiter = await rateLimit(`auth:${ip}:${email}`, 5, 15 * 60_000);

  if (!limiter.success) {
    return { error: "Too many login attempts. Please wait and try again." };
  }

  try {
    await signIn("credentials", {
      email,
      password: String(formData.get("password") ?? ""),
      redirectTo: "/dashboard"
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials." };
    }

    throw error;
  }
}
