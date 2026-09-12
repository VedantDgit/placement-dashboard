"use client";

import React from "react";
import Link from "next/link";
import { Company, CompanyStatus } from "@/types";
import { getStatusDetails, getDeadlineUrgency } from "@/lib/utils";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  Building2,
  MapPin,
  Calendar,
  ChevronRight,
  Trash2,
  Edit,
  ExternalLink,
} from "lucide-react";

interface CompanyTableProps {
  companies: Company[];
  onEditCompany?: (company: Company) => void;
}

const statusOptions: CompanyStatus[] = [
  "Not Applied",
  "Applied",
  "Under Review",
  "Shortlisted",
  "Assessment",
  "Technical Round",
  "Managerial Round",
  "HR Round",
  "Selected",
  "Rejected",
  "On Hold",
  "Withdrawn",
  "Offer Received",
  "Offer Accepted",
];

export const CompanyTable: React.FC<CompanyTableProps> = ({ companies, onEditCompany }) => {
  const { updateCompanyStatus, deleteCompany } = usePlacementStore();

  if (companies.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500 text-xs bg-[#0d121c] border border-[#1e283d] rounded-2xl">
        No companies match your filters.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#0d121c] border border-[#1e283d] overflow-hidden overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[#1b2336] bg-[#111624] text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
            <th className="py-3 px-4">Company & Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Current Round</th>
            <th className="py-3 px-4">Package</th>
            <th className="py-3 px-4">Source</th>
            <th className="py-3 px-4">Applied</th>
            <th className="py-3 px-4">Deadline</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#182133]">
          {companies.map((company) => {
            const statusDetails = getStatusDetails(company.status);
            const urgency = getDeadlineUrgency(company.deadline);

            return (
              <tr
                key={company.id}
                className="hover:bg-[#121826] transition-colors group"
              >
                {/* Company & Role */}
                <td className="py-3.5 px-4 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#161e30] border border-[#232f48] flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {company.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/companies/${company.id}`}
                        className="font-bold text-zinc-100 hover:text-blue-400 transition-colors flex items-center gap-1.5"
                      >
                        <span className="truncate">{company.name}</span>
                        {company.isSample && (
                          <span className="text-[8px] font-mono px-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                            SAMPLE
                          </span>
                        )}
                      </Link>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {company.role} • {company.location}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status Dropdown */}
                <td className="py-3.5 px-4 min-w-[160px]">
                  <select
                    value={company.status}
                    onChange={(e) =>
                      updateCompanyStatus(company.id, e.target.value as CompanyStatus)
                    }
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border cursor-pointer ${statusDetails.badgeClass} bg-[#0e121a] focus:outline-none`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Current Round */}
                <td className="py-3.5 px-4 text-zinc-300 font-medium min-w-[140px] truncate">
                  {company.currentRoundName || "—"}
                </td>

                {/* Package */}
                <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400 min-w-[120px]">
                  {company.offeredCtc || company.packageStipend || "—"}
                </td>

                {/* Source */}
                <td className="py-3.5 px-4 text-zinc-400 min-w-[100px]">
                  <span className="px-2 py-0.5 rounded bg-[#141b2a] border border-[#202c44] text-[10px]">
                    {company.source}
                  </span>
                </td>

                {/* Applied Date */}
                <td className="py-3.5 px-4 text-zinc-400 font-mono min-w-[100px]">
                  {company.applicationDate}
                </td>

                {/* Deadline */}
                <td className="py-3.5 px-4 min-w-[130px]">
                  {company.deadline ? (
                    <span className={`px-2 py-0.5 rounded border text-[10px] ${urgency.badgeClass}`}>
                      {urgency.label}
                    </span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right min-w-[100px]">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/companies/${company.id}`}
                      className="p-1.5 rounded-lg bg-[#141b2a] hover:bg-blue-600/20 text-zinc-400 hover:text-blue-400 transition-colors"
                      title="View full pipeline"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`Delete application for ${company.name}?`)) {
                          deleteCompany(company.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-[#141b2a] hover:bg-red-600/20 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Delete application"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
