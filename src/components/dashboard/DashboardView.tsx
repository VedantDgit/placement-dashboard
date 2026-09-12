"use client";

import React from "react";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { PlacementFunnel } from "@/components/dashboard/PlacementFunnel";
import { RejectionDropoff } from "@/components/dashboard/RejectionDropoff";
import { SmartInsights } from "@/components/dashboard/SmartInsights";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero with greeting & 6 stat cards */}
      <HeroSection />

      {/* Smart Insights Engine */}
      <SmartInsights />

      {/* Connected GATE 2027 Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#161028] to-[#0d121c] border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-purple-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <span className="text-lg font-bold">🎓</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-200">Connected Study Hub: GATE 2027 Dashboard</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.2 rounded-full border border-purple-500/30 font-semibold">
                Live
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Track your GATE CS subject completion, PYQ practice, revision cycles, and test series in tandem.
            </p>
          </div>
        </div>

        <a
          href="https://gate-2027-personal-dashboard.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold self-start sm:self-auto shadow-sm shadow-purple-600/30 transition-colors"
        >
          <span>Open GATE Dashboard</span>
          <span className="text-[10px]">↗</span>
        </a>
      </div>

      {/* Main Placement Funnel & Rejection Drop-off */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlacementFunnel />
        <RejectionDropoff />
      </div>

      {/* Upcoming Deadlines & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingDeadlines />
        <RecentActivityFeed />
      </div>

      {/* 12-Week Placement Commit Heatmap */}
      <ActivityHeatmap />
    </div>
  );
};
