"use client";

import React, { useState } from "react";
import { Question } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import {
  HelpCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  Trash2,
  Tag,
} from "lucide-react";

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { toggleQuestionRevision, deleteQuestion, questions } = usePlacementStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Check how many questions share similar keywords or duplicate references
  const otherSameConcept = questions.filter(
    (q) =>
      q.id !== question.id &&
      (q.category === question.category &&
        (q.question.toLowerCase().includes(question.question.toLowerCase().slice(0, 15)) ||
          question.question.toLowerCase().includes(q.question.toLowerCase().slice(0, 15))))
  );

  const getDifficultyBadge = (d: string) => {
    switch (d) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Hard":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-[#0d121c] border border-[#1e283d] hover:border-zinc-700 transition-all space-y-3">
      {/* Header Line */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {question.category}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getDifficultyBadge(
                question.difficulty
              )}`}
            >
              {question.difficulty}
            </span>
            {question.companyName && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#161e30] text-zinc-300 border border-[#243048]">
                {question.companyName} {question.roundName ? `(${question.roundName})` : ""}
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-zinc-100 leading-snug">
            {question.question}
          </h4>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => toggleQuestionRevision(question.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              question.needsRevision
                ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                : "bg-[#141b2a] text-zinc-500 border-[#1e273d] hover:text-zinc-300"
            }`}
            title={question.needsRevision ? "Needs Revision" : "Mark for Revision"}
          >
            {question.needsRevision ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => {
              if (confirm("Delete this question?")) {
                deleteQuestion(question.id);
              }
            }}
            className="p-1.5 rounded-lg bg-[#141b2a] text-zinc-600 hover:text-red-400 border border-[#1e273d] transition-colors"
            title="Delete question"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Repeat Badge Alert */}
      {otherSameConcept.length > 0 && (
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Frequently Asked Concept — Asked before in{" "}
            <strong className="text-amber-200">
              {otherSameConcept.map((q) => q.companyName).filter(Boolean).join(", ") || "other rounds"}
            </strong>
          </span>
        </div>
      )}

      {/* Confidence Rating & Date */}
      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
        <div className="flex items-center gap-1.5">
          <span>Confidence:</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= question.confidence
                    ? "text-amber-400 fill-amber-400"
                    : "text-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        <span className="font-mono text-zinc-400">{question.dateAdded}</span>
      </div>

      {/* Answer Dropdown Toggle */}
      {(question.myAnswer || question.correctAnswer) && (
        <div className="pt-2 border-t border-[#182133]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center justify-between w-full font-medium"
          >
            <span>{isExpanded ? "Hide Answer & Solution" : "View Answer & Solution"}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-2.5 text-xs animate-in fade-in">
              {question.myAnswer && (
                <div className="p-3 rounded-xl bg-[#111624] border border-[#1e273d] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">
                    My Response in Interview:
                  </span>
                  <p className="text-zinc-300 leading-relaxed">{question.myAnswer}</p>
                </div>
              )}

              {question.correctAnswer && (
                <div className="p-3 rounded-xl bg-[#0f1929] border border-blue-500/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-blue-400">
                    Optimal Solution / Key Concept:
                  </span>
                  <p className="text-blue-100 leading-relaxed">{question.correctAnswer}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
