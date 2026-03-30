import { cn } from "@/lib/utils";

export function Panel({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("rounded-3xl border border-slate-200 bg-white p-6 shadow-panel", className)}>{children}</div>;
}
