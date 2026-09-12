"use client";

import React, { useState, useMemo } from "react";
import { Modal } from "@/components/ui/Modal";
import { usePlacementStore } from "@/store/usePlacementStore";
import { QuestionCategory, QuestionDifficulty } from "@/types";
import { findSimilarQuestions } from "@/lib/utils";
import { AlertCircle, Check, HelpCircle, Star } from "lucide-react";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCompanyId?: string;
}

const categories: QuestionCategory[] = [
  "DSA",
  "Java",
  "Python",
  "C++",
  "JavaScript/TypeScript",
  "SQL",
  "DBMS",
  "OS",
  "CN",
  "OOP",
  "System Design",
  "ML",
  "DL",
  "AI",
  "Projects",
  "HR",
  "Behavioral",
  "Aptitude",
  "Other",
];

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  defaultCompanyId,
}) => {
  const { companies, questions, addQuestion } = usePlacementStore();

  const [companyId, setCompanyId] = useState(defaultCompanyId || companies[0]?.id || "");
  const [questionText, setQuestionText] = useState("");
  const [category, setCategory] = useState<QuestionCategory>("DSA");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>("Medium");
  const [myAnswer, setMyAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [confidence, setConfidence] = useState(4);
  const [needsRevision, setNeedsRevision] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Find similar questions in database
  const similarMatches = useMemo(() => {
    return findSimilarQuestions(questionText, questions);
  }, [questionText, questions]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const comp = companies.find((c) => c.id === companyId);

    addQuestion({
      companyId,
      companyName: comp?.name || "General",
      question: questionText.trim(),
      category,
      difficulty,
      myAnswer: myAnswer.trim() || undefined,
      correctAnswer: correctAnswer.trim() || undefined,
      confidence,
      needsRevision,
      tags,
    });

    // Reset
    setQuestionText("");
    setMyAnswer("");
    setCorrectAnswer("");
    setTags([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Interview Question"
      description="Record questions asked in technical/OA/HR rounds for pattern and repeat analysis."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Company & Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Company</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Topic / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as QuestionCategory)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Question Text */}
        <div>
          <label className="block text-zinc-300 font-medium mb-1">
            Question <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={3}
            placeholder="e.g. Implement LRU Cache with O(1) operations, or Explain ACID properties in DBMS..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none text-sm"
          />
        </div>

        {/* Similar / Repeated Question Warning */}
        {similarMatches.length > 0 && (
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Repeated Question Concept Detected!</span>
            </div>
            <p className="text-[11px] text-zinc-300">
              Similar questions were already asked in{" "}
              <span className="font-semibold text-amber-300">
                {similarMatches.map((m) => m.companyName || "another company").join(", ")}
              </span>
              . This concept has a high recurring frequency!
            </p>
            <div className="text-[11px] text-zinc-400 italic">
              &quot;{similarMatches[0].question}&quot;
            </div>
          </div>
        )}

        {/* Difficulty & Confidence */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Difficulty</label>
            <div className="flex gap-2">
              {(["Easy", "Medium", "Hard"] as QuestionDifficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    difficulty === d
                      ? d === "Easy"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                        : d === "Medium"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-red-500/20 text-red-300 border-red-500/50"
                      : "bg-[#121724] text-zinc-400 border-[#222c42]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">My Confidence (1-5)</label>
            <div className="flex items-center gap-1.5 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setConfidence(star)}
                  className="p-1 text-zinc-500 hover:text-amber-400 transition-colors"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= confidence
                        ? "text-amber-400 fill-amber-400"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
              <span className="text-zinc-400 ml-2 font-mono">{confidence}/5</span>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">My Response in Interview</label>
            <textarea
              rows={2}
              placeholder="What did you say during the interview?"
              value={myAnswer}
              onChange={(e) => setMyAnswer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Ideal / Correct Answer</label>
            <textarea
              rows={2}
              placeholder="Key theoretical points or optimal algorithm..."
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#121724] border border-[#222c42] text-zinc-100 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Revision checkbox */}
        <label className="flex items-center gap-2 text-zinc-300 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={needsRevision}
            onChange={(e) => setNeedsRevision(e.target.checked)}
            className="rounded bg-[#121724] border-[#222c42] text-blue-600 focus:ring-0"
          />
          <span>Mark as needing revision before upcoming interviews</span>
        </label>

        {/* Submit */}
        <div className="pt-4 border-t border-[#1c2438] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#161e2e] text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <Check className="w-4 h-4" />
            <span>Save Question</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
