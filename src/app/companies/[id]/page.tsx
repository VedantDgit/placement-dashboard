"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlacementStore } from "@/store/usePlacementStore";
import { RoundTimeline } from "@/components/rounds/RoundTimeline";
import { AddRoundModal } from "@/components/rounds/AddRoundModal";
import { AddQuestionModal } from "@/components/questions/AddQuestionModal";
import { AddOfferModal } from "@/components/offers/AddOfferModal";
import { getStatusDetails, getDeadlineUrgency } from "@/lib/utils";
import { CompanyStatus } from "@/types";
import {
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  User,
  Mail,
  Globe,
  Phone,
  ExternalLink,
  ChevronLeft,
  Plus,
  Trash2,
  FileText,
  Award,
  AlertCircle,
  Tag,
} from "lucide-react";

interface CompanyDetailPageProps {
  params: Promise<{ id: string }>;
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

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const companyId = resolvedParams.id;

  const {
    companies,
    rounds,
    questions,
    offers,
    resumeVersions,
    updateCompany,
    updateCompanyStatus,
    deleteCompany,
  } = usePlacementStore();

  const [isAddRoundOpen, setIsAddRoundOpen] = useState(false);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [notesDraft, setNotesDraft] = useState<string | null>(null);

  const company = companies.find((c) => c.id === companyId);
  const companyRounds = rounds.filter((r) => r.companyId === companyId);
  const companyQuestions = questions.filter((q) => q.companyId === companyId);
  const companyOffer = offers.find((o) => o.companyId === companyId);
  const linkedResume = resumeVersions.find((r) => r.id === company?.resumeVersionId);

