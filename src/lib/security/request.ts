import { headers } from "next/headers";

export async function getClientIp() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export async function assertAllowedOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const host = requestHeaders.get("host");

  if (!origin || !host) return;

  const originHost = new URL(origin).host;
  if (originHost !== host) {
    throw new Error("Invalid request origin.");
  }
}
