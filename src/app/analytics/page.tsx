"use client";

import React from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { ConversionFunnelChart } from "@/components/analytics/ConversionFunnelChart";
import { RoleDistributionChart } from "@/components/analytics/RoleDistributionChart";
import { SourceConversionChart } from "@/components/analytics/SourceConversionChart";
import { RejectionDropoff } from "@/components/dashboard/RejectionDropoff";
import { BarChart3, TrendingUp, Target, Award, Percent } from "lucide-react";

export default function AnalyticsPage() {
  const { getConversionRates, getStats } = usePlacementStore();
  const rates = getConversionRates();
  const stats = getStats();

  const keyRates = [
    {
      label: "Application Success Rate",
      value: `${rates.applicationToShortlist}%`,
      subtext: "App → Shortlist",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "OA Clearance Rate",
      value: `${rates.shortlistToOA}%`,
      subtext: "Shortlist → OA Cleared",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Technical Clearance",
      value: `${rates.oaToTechnical}%`,
      subtext: "OA → Technical Cleared",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "HR Clearance",
      value: `${rates.technicalToHR}%`,
      subtext: "Technical → HR Cleared",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      label: "Offer Conversion Rate",
      value: `${rates.overallOfferRate}%`,
      subtext: "Total Applications → Offers",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          <span>Placement Intelligence & Analytics</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Strictly deterministic metrics calculated dynamically from your application and round data.
        </p>
      </div>

      {/* 5 Key Conversion Rate Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {keyRates.map((item) => (
          <div
            key={item.label}
            className={`p-4 rounded-xl bg-[#0d121c] border ${item.border} flex flex-col justify-between space-y-2`}
          >
            <span className="text-[10px] uppercase font-bold text-zinc-400">{item.label}</span>
            <div>
              <div className={`text-2xl font-extrabold font-mono ${item.color}`}>
                {item.value}
              </div>
              <span className="text-[10px] text-zinc-500">{item.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnelChart />
        <RejectionDropoff />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RoleDistributionChart />
        <SourceConversionChart />
      </div>
    </div>
  );
}
