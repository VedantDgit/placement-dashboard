"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  CompanyStatus,
  JobType,
  CompanyCategory,
  ApplicationSource,
} from "@/types";
import {
  Building2,
  Briefcase,
  Layers,
  Calendar,
  User,
  Zap,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const categoryOptions: CompanyCategory[] = [
  "Product",
  "Service",
  "Startup",
  "MNC",
  "FinTech",
  "AI/ML",
  "Cloud",
  "SaaS",
  "Consulting",
  "Core Tech",
  "E-Commerce",
  "Other",
];

const sourceOptions: ApplicationSource[] = [
  "Campus",
  "LinkedIn",
  "Referral",
  "Company Website",
  "Naukri",
  "Internship Conversion",
  "Hackathon",
  "College Placement Cell",
  "Unstop",
  "Instahyre",
  "Other",
];

export const CompanyModal: React.FC<CompanyModalProps> = ({ isOpen, onClose }) => {
  const { addCompany, resumeVersions } = usePlacementStore();

  const [isQuickAdd, setIsQuickAdd] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("Software Engineer");
  const [jobType, setJobType] = useState<JobType>("Full Time");
  const [location, setLocation] = useState("Bangalore / Hybrid");
  const [category, setCategory] = useState<CompanyCategory>("Product");
  const [source, setSource] = useState<ApplicationSource>("Campus");
  const [applicationDate, setApplicationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState<CompanyStatus>("Applied");
  const [currentRoundName, setCurrentRoundName] = useState("Online Assessment");
  const [nextRoundName, setNextRoundName] = useState("Technical Round 1");
  const [packageStipend, setPackageStipend] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterPhone, setRecruiterPhone] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [resumeVersionId, setResumeVersionId] = useState(resumeVersions[0]?.id || "");
  const [notes, setNotes] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Tier-1"]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;

    addCompany({
      name: name.trim(),
      role: role.trim() || "Software Engineer",
      jobType,
      location: location.trim() || "Not specified",
      category,
      source,
      applicationDate,
      deadline: deadline || undefined,
      status,
      currentRoundName: currentRoundName || undefined,
      nextRoundName: nextRoundName || undefined,
      packageStipend: packageStipend || undefined,
      expectedCtc: expectedCtc || undefined,
      recruiter: recruiterName
        ? {
            name: recruiterName,
            email: recruiterEmail || undefined,
            phone: recruiterPhone || undefined,
          }
        : undefined,
      applicationUrl: applicationUrl || undefined,
      resumeVersionId: resumeVersionId || undefined,
      notes: notes || undefined,
      tags,
    });

    // Reset & close
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setRole("Software Engineer");
    setLocation("Bangalore / Hybrid");
    setPackageStipend("");
    setExpectedCtc("");
    setRecruiterName("");
    setRecruiterEmail("");
    setRecruiterPhone("");
    setNotes("");
    setCurrentStep(1);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isQuickAdd ? "Quick Add Company" : "Add Placement Application"}
      description={
        isQuickAdd
          ? "Fast 3-field addition. You can fill out details later."
          : `Step ${currentStep} of 5: ${
              currentStep === 1
                ? "Company Details"
                : currentStep === 2
                ? "Role & Package"
                : currentStep === 3
                ? "Stage & Status"
                : currentStep === 4
                ? "Rounds & Timeline"
                : "Recruiter & Notes"
            }`
      }
      maxWidth="2xl"
    >
      {/* Mode Switcher */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1d2538]">
        <button
          type="button"
          onClick={() => setIsQuickAdd(!isQuickAdd)}
          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isQuickAdd ? "Switch to Detailed 5-Step Wizard" : "Switch to Quick-Add"}</span>
        </button>

        {!isQuickAdd && (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-5 h-1.5 rounded-full transition-all ${
                  step === currentStep
                    ? "bg-blue-500 w-8"
                    : step < currentStep
                    ? "bg-blue-600/40"
                    : "bg-[#20293d]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* QUICK ADD MODE */}
        {isQuickAdd ? (
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-300 font-medium mb-1.5">
                Company Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Google, Microsoft, Atlassian"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1.5">Role</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer, ML Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1.5">Current Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CompanyStatus)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 text-sm focus:outline-none focus:border-blue-500"
              >
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#161d2d] text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Check className="w-4 h-4" />
                <span>Save Application</span>
              </button>
            </div>
          </div>
        ) : (
          /* 5-STEP WIZARD */
          <div>
            {/* STEP 1: Company Info */}
            {currentStep === 1 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-zinc-400 font-semibold mb-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Company Information</span>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NVIDIA, Amazon, Oracle"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CompanyCategory)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    >
                      {categoryOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Source</label>
                    <select
                      value={source}
                      onChange={(e) => setSource(e.target.value as ApplicationSource)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    >
                      {sourceOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Hyderabad, Remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Career URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={applicationUrl}
                      onChange={(e) => setApplicationUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Role & Package */}
            {currentStep === 2 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-zinc-400 font-semibold mb-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>Role & Compensation</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Role / Position <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SDE-1, ML Engineer, Data Analyst"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Job Type</label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value as JobType)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Internship">Internship</option>
                      <option value="6M Intern + PPO">6M Intern + PPO</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Expected / Base Package
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹28 LPA or ₹80,000/mo"
                      value={packageStipend}
                      onChange={(e) => setPackageStipend(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Expected Total CTC
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹35 LPA"
                      value={expectedCtc}
                      onChange={(e) => setExpectedCtc(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Resume Version Submitted
                  </label>
                  <select
                    value={resumeVersionId}
                    onChange={(e) => setResumeVersionId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                  >
                    {resumeVersions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.targetRole})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Stage & Status */}
            {currentStep === 3 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-zinc-400 font-semibold mb-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Pipeline Stage & Status</span>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Current Placement Status <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as CompanyStatus)}
                    className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Application Date</label>
                    <input
                      type="date"
                      value={applicationDate}
                      onChange={(e) => setApplicationDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Deadline / Drive Date
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. Tier-1, High-CTC, Dream"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1.5 bg-[#182133] hover:bg-[#202c45] text-zinc-200 rounded-lg"
                    >
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[11px]"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Next Event / Round */}
            {currentStep === 4 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-zinc-400 font-semibold mb-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span>Round Timeline</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Current Stage Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Online Assessment, Tech Round 1"
                      value={currentRoundName}
                      onChange={(e) => setCurrentRoundName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">
                      Next Expected Round
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Technical Round 2, HR Round"
                      value={nextRoundName}
                      onChange={(e) => setNextRoundName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Recruiter & Notes */}
            {currentStep === 5 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-zinc-400 font-semibold mb-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Recruiter & Notes</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Recruiter Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Anjali Sharma"
                      value={recruiterName}
                      onChange={(e) => setRecruiterName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-medium mb-1">Recruiter Email</label>
                    <input
                      type="email"
                      placeholder="anjali@company.com"
                      value={recruiterEmail}
                      onChange={(e) => setRecruiterEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Personal Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Key concepts to focus on, referral details, or impressions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 mt-6 border-t border-[#1a2336] flex items-center justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#141b2b] text-zinc-300 hover:text-white flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg bg-[#141b2b] text-zinc-400 hover:text-zinc-200"
                >
                  Cancel
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 1 && !name.trim()) return;
                      setCurrentStep(currentStep + 1);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>Finish & Save</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
