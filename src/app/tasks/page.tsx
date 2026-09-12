"use client";

import React, { useState, useMemo } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { TaskCard } from "@/components/tasks/TaskCard";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import { CheckSquare, Plus, Filter, CheckCircle2 } from "lucide-react";

export default function TasksPage() {
  const { tasks } = usePlacementStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [hideCompleted, setHideCompleted] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filterPriority !== "ALL" && t.priority !== filterPriority) return false;
      if (filterCategory !== "ALL" && t.category !== filterCategory) return false;
      if (hideCompleted && t.completed) return false;
      return true;
    });
  }, [tasks, filterPriority, filterCategory, hideCompleted]);

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-amber-400" />
            <span>Placement Preparation Tasks</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track daily DSA problem solving, CS core theory revisions, mock tests, and follow-ups.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-600/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#0d121c] border border-[#1e283d]">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Pending Tasks</span>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{pendingCount}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0d121c] border border-[#1e283d]">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Completed</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {completedCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0d121c] border border-[#1e283d]">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Total Planned</span>
          <div className="text-2xl font-bold text-zinc-200 font-mono mt-1">{tasks.length}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0d121c] border border-[#1e283d]">
          <span className="text-[10px] text-zinc-500 uppercase font-bold">Completion Rate</span>
          <div className="text-2xl font-bold text-blue-400 font-mono mt-1">
            {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0d121c] border border-[#1e283d] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Priority */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Category */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-[#111624] border border-[#1e283d] text-zinc-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Categories</option>
            <option value="DSA">DSA</option>
            <option value="Revision">Revision</option>
            <option value="Application">Application</option>
            <option value="Mock Interview">Mock Interview</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Project Prep">Project Prep</option>
            <option value="HR Practice">HR Practice</option>
          </select>

          {/* Hide completed checkbox */}
          <label className="flex items-center gap-1.5 text-zinc-400 cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={(e) => setHideCompleted(e.target.checked)}
              className="rounded bg-[#111624] border-[#1e283d]"
            />
            <span>Hide Completed</span>
          </label>
        </div>

        <span className="text-zinc-500 font-mono">
          Showing {filteredTasks.length} of {tasks.length}
        </span>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="py-16 text-center bg-[#0d121c] border border-[#1e283d] rounded-2xl p-6 space-y-3">
          <CheckCircle2 className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-zinc-200">No tasks in this view</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            All caught up! Add a new preparation task or change your filter settings.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
