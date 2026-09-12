"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/store/usePlacementStore";
import { RoundStatus, RoundType } from "@/types";
import { Check, Layers } from "lucide-react";

interface AddRoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
}

const roundTypes: RoundType[] = [
  "Application",
  "Online Assessment",
  "Technical Round 1",
  "Technical Round 2",
  "Technical Round 3",
  "System Design",
  "Managerial Round",
  "HR Round",
  "Final Interview",
  "Other",
];

const roundStatuses: RoundStatus[] = [
  "Upcoming",
  "Scheduled",
  "Completed",
  "Cleared",
  "Failed",
  "Skipped",
];

export const AddRoundModal: React.FC<AddRoundModalProps> = ({
  isOpen,
  onClose,
  companyId,
}) => {
  const { rounds, addRound } = usePlacementStore();

  const companyRounds = rounds.filter((r) => r.companyId === companyId);
  const nextOrder = companyRounds.length + 1;

  const [name, setName] = useState(`Technical Round ${nextOrder - 1 > 0 ? nextOrder - 1 : 1}`);
  const [type, setType] = useState<RoundType>("Technical Round 1");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<RoundStatus>("Scheduled");
  const [score, setScore] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [interviewer, setInterviewer] = useState("");
  const [topicsAsked, setTopicsAsked] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notes, setNotes] = useState("");
  const [performanceRating, setPerformanceRating] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addRound({
      companyId,
      name: name.trim(),
      type,
      order: nextOrder,
      date: date || undefined,
      time: time || undefined,
      status,
      score: score.trim() || undefined,
      durationMinutes: Number(durationMinutes) || 60,
      interviewer: interviewer.trim() || undefined,
      topicsAsked: topicsAsked
        ? topicsAsked.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
      feedback: feedback.trim() || undefined,
      notes: notes.trim() || undefined,
      performanceRating,
      checklist: [
        { id: `c-${Date.now()}-1`, label: "Core DSA & Algorithm edge cases", completed: false },
        { id: `c-${Date.now()}-2`, label: "Project deep dive & architecture", completed: false },
        { id: `c-${Date.now()}-3`, label: "CS Fundamentals (OS/DBMS/CN/OOP)", completed: false },
      ],
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Placement Round"
      description="Track technical evaluations, scores, interviewers, and preparation checklists."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Round Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 text-sm"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Round Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RoundType)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {roundTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as RoundStatus)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {roundStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Round Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Score / Result</label>
            <input
              type="text"
              placeholder="e.g. 88% or 4.5/5"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Interviewer Name / Role</label>
            <input
              type="text"
              placeholder="e.g. Senior Staff Engineer"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Topics Asked (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Graphs, Segment Trees, Concurrency"
              value={topicsAsked}
              onChange={(e) => setTopicsAsked(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-zinc-300 font-medium mb-1">Interviewer Feedback / Notes</label>
          <textarea
            rows={3}
            placeholder="Feedback received, strengths noted, or areas of improvement..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div className="pt-4 border-t border-[#1c2438] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#161e2e] text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Create Round</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
