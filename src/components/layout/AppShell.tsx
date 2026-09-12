"use client";

import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopHeader } from "./TopHeader";
import { MobileNav } from "./MobileNav";
import { CommandPalette } from "./CommandPalette";
import { CompanyModal } from "@/components/companies/CompanyModal";
import { AddQuestionModal } from "@/components/questions/AddQuestionModal";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { AddEventModal } from "@/components/calendar/AddEventModal";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Modals state
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#090a0f] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sidebar (Desktop) */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-6">
        {/* Top Header */}
        <TopHeader
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenAddCompany={() => setIsAddCompanyOpen(true)}
          onOpenAddQuestion={() => setIsAddQuestionOpen(true)}
          onOpenAddTask={() => setIsAddTaskOpen(true)}
          onOpenAddEvent={() => setIsAddEventOpen(true)}
          onToggleMobileNav={() => setIsMobileNavOpen(true)}
        />

        {/* Page View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Mobile Nav & Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAddCompany={() => setIsAddCompanyOpen(true)}
        onOpenAddQuestion={() => setIsAddQuestionOpen(true)}
        onOpenAddTask={() => setIsAddTaskOpen(true)}
      />

      {/* Global Creation Modals */}
      <CompanyModal
        isOpen={isAddCompanyOpen}
        onClose={() => setIsAddCompanyOpen(false)}
      />
      <AddQuestionModal
        isOpen={isAddQuestionOpen}
        onClose={() => setIsAddQuestionOpen(false)}
      />
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
      />
      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
      />
    </div>
  );
};
