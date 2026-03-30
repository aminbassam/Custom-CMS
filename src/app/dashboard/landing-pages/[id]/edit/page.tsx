import { HelperPage } from "@/components/dashboard/helper-page";

export default async function DashboardEditLandingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HelperPage title={`Edit Landing Page ${id}`} description="Campaign helper for preview links, expiry checks, and internal status tracking." />;
}
