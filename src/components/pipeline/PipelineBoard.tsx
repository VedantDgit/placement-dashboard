"use client";

import React, { useState } from "react";
import { Company, PipelineStage } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import { getStatusDetails } from "@/lib/utils";
import { PipelineCard } from "./PipelineCard";
import {
  Layers,
  FileCheck2,
  Code2,
  Cpu,
  UserCheck,
  HeartHandshake,
  Award,
  XCircle,
  Plus,
} from "lucide-react";

interface PipelineBoardProps {
  onOpenAddCompany: () => void;
}

const STAGES: { stage: PipelineStage; label: string; icon: React.ElementType; color: string }[] = [
  { stage: "Applied", label: "Applied", icon: Layers, color: "text-blue-400" },
  { stage: "Shortlisted", label: "Shortlisted", icon: FileCheck2, color: "text-cyan-400" },
  { stage: "Assessment", label: "OA / Tests", icon: Code2, color: "text-amber-400" },
  { stage: "Technical", label: "Technical", icon: Cpu, color: "text-purple-400" },
  { stage: "Managerial", label: "Managerial", icon: UserCheck, color: "text-indigo-400" },
  { stage: "HR", label: "HR Round", icon: HeartHandshake, color: "text-pink-400" },
  { stage: "Offer", label: "Offers", icon: Award, color: "text-emerald-400" },
  { stage: "Rejected", label: "Rejected", icon: XCircle, color: "text-red-400" },
];

export const PipelineBoard: React.FC<PipelineBoardProps> = ({ onOpenAddCompany }) => {
  const { companies, moveCompanyToStage } = usePlacementStore();
  const [draggedCompanyId, setDraggedCompanyId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);

  const handleDragStart = (e: React.DragEvent, companyId: string) => {
    setDraggedCompanyId(companyId);
    e.dataTransfer.setData("text/plain", companyId);
  };

  const handleDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (dragOverStage !== stage) {
      setDragOverStage(stage);
    }
  };

  const handleDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    setDragOverStage(null);
    const companyId = e.dataTransfer.getData("text/plain") || draggedCompanyId;
    if (companyId) {
      moveCompanyToStage(companyId, stage);
      setDraggedCompanyId(null);
    }
  };

  // Group companies by their current pipeline stage
  const getCompaniesForStage = (stage: PipelineStage) => {
    return companies.filter((c) => {
      const details = getStatusDetails(c.status);
      return details.stage === stage;
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0d121c] border border-[#1e283d]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Interactive Placement Pipeline</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Drag and drop applications across 8 recruitment stages. Stage changes sync automatically
            to local storage.
          </p>
        </div>

        <button
          onClick={onOpenAddCompany}
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-500/20 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Kanban Board Columns Grid / Horizontal Scroll */}
      <div className="overflow-x-auto pb-6 custom-scrollbar">
        <div className="flex gap-3.5 min-w-[1280px]">
          {STAGES.map(({ stage, label, icon: Icon, color }) => {
            const stageCompanies = getCompaniesForStage(stage);
            const isTarget = dragOverStage === stage;

            return (
              <div
                key={stage}
                onDragOver={(e) => handleDragOver(e, stage)}
                onDragLeave={() => setDragOverStage(null)}
                onDrop={(e) => handleDrop(e, stage)}
                className={`flex-1 min-w-[240px] max-w-[280px] rounded-2xl bg-[#0d121c] border transition-all flex flex-col max-h-[75vh] ${
                  isTarget
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-[#101726]"
                    : "border-[#1e283d]"
                }`}
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-[#1a2336] flex items-center justify-between bg-[#111624]/60 rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-xs font-bold text-zinc-200">{label}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-zinc-300 bg-[#182133] px-2 py-0.5 rounded border border-[#253350]">
                    {stageCompanies.length}
                  </span>
                </div>

                {/* Card Drop Area */}
                <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1 custom-scrollbar min-h-[220px]">
                  {stageCompanies.length === 0 ? (
                    <div className="h-full min-h-[140px] flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#1c2438] rounded-xl text-zinc-600 text-[11px]">
                      Drop cards here
                    </div>
                  ) : (
                    stageCompanies.map((company) => (
                      <PipelineCard
                        key={company.id}
                        company={company}
                        onDragStart={handleDragStart}
                        onMoveStage={moveCompanyToStage}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
