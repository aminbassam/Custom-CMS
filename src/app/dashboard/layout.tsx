import { DashboardFrame } from "@/components/layout/dashboard-frame";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardFrame>{children}</DashboardFrame>;
}
