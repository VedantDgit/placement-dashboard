import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Company,
  Round,
  Question,
  Offer,
  Task,
  EventItem,
  ResumeVersion,
  FollowUp,
  PlacementGoal,
  ActivityItem,
  HeatmapDay,
  UserProfile,
  FilterOptions,
  CompanyStatus,
  PipelineStage,
} from "@/types";
import {
  sampleCompanies,
  sampleRounds,
  sampleQuestions,
  sampleOffers,
  sampleTasks,
  sampleEvents,
  sampleResumeVersions,
  sampleFollowUps,
  sampleGoals,
  sampleActivities,
  generateSampleHeatmap,
  initialUserProfile,
} from "@/lib/sample-data";

export interface PlacementState {
  // Data
  companies: Company[];
  rounds: Round[];
  questions: Question[];
  offers: Offer[];
  tasks: Task[];
  events: EventItem[];
  resumeVersions: ResumeVersion[];
  followUps: FollowUp[];
  goals: PlacementGoal[];
  activities: ActivityItem[];
  heatmap: HeatmapDay[];
  userProfile: UserProfile;
  isSampleDataLoaded: boolean;

  // Filter & Search
  filterOptions: FilterOptions;
  searchQuery: string;

  // Actions - Companies
  addCompany: (company: Omit<Company, "id" | "createdAt" | "updatedAt">) => string;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  updateCompanyStatus: (id: string, status: CompanyStatus) => void;
  moveCompanyToStage: (id: string, stage: PipelineStage) => void;

  // Actions - Rounds
  addRound: (round: Omit<Round, "id">) => string;
  updateRound: (id: string, updates: Partial<Round>) => void;
  deleteRound: (id: string) => void;
  toggleChecklistItem: (roundId: string, itemId: string) => void;

  // Actions - Questions
  addQuestion: (question: Omit<Question, "id" | "dateAdded">) => string;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  toggleQuestionRevision: (id: string) => void;

  // Actions - Offers
  addOffer: (offer: Omit<Offer, "id">) => string;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;

  // Actions - Tasks
  addTask: (task: Omit<Task, "id">) => string;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;

  // Actions - Events
  addEvent: (event: Omit<EventItem, "id">) => string;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Actions - Resume Versions
  addResumeVersion: (resume: Omit<ResumeVersion, "id" | "createdAt" | "updatedAt">) => string;
  updateResumeVersion: (id: string, updates: Partial<ResumeVersion>) => void;
  deleteResumeVersion: (id: string) => void;

  // Actions - FollowUps
  addFollowUp: (followUp: Omit<FollowUp, "id">) => string;
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => void;
  deleteFollowUp: (id: string) => void;

  // Actions - Goals
  addGoal: (goal: Omit<PlacementGoal, "id">) => string;
  updateGoal: (id: string, updates: Partial<PlacementGoal>) => void;
  deleteGoal: (id: string) => void;

  // Actions - Activities
  logActivity: (activity: Omit<ActivityItem, "id" | "timestamp">) => void;

  // Profile & Settings
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;

  // Data State Management
  loadSampleData: () => void;
  clearAllData: () => void;
  importAllData: (data: Partial<PlacementState>) => void;
  exportAllData: () => Record<string, unknown>;

  // Analytics & Derived Queries
  getStats: () => {
    totalApplications: number;
    shortlisted: number;
    assessments: number;
    interviews: number;
    offers: number;
    rejected: number;
    activePipelines: number;
    highestCtc: string;
    averageCtc: string;
  };
  getFunnelMetrics: () => {
    applied: number;
    shortlisted: number;
    assessment: number;
    technical: number;
    managerialOrHr: number;
    offers: number;
  };
  getConversionRates: () => {
    applicationToShortlist: number;
    shortlistToOA: number;
    oaToTechnical: number;
    technicalToHR: number;
    hrToOffer: number;
    overallOfferRate: number;
  };
  getRejectionDropoffs: () => {
    stageCounts: { stage: string; count: number; percentage: number }[];
    biggestDropoff: string;
    totalRejections: number;
  };
  getSmartInsights: () => string[];
}

const initialFilterOptions: FilterOptions = {
  search: "",
  status: "ALL",
  role: "ALL",
  category: "ALL",
  source: "ALL",
  location: "ALL",
  sortBy: "recently_updated",
};

