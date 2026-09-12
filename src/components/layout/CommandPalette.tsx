"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Building2,
  HelpCircle,
  CheckSquare,
  Award,
  Calendar,
  BarChart3,
  Layers,
  FileText,
  Settings,
  Plus,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { usePlacementStore } from "@/store/usePlacementStore";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddCompany?: () => void;
  onOpenAddQuestion?: () => void;
  onOpenAddTask?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAddCompany,
  onOpenAddQuestion,
  onOpenAddTask,
}) => {
  const router = useRouter();
  const { companies, questions, tasks } = usePlacementStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-[#0c1018] border border-[#232d42] rounded-xl shadow-2xl overflow-hidden z-10">
        <Command
          value={search}
          onValueChange={setSearch}
          className="w-full flex flex-col focus:outline-none"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3 border-b border-[#1b2334] bg-[#0f1420]">
            <Search className="w-4 h-4 text-zinc-400 mr-3 shrink-0" />
            <Command.Input
              placeholder="Search companies, questions, rounds, tasks, or jump to route... (ESC to close)"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
              autoFocus
            />
            <span className="text-[10px] bg-[#1a2336] text-zinc-400 border border-[#2b3752] px-1.5 py-0.5 rounded font-mono ml-2">
              ESC
            </span>
          </div>

          {/* Search Results List */}
          <Command.List className="max-h-96 overflow-y-auto p-2 space-y-1 custom-scrollbar text-xs">
            <Command.Empty className="py-6 text-center text-zinc-500 text-xs">
              No matching results found.
            </Command.Empty>

            {/* Quick Actions */}
            <Command.Group
              heading="Quick Actions"
              className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1"
            >
              <Command.Item
                onSelect={() => {
                  onClose();
                  onOpenAddCompany?.();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 border border-transparent cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>Add New Placement Application</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  onClose();
                  onOpenAddQuestion?.();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 border border-transparent cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-purple-400" />
                <span>Log Interview Question</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  onClose();
                  onOpenAddTask?.();
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 border border-transparent cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Create Preparation Task</span>
              </Command.Item>
            </Command.Group>

            {/* Navigation Routes */}
            <Command.Group
              heading="Navigation"
              className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1 mt-2"
            >
              <Command.Item
                onSelect={() => navigateTo("/dashboard")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dashboard Overview</span>
                </div>
                <span className="text-[10px] text-zinc-500">/dashboard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/companies")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Company Tracker</span>
                </div>
                <span className="text-[10px] text-zinc-500">/companies</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/pipeline")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Kanban Pipeline</span>
                </div>
                <span className="text-[10px] text-zinc-500">/pipeline</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/analytics")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Placement Analytics & Funnel</span>
                </div>
                <span className="text-[10px] text-zinc-500">/analytics</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/calendar")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  <span>Calendar & Deadlines</span>
                </div>
                <span className="text-[10px] text-zinc-500">/calendar</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/questions")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                  <span>Interview Question Bank</span>
                </div>
                <span className="text-[10px] text-zinc-500">/questions</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/offers")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Offers Hub</span>
                </div>
                <span className="text-[10px] text-zinc-500">/offers</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/resume")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Resume Version Tracking</span>
                </div>
                <span className="text-[10px] text-zinc-500">/resume</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.open("https://gate-2027-personal-dashboard.vercel.app/", "_blank");
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-900/30 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                  <span>GATE 2027 Personal Dashboard (Connected)</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-purple-400">
                  <span>External</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("/settings")}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Settings & Data Management</span>
                </div>
                <span className="text-[10px] text-zinc-500">/settings</span>
              </Command.Item>
            </Command.Group>

            {/* Companies */}
            {companies.length > 0 && (
              <Command.Group
                heading="Companies"
                className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1 mt-2"
              >
                {companies.slice(0, 8).map((comp) => (
                  <Command.Item
                    key={comp.id}
                    value={`${comp.name} ${comp.role} ${comp.status}`}
                    onSelect={() => navigateTo(`/companies/${comp.id}`)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-semibold text-zinc-200">{comp.name}</span>
                        <span className="text-zinc-500 ml-2">— {comp.role}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 bg-[#192233] px-1.5 py-0.5 rounded border border-[#25324b] shrink-0">
                      {comp.status}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Interview Questions */}
            {questions.length > 0 && (
              <Command.Group
                heading="Interview Questions"
                className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1 mt-2"
              >
                {questions.slice(0, 6).map((q) => (
                  <Command.Item
                    key={q.id}
                    value={`${q.question} ${q.category} ${q.companyName || ""}`}
                    onSelect={() => navigateTo("/questions")}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <HelpCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="truncate text-zinc-300">{q.question}</span>
                    </div>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 shrink-0 ml-2">
                      {q.category}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Tasks */}
            {tasks.length > 0 && (
              <Command.Group
                heading="Tasks"
                className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 px-2 py-1 mt-2"
              >
                {tasks.slice(0, 5).map((t) => (
                  <Command.Item
                    key={t.id}
                    value={`${t.title} ${t.category}`}
                    onSelect={() => navigateTo("/tasks")}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#161e2e] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckSquare
                        className={`w-3.5 h-3.5 shrink-0 ${
                          t.completed ? "text-emerald-400" : "text-amber-400"
                        }`}
                      />
                      <span
                        className={`truncate ${
                          t.completed ? "line-through text-zinc-500" : "text-zinc-300"
                        }`}
                      >
                        {t.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 shrink-0">{t.dueDate}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
