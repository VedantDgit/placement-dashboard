"use client";

import React from "react";
import Link from "next/link";
import { Company, PipelineStage } from "@/types";
import { getStatusDetails, getDeadlineUrgency } from "@/lib/utils";
import { Building2, Calendar, TrendingUp, ChevronRight, GripVertical } from "lucide-react";

interface PipelineCardProps {
  company: Company;
  onDragStart: (e: React.DragEvent, companyId: string) => void;
  onMoveStage: (companyId: string, nextStage: PipelineStage) => void;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({
  company,
  onDragStart,
  onMoveStage,
}) => {
  const statusDetails = getStatusDetails(company.status);
  const urgency = getDeadlineUrgency(company.deadline);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, company.id)}
      className="p-3.5 rounded-xl bg-[#111624] border border-[#1f283d] hover:border-blue-500/50 hover:shadow-lg transition-all space-y-2.5 cursor-grab active:cursor-grabbing group"
    >
      {/* Top line */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#182133] border border-[#273550] flex items-center justify-center text-xs font-bold text-white shrink-0">
            {company.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <Link
              href={`/companies/${company.id}`}
              className="text-xs font-bold text-zinc-100 hover:text-blue-400 transition-colors truncate block"
            >
              {company.name}
            </Link>
            <p className="text-[10px] text-zinc-400 truncate">{company.role}</p>
          </div>
        </div>

        <GripVertical className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
      </div>

      {/* Package & Category */}
      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#182030]">
        <span className="text-emerald-400 font-semibold font-mono">
          {company.offeredCtc || company.packageStipend || "Not specified"}
        </span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#161e2e] text-zinc-400 border border-[#232f48]">
          {company.category}
        </span>
      </div>

      {/* Current Round */}
      {company.currentRoundName && (
        <div className="text-[10px] text-zinc-300 bg-[#0c101a] px-2 py-1 rounded border border-[#1b2336] truncate">
          <span className="text-zinc-500 mr-1">Round:</span>
          {company.currentRoundName}
        </div>
      )}

      {/* Deadline badge */}
      {urgency.urgency !== "none" && (
        <div className="flex justify-start">
          <span className={`text-[9px] px-1.5 py-0.2 rounded border ${urgency.badgeClass}`}>
            {urgency.label}
          </span>
        </div>
      )}

      {/* Quick Move Footer */}
      <div className="pt-2 border-t border-[#182030] flex items-center justify-between">
        <span className="text-[10px] text-zinc-500">{company.applicationDate}</span>
        <Link
          href={`/companies/${company.id}`}
          className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
        >
          <span>Timeline</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
