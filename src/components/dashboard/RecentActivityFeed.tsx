"use client";

import React from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  Building2,
  FileCheck2,
  XCircle,
  Activity,
} from "lucide-react";

export const RecentActivityFeed: React.FC = () => {
  const { activities } = usePlacementStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "offer_received":
        return <Award className="w-3.5 h-3.5 text-emerald-400" />;
      case "technical_cleared":
      case "oa_cleared":
      case "shortlisted":
        return <CheckCircle className="w-3.5 h-3.5 text-blue-400" />;
      case "technical_scheduled":
      case "oa_scheduled":
        return <Clock className="w-3.5 h-3.5 text-amber-400" />;
      case "applied":
        return <Building2 className="w-3.5 h-3.5 text-cyan-400" />;
      case "rejected":
        return <XCircle className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  const formatRelativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span>Live Activity Feed</span>
        </h2>
        <span className="text-[10px] text-zinc-400 uppercase font-semibold">Real-time</span>
      </div>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="py-6 text-center text-zinc-500 text-xs">
            No recent activity recorded yet.
          </div>
        ) : (
          activities.slice(0, 6).map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 p-2.5 rounded-xl bg-[#111624] border border-[#1e273d] hover:border-zinc-700 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-[#182133] shrink-0 mt-0.5">
                {getIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200 truncate">
                    {act.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 shrink-0 ml-2">
                    {formatRelativeTime(act.timestamp)}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2">
                  {act.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
