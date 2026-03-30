import { HelperPage } from "@/components/dashboard/helper-page";

export default async function DashboardEditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HelperPage title={`Edit Post ${id}`} description="Helper screen for editorial QA, SEO checks, preview validation, and publishing support." />;
}
