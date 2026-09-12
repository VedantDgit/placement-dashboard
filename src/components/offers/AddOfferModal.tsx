"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/store/usePlacementStore";
import { OfferStatus } from "@/types";
import { Award, Check } from "lucide-react";

interface AddOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCompanyId?: string;
}

export const AddOfferModal: React.FC<AddOfferModalProps> = ({
  isOpen,
  onClose,
  defaultCompanyId,
}) => {
  const { companies, addOffer, updateCompanyStatus } = usePlacementStore();

  const [companyId, setCompanyId] = useState(defaultCompanyId || companies[0]?.id || "");
  const [role, setRole] = useState("Software Engineer");
  const [baseSalary, setBaseSalary] = useState("₹20 LPA");
  const [totalCtc, setTotalCtc] = useState("₹30 LPA");
  const [joiningBonus, setJoiningBonus] = useState("");
  const [stocks, setStocks] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [bond, setBond] = useState("None");
  const [workMode, setWorkMode] = useState<"Remote" | "Hybrid" | "On-site">("Hybrid");
  const [offerDate, setOfferDate] = useState(new Date().toISOString().split("T")[0]);
  const [joiningDate, setJoiningDate] = useState("");
  const [status, setStatus] = useState<OfferStatus>("Received");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!totalCtc.trim()) return;

    const comp = companies.find((c) => c.id === companyId);
    const compName = comp?.name || "Target Company";

    addOffer({
      companyId,
      companyName: compName,
      role: role.trim() || "Software Engineer",
      baseSalary: baseSalary.trim() || undefined,
      totalCtc: totalCtc.trim(),
      joiningBonus: joiningBonus.trim() || undefined,
      stocks: stocks.trim() || undefined,
      location: location.trim() || "India",
      bond: bond.trim() || "None",
      workMode,
      offerDate,
      joiningDate: joiningDate || undefined,
      status,
      notes: notes.trim() || undefined,
    });

    if (companyId) {
      updateCompanyStatus(
        companyId,
        status === "Accepted" ? "Offer Accepted" : "Offer Received"
      );
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Job Offer"
      description="Track compensation structure, base salary, RSUs, bond, and terms."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Company</label>
            <select
              value={companyId}
              onChange={(e) => {
                setCompanyId(e.target.value);
                const found = companies.find((c) => c.id === e.target.value);
                if (found) setRole(found.role);
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Offered Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Total CTC <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. ₹42 LPA"
              value={totalCtc}
              onChange={(e) => setTotalCtc(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 font-semibold text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Base Salary</label>
            <input
              type="text"
              placeholder="e.g. ₹22 LPA"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Joining Bonus</label>
            <input
              type="text"
              placeholder="e.g. ₹3,00,000"
              value={joiningBonus}
              onChange={(e) => setJoiningBonus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Stocks / RSUs</label>
            <input
              type="text"
              placeholder="e.g. $25,000 over 4 yrs"
              value={stocks}
              onChange={(e) => setStocks(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Work Mode</label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value as "Remote" | "Hybrid" | "On-site")}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Service Bond</label>
            <input
              type="text"
              placeholder="e.g. None or 1 Year"
              value={bond}
              onChange={(e) => setBond(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Offer Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OfferStatus)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              <option value="Received">Received</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Negotiating">Negotiating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Offer Date</label>
            <input
              type="date"
              value={offerDate}
              onChange={(e) => setOfferDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Joining Date</label>
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
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
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Save Offer</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
