"use client";

import React from "react";
import Link from "next/link";
import { Company } from "@/types";
import { getStatusDetails, formatPackage, getDeadlineUrgency } from "@/lib/utils";
import {
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Tag,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const statusDetails = getStatusDetails(company.status);
  const deadlineUrgency = getDeadlineUrgency(company.deadline);

  return (
    <div className="group p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#161f33] to-[#202d4a] border border-[#2a3857] flex items-center justify-center text-sm font-bold text-white shadow-inner">
              {company.name.charAt(0)}
            </div>
            <div>
              <Link
                href={`/companies/${company.id}`}
                className="text-base font-bold text-zinc-100 hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                <span>{company.name}</span>
                {company.isSample && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded">
                    SAMPLE
                  </span>
                )}
              </Link>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                <Briefcase className="w-3 h-3 text-zinc-500" />
                <span>{company.role}</span>
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${statusDetails.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusDetails.dotClass}`} />
            {company.status}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-2 border-t border-[#182133]">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-zinc-500 shrink-0" />
            <span className="truncate">{company.location}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate justify-end">
            <span className="text-zinc-500">Source:</span>
            <span className="text-zinc-300 font-medium">{company.source}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 font-semibold font-mono">
              {company.offeredCtc || company.packageStipend || "Not specified"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 justify-end">
            <Calendar className="w-3 h-3 text-zinc-500 shrink-0" />
            <span className="text-zinc-400">{company.applicationDate}</span>
          </div>
        </div>

        {/* Current Round & Next */}
        {(company.currentRoundName || company.nextRoundName) && (
          <div className="mt-3 p-2.5 rounded-xl bg-[#111624] border border-[#1d2639] space-y-1 text-xs">
            {company.currentRoundName && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-[11px]">Current Round:</span>
                <span className="text-zinc-200 font-medium truncate ml-2">
                  {company.currentRoundName}
                </span>
              </div>
            )}
            {company.nextRoundName && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-blue-400">Next Step:</span>
                <span className="text-blue-300 font-medium truncate ml-2">
                  {company.nextRoundName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Deadline Urgency Tag */}
        {deadlineUrgency.urgency !== "none" && (
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Deadline:</span>
            <span className={`px-2 py-0.5 rounded border text-[10px] ${deadlineUrgency.badgeClass}`}>
              {deadlineUrgency.label}
            </span>
          </div>
        )}

        {/* Tags */}
        {company.tags && company.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {company.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded bg-[#141b2b] text-zinc-400 border border-[#202b44]"
              >
                #{t}
              </span>
            ))}
            {company.tags.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#141b2b] text-zinc-400 border border-[#202b44]">
                +{company.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="pt-3 border-t border-[#182133] flex items-center justify-between">
        <span className="text-[11px] text-zinc-400 uppercase font-mono tracking-wider">
          {company.category}
        </span>

        <Link
          href={`/companies/${company.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-all"
        >
          <span>Pipeline & Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
