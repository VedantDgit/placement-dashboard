"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { usePlacementStore } from "@/store/usePlacementStore";

export const ConversionFunnelChart: React.FC = () => {
  const { getConversionRates, getFunnelMetrics } = usePlacementStore();
  const rates = getConversionRates();
  const funnel = getFunnelMetrics();

  const data = [
    {
      stage: "App → Shortlist",
      rate: rates.applicationToShortlist,
      count: funnel.shortlisted,
      total: funnel.applied,
      color: "#3b82f6",
    },
    {
      stage: "Shortlist → OA",
      rate: rates.shortlistToOA,
      count: funnel.assessment,
      total: funnel.shortlisted,
      color: "#06b6d4",
    },
    {
      stage: "OA → Technical",
      rate: rates.oaToTechnical,
      count: funnel.technical,
      total: funnel.assessment,
      color: "#f59e0b",
    },
    {
      stage: "Technical → HR",
      rate: rates.technicalToHR,
      count: funnel.managerialOrHr,
      total: funnel.technical,
      color: "#a855f7",
    },
    {
      stage: "HR → Offer",
      rate: rates.hrToOffer,
      count: funnel.offers,
      total: funnel.managerialOrHr,
      color: "#10b981",
    },
    {
      stage: "Overall Conversion",
      rate: rates.overallOfferRate,
      count: funnel.offers,
      total: funnel.applied,
      color: "#22c55e",
    },
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h3 className="text-sm font-bold text-zinc-100">Step-by-Step Conversion Rates</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Stage-to-stage transition clearance percentages
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400">
          {rates.overallOfferRate}% Overall Yield
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis
              dataKey="stage"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0d121c",
                borderColor: "#232f48",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#fff",
              }}
              formatter={(value: any, name: any, props: any) => [
                `${value}% (${props.payload.count}/${props.payload.total})`,
                "Clearance Rate",
              ]}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
