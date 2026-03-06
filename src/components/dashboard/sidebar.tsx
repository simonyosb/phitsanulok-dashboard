"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  BarChart3,
  Users,
  MessageSquare,
  Target,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/map", label: "Map View", icon: Map },
  { href: "/market", label: "Market Analysis", icon: BarChart3 },
  { href: "/competitors", label: "Competitors", icon: Users },
  { href: "/reviews", label: "Review Insights", icon: MessageSquare },
  { href: "/leads", label: "Lead Generation", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--border)] bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-[var(--border)] px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-white text-sm font-bold">
          PL
        </div>
        <div>
          <h1 className="text-sm font-bold text-[var(--foreground)]">Phitsanulok</h1>
          <p className="text-xs text-[var(--muted-foreground)]">Business Intelligence</p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--border)] p-4">
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-xs font-medium text-blue-900">Data Source</p>
          <p className="text-xs text-blue-700 mt-1">Google Maps via Apify</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Last updated: Mar 2026
          </p>
        </div>
      </div>
    </aside>
  );
}
