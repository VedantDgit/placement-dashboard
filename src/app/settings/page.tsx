"use client";

import React from "react";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { GoalTracker } from "@/components/settings/GoalTracker";
import { DataManagement } from "@/components/settings/DataManagement";
import { Settings, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-zinc-400" />
          <span>Settings & Data Control</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage your personal profile, milestone goals, local JSON backups, and sample environment.
        </p>
      </div>

      {/* Profile & Target Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileSettings />
        <GoalTracker />
      </div>

      {/* Data Management & Backups */}
      <DataManagement />
    </div>
  );
}
