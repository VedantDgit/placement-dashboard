"use client";

import React from "react";
import { Task, TaskPriority } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import { CheckSquare, Square, Clock, Building2, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask, deleteTask } = usePlacementStore();

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case "Urgent":
        return "bg-red-500/15 text-red-300 border-red-500/30";
      case "High":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Medium":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "Low":
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
        task.completed
          ? "bg-[#0b0e16]/60 border-[#182030] opacity-70"
          : "bg-[#0d121c] border-[#1e283d] hover:border-zinc-700"
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={() => toggleTask(task.id)}
          className="mt-0.5 text-zinc-400 hover:text-blue-400 transition-colors shrink-0"
          aria-label="Toggle task"
        >
          {task.completed ? (
            <CheckSquare className="w-5 h-5 text-emerald-400" />
          ) : (
            <Square className="w-5 h-5 text-zinc-500" />
          )}
        </button>

        <div className="space-y-1.5 min-w-0 flex-1">
          <p
            className={`text-xs font-semibold leading-snug break-words ${
              task.completed ? "line-through text-zinc-500" : "text-zinc-100"
            }`}
          >
            {task.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span
              className={`px-2 py-0.5 rounded border font-semibold ${getPriorityBadge(
                task.priority
              )}`}
            >
              {task.priority}
            </span>

            <span className="px-2 py-0.5 rounded bg-[#161e30] text-zinc-300 border border-[#222e47]">
              {task.category}
            </span>

            {task.companyName && (
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {task.companyName}
              </span>
            )}

            <span className="text-zinc-500 flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              Due: {task.dueDate}
            </span>

            {task.durationMinutes && (
              <span className="text-zinc-500 font-mono">{task.durationMinutes} min</span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          if (confirm("Delete this task?")) {
            deleteTask(task.id);
          }
        }}
        className="text-zinc-600 hover:text-red-400 p-1 transition-colors shrink-0"
        title="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
