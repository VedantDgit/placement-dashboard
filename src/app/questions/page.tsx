"use client";

import React, { useState, useMemo } from "react";
import { usePlacementStore } from "@/store/usePlacementStore";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { QuestionFilterBar } from "@/components/questions/QuestionFilterBar";
import { AddQuestionModal } from "@/components/questions/AddQuestionModal";
import { HelpCircle, Plus, BookmarkCheck } from "lucide-react";

export default function QuestionsPage() {
  const { questions } = usePlacementStore();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");
  const [needsRevisionOnly, setNeedsRevisionOnly] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchComp = q.companyName?.toLowerCase().includes(query);
        const matchAns = q.myAnswer?.toLowerCase().includes(query) || q.correctAnswer?.toLowerCase().includes(query);
        const matchTag = q.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchQ && !matchComp && !matchAns && !matchTag) return false;
      }

      // Category
      if (selectedCategory !== "ALL" && q.category !== selectedCategory) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== "ALL" && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Revision
      if (needsRevisionOnly && !q.needsRevision) {
        return false;
      }

      return true;
    });
  }, [questions, search, selectedCategory, selectedDifficulty, needsRevisionOnly]);

  const revisionCount = questions.filter((q) => q.needsRevision).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-purple-400" />
            <span>Interview Question Bank</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Log, categorize, and detect repeated technical & HR questions across companies.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Question</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <QuestionFilterBar
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        needsRevisionOnly={needsRevisionOnly}
        onToggleRevisionOnly={setNeedsRevisionOnly}
        onReset={() => {
          setSearch("");
          setSelectedCategory("ALL");
          setSelectedDifficulty("ALL");
          setNeedsRevisionOnly(false);
        }}
        totalCount={questions.length}
        filteredCount={filteredQuestions.length}
      />

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="py-16 text-center bg-[#0d121c] border border-[#1e283d] rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-zinc-200">No questions found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search criteria or log a new question from a past round.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddQuestionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
