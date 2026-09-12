"use client";

import React, { useState } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { User, Check, Sparkles } from "lucide-react";

export const ProfileSettings: React.FC = () => {
  const { userProfile, updateUserProfile } = usePlacementStore();

  const [name, setName] = useState(userProfile.name);
  const [college, setCollege] = useState(userProfile.college);
  const [branch, setBranch] = useState(userProfile.branch);
  const [targetCtc, setTargetCtc] = useState(userProfile.targetCtc);
  const [graduationYear, setGraduationYear] = useState(userProfile.graduationYear);
  const [seasonName, setSeasonName] = useState(userProfile.seasonName);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || userProfile.name,
      college: college.trim() || userProfile.college,
      branch: branch.trim() || userProfile.branch,
      targetCtc: targetCtc.trim() || userProfile.targetCtc,
      graduationYear: graduationYear.trim() || userProfile.graduationYear,
      seasonName: seasonName.trim() || userProfile.seasonName,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>Profile & Placement Goals</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Personalize your target CTC, graduation year, and dashboard banners.
          </p>
        </div>

        {saved && (
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
            Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-100 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Placement Season Title</label>
            <input
              type="text"
              value={seasonName}
              onChange={(e) => setSeasonName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-100 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">College / University</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Branch / Degree</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Target CTC Goal</label>
            <input
              type="text"
              value={targetCtc}
              onChange={(e) => setTargetCtc(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-100 font-mono text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Graduation Year</label>
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
