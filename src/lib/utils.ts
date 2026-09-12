import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CompanyStatus, PipelineStage } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPackage(val?: string): string {
  if (!val) return "Not disclosed";
  if (val.toLowerCase().includes("lpa") || val.startsWith("₹") || val.startsWith("$")) {
    return val;
  }
  const num = parseFloat(val);
  if (!isNaN(num)) {
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)} LPA`;
    }
    return `₹${num.toLocaleString()} LPA`;
  }
  return val;
}

export function parsePackageToNumber(val?: string): number {
  if (!val) return 0;
  const cleaned = val.replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

export function getStatusDetails(status: CompanyStatus): {
  label: string;
  badgeClass: string;
  borderClass: string;
  dotClass: string;
  stage: PipelineStage;
} {
  switch (status) {
    case "Not Applied":
      return {
        label: "Not Applied",
        badgeClass: "bg-zinc-800/80 text-zinc-400 border-zinc-700",
        borderClass: "border-zinc-800",
        dotClass: "bg-zinc-500",
        stage: "Applied",
      };
    case "Applied":
      return {
        label: "Applied",
        badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        borderClass: "border-blue-900/40",
        dotClass: "bg-blue-400 animate-pulse",
        stage: "Applied",
      };
    case "Under Review":
      return {
        label: "Under Review",
        badgeClass: "bg-sky-500/10 text-sky-300 border-sky-500/20",
        borderClass: "border-sky-900/40",
        dotClass: "bg-sky-400",
        stage: "Applied",
      };
    case "Shortlisted":
      return {
        label: "Shortlisted",
        badgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
        borderClass: "border-cyan-900/40",
        dotClass: "bg-cyan-400",
        stage: "Shortlisted",
      };
    case "Assessment":
      return {
        label: "Assessment",
        badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        borderClass: "border-amber-900/40",
        dotClass: "bg-amber-400",
        stage: "Assessment",
      };
    case "Technical Round":
      return {
        label: "Technical Round",
        badgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/20",
        borderClass: "border-purple-900/40",
        dotClass: "bg-purple-400",
        stage: "Technical",
      };
    case "Managerial Round":
      return {
        label: "Managerial Round",
        badgeClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
        borderClass: "border-indigo-900/40",
        dotClass: "bg-indigo-400",
        stage: "Managerial",
      };
    case "HR Round":
      return {
        label: "HR Round",
        badgeClass: "bg-pink-500/10 text-pink-300 border-pink-500/20",
        borderClass: "border-pink-900/40",
        dotClass: "bg-pink-400",
        stage: "HR",
      };
    case "Selected":
    case "Offer Received":
      return {
        label: "Offer Received",
        badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        borderClass: "border-emerald-800/50",
        dotClass: "bg-emerald-400",
        stage: "Offer",
      };
    case "Offer Accepted":
      return {
        label: "Offer Accepted",
        badgeClass: "bg-green-500/20 text-green-300 border-green-500/30",
        borderClass: "border-green-700/60",
        dotClass: "bg-green-400 ring-2 ring-green-400/30",
        stage: "Offer",
      };
    case "Rejected":
      return {
        label: "Rejected",
        badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
        borderClass: "border-red-950/40",
        dotClass: "bg-red-400",
        stage: "Rejected",
      };
    case "On Hold":
      return {
        label: "On Hold",
        badgeClass: "bg-orange-500/10 text-orange-300 border-orange-500/20",
        borderClass: "border-orange-900/30",
        dotClass: "bg-orange-400",
        stage: "Applied",
      };
    case "Withdrawn":
      return {
        label: "Withdrawn",
        badgeClass: "bg-zinc-800 text-zinc-400 border-zinc-700",
        borderClass: "border-zinc-800",
        dotClass: "bg-zinc-500",
        stage: "Rejected",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-zinc-800 text-zinc-300 border-zinc-700",
        borderClass: "border-zinc-800",
        dotClass: "bg-zinc-400",
        stage: "Applied",
      };
  }
}

export function getDeadlineUrgency(dateStr?: string): {
  urgency: "today" | "3days" | "week" | "future" | "overdue" | "none";
  label: string;
  badgeClass: string;
  daysRemaining: number;
} {
  if (!dateStr) {
    return { urgency: "none", label: "", badgeClass: "", daysRemaining: 999 };
  }

  const targetDate = new Date(dateStr);
  if (isNaN(targetDate.getTime())) {
    return { urgency: "none", label: "", badgeClass: "", daysRemaining: 999 };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      urgency: "overdue",
      label: `${Math.abs(diffDays)}d overdue`,
      badgeClass: "bg-red-500/10 text-red-400 border-red-500/30",
      daysRemaining: diffDays,
    };
  }
  if (diffDays === 0) {
    return {
      urgency: "today",
      label: "🔴 Due Today",
      badgeClass: "bg-red-500/15 text-red-300 border-red-500/40 font-semibold",
      daysRemaining: 0,
    };
  }
  if (diffDays <= 3) {
    return {
      urgency: "3days",
      label: `🟠 Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
      badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/40",
      daysRemaining: diffDays,
    };
  }
  if (diffDays <= 7) {
    return {
      urgency: "week",
      label: `🟡 Due this week (${diffDays}d)`,
      badgeClass: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
      daysRemaining: diffDays,
    };
  }
  return {
    urgency: "future",
    label: `🟢 ${diffDays} days left`,
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    daysRemaining: diffDays,
  };
}

export function formatDate(dateStr?: string, options?: { monthOnly?: boolean; relative?: boolean }): string {
  if (!dateStr) return "N/A";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    if (options?.monthOnly) {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Text Similarity & Repeat Question Detection (Levenshtein + Token Jaccard)
 */
function cleanTokens(text: string): Set<string> {
  const stopWords = new Set([
    "what",
    "is",
    "the",
    "a",
    "an",
    "and",
    "or",
    "in",
    "on",
    "to",
    "for",
    "of",
    "how",
    "why",
    "does",
    "do",
    "explain",
    "describe",
    "difference",
    "between",
  ]);

  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !stopWords.has(w))
  );
}

export function calculateQuestionSimilarity(q1: string, q2: string): number {
  if (!q1 || !q2) return 0;
  const s1 = q1.trim().toLowerCase();
  const s2 = q2.trim().toLowerCase();

  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;

  const tokens1 = cleanTokens(s1);
  const tokens2 = cleanTokens(s2);

  if (tokens1.size === 0 || tokens2.size === 0) return 0;

  let intersectionCount = 0;
  tokens1.forEach((t) => {
    if (tokens2.has(t)) intersectionCount++;
  });

  const unionSize = new Set([...tokens1, ...tokens2]).size;
  const jaccard = unionSize > 0 ? intersectionCount / unionSize : 0;

  return jaccard;
}

export function findSimilarQuestions(
  targetText: string,
  allQuestions: { id: string; question: string; companyName?: string; roundName?: string }[],
  excludeId?: string,
  threshold = 0.4
): { id: string; question: string; companyName?: string; score: number }[] {
  if (!targetText || targetText.length < 4) return [];

  const results: { id: string; question: string; companyName?: string; score: number }[] = [];

  for (const q of allQuestions) {
    if (excludeId && q.id === excludeId) continue;
    const score = calculateQuestionSimilarity(targetText, q.question);
    if (score >= threshold) {
      results.push({
        id: q.id,
        question: q.question,
        companyName: q.companyName,
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * Export full JSON payload
 */
export function downloadJson(data: unknown, filename = "placement-command-center-backup.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
