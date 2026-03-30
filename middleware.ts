import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicDashboardRoutes = new Set([
  "/dashboard/login",
  "/dashboard/forgot-password",
  "/dashboard/reset-password"
]);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  if (publicDashboardRoutes.has(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!token?.sub && !token?.id) {
    const loginUrl = new URL("/dashboard/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
