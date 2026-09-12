"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/store/usePlacementStore";
import { TaskCategory, TaskPriority } from "@/types";
import { Check, CheckSquare } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: TaskCategory[] = [
  "DSA",
  "Revision",
  "Application",
  "Mock Interview",
  "Follow-up",
  "Project Prep",
  "HR Practice",
  "Aptitude",
  "Other",
];

const priorities: TaskPriority[] = ["Urgent", "High", "Medium", "Low"];

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const { companies, addTask } = usePlacementStore();

  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [category, setCategory] = useState<TaskCategory>("DSA");
  const [priority, setPriority] = useState<TaskPriority>("High");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const comp = companies.find((c) => c.id === companyId);

    addTask({
      title: title.trim(),
      companyId: companyId || undefined,
      companyName: comp?.name || undefined,
      category,
      priority,
      dueDate,
      durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
      completed: false,
      notes: notes.trim() || undefined,
    });

    setTitle("");
    setNotes("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Placement Task"
      description="Plan daily DSA practice, interview revisions, and follow-ups."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-zinc-300 font-medium mb-1">
            Task Description <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Solve 5 Hard Graph problems on LeetCode"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 text-sm"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Linked Company (Optional)</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              <option value="">None / General Task</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
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
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-amber-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