  if (!company) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-lg font-bold text-zinc-200">Company Not Found</h2>
        <p className="text-xs text-zinc-400">
          The requested application could not be located in your database.
        </p>
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Company Tracker</span>
        </Link>
      </div>
    );
  }

  const statusDetails = getStatusDetails(company.status);
  const deadlineUrgency = getDeadlineUrgency(company.deadline);

  const handleSaveNotes = () => {
    if (notesDraft !== null) {
      updateCompany(company.id, { notes: notesDraft });
      setNotesDraft(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Back Nav & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/companies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Companies</span>
        </Link>

        <div className="flex items-center gap-2">
          {!companyOffer && (
            <button
              onClick={() => setIsAddOfferOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Record Offer</span>
            </button>
          )}

          <button
            onClick={() => {
              if (confirm(`Delete application for ${company.name}?`)) {
                deleteCompany(company.id);
                router.push("/companies");
              }
            }}
            className="p-1.5 rounded-lg bg-[#161e2e] text-zinc-500 hover:text-red-400 border border-[#232f48] transition-colors"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Company Header Card */}
      <div className="p-6 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-xl font-bold text-white shadow-xl shadow-blue-500/10 shrink-0">
              {company.name.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  {company.name}
                </h1>
                {company.isSample && (
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-md font-semibold">
                    SAMPLE DATA
                  </span>
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#182133] text-zinc-300 border border-[#26344f]">
                  {company.category}
                </span>
              </div>

              <p className="text-sm text-zinc-300 font-medium mt-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-zinc-500" />
                <span>{company.role}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{company.jobType}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {company.location}
                </span>
              </p>
            </div>
          </div>

          {/* Status Dropdown Picker */}
          <div className="flex flex-col sm:items-end gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Current Status
            </span>
            <select
              value={company.status}
              onChange={(e) =>
                updateCompanyStatus(company.id, e.target.value as CompanyStatus)
              }
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${statusDetails.badgeClass} bg-[#0c101a] focus:outline-none cursor-pointer`}
            >
              {statusOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#182133] text-xs">
          <div className="p-3 rounded-xl bg-[#111624] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-400 block uppercase font-bold">Package</span>
            <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
              {company.offeredCtc || company.packageStipend || "Not specified"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#111624] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-400 block uppercase font-bold">Application Date</span>
            <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">
              {company.applicationDate}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#111624] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-400 block uppercase font-bold">Source</span>
            <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">
              {company.source}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#111624] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-400 block uppercase font-bold">Deadline / Next</span>
            <span
              className={`text-[11px] font-semibold mt-0.5 inline-block ${
                deadlineUrgency.urgency !== "none" ? deadlineUrgency.badgeClass : "text-zinc-200"
              }`}
            >
              {company.deadline || "No deadline"}
            </span>
          </div>
        </div>

        {/* Tags */}
        {company.tags && company.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-zinc-400 mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Tags:
            </span>
            {company.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#141b2a] text-blue-300 border border-[#202c44]"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Offer Banner if available */}
      {companyOffer && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0d1c18] to-[#0d121c] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Official Offer in Hand ({companyOffer.status})
              </span>
              <div className="text-xl font-extrabold text-white font-mono">
                {companyOffer.totalCtc}{" "}
                {companyOffer.baseSalary && (
                  <span className="text-xs text-zinc-400 font-normal">
                    (Base: {companyOffer.baseSalary})
                  </span>
                )}
              </div>
            </div>
          </div>

          <Link
            href="/offers"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold self-start sm:self-auto"
          >
            View in Offers Hub
          </Link>
        </div>
      )}

      {/* Main Round Timeline Area */}
      <RoundTimeline
        companyId={company.id}
        rounds={companyRounds}
        questions={companyQuestions}
        onOpenAddRound={() => setIsAddRoundOpen(true)}
        onOpenAddQuestion={() => setIsAddQuestionOpen(true)}
      />

      {/* Recruiter & Notes Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruiter Details Card */}
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Recruiter / Point of Contact</span>
            </h3>
          </div>

          {company.recruiter ? (
            <div className="space-y-2.5 text-xs">
              <div className="font-bold text-zinc-100 text-sm">{company.recruiter.name}</div>
              {company.recruiter.role && (
                <p className="text-zinc-400 text-xs">{company.recruiter.role}</p>
              )}
              {company.recruiter.email && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a
                    href={`mailto:${company.recruiter.email}`}
                    className="hover:text-blue-400 underline"
                  >
                    {company.recruiter.email}
                  </a>
                </div>
              )}
              {company.recruiter.phone && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{company.recruiter.phone}</span>
                </div>
              )}
              {company.recruiter.linkedin && (
                <div className="flex items-center gap-2 text-zinc-300">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <a
                    href={company.recruiter.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 underline truncate"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {company.recruiter.notes && (
                <p className="text-zinc-400 text-[11px] pt-2 border-t border-[#1a2336]">
                  {company.recruiter.notes}
                </p>
              )}
            </div>
          ) : (
            <div className="py-6 text-center text-zinc-500 text-xs">
              No recruiter information attached.
            </div>
          )}
        </div>

        {/* Personal Preparation & Strategy Notes */}
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Preparation Notes & Strategy</span>
            </h3>

            {notesDraft !== null && (
              <button
                onClick={handleSaveNotes}
                className="text-xs px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold"
              >
                Save Notes
              </button>
            )}
          </div>

          <textarea
            rows={5}
            value={notesDraft !== null ? notesDraft : company.notes || ""}
            onChange={(e) => setNotesDraft(e.target.value)}
            placeholder="Write key concepts, past interview experiences, architecture questions, or follow-up plans..."
            className="w-full p-3 rounded-xl bg-[#111624] border border-[#1e283d] text-xs text-zinc-200 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
          />

          {linkedResume && (
            <div className="p-2.5 rounded-lg bg-[#111624] border border-[#1e273d] text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Attached Resume:</span>
              <span className="font-semibold text-indigo-400">{linkedResume.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Creation Modals */}
      <AddRoundModal
        isOpen={isAddRoundOpen}
        onClose={() => setIsAddRoundOpen(false)}
        companyId={company.id}
      />
      <AddQuestionModal
        isOpen={isAddQuestionOpen}
        onClose={() => setIsAddQuestionOpen(false)}
        defaultCompanyId={company.id}
      />
      <AddOfferModal
        isOpen={isAddOfferOpen}
        onClose={() => setIsAddOfferOpen(false)}
        defaultCompanyId={company.id}
      />
    </div>
  );
}
