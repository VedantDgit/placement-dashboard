"use client";

import React from "react";
import { Offer, OfferStatus } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  Award,
  Building2,
  Calendar,
  MapPin,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Trash2,
} from "lucide-react";

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { updateOffer, deleteOffer } = usePlacementStore();

  const getStatusColor = (status: OfferStatus) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500/20 text-green-300 border-green-500/40";
      case "Received":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Negotiating":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Declined":
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0d121c] border border-[#1e283d] hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">{offer.companyName}</h3>
              <p className="text-xs text-zinc-400">{offer.role}</p>
            </div>
          </div>

          <select
            value={offer.status}
            onChange={(e) =>
              updateOffer(offer.id, { status: e.target.value as OfferStatus })
            }
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getStatusColor(
              offer.status
            )} bg-[#0c101a] focus:outline-none cursor-pointer`}
          >
            <option value="Received">Offer Received</option>
            <option value="Accepted">Offer Accepted</option>
            <option value="Negotiating">Negotiating</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        {/* CTC Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#111c26] to-[#121824] border border-emerald-500/20 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400/80">
            Total Compensation (CTC)
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {offer.totalCtc}
          </div>
          {offer.baseSalary && (
            <div className="text-xs text-zinc-300">
              Base: <strong className="text-zinc-100 font-mono">{offer.baseSalary}</strong>
            </div>
          )}
        </div>

        {/* Breakdown details */}
        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 pt-3">
          {offer.joiningBonus && (
            <div className="p-2.5 rounded-lg bg-[#111624] border border-[#1e273d]">
              <span className="text-[10px] text-zinc-500 block">Joining Bonus</span>
              <span className="font-semibold text-zinc-200">{offer.joiningBonus}</span>
            </div>
          )}
          {offer.stocks && (
            <div className="p-2.5 rounded-lg bg-[#111624] border border-[#1e273d]">
              <span className="text-[10px] text-zinc-500 block">Stocks / RSUs</span>
              <span className="font-semibold text-zinc-200 truncate block">{offer.stocks}</span>
            </div>
          )}
          <div className="p-2.5 rounded-lg bg-[#111624] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-500 block">Work Mode</span>
            <span className="font-semibold text-zinc-200">{offer.workMode}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#111624] border border-[#1e273d]">
            <span className="text-[10px] text-zinc-500 block">Service Bond</span>
            <span className="font-semibold text-zinc-200">{offer.bond || "None"}</span>
          </div>
        </div>

        {/* Location & Joining */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-[#182133] mt-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            {offer.location}
          </span>
          {offer.joiningDate && (
            <span className="flex items-center gap-1 font-mono text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              Join: {offer.joiningDate}
            </span>
          )}
        </div>

        {/* Perks */}
        {offer.perks && offer.perks.length > 0 && (
          <div className="pt-3 space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
              Perks & Terms
            </span>
            <ul className="space-y-1">
              {offer.perks.map((p, idx) => (
                <li key={idx} className="text-xs text-zinc-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer delete */}
      <div className="pt-3 border-t border-[#182133] flex justify-between items-center text-[11px] text-zinc-500">
        <span>Offered on: {offer.offerDate}</span>
        <button
          onClick={() => {
            if (confirm(`Delete offer from ${offer.companyName}?`)) {
              deleteOffer(offer.id);
            }
          }}
          className="text-zinc-600 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
