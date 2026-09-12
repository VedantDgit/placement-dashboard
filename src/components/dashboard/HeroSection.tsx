"use client";

import React, { useMemo } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  Building2,
  FileCheck2,
  Code2,
  Users2,
  Award,
  XCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { userProfile, getStats } = usePlacementStore();
  const stats = getStats();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const statCards = [
    {
      label: "APPLICATIONS",
      value: stats.totalApplications,
      icon: Building2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      subtext: `${stats.activePipelines} active pipeline${stats.activePipelines !== 1 ? "s" : ""}`,
    },
    {
      label: "SHORTLISTED",
      value: stats.shortlisted,
      icon: FileCheck2,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      subtext: `${
        stats.totalApplications > 0
          ? Math.round((stats.shortlisted / stats.totalApplications) * 100)
          : 0
      }% of applications`,
    },
    {
      label: "ASSESSMENTS",
      value: stats.assessments,
      icon: Code2,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      subtext: "Online OA tests",
    },
    {
      label: "INTERVIEWS",
      value: stats.interviews,
      icon: Users2,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      subtext: "Technical & HR rounds",
    },
    {
      label: "OFFERS",
      value: stats.offers,
      icon: Award,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      subtext: `Max: ${stats.highestCtc}`,
    },
    {
      label: "REJECTED",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      subtext: "Learning opportunities",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0f1422] via-[#111728] to-[#0c101a] border border-[#1e283d] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-blue-400" />
                {userProfile.seasonName}
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-xs text-zinc-400 font-medium">
                Target CTC: <span className="text-emerald-400 font-semibold">{userProfile.targetCtc}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {greeting}, {userProfile.name}
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Placement season is in active progress. Track your pipeline, master your interview
              rounds, and convert your dream offers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#141b2b] border border-[#202c44] text-right">
              <div className="text-[11px] text-zinc-400 font-medium flex items-center justify-end gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Highest CTC
              </div>
              <div className="text-lg font-bold text-emerald-400">{stats.highestCtc}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#141b2b] border border-[#202c44] text-right">
              <div className="text-[11px] text-zinc-400 font-medium">Offers in Hand</div>
              <div className="text-lg font-bold text-zinc-100">{stats.offers}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`p-4 rounded-xl bg-[#0d121c] border ${card.border} flex flex-col justify-between hover:border-zinc-700 transition-all group`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                  {card.label}
                </span>
                <div className={`p-1.5 rounded-lg ${card.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:scale-105 transition-transform origin-left">
                  {card.value}
                </div>
                <div className="text-[10px] text-zinc-400 mt-1 truncate">{card.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
