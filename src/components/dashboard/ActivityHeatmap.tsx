"use client";

import React, { useState } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { HeatmapDay } from "@/types";
import { Flame, Calendar } from "lucide-react";

export const ActivityHeatmap: React.FC = () => {
  const { heatmap } = usePlacementStore();
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-[#141a26] border-[#1d2639]";
    if (count <= 4) return "bg-blue-900/40 border-blue-700/50";
    if (count <= 8) return "bg-blue-600/70 border-blue-500/60";
    if (count <= 12) return "bg-blue-500 border-blue-400";
    return "bg-cyan-400 border-cyan-300 shadow-sm shadow-cyan-400/30";
  };

  const totalActions = heatmap.reduce((acc, curr) => acc + curr.count, 0);
  const totalDsa = heatmap.reduce((acc, curr) => acc + curr.dsaQuestions, 0);
  const totalHours = heatmap.reduce((acc, curr) => acc + curr.studyHours, 0);

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b2336]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Placement Activity Heatmap</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Daily commitment consistency across applications, DSA practice, and mock interviews.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
          <div>
            <span className="text-zinc-100 font-bold font-mono">{totalDsa}</span> DSA Solved
          </div>
          <div>
            <span className="text-zinc-100 font-bold font-mono">{totalHours}h</span> Study Time
          </div>
          <div>
            <span className="text-blue-400 font-bold font-mono">{totalActions}</span> Total Actions
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[640px] space-y-2">
          {/* Day Grid */}
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {heatmap.map((day) => (
              <div
                key={day.date}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3.5 h-3.5 rounded-sm border cursor-pointer transition-transform hover:scale-125 ${getColorClass(
                  day.count
                )}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-2 text-[10px] text-zinc-400">
            <span>Last 12 Weeks (84 Days)</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-xs bg-[#141a26] border border-[#1d2639]" />
              <div className="w-2.5 h-2.5 rounded-xs bg-blue-900/40 border border-blue-700/50" />
              <div className="w-2.5 h-2.5 rounded-xs bg-blue-600/70 border border-blue-500/60" />
              <div className="w-2.5 h-2.5 rounded-xs bg-blue-500 border border-blue-400" />
              <div className="w-2.5 h-2.5 rounded-xs bg-cyan-400 border border-cyan-300" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Info Card */}
      {hoveredDay ? (
        <div className="p-3 rounded-xl bg-[#121826] border border-[#202d44] flex items-center justify-between text-xs animate-in fade-in">
          <div className="font-semibold text-zinc-200">
            {new Date(hoveredDay.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>
              Applications:{" "}
              <strong className="text-zinc-200 font-mono">{hoveredDay.applications}</strong>
            </span>
            <span>
              DSA Questions:{" "}
              <strong className="text-blue-400 font-mono">{hoveredDay.dsaQuestions}</strong>
            </span>
            <span>
              Study:{" "}
              <strong className="text-purple-400 font-mono">{hoveredDay.studyHours}h</strong>
            </span>
            <span>
              Interviews:{" "}
              <strong className="text-emerald-400 font-mono">{hoveredDay.interviews}</strong>
            </span>
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-zinc-500 italic text-center py-1">
          Hover over any square in the heatmap to view detailed activity metrics for that day.
        </div>
      )}
    </div>
  );
};
