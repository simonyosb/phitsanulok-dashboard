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
    <aside className="fixed bottom-0 left-0 right-0 z-40 h-16 w-full md:top-0 md:h-screen md:w-20 bg-white border-t md:border-t-0 md:border-r border-slate-200 flex flex-row md:flex-col items-center justify-between md:justify-start px-2 py-0 md:py-6 md:px-0 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] md:shadow-sm">
      {/* Logo */}
      <div className="hidden md:block text-orange-500 mb-8 mt-2">
        <BarChart3 className="h-7 w-7" />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-row md:flex-col items-center justify-around md:justify-start gap-1 md:gap-3 w-full md:px-3 h-full md:h-auto overflow-x-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "w-auto md:w-full min-w-[3.5rem] aspect-[1/1] md:aspect-square py-1 md:py-0 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all",
                isActive
                  ? "bg-orange-50 text-orange-600 shadow-sm border border-orange-100"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <item.icon className="h-5 w-5 md:h-5 md:w-5" />
              <span className="text-[10px] md:text-[9px] font-medium hidden md:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="hidden md:flex mt-auto flex-col items-center gap-1.5 pb-2">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm animate-pulse" />
        <p className="text-[9px] text-slate-400 font-medium">Live</p>
      </div>
    </aside>
  );
}