export const usePlacementStore = create<PlacementState>()(
  persist(
    (set, get) => ({
      companies: sampleCompanies,
      rounds: sampleRounds,
      questions: sampleQuestions,
      offers: sampleOffers,
      tasks: sampleTasks,
      events: sampleEvents,
      resumeVersions: sampleResumeVersions,
      followUps: sampleFollowUps,
      goals: sampleGoals,
      activities: sampleActivities,
      heatmap: generateSampleHeatmap(),
      userProfile: initialUserProfile,
      isSampleDataLoaded: true,
      filterOptions: initialFilterOptions,
      searchQuery: "",

      // COMPANIES
      addCompany: (data) => {
        const id = `comp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const now = new Date().toISOString();
        const newCompany: Company = {
          ...data,
          id,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          companies: [newCompany, ...state.companies],
        }));

        get().logActivity({
          type: "applied",
          title: `Applied to ${data.name}`,
          description: `Applied for ${data.role} (${data.category}) via ${data.source}.`,
          companyId: id,
          companyName: data.name,
        });

        return id;
      },

      updateCompany: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: now } : c
          ),
        }));
      },

      deleteCompany: (id) => {
        set((state) => ({
          companies: state.companies.filter((c) => c.id !== id),
          rounds: state.rounds.filter((r) => r.companyId !== id),
          questions: state.questions.filter((q) => q.companyId !== id),
          offers: state.offers.filter((o) => o.companyId !== id),
          tasks: state.tasks.filter((t) => t.companyId !== id),
          events: state.events.filter((e) => e.companyId !== id),
          followUps: state.followUps.filter((f) => f.companyId !== id),
        }));
      },

      updateCompanyStatus: (id, status) => {
        const comp = get().companies.find((c) => c.id === id);
        if (!comp) return;

        const now = new Date().toISOString();
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === id ? { ...c, status, updatedAt: now } : c
          ),
        }));

        get().logActivity({
          type:
            status === "Offer Received" || status === "Selected"
              ? "offer_received"
              : status === "Rejected"
              ? "rejected"
              : "round_updated",
          title: `Status update — ${comp.name}`,
          description: `Moved status to ${status}.`,
          companyId: id,
          companyName: comp.name,
        });
      },

      moveCompanyToStage: (id, stage) => {
        let newStatus: CompanyStatus = "Applied";
        switch (stage) {
          case "Applied":
            newStatus = "Applied";
            break;
          case "Shortlisted":
            newStatus = "Shortlisted";
            break;
          case "Assessment":
            newStatus = "Assessment";
            break;
          case "Technical":
            newStatus = "Technical Round";
            break;
          case "Managerial":
            newStatus = "Managerial Round";
            break;
          case "HR":
            newStatus = "HR Round";
            break;
          case "Offer":
            newStatus = "Offer Received";
            break;
          case "Rejected":
            newStatus = "Rejected";
            break;
        }
        get().updateCompanyStatus(id, newStatus);
      },

      // ROUNDS
      addRound: (data) => {
        const id = `rnd-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newRound: Round = { ...data, id };
        set((state) => ({
          rounds: [...state.rounds, newRound],
        }));

        const comp = get().companies.find((c) => c.id === data.companyId);
        get().logActivity({
          type: "round_updated",
          title: `New round created for ${comp?.name || "Company"}`,
          description: `Added "${data.name}" (${data.type}).`,
          companyId: data.companyId,
          companyName: comp?.name,
        });

        return id;
      },

      updateRound: (id, updates) => {
        set((state) => ({
          rounds: state.rounds.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        }));
      },

      deleteRound: (id) => {
        set((state) => ({
          rounds: state.rounds.filter((r) => r.id !== id),
        }));
      },

      toggleChecklistItem: (roundId, itemId) => {
        set((state) => ({
          rounds: state.rounds.map((r) => {
            if (r.id !== roundId || !r.checklist) return r;
            return {
              ...r,
              checklist: r.checklist.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            };
          }),
        }));
      },

      // QUESTIONS
      addQuestion: (data) => {
        const id = `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const dateAdded = new Date().toISOString().split("T")[0];
        const newQ: Question = { ...data, id, dateAdded };
        set((state) => ({
          questions: [newQ, ...state.questions],
        }));
        return id;
      },

      updateQuestion: (id, updates) => {
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        }));
      },

      deleteQuestion: (id) => {
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        }));
      },

      toggleQuestionRevision: (id) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, needsRevision: !q.needsRevision } : q
          ),
        }));
      },

      // OFFERS
      addOffer: (data) => {
        const id = `off-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newOffer: Offer = { ...data, id };
        set((state) => ({
          offers: [newOffer, ...state.offers],
        }));
        get().logActivity({
          type: "offer_received",
          title: `Offer Recorded — ${data.companyName}`,
          description: `Total CTC: ${data.totalCtc} (${data.role}).`,
          companyId: data.companyId,
          companyName: data.companyName,
        });
        return id;
      },

      updateOffer: (id, updates) => {
        set((state) => ({
          offers: state.offers.map((o) => (o.id === id ? { ...o, ...updates } : o)),
        }));
      },

      deleteOffer: (id) => {
        set((state) => ({
          offers: state.offers.filter((o) => o.id !== id),
        }));
      },

      // TASKS
      addTask: (data) => {
        const id = `tsk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newTask: Task = { ...data, id };
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
        return id;
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
      },

      toggleTask: (id) => {
        const task = get().tasks.find((t) => t.id === id);
        const newCompleted = !task?.completed;
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: newCompleted } : t
          ),
        }));

        if (newCompleted && task) {
          get().logActivity({
            type: "task_completed",
            title: `Task completed: ${task.title}`,
            description: `Priority: ${task.priority} | Category: ${task.category}`,
          });
        }
      },

      // EVENTS
      addEvent: (data) => {
        const id = `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newEvent: EventItem = { ...data, id };
        set((state) => ({
          events: [...state.events, newEvent],
        }));
        return id;
      },

      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
      },

      // RESUME
      addResumeVersion: (data) => {
        const id = `res-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const now = new Date().toISOString();
        const newResume: ResumeVersion = { ...data, id, createdAt: now, updatedAt: now };
        set((state) => ({
          resumeVersions: [...state.resumeVersions, newResume],
        }));
        return id;
      },

      updateResumeVersion: (id, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          resumeVersions: state.resumeVersions.map((r) =>
            r.id === id ? { ...r, ...updates, updatedAt: now } : r
          ),
        }));
      },

      deleteResumeVersion: (id) => {
        set((state) => ({
          resumeVersions: state.resumeVersions.filter((r) => r.id !== id),
        }));
      },

      // FOLLOW UPS
      addFollowUp: (data) => {
        const id = `fol-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newFollowUp: FollowUp = { ...data, id };
        set((state) => ({
          followUps: [newFollowUp, ...state.followUps],
        }));
        return id;
      },

      updateFollowUp: (id, updates) => {
        set((state) => ({
          followUps: state.followUps.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        }));
      },

      deleteFollowUp: (id) => {
        set((state) => ({
          followUps: state.followUps.filter((f) => f.id !== id),
        }));
      },

      // GOALS
      addGoal: (data) => {
        const id = `g-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newGoal: PlacementGoal = { ...data, id };
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
        return id;
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        }));
      },

      // ACTIVITIES
      logActivity: (data) => {
        const id = `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        const newAct: ActivityItem = {
          ...data,
          id,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          activities: [newAct, ...state.activities.slice(0, 49)],
        }));
      },

      // PROFILE & FILTERS
      updateUserProfile: (profileUpdates) => {
        set((state) => ({
          userProfile: { ...state.userProfile, ...profileUpdates },
        }));
      },

      setFilterOptions: (options) => {
        set((state) => ({
          filterOptions: { ...state.filterOptions, ...options },
        }));
      },

      resetFilters: () => {
        set({ filterOptions: initialFilterOptions, searchQuery: "" });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      // DATA SEED / CLEAR / EXPORT / IMPORT
      loadSampleData: () => {
        set({
          companies: sampleCompanies,
          rounds: sampleRounds,
          questions: sampleQuestions,
          offers: sampleOffers,
          tasks: sampleTasks,
          events: sampleEvents,
          resumeVersions: sampleResumeVersions,
          followUps: sampleFollowUps,
          goals: sampleGoals,
          activities: sampleActivities,
          heatmap: generateSampleHeatmap(),
          userProfile: initialUserProfile,
          isSampleDataLoaded: true,
        });
      },

      clearAllData: () => {
        set({
          companies: [],
          rounds: [],
          questions: [],
          offers: [],
          tasks: [],
          events: [],
          resumeVersions: [],
          followUps: [],
          goals: [],
          activities: [],
          heatmap: [],
          isSampleDataLoaded: false,
        });
      },

      importAllData: (data) => {
        set((state) => ({
          ...state,
          ...data,
          isSampleDataLoaded: false,
        }));
      },

      exportAllData: () => {
        const state = get();
        return {
          exportedAt: new Date().toISOString(),
          version: "1.0",
          userProfile: state.userProfile,
          companies: state.companies,
          rounds: state.rounds,
          questions: state.questions,
          offers: state.offers,
          tasks: state.tasks,
          events: state.events,
          resumeVersions: state.resumeVersions,
          followUps: state.followUps,
          goals: state.goals,
          activities: state.activities,
          heatmap: state.heatmap,
        };
      },

      // DETERMINISTIC STATS & COMPUTATIONS
      getStats: () => {
        const companies = get().companies;
        const total = companies.length;
        const shortlisted = companies.filter(
          (c) =>
            c.status === "Shortlisted" ||
            c.status === "Assessment" ||
            c.status === "Technical Round" ||
            c.status === "Managerial Round" ||
            c.status === "HR Round" ||
            c.status === "Selected" ||
            c.status === "Offer Received" ||
            c.status === "Offer Accepted"
        ).length;

        const assessments = companies.filter(
          (c) =>
            c.status === "Assessment" ||
            c.status === "Technical Round" ||
            c.status === "Managerial Round" ||
            c.status === "HR Round" ||
            c.status === "Selected" ||
            c.status === "Offer Received" ||
            c.status === "Offer Accepted"
        ).length;

        const interviews = companies.filter(
          (c) =>
            c.status === "Technical Round" ||
            c.status === "Managerial Round" ||
            c.status === "HR Round" ||
            c.status === "Selected" ||
            c.status === "Offer Received" ||
            c.status === "Offer Accepted"
        ).length;

        const offers = companies.filter(
          (c) =>
            c.status === "Selected" ||
            c.status === "Offer Received" ||
            c.status === "Offer Accepted"
        ).length;

        const rejected = companies.filter((c) => c.status === "Rejected").length;
        const activePipelines = companies.filter(
          (c) => c.status !== "Rejected" && c.status !== "Withdrawn" && c.status !== "Offer Accepted"
        ).length;

        const offersList = get().offers;
        let highestCtc = "None";
        let averageCtc = "None";

        if (offersList.length > 0) {
          const numericCtcs = offersList
            .map((o) => {
              const cleaned = o.totalCtc.replace(/[^0-9.]/g, "");
              return parseFloat(cleaned);
            })
            .filter((n) => !isNaN(n));

          if (numericCtcs.length > 0) {
            const maxVal = Math.max(...numericCtcs);
            const sumVal = numericCtcs.reduce((acc, curr) => acc + curr, 0);
            const avgVal = sumVal / numericCtcs.length;
            highestCtc = `₹${maxVal.toFixed(1)} LPA`;
            averageCtc = `₹${avgVal.toFixed(1)} LPA`;
          }
        }

        return {
          totalApplications: total,
          shortlisted,
          assessments,
          interviews,
          offers,
          rejected,
          activePipelines,
          highestCtc,
          averageCtc,
        };
      },

      getFunnelMetrics: () => {
        const companies = get().companies;
        const applied = companies.length;

        const shortlisted = companies.filter((c) =>
          [
            "Shortlisted",
            "Assessment",
            "Technical Round",
            "Managerial Round",
            "HR Round",
            "Selected",
            "Offer Received",
            "Offer Accepted",
          ].includes(c.status)
        ).length;

        const assessment = companies.filter((c) =>
          [
            "Assessment",
            "Technical Round",
            "Managerial Round",
            "HR Round",
            "Selected",
            "Offer Received",
            "Offer Accepted",
          ].includes(c.status)
        ).length;

        const technical = companies.filter((c) =>
          [
            "Technical Round",
            "Managerial Round",
            "HR Round",
            "Selected",
            "Offer Received",
            "Offer Accepted",
          ].includes(c.status)
        ).length;

        const managerialOrHr = companies.filter((c) =>
          ["Managerial Round", "HR Round", "Selected", "Offer Received", "Offer Accepted"].includes(
            c.status
          )
        ).length;

        const offers = companies.filter((c) =>
          ["Selected", "Offer Received", "Offer Accepted"].includes(c.status)
        ).length;

        return {
          applied,
          shortlisted,
          assessment,
          technical,
          managerialOrHr,
          offers,
        };
      },

      getConversionRates: () => {
        const { applied, shortlisted, assessment, technical, managerialOrHr, offers } =
          get().getFunnelMetrics();

        const calc = (num: number, den: number) => (den > 0 ? (num / den) * 100 : 0);

        return {
          applicationToShortlist: Math.round(calc(shortlisted, applied) * 10) / 10,
          shortlistToOA: Math.round(calc(assessment, shortlisted) * 10) / 10,
          oaToTechnical: Math.round(calc(technical, assessment) * 10) / 10,
          technicalToHR: Math.round(calc(managerialOrHr, technical) * 10) / 10,
          hrToOffer: Math.round(calc(offers, managerialOrHr) * 10) / 10,
          overallOfferRate: Math.round(calc(offers, applied) * 10) / 10,
        };
      },

      getRejectionDropoffs: () => {
        const rejectedComps = get().companies.filter((c) => c.status === "Rejected");
        const counts: Record<string, number> = {
          Resume: 0,
          "Online Assessment": 0,
          "Technical Round 1": 0,
          "Technical Round 2": 0,
          "Managerial Round": 0,
          "HR Round": 0,
        };

        rejectedComps.forEach((c) => {
          const stage = c.rejectionStage || "Resume";
          if (counts[stage] !== undefined) {
            counts[stage]++;
          } else {
            counts["Technical Round 1"]++;
          }
        });

        const totalRejections = rejectedComps.length;
        const stageCounts = Object.entries(counts).map(([stage, count]) => ({
          stage,
          count,
          percentage: totalRejections > 0 ? Math.round((count / totalRejections) * 100) : 0,
        }));

        // Find biggest dropoff
        let biggestDropoff = "None";
        let maxCount = 0;
        stageCounts.forEach((s) => {
          if (s.count > maxCount) {
            maxCount = s.count;
            biggestDropoff = s.stage;
          }
        });

        return {
          stageCounts,
          biggestDropoff,
          totalRejections,
        };
      },

      getSmartInsights: () => {
        const companies = get().companies;
        if (companies.length === 0) {
          return ["Not enough data yet. Add your first application to generate smart insights."];
        }

        const insights: string[] = [];
        const { overallOfferRate, oaToTechnical, applicationToShortlist } =
          get().getConversionRates();
        const { biggestDropoff, totalRejections } = get().getRejectionDropoffs();

        // Conversion insight
        if (applicationToShortlist > 0) {
          insights.push(
            `Your resume-to-shortlist rate is ${applicationToShortlist}% across ${companies.length} tracked applications.`
          );
        }

        // OA clearance insight
        if (oaToTechnical > 0) {
          insights.push(
            `OA clearance rate is currently ${oaToTechnical}%. ${
              oaToTechnical >= 70
                ? "Excellent problem-solving consistency!"
                : "Focusing on DSA accuracy will boost your pipeline."
            }`
          );
        }

        // Drop-off diagnosis
        if (totalRejections > 0 && biggestDropoff !== "None") {
          insights.push(
            `Your largest drop-off stage is currently "${biggestDropoff}". Revising targeted PYQs here will yield the highest return.`
          );
        }

        // Upcoming schedule check
        const todayStr = new Date().toISOString().split("T")[0];
        const upcomingEvents = get().events.filter((e) => e.date >= todayStr);
        if (upcomingEvents.length > 0) {
          insights.push(
            `You have ${upcomingEvents.length} critical placement events & interviews coming up in the schedule.`
          );
        }

        // Role-wise success
        const sdeComps = companies.filter((c) =>
          c.role.toLowerCase().includes("sde") || c.role.toLowerCase().includes("software")
        );
        const sdeOffers = sdeComps.filter((c) =>
          ["Offer Received", "Offer Accepted", "Selected"].includes(c.status)
        );
        if (sdeComps.length >= 3) {
          const sdeRate = Math.round((sdeOffers.length / sdeComps.length) * 100);
          insights.push(
            `SDE/Software roles hold a ${sdeRate}% conversion rate (${sdeComps.length} applications tracked).`
          );
        }

        // Pending follow-ups
        const pendingFollowups = get().followUps.filter((f) => f.status === "Pending");
        if (pendingFollowups.length > 0) {
          insights.push(
            `You have ${pendingFollowups.length} recruiter follow-up${
              pendingFollowups.length > 1 ? "s" : ""
            } awaiting your action.`
          );
        }

        return insights.length > 0 ? insights : ["Placement pipeline is actively progressing."];
      },
    }),
    {
      name: "placement-command-center-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
