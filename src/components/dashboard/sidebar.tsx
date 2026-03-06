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
  { href: "/map", label: "Map", icon: Map },
  { href: "/market", label: "Market", icon: BarChart3 },
  { href: "/competitors", label: "Competitors", icon: Users },
  { href: "/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/leads", label: "Leads", icon: Target },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 shadow-sm">
      {/* Logo */}
      <div className="text-orange-500 mb-8 mt-2">
        <BarChart3 className="h-7 w-7" />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-3 w-full px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all",
                isActive
                  ? "bg-orange-50 text-orange-600 shadow-sm border border-orange-100"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="mt-auto flex flex-col items-center gap-1.5 pb-2">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm animate-pulse" />
        <p className="text-[9px] text-slate-400 font-medium">Live</p>
      </div>
    </aside>
  );
}
