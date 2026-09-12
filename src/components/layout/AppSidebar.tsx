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
  FileText,
  Award,
  CheckSquare,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingUp,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { cn } from "@/lib/utils";

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const { companies, questions, offers, tasks, userProfile } = usePlacementStore();

  const activeApps = companies.filter(
    (c) => c.status !== "Rejected" && c.status !== "Withdrawn" && c.status !== "Offer Accepted"
  ).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: "Companies",
      href: "/companies",
      icon: Building2,
      badge: companies.length > 0 ? companies.length : null,
    },
    {
      label: "Pipeline",
      href: "/pipeline",
      icon: Kanban,
      badge: activeApps > 0 ? `${activeApps} active` : null,
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      label: "Calendar & Deadlines",
      href: "/calendar",
      icon: Calendar,
      badge: null,
    },
    {
      label: "Question Bank",
      href: "/questions",
      icon: HelpCircle,
      badge: questions.length > 0 ? questions.length : null,
    },
    {
      label: "Resume Tracker",
      href: "/resume",
      icon: FileText,
      badge: null,
    },
    {
      label: "Offers Hub",
      href: "/offers",
      icon: Award,
      badge: offers.length > 0 ? `${offers.length} Offer${offers.length > 1 ? "s" : ""}` : null,
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      label: "Daily Tasks",
      href: "/tasks",
      icon: CheckSquare,
      badge: pendingTasks > 0 ? pendingTasks : null,
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      label: "Settings & Backup",
      href: "/settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-[#0a0c13] border-r border-[#1a2133] flex flex-col shrink-0 h-screen sticky top-0 select-none z-30 hidden md:flex">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1a2133]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Linear Grade
            </span>
            <span className="text-sm font-bold text-zinc-100 tracking-tight group-hover:text-blue-300 transition-colors">
              Command Center
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Navigation
        </div>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href)) ||
            (item.href === "/dashboard" && pathname === "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                isActive
                  ? "bg-blue-600/15 text-blue-300 border border-blue-500/30 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#121724]"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-colors",
                    isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md font-semibold border",
                    item.badgeColor
                      ? item.badgeColor
                      : "bg-[#182030] text-zinc-400 border-[#263147]"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Connected GATE 2027 Ecosystem Card */}
      <div className="px-3 pb-2">
        <a
          href="https://gate-2027-personal-dashboard.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#18112b] to-[#121020] border border-purple-500/30 hover:border-purple-400/60 shadow-lg shadow-purple-950/30 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-purple-200 group-hover:text-purple-100 truncate">
                  GATE 2027 Hub
                </span>
                <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
              </div>
              <p className="text-[10px] text-purple-400/80 truncate">Personal Exam Dashboard</p>
            </div>
          </div>
        </a>
      </div>

      {/* Target & Season Widget */}
      <div className="p-3 border-t border-[#1a2133] bg-[#0c0f18]/60 space-y-2">
        <div className="p-3 rounded-xl bg-[#111624] border border-[#1e273d]">
          <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 mb-1">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              Target CTC
            </span>
            <span className="text-emerald-400 font-semibold">{userProfile.targetCtc}</span>
          </div>
          <p className="text-[10px] text-zinc-500 truncate">{userProfile.seasonName}</p>
        </div>

        {/* Profile Card */}
        <Link
          href="/settings"
          className="flex items-center justify-between p-2 rounded-lg hover:bg-[#151b2a] transition-colors group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-xs font-bold text-white uppercase">
              {userProfile.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-200 truncate group-hover:text-blue-300">
                {userProfile.name}
              </p>
              <p className="text-[10px] text-zinc-500 truncate">{userProfile.branch}</p>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />
        </Link>
      </div>
    </aside>
  );
};
