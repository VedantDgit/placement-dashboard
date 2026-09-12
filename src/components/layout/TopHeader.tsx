"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  Sun,
  Moon,
  Database,
  Building2,
  HelpCircle,
  CheckSquare,
  Calendar,
  AlertTriangle,
  Menu,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { usePlacementStore } from "@/store/usePlacementStore";
import { getDeadlineUrgency } from "@/lib/utils";

interface TopHeaderProps {
  onOpenCommandPalette: () => void;
  onOpenAddCompany: () => void;
  onOpenAddQuestion: () => void;
  onOpenAddTask: () => void;
  onOpenAddEvent: () => void;
  onToggleMobileNav?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenCommandPalette,
  onOpenAddCompany,
  onOpenAddQuestion,
  onOpenAddTask,
  onOpenAddEvent,
  onToggleMobileNav,
}) => {
  const { theme, setTheme } = useTheme();
  const { isSampleDataLoaded, loadSampleData, clearAllData, events, companies, followUps } =
    usePlacementStore();
  const [showQuickAddMenu, setShowQuickAddMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  // Compute urgent notifications
  const urgentEvents = events.filter((e) => {
    const urg = getDeadlineUrgency(e.date);
    return urg.urgency === "today" || urg.urgency === "3days";
  });

  const pendingFollowups = followUps.filter((f) => f.status === "Pending");
  const notificationCount = urgentEvents.length + pendingFollowups.length;

  return (
    <header className="h-16 bg-[#0a0c13]/80 backdrop-blur-md border-b border-[#1a2133] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side: Mobile menu toggle + Global Search trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onToggleMobileNav}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-[#151b2a] md:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenCommandPalette}
          className="flex items-center justify-between w-full max-w-sm px-3.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e273d] text-zinc-400 hover:border-blue-500/40 hover:text-zinc-200 transition-all text-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
            <span className="text-zinc-400">Search anything...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-[#182133] border border-[#25324d] rounded">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right side: Sample Data Badge, Quick Add, Notifications, Theme Toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* GATE 2027 Connected Dashboard Button */}
        <a
          href="https://gate-2027-personal-dashboard.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-600/15 border border-purple-500/30 text-purple-300 hover:bg-purple-600/25 hover:border-purple-400 text-xs font-semibold transition-all group shadow-sm"
          title="Jump to GATE 2027 Personal Dashboard"
        >
          <GraduationCap className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
          <span>GATE 2027</span>
          <ExternalLink className="w-3 h-3 text-purple-400/70" />
        </a>

        {/* Sample Data Toggle Badge */}
        {isSampleDataLoaded ? (
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
            <Database className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>Sample Data Active</span>
            <button
              onClick={clearAllData}
              className="text-[10px] text-amber-400/80 hover:text-amber-200 underline ml-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        ) : (
          <button
            onClick={loadSampleData}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#131a29] border border-[#232d44] text-zinc-300 hover:text-white hover:border-blue-500/30 text-[11px] transition-colors"
          >
            <Database className="w-3 h-3 text-blue-400" />
            <span>Load Sample Data</span>
          </button>
        )}

        {/* Quick Add Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAddMenu(!showQuickAddMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>

          {showQuickAddMenu && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowQuickAddMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-[#0d121c] border border-[#222c42] rounded-xl shadow-2xl py-1.5 z-40 text-xs">
                <button
                  onClick={() => {
                    setShowQuickAddMenu(false);
                    onOpenAddCompany();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-zinc-300 hover:text-white hover:bg-blue-600/20 transition-colors text-left"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>New Application</span>
                </button>
                <button
                  onClick={() => {
                    setShowQuickAddMenu(false);
                    onOpenAddQuestion();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-zinc-300 hover:text-white hover:bg-purple-600/20 transition-colors text-left"
                >
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span>Interview Question</span>
                </button>
                <button
                  onClick={() => {
                    setShowQuickAddMenu(false);
                    onOpenAddTask();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-zinc-300 hover:text-white hover:bg-amber-600/20 transition-colors text-left"
                >
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                  <span>Preparation Task</span>
                </button>
                <button
                  onClick={() => {
                    setShowQuickAddMenu(false);
                    onOpenAddEvent();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-zinc-300 hover:text-white hover:bg-emerald-600/20 transition-colors text-left"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Interview / Event</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="p-2 rounded-lg bg-[#111624] border border-[#1e273d] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0a0c13] animate-ping" />
            )}
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0a0c13]" />
            )}
          </button>

          {showNotificationMenu && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowNotificationMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-[#0d121c] border border-[#222c42] rounded-xl shadow-2xl py-2 z-40 text-xs">
                <div className="px-4 py-2 border-b border-[#1c2436] flex items-center justify-between">
                  <span className="font-semibold text-zinc-200">Urgent Notifications</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono">
                    {notificationCount} Alerts
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto custom-scrollbar p-2 space-y-1.5">
                  {urgentEvents.length === 0 && pendingFollowups.length === 0 ? (
                    <div className="py-4 text-center text-zinc-500 text-xs">
                      No urgent deadlines or pending follow-ups today!
                    </div>
                  ) : (
                    <>
                      {urgentEvents.map((evt) => {
                        const urg = getDeadlineUrgency(evt.date);
                        return (
                          <div
                            key={evt.id}
                            className="p-2.5 rounded-lg bg-[#121826] border border-[#1f293d] space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-zinc-200 truncate">
                                {evt.title}
                              </span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${urg.badgeClass}`}>
                                {urg.label}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400">
                              {evt.date} {evt.time ? `• ${evt.time}` : ""}
                            </p>
                          </div>
                        );
                      })}

                      {pendingFollowups.map((fol) => (
                        <div
                          key={fol.id}
                          className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-amber-200">
                              Follow up: {fol.companyName}
                            </span>
                            <span className="text-[10px] text-amber-400">Due {fol.dueDate}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 truncate">
                            Contact: {fol.contactPerson} ({fol.contactMethod})
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg bg-[#111624] border border-[#1e273d] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
