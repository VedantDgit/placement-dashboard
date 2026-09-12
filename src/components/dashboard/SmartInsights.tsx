"use client";

import React from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const SmartInsights: React.FC = () => {
  const { getSmartInsights } = usePlacementStore();
  const insights = getSmartInsights();

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#1b2336]">
        <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Smart Placement Insights</span>
        </h2>
        <span className="text-[10px] text-zinc-400 uppercase font-semibold">
          Deterministic Engine
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-[#111624] border border-[#1e273d] flex items-start gap-2.5 hover:border-blue-500/30 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-300 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
