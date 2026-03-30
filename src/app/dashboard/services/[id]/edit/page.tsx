import { HelperPage } from "@/components/dashboard/helper-page";

export default async function DashboardEditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HelperPage title={`Edit Service ${id}`} description="Service QA and campaign support surface for previews, internal notes, and release checks." />;
}
