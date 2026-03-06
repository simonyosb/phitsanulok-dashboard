import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <div>
          <p className="text-[13px] text-[var(--muted-foreground)] font-medium">{title}</p>
          <p className="text-[26px] font-bold leading-tight tracking-tight mt-0.5">{value}</p>
          {subtitle && (
            <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
