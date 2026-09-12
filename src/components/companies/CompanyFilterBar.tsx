"use client";

import React from "react";
import { FilterOptions } from "@/types";
import { Search, LayoutGrid, List, RotateCcw, Filter } from "lucide-react";

interface CompanyFilterBarProps {
  filters: FilterOptions;
  onFilterChange: (updates: Partial<FilterOptions>) => void;
  onReset: () => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
  totalCount: number;
  filteredCount: number;
}

export const CompanyFilterBar: React.FC<CompanyFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-3">
      {/* Top Search and View Switcher */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by company name, role, tag, or notes..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111624] border border-[#1e283d] text-zinc-100 text-xs focus:outline-none focus:border-blue-500 placeholder:text-zinc-500"
          />
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center justify-between md:justify-end gap-2.5">
          <span className="text-xs text-zinc-400 font-mono">
            Showing <strong className="text-zinc-100">{filteredCount}</strong> of {totalCount}
          </span>

          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111624] border border-[#1e283d]">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Grid Cards"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Assessment">Assessment</option>
          <option value="Technical Round">Technical Round</option>
          <option value="Managerial Round">Managerial Round</option>
          <option value="HR Round">HR Round</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Offer Accepted">Offer Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Role */}
        <select
          value={filters.role}
          onChange={(e) => onFilterChange({ role: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Roles</option>
          <option value="SDE">Software / SDE</option>
          <option value="ML">AI / ML / Data</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
          <option value="System">Systems / DevOps</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          <option value="Product">Product</option>
          <option value="AI/ML">AI/ML</option>
          <option value="FinTech">FinTech</option>
          <option value="SaaS">SaaS</option>
          <option value="Service">Service</option>
          <option value="Cloud">Cloud</option>
          <option value="Startup">Startup</option>
        </select>

        {/* Source */}
        <select
          value={filters.source}
          onChange={(e) => onFilterChange({ source: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Sources</option>
          <option value="Campus">Campus</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Company Website">Company Website</option>
        </select>

        {/* Sort By */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterOptions["sortBy"] })}
          className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="recently_updated">Recently Updated</option>
          <option value="newest">Newest Applied</option>
          <option value="oldest">Oldest Applied</option>
          <option value="highest_package">Highest CTC</option>
          <option value="name">Company Name (A-Z)</option>
        </select>

        {/* Reset */}
        <button
          onClick={onReset}
          className="px-2.5 py-1.5 rounded-lg bg-[#141b2b] hover:bg-[#1b253b] text-zinc-400 hover:text-zinc-200 border border-[#222d44] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
};
