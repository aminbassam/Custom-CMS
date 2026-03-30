import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/rbac";
import { prisma } from "@/lib/prisma";

function toCsv(rows: Array<Record<string, string>>) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replaceAll('"', '""')}"`)
        .join(",")
    )
  ];
  return lines.join("\n");
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || !(await hasPermission(session.user.id, "submissions:view"))) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 500
  });

  const csv = toCsv(
    submissions.map((submission) => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone ?? "",
      company: submission.company ?? "",
      status: submission.status,
      createdAt: submission.createdAt.toISOString()
    }))
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="submissions.csv"'
    }
  });
}
