"use client";

import { usePathname } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";

const authRoutes = new Set([
  "/dashboard/login",
  "/dashboard/forgot-password",
  "/dashboard/reset-password"
]);

export function DashboardFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (authRoutes.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <DashboardShell
      title="Dashboard"
      description="Operational workspace for submissions, users, workflow helpers, exports, and audit visibility."
    >
      {children}
    </DashboardShell>
  );
}
