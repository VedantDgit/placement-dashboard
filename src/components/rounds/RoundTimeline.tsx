"use client";

import React, { useState } from "react";
import { Round, RoundStatus, Question } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  CheckCircle2,
  Clock,
  XCircle,
  SkipForward,
  Star,
  CheckSquare,
  Square,
  HelpCircle,
  Plus,
  Trash2,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface RoundTimelineProps {
  companyId: string;
  rounds: Round[];
  questions: Question[];
  onOpenAddRound: () => void;
  onOpenAddQuestion: () => void;
}

export const RoundTimeline: React.FC<RoundTimelineProps> = ({
  companyId,
  rounds,
  questions,
  onOpenAddRound,
  onOpenAddQuestion,
}) => {
  const { updateRound, deleteRound, toggleChecklistItem } = usePlacementStore();
  const [expandedRoundId, setExpandedRoundId] = useState<string | null>(
    rounds[rounds.length - 1]?.id || null
  );

  const sortedRounds = [...rounds].sort((a, b) => a.order - b.order);

  const getStatusIcon = (status: RoundStatus) => {
    switch (status) {
      case "Cleared":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "Scheduled":
      case "Upcoming":
        return <Clock className="w-5 h-5 text-blue-400" />;
      case "Failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "Skipped":
        return <SkipForward className="w-5 h-5 text-zinc-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getStatusBadge = (status: RoundStatus) => {
    switch (status) {
      case "Cleared":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      case "Scheduled":
        return "bg-blue-500/10 text-blue-300 border-blue-500/30";
      case "Upcoming":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "Failed":
        return "bg-red-500/10 text-red-300 border-red-500/30";
      case "Skipped":
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1b2336]">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <span>Interview & Assessment Timeline</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Sequential progression tree, performance feedback, and preparation checklists.
          </p>
        </div>

        <button
          onClick={onOpenAddRound}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Round</span>
        </button>
      </div>

      {/* Timeline Tree */}
      {sortedRounds.length === 0 ? (
        <div className="py-12 text-center text-zinc-500 text-xs">
          No interview rounds recorded yet. Click &quot;Add Round&quot; to initialize this company&apos;s pipeline.
        </div>
      ) : (
        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-zinc-800">
          {sortedRounds.map((round) => {
            const isExpanded = expandedRoundId === round.id;
            const roundQuestions = questions.filter((q) => q.roundId === round.id);

            // Calculate checklist completion
            const checklist = round.checklist || [];
            const completedCount = checklist.filter((i) => i.completed).length;
            const checklistPercentage =
              checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

            return (
              <div key={round.id} className="relative group">
                {/* Node icon on timeline spine */}
                <div className="absolute -left-[30px] top-1.5 p-0.5 rounded-full bg-[#0d121c] border border-[#232f48] shadow-md">
                  {getStatusIcon(round.status)}
                </div>

                {/* Round Card */}
                <div className="p-4 rounded-xl bg-[#111624] border border-[#1e273d] hover:border-zinc-700 transition-all space-y-3">
                  {/* Top line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-100">{round.name}</span>
                        <span className="text-[10px] text-zinc-400 bg-[#172033] px-2 py-0.5 rounded border border-[#253350]">
                          {round.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-2">
                        <span>{round.date || "Date TBA"}</span>
                        {round.time && <span>• {round.time}</span>}
                        {round.durationMinutes && <span>• {round.durationMinutes} mins</span>}
                        {round.score && (
                          <span className="text-emerald-400 font-semibold font-mono">
                            • Score: {round.score}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <select
                        value={round.status}
                        onChange={(e) =>
                          updateRound(round.id, { status: e.target.value as RoundStatus })
                        }
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getStatusBadge(
                          round.status
                        )} bg-[#0c101a] focus:outline-none cursor-pointer`}
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Cleared">Cleared</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                        <option value="Skipped">Skipped</option>
                      </select>

                      <button
                        onClick={() =>
                          setExpandedRoundId(isExpanded ? null : round.id)
                        }
                        className="p-1 rounded text-zinc-400 hover:text-zinc-200"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete round ${round.name}?`)) {
                            deleteRound(round.id);
                          }
                        }}
                        className="p-1 rounded text-zinc-600 hover:text-red-400 transition-colors"
                        title="Delete round"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Rating stars */}
                  {round.performanceRating && (
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <span>Performance Rating:</span>
                      <div className="flex items-center gap-0.5 ml-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= (round.performanceRating || 0)
                                ? "text-amber-400 fill-amber-400"
                                : "text-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expandable Details Area */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-[#1a2336] space-y-3.5 text-xs">
                      {/* Interviewer & Topics */}
                      {(round.interviewer || (round.topicsAsked && round.topicsAsked.length > 0)) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          {round.interviewer && (
                            <div className="flex items-center gap-1.5 text-zinc-300">
                              <User className="w-3.5 h-3.5 text-zinc-500" />
                              <span>Interviewer: {round.interviewer}</span>
                            </div>
                          )}
                          {round.topicsAsked && (
                            <div className="flex flex-wrap gap-1">
                              {round.topicsAsked.map((topic) => (
                                <span
                                  key={topic}
                                  className="px-2 py-0.5 rounded bg-[#182133] text-blue-300 border border-blue-500/20 text-[10px]"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Feedback */}
                      {round.feedback && (
                        <div className="p-3 rounded-lg bg-[#141b2a] border border-[#1f293d] space-y-1">
                          <span className="text-[10px] uppercase font-bold text-zinc-400 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-blue-400" />
                            <span>Interviewer Feedback / Notes</span>
                          </span>
                          <p className="text-zinc-300 text-xs leading-relaxed">{round.feedback}</p>
                        </div>
                      )}

                      {/* Preparation Checklist */}
                      {checklist.length > 0 && (
                        <div className="space-y-2 p-3 rounded-lg bg-[#141b2a] border border-[#1f293d]">
                          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                            <span className="flex items-center gap-1.5">
                              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                              <span>Round Preparation Checklist</span>
                            </span>
                            <span className="font-mono text-amber-400">
                              {completedCount}/{checklist.length} ({checklistPercentage}%)
                            </span>
                          </div>

                          <div className="h-1.5 w-full bg-[#1b2438] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full transition-all"
                              style={{ width: `${checklistPercentage}%` }}
                            />
                          </div>

                          <div className="space-y-1.5 pt-1">
                            {checklist.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleChecklistItem(round.id, item.id)}
                                className="w-full flex items-center gap-2 text-left text-xs text-zinc-300 hover:text-white cursor-pointer group"
                              >
                                {item.completed ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Square className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 shrink-0" />
                                )}
                                <span className={item.completed ? "line-through text-zinc-500" : ""}>
                                  {item.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Attached Interview Questions */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                          <span className="flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                            <span>Questions Asked in this Round ({roundQuestions.length})</span>
                          </span>
                          <button
                            onClick={onOpenAddQuestion}
                            className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Question</span>
                          </button>
                        </div>

                        {roundQuestions.length > 0 ? (
                          <div className="space-y-1.5">
                            {roundQuestions.map((q) => (
                              <div
                                key={q.id}
                                className="p-2.5 rounded-lg bg-[#0e131f] border border-[#1d273c] text-xs space-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-zinc-200">{q.question}</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                    {q.category}
                                  </span>
                                </div>
                                {q.myAnswer && (
                                  <p className="text-[11px] text-zinc-400 italic">
                                    Answer: {q.myAnswer}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-zinc-500 italic">
                            No questions logged for this round yet.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
