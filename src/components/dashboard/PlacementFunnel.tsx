"use client";

import React from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { ArrowDown, CheckCircle2, TrendingUp } from "lucide-react";

export const PlacementFunnel: React.FC = () => {
  const { getFunnelMetrics, getConversionRates } = usePlacementStore();
  const funnel = getFunnelMetrics();
  const rates = getConversionRates();

  const funnelSteps = [
    {
      stage: "Applications",
      count: funnel.applied,
      rateText: "Top of Funnel",
      barWidth: "100%",
      bg: "bg-blue-600/80",
      border: "border-blue-500/40",
      color: "text-blue-400",
    },
    {
      stage: "Shortlisted",
      count: funnel.shortlisted,
      rateText: `${rates.applicationToShortlist}% pass rate`,
      barWidth: funnel.applied > 0 ? `${Math.max(15, (funnel.shortlisted / funnel.applied) * 100)}%` : "0%",
      bg: "bg-cyan-600/80",
      border: "border-cyan-500/40",
      color: "text-cyan-400",
    },
    {
      stage: "Online Assessment (OA)",
      count: funnel.assessment,
      rateText: `${rates.shortlistToOA}% OA clearance`,
      barWidth: funnel.applied > 0 ? `${Math.max(12, (funnel.assessment / funnel.applied) * 100)}%` : "0%",
      bg: "bg-amber-600/80",
      border: "border-amber-500/40",
      color: "text-amber-400",
    },
    {
      stage: "Technical Rounds",
      count: funnel.technical,
      rateText: `${rates.oaToTechnical}% Tech conversion`,
      barWidth: funnel.applied > 0 ? `${Math.max(10, (funnel.technical / funnel.applied) * 100)}%` : "0%",
      bg: "bg-purple-600/80",
      border: "border-purple-500/40",
      color: "text-purple-400",
    },
    {
      stage: "Managerial / HR",
      count: funnel.managerialOrHr,
      rateText: `${rates.technicalToHR}% HR conversion`,
      barWidth: funnel.applied > 0 ? `${Math.max(8, (funnel.managerialOrHr / funnel.applied) * 100)}%` : "0%",
      bg: "bg-pink-600/80",
      border: "border-pink-500/40",
      color: "text-pink-400",
    },
    {
      stage: "Offers Received",
      count: funnel.offers,
      rateText: `${rates.overallOfferRate}% overall offer rate`,
      barWidth: funnel.applied > 0 ? `${Math.max(6, (funnel.offers / funnel.applied) * 100)}%` : "0%",
      bg: "bg-emerald-600/90",
      border: "border-emerald-500/50",
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>Placement Funnel</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Real stage-to-stage progression calculated automatically from application data.
          </p>
        </div>

        <div className="text-right">
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            Offer Conversion
          </div>
          <div className="text-base font-extrabold text-emerald-400">{rates.overallOfferRate}%</div>
        </div>
      </div>

      {/* Funnel Steps */}
      <div className="space-y-3 pt-1">
        {funnelSteps.map((step, idx) => (
          <div key={step.stage} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-zinc-300">
                <span className="w-4 h-4 rounded-full bg-[#182133] border border-[#273550] flex items-center justify-center text-[10px] text-zinc-400 font-mono">
                  {idx + 1}
                </span>
                <span>{step.stage}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-400">{step.rateText}</span>
                <span className="font-mono font-bold text-zinc-100 bg-[#141b2a] px-2 py-0.5 rounded border border-[#212c44]">
                  {step.count}
                </span>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="h-2.5 w-full bg-[#131926] rounded-full overflow-hidden p-0.5 border border-[#1e273d]">
              <div
                className={`h-full rounded-full ${step.bg} transition-all duration-700`}
                style={{ width: step.barWidth }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
