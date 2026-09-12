"use client";

import React, { useState } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { PlacementGoal } from "@/types";
import { Target, CheckCircle2, Plus, Trash2 } from "lucide-react";

export const GoalTracker: React.FC = () => {
  const { goals, updateGoal, deleteGoal, addGoal } = usePlacementStore();
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState(10);
  const [newUnit, setNewUnit] = useState("companies");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addGoal({
      title: newTitle.trim(),
      category: "Applications",
      targetValue: Number(newTarget) || 10,
      currentValue: 0,
      unit: newUnit.trim() || "items",
      completed: false,
    });

    setNewTitle("");
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Placement Season Goals</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Set and track milestone objectives for applications, DSA practice, and mock tests.
          </p>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3.5">
        {goals.map((goal) => {
          const percentage = Math.min(
            100,
            goal.targetValue > 0
              ? Math.round((goal.currentValue / goal.targetValue) * 100)
              : 0
          );
          const isDone = goal.currentValue >= goal.targetValue;

          return (
            <div
              key={goal.id}
              className="p-4 rounded-xl bg-[#111624] border border-[#1e283d] space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-zinc-200">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Target className="w-4 h-4 text-blue-400" />
                  )}
                  <span className={isDone ? "text-emerald-300" : ""}>{goal.title}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-zinc-200">
                    {goal.currentValue} / {goal.targetValue} {goal.unit} ({percentage}%)
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        updateGoal(goal.id, {
                          currentValue: Math.max(0, goal.currentValue - 1),
                        })
                      }
                      className="w-5 h-5 rounded bg-[#182133] hover:bg-[#202d44] text-zinc-300 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        updateGoal(goal.id, {
                          currentValue: goal.currentValue + 1,
                        })
                      }
                      className="w-5 h-5 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-zinc-600 hover:text-red-400 p-1 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-[#182133] rounded-full overflow-hidden border border-[#222e47]">
                <div
                  className={`h-full rounded-full transition-all ${
                    isDone
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : "bg-gradient-to-r from-blue-600 to-cyan-400"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Goal Form */}
      <form
        onSubmit={handleAddGoal}
        className="p-4 rounded-xl bg-[#111624] border border-[#1e283d] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs"
      >
        <input
          type="text"
          placeholder="New goal title (e.g. Complete 20 mock technical tests)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-[#141b2a] border border-[#222d44] text-zinc-100 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Target"
          value={newTarget}
          onChange={(e) => setNewTarget(Number(e.target.value))}
          className="w-24 px-3 py-2 rounded-lg bg-[#141b2a] border border-[#222d44] text-zinc-100 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Unit (e.g. tests)"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
          className="w-28 px-3 py-2 rounded-lg bg-[#141b2a] border border-[#222d44] text-zinc-100 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </form>
    </div>
  );
};
