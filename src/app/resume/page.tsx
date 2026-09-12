"use client";

import React, { useState } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { ResumeVersionCard } from "@/components/resume/ResumeVersionCard";
import { Modal } from "@/components/ui/Modal";
import { FileText, Plus, Check } from "lucide-react";

export default function ResumePage() {
  const { resumeVersions, addResumeVersion } = usePlacementStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [targetRole, setTargetRole] = useState("Software Engineer / SDE");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleCreateResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addResumeVersion({
      name: name.trim(),
      targetRole: targetRole.trim(),
      description: description.trim() || undefined,
      fileUrl: fileUrl.trim() || undefined,
    });

    setName("");
    setDescription("");
    setFileUrl("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>Resume Version Tracking</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track which resume variant was submitted and measure shortlist conversion rates.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Resume Variant</span>
        </button>
      </div>

      {/* Resume Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeVersions.map((resume) => (
          <ResumeVersionCard key={resume.id} resume={resume} />
        ))}
      </div>

      {/* Add Resume Variant Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Resume Version Variant"
        description="Create a profile-targeted resume variant to track which version converts better."
        maxWidth="md"
      >
        <form onSubmit={handleCreateResume} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Variant Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Resume v3 — AI/ML & PyTorch Specialist"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Target Profile</label>
            <input
              type="text"
              required
              placeholder="e.g. ML Engineer / Data Scientist"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Key Highlights & Focus</label>
            <textarea
              rows={3}
              placeholder="e.g. Focuses on systems projects, C++, and high performance computing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Google Drive or PDF Link</label>
            <input
              type="url"
              placeholder="https://drive.google.com/file/d/..."
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-4 border-t border-[#1c2438] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#161e2e] text-zinc-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Check className="w-4 h-4" />
              <span>Save Resume</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
