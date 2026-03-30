import { HelperPage } from "@/components/dashboard/helper-page";

export default async function DashboardEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HelperPage title={`Edit Page ${id}`} description="Entry-specific helper screen for preview links, publishing checks, SEO validation, and content QA notes." />;
}
