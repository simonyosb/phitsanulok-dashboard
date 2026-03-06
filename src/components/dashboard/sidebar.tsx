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
      <div className="text-[#f97316] mb-10">
        <BarChart3 className="h-7 w-7" />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "p-3 rounded-xl flex items-center justify-center transition-colors",
                isActive
                  ? "bg-orange-100 text-[#f97316]"
                  : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <p className="text-[9px] text-slate-400 font-medium">Live</p>
      </div>
    </aside>
  );
}
