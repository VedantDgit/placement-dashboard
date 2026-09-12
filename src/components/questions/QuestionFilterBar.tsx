"use client";

import React from "react";
import { QuestionCategory, QuestionDifficulty } from "@/types";
import { Search, BookmarkCheck, RotateCcw } from "lucide-react";

interface QuestionFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (diff: string) => void;
  needsRevisionOnly: boolean;
  onToggleRevisionOnly: (val: boolean) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

const categories: QuestionCategory[] = [
  "DSA",
  "Java",
  "Python",
  "C++",
  "JavaScript/TypeScript",
  "SQL",
  "DBMS",
  "OS",
  "CN",
  "OOP",
  "System Design",
  "ML",
  "DL",
  "AI",
  "Projects",
  "HR",
  "Behavioral",
  "Aptitude",
];

export const QuestionFilterBar: React.FC<QuestionFilterBarProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  needsRevisionOnly,
  onToggleRevisionOnly,
  onReset,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions, concepts, answers, or tags..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111624] border border-[#1e283d] text-zinc-100 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <span className="text-zinc-400 font-mono self-end sm:self-auto">
          Showing <strong className="text-zinc-100">{filteredCount}</strong> of {totalCount}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Difficulty Dropdown */}
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Needs revision toggle */}
        <button
          onClick={() => onToggleRevisionOnly(!needsRevisionOnly)}
          className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
            needsRevisionOnly
              ? "bg-amber-500/15 text-amber-300 border-amber-500/30 font-semibold"
              : "bg-[#111624] text-zinc-400 border-[#1e283d] hover:text-zinc-200"
          }`}
        >
          <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Needs Revision Only</span>
        </button>

        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-lg bg-[#141b2b] text-zinc-400 hover:text-zinc-200 border border-[#222d44] flex items-center gap-1.5 ml-auto transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
