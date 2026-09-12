"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Kanban,
  BarChart3,
  Calendar,
  HelpCircle,
  Award,
  CheckSquare,
  Settings,
  X,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { companies, offers, tasks } = usePlacementStore();

  const mainBottomItems = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Companies", href: "/companies", icon: Building2 },
    { label: "Pipeline", href: "/pipeline", icon: Kanban },
    { label: "Calendar", href: "/calendar", icon: Calendar },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const allDrawerItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Companies", href: "/companies", icon: Building2, badge: companies.length },
    { label: "Kanban Pipeline", href: "/pipeline", icon: Kanban },
    { label: "Analytics & Funnel", href: "/analytics", icon: BarChart3 },
    { label: "Calendar & Deadlines", href: "/calendar", icon: Calendar },
    { label: "Interview Question Bank", href: "/questions", icon: HelpCircle },
    { label: "Offers Hub", href: "/offers", icon: Award, badge: offers.length },
    { label: "Daily Tasks", href: "/tasks", icon: CheckSquare, badge: tasks.filter(t => !t.completed).length },
    { label: "Settings & Backup", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-72 max-w-[80vw] bg-[#0c101a] border-r border-[#1e2538] h-full flex flex-col p-4 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2538]">
              <span className="font-bold text-zinc-100 text-sm">Placement Command Center</span>
              <button
                onClick={onClose}
                className="p-1 rounded text-zinc-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 py-4 space-y-1 overflow-y-auto">
              {allDrawerItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium",
                      isActive
                        ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                        : "text-zinc-400 hover:bg-[#151b2a] hover:text-zinc-200"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1c2438] text-zinc-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-2">
                <a
                  href="https://gate-2027-personal-dashboard.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/30"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span>GATE 2027 Dashboard</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Bar on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0a0c13]/95 backdrop-blur-md border-t border-[#1a2133] px-2 flex items-center justify-around z-30">
        {mainBottomItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-colors",
                isActive ? "text-blue-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
