"use client";

import React, { useState, useMemo } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { CompanyFilterBar } from "@/components/companies/CompanyFilterBar";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { CompanyTable } from "@/components/companies/CompanyTable";
import { CompanyModal } from "@/components/companies/CompanyModal";
import { parsePackageToNumber } from "@/lib/utils";
import { Building2, Plus, Filter } from "lucide-react";

export default function CompaniesPage() {
  const { companies, filterOptions, setFilterOptions, resetFilters } = usePlacementStore();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter & Sort Logic
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        // Search
        if (filterOptions.search) {
          const query = filterOptions.search.toLowerCase();
          const matchName = company.name.toLowerCase().includes(query);
          const matchRole = company.role.toLowerCase().includes(query);
          const matchNotes = company.notes?.toLowerCase().includes(query);
          const matchTags = company.tags?.some((t) => t.toLowerCase().includes(query));
          if (!matchName && !matchRole && !matchNotes && !matchTags) return false;
        }

        // Status
        if (filterOptions.status !== "ALL" && company.status !== filterOptions.status) {
          return false;
        }

        // Role
        if (filterOptions.role !== "ALL") {
          const r = company.role.toLowerCase();
          if (filterOptions.role === "SDE" && !r.includes("sde") && !r.includes("software")) return false;
          if (
            filterOptions.role === "ML" &&
            !r.includes("ml") &&
            !r.includes("ai") &&
            !r.includes("data")
          )
            return false;
          if (filterOptions.role === "Backend" && !r.includes("backend")) return false;
          if (filterOptions.role === "Full Stack" && !r.includes("full stack")) return false;
        }

        // Category
        if (filterOptions.category !== "ALL" && company.category !== filterOptions.category) {
          return false;
        }

        // Source
        if (filterOptions.source !== "ALL" && company.source !== filterOptions.source) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filterOptions.sortBy) {
          case "newest":
            return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime();
          case "oldest":
            return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime();
          case "highest_package":
            return (
              parsePackageToNumber(b.offeredCtc || b.packageStipend) -
              parsePackageToNumber(a.offeredCtc || a.packageStipend)
            );
          case "name":
            return a.name.localeCompare(b.name);
          case "recently_updated":
          default:
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
      });
  }, [companies, filterOptions]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-blue-400" />
            <span>Company Tracker</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage campus & off-campus placement applications, status transitions, and rounds.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Filter and Sort Toolbar */}
      <CompanyFilterBar
        filters={filterOptions}
        onFilterChange={setFilterOptions}
        onReset={resetFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={companies.length}
        filteredCount={filteredCompanies.length}
      />

      {/* Companies Content */}
      {filteredCompanies.length === 0 ? (
        <div className="py-16 text-center bg-[#0d121c] border border-[#1e283d] rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#141b2a] border border-[#202b44] flex items-center justify-center text-zinc-500 mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-zinc-200">No applications found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search query or filters, or add a new placement opportunity to your
            tracker.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
          >
            Add Company
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <CompanyTable companies={filteredCompanies} />
      )}

      {/* Add Company Modal */}
      <CompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
