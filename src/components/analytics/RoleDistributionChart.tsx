"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { usePlacementStore } from "@/store/usePlacementStore";

export const RoleDistributionChart: React.FC = () => {
  const { companies } = usePlacementStore();

  // Aggregate by role grouping
  const roleGroups: Record<string, number> = {
    "SDE / Software": 0,
    "AI / ML / Data": 0,
    "Backend Developer": 0,
    "Full Stack Developer": 0,
    "Systems / Cloud": 0,
    Other: 0,
  };

  companies.forEach((c) => {
    const roleLower = c.role.toLowerCase();
    if (roleLower.includes("sde") || roleLower.includes("software")) {
      roleGroups["SDE / Software"]++;
    } else if (
      roleLower.includes("ml") ||
      roleLower.includes("ai") ||
      roleLower.includes("data") ||
      roleLower.includes("quant")
    ) {
      roleGroups["AI / ML / Data"]++;
    } else if (roleLower.includes("backend")) {
      roleGroups["Backend Developer"]++;
    } else if (roleLower.includes("full stack")) {
      roleGroups["Full Stack Developer"]++;
    } else if (roleLower.includes("cloud") || roleLower.includes("system") || roleLower.includes("devops")) {
      roleGroups["Systems / Cloud"]++;
    } else {
      roleGroups["Other"]++;
    }
  });

  const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#64748b"];

  const data = Object.entries(roleGroups)
    .filter(([_, count]) => count > 0)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h3 className="text-sm font-bold text-zinc-100">Applications by Role</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Distribution across job profiles</p>
        </div>
        <span className="text-xs font-mono font-bold text-zinc-300">
          {companies.length} Total
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0d121c",
                borderColor: "#232f48",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#fff",
              }}
              formatter={(value: any) => [`${value} applications`, "Count"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-[11px] text-zinc-400">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
