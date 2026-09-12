"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/store/usePlacementStore";
import { EventType } from "@/types";
import { Check, Calendar } from "lucide-react";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const eventTypes: EventType[] = [
  "Online Assessment",
  "Technical Interview",
  "Managerial Interview",
  "HR Interview",
  "Application Deadline",
  "OA Deadline",
  "Follow-up",
  "Offer Deadline",
  "Mock Test",
  "Other",
];

export const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
  const { companies, addEvent } = usePlacementStore();

  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [type, setType] = useState<EventType>("Technical Interview");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("11:00 AM");
  const [locationOrUrl, setLocationOrUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const comp = companies.find((c) => c.id === companyId);

    addEvent({
      title: title.trim(),
      companyId: companyId || undefined,
      companyName: comp?.name || undefined,
      type,
      date,
      time: time.trim() || undefined,
      locationOrUrl: locationOrUrl.trim() || undefined,
      status: "Upcoming",
      notes: notes.trim() || undefined,
    });

    setTitle("");
    setLocationOrUrl("");
    setNotes("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Interview / Event"
      description="Add upcoming OA tests, technical loops, HR rounds, and deadlines."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-zinc-300 font-medium mb-1">
            Event / Interview Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Google Technical Round 2 (Concurrency)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 text-sm"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Linked Company</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              <option value="">None / General</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Time</label>
            <input
              type="text"
              placeholder="e.g. 02:00 PM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-zinc-300 font-medium mb-1">Meeting Link or Location</label>
          <input
            type="text"
            placeholder="e.g. https://meet.google.com/xyz or Main Auditorium"
            value={locationOrUrl}
            onChange={(e) => setLocationOrUrl(e.target.value)}
            className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
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
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Schedule Event</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
