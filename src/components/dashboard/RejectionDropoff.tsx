"use client";

import React from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { AlertOctagon, Target, Lightbulb } from "lucide-react";

export const RejectionDropoff: React.FC = () => {
  const { getRejectionDropoffs } = usePlacementStore();
  const { stageCounts, biggestDropoff, totalRejections } = getRejectionDropoffs();

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
          <div>
            <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-400" />
              <span>Rejection Analytics</span>
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">Where am I losing opportunities?</p>
          </div>

          <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
            {totalRejections} Total
          </span>
        </div>

        {/* Stage distribution bars */}
        <div className="space-y-2.5 pt-3">
          {stageCounts.map((item) => (
            <div key={item.stage} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium">{item.stage}</span>
                <span className="text-zinc-400 font-mono">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-[#131926] rounded-full overflow-hidden border border-[#1e273d]">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Recommendation Box */}
      <div className="p-3.5 rounded-xl bg-[#131926] border border-[#202c44] flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-semibold text-zinc-200">Drop-off Diagnosis:</span>
          <p className="text-zinc-400 text-[11px]">
            {totalRejections === 0 ? (
              "No rejections recorded yet! Keep executing consistently."
            ) : (
              <>
                Your biggest drop-off is currently{" "}
                <span className="font-semibold text-amber-300">&quot;{biggestDropoff}&quot;</span>.
                Focusing on past questions from this round will maximize your clearance yield.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
