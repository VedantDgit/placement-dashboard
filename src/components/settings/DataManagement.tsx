"use client";

import React, { useRef, useState } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { downloadJson } from "@/lib/utils";
import {
  Download,
  Upload,
  Database,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const DataManagement: React.FC = () => {
  const { exportAllData, importAllData, loadSampleData, clearAllData, isSampleDataLoaded } =
    usePlacementStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const payload = exportAllData();
    downloadJson(payload, `placement-command-center-${new Date().toISOString().split("T")[0]}.json`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.companies && Array.isArray(parsed.companies)) {
          importAllData(parsed);
          setImportStatus("Data backup successfully restored!");
          setTimeout(() => setImportStatus(null), 4000);
        } else {
          alert("Invalid backup file structure.");
        }
      } catch (err) {
        alert("Error parsing JSON file. Please ensure it is a valid backup.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-6">
      <div>
        <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-400" />
          <span>Local-First Data Management & Backups</span>
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5">
          All data is persisted locally in your browser storage. You can export complete JSON backups,
          transfer them across devices, or seed/clear sample data anytime.
        </p>
      </div>

      {importStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Export & Import Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Export Card */}
        <div className="p-4 rounded-xl bg-[#111624] border border-[#1e283d] flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-zinc-200 block">Export JSON Backup</span>
            <p className="text-[11px] text-zinc-400 mt-1">
              Download all companies, interview rounds, question bank, compensation offers, and tasks
              as a JSON payload.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Backup (.json)</span>
          </button>
        </div>

        {/* Import Card */}
        <div className="p-4 rounded-xl bg-[#111624] border border-[#1e283d] flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-zinc-200 block">Import JSON Backup</span>
            <p className="text-[11px] text-zinc-400 mt-1">
              Restore your placement history, rounds, and analytics from an existing backup file.
            </p>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-lg bg-[#182133] hover:bg-[#222d44] text-zinc-200 text-xs font-semibold border border-[#2b3954] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-zinc-400" />
              <span>Restore from File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sample Data Controls */}
      <div className="p-4 rounded-xl bg-[#111624] border border-[#1e283d] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-zinc-200 block">Sample Data Environment</span>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Current state:{" "}
              <strong className={isSampleDataLoaded ? "text-amber-400" : "text-zinc-400"}>
                {isSampleDataLoaded ? "Sample Data Loaded" : "Personal Data Mode"}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSampleData}
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors"
            >
              Reload Sample Data
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear all data? This cannot be undone unless you have an exported backup.")) {
                  clearAllData();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
