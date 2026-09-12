"use client";

import React from "react";
import { ResumeVersion } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  FileText,
  ExternalLink,
  Trash2,
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react";

interface ResumeVersionCardProps {
  resume: ResumeVersion;
}

export const ResumeVersionCard: React.FC<ResumeVersionCardProps> = ({ resume }) => {
  const { companies, deleteResumeVersion } = usePlacementStore();

  const linkedCompanies = companies.filter((c) => c.resumeVersionId === resume.id);
  const totalApps = linkedCompanies.length;
  const shortlistedCount = linkedCompanies.filter((c) =>
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

  const offersCount = linkedCompanies.filter((c) =>
    ["Selected", "Offer Received", "Offer Accepted"].includes(c.status)
  ).length;

  const shortlistRate = totalApps > 0 ? Math.round((shortlistedCount / totalApps) * 100) : 0;

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] hover:border-zinc-700 transition-all space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">{resume.name}</h3>
              <span className="text-[11px] text-indigo-400 font-medium">{resume.targetRole}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {resume.fileUrl && (
              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-[#141b2a] text-zinc-400 hover:text-white"
                title="View Resume Document"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => {
                if (confirm(`Delete resume version "${resume.name}"?`)) {
                  deleteResumeVersion(resume.id);
                }
              }}
              className="p-1.5 rounded-lg bg-[#141b2a] text-zinc-600 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Description */}
        {resume.description && (
          <p className="text-xs text-zinc-400 leading-relaxed bg-[#111624] p-3 rounded-xl border border-[#1e273d]">
            {resume.description}
          </p>
        )}

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-[#141b2a] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Used In</span>
            <span className="text-base font-bold text-zinc-100 font-mono">{totalApps}</span>
            <span className="text-[10px] text-zinc-500 block">apps</span>
          </div>

          <div className="p-2 rounded-lg bg-[#141b2a] border border-[#1e273d]">
            <span className="text-[10px] text-cyan-400/80 block uppercase font-bold">Shortlist</span>
            <span className="text-base font-bold text-cyan-400 font-mono">{shortlistRate}%</span>
            <span className="text-[10px] text-zinc-500 block">{shortlistedCount} cleared</span>
          </div>

          <div className="p-2 rounded-lg bg-[#141b2a] border border-[#1e273d]">
            <span className="text-[10px] text-emerald-400/80 block uppercase font-bold">Offers</span>
            <span className="text-base font-bold text-emerald-400 font-mono">{offersCount}</span>
            <span className="text-[10px] text-zinc-500 block">converted</span>
          </div>
        </div>
      </div>

      {/* Companies using this resume */}
      <div className="pt-3 border-t border-[#182133] text-[11px] text-zinc-400">
        <span className="text-zinc-500">Linked Companies: </span>
        {linkedCompanies.length > 0 ? (
          <span className="text-zinc-300">
            {linkedCompanies.map((c) => c.name).slice(0, 4).join(", ")}
            {linkedCompanies.length > 4 ? ` +${linkedCompanies.length - 4} more` : ""}
          </span>
        ) : (
          <span className="text-zinc-600 italic">None attached yet</span>
        )}
      </div>
    </div>
  );
};
