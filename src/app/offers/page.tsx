"use client";

import React, { useState } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { OfferCard } from "@/components/offers/OfferCard";
import { AddOfferModal } from "@/components/offers/AddOfferModal";
import { Award, Plus, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";

export default function OffersPage() {
  const { offers, getStats } = usePlacementStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const stats = getStats();

  const acceptedOffer = offers.find((o) => o.status === "Accepted");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <Award className="w-6 h-6 text-yellow-400" />
            <span>Offers Hub</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Compare compensation packages, base salaries, joining bonuses, RSUs, and terms.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Offer</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400">Total Offers</span>
          <div className="text-3xl font-extrabold text-white font-mono">{offers.length}</div>
          <span className="text-xs text-zinc-500">Official offers secured</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d121c] border border-emerald-500/30 space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400/80">Highest CTC</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            {stats.highestCtc}
          </div>
          <span className="text-xs text-zinc-500">Top compensation package</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400">Average CTC</span>
          <div className="text-3xl font-extrabold text-zinc-200 font-mono">
            {stats.averageCtc}
          </div>
          <span className="text-xs text-zinc-500">Across all offers</span>
        </div>
      </div>

      {/* Accepted Offer Spotlight */}
      {acceptedOffer && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-[#0d121c] border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Accepted Offer Benchmark
              </span>
              <h4 className="text-base font-bold text-white">
                {acceptedOffer.companyName} — {acceptedOffer.role} ({acceptedOffer.totalCtc})
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* Offers List */}
      {offers.length === 0 ? (
        <div className="py-16 text-center bg-[#0d121c] border border-[#1e283d] rounded-2xl p-6 space-y-3">
          <Award className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-200">No offers recorded yet</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            When you receive selection letters or job offers, record them here to compare compensation
            and terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddOfferModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
