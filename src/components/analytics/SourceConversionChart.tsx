"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { usePlacementStore } from "@/store/usePlacementStore";

export const SourceConversionChart: React.FC = () => {
  const { companies } = usePlacementStore();

  const sources = [
    "Campus",
    "LinkedIn",
    "Referral",
    "Hackathon",
    "Company Website",
    "Other",
  ];

  const data = sources.map((source) => {
    const sourceComps = companies.filter((c) =>
      source === "Other"
        ? !["Campus", "LinkedIn", "Referral", "Hackathon", "Company Website"].includes(c.source)
        : c.source === source
    );

    const applied = sourceComps.length;
    const shortlisted = sourceComps.filter((c) =>
      [
        "Shortlisted",
        "Assessment",
        "Technical Round",
        "Managerial Round",
        "HR Round",
        "Selected",
        "Offer Received",
        "Offer Accepted",
      ].includes(c.status)
    ).length;

    const offers = sourceComps.filter((c) =>
      ["Selected", "Offer Received", "Offer Accepted"].includes(c.status)
    ).length;

    return {
      source,
      applied,
      shortlisted,
      offers,
    };
  }).filter((d) => d.applied > 0);

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h3 className="text-sm font-bold text-zinc-100">Application Source Yield</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Conversion performance by acquisition channel
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis dataKey="source" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0d121c",
                borderColor: "#232f48",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#fff",
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => <span className="text-[11px] text-zinc-400 capitalize">{value}</span>}
            />
            <Bar dataKey="applied" fill="#3b82f6" name="Applied" radius={[4, 4, 0, 0]} />
            <Bar dataKey="shortlisted" fill="#06b6d4" name="Shortlisted" radius={[4, 4, 0, 0]} />
            <Bar dataKey="offers" fill="#10b981" name="Offers" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
