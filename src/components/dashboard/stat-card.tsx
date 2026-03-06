import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  change?: { value: string; positive: boolean };
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <Icon className="h-5 w-5 text-slate-400" />
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-800">{value || "0.0"}</div>
        <div className="flex items-center gap-2 mt-2">
          {change && (
            <span
              className={cn(
                "px-2 py-0.5 rounded text-xs font-semibold",
                change.positive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              )}
            >
              {change.positive ? "+" : ""}{change.value}
            </span>
          )}
          {subtitle && <span className="text-xs text-slate-500 font-medium">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
