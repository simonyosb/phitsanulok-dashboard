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
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
        {change && (
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              change.positive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            {change.positive ? "+" : ""}{change.value}
          </span>
        )}
      </div>
      <div className="flex items-end gap-2 border-b border-slate-100 pb-4 mb-4">
        <span className="text-3xl font-bold">{value}</span>
        {title === "Avg Rating" && (
          <Icon className="h-5 w-5 text-orange-400 mb-1" />
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}
