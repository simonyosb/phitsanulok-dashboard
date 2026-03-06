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
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] bg-[#0f172a] text-white">
      <div className="flex h-[72px] items-center gap-3 px-6 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/30">
          PL
        </div>
        <div>
          <h1 className="text-[15px] font-bold tracking-tight">Phitsanulok</h1>
          <p className="text-[11px] text-slate-400 font-medium">Business Intelligence</p>
        </div>
      </div>

      <nav className="px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
          Dashboard
        </p>
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all",
                isActive
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <item.icon className={cn("h-[18px] w-[18px]", isActive && "text-blue-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
        <div className="rounded-xl bg-white/5 p-3.5">
          <p className="text-[11px] font-semibold text-slate-300">Data Source</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Google Maps via Apify</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[10px] text-emerald-400 font-medium">Live · March 2026</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
