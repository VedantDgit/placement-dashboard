export type CompanyStatus =
  | "Not Applied"
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Assessment"
  | "Technical Round"
  | "Managerial Round"
  | "HR Round"
  | "Selected"
  | "Rejected"
  | "On Hold"
  | "Withdrawn"
  | "Offer Received"
  | "Offer Accepted";

export type PipelineStage =
  | "Applied"
  | "Shortlisted"
  | "Assessment"
  | "Technical"
  | "Managerial"
  | "HR"
  | "Offer"
  | "Rejected";

export type RoundType =
  | "Application"
  | "Online Assessment"
  | "Technical Round 1"
  | "Technical Round 2"
  | "Technical Round 3"
  | "System Design"
  | "Managerial Round"
  | "HR Round"
  | "Final Interview"
  | "Other";

export type RoundStatus =
  | "Upcoming"
  | "Scheduled"
  | "Completed"
  | "Cleared"
  | "Failed"
  | "Skipped";

export type QuestionCategory =
  | "DSA"
  | "Java"
  | "Python"
  | "C++"
  | "JavaScript/TypeScript"
  | "SQL"
  | "DBMS"
  | "OS"
  | "CN"
  | "OOP"
  | "System Design"
  | "ML"
  | "DL"
  | "AI"
  | "Projects"
  | "HR"
  | "Behavioral"
  | "Aptitude"
  | "Other";

export type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export type JobType = "Full Time" | "Internship" | "6M Intern + PPO" | "Contract";

export type CompanyCategory =
  | "Product"
  | "Service"
  | "Startup"
  | "MNC"
  | "FinTech"
  | "AI/ML"
  | "Cloud"
  | "SaaS"
  | "Consulting"
  | "Core Tech"
  | "E-Commerce"
  | "Other";

export type ApplicationSource =
  | "Campus"
  | "LinkedIn"
  | "Referral"
  | "Company Website"
  | "Naukri"
  | "Internship Conversion"
  | "Hackathon"
  | "College Placement Cell"
  | "Unstop"
  | "Instahyre"
  | "Other";

export type OfferStatus = "Received" | "Accepted" | "Declined" | "Negotiating";

export type FollowUpStatus = "Pending" | "Contacted" | "Response Received" | "No Response";

export type TaskPriority = "Urgent" | "High" | "Medium" | "Low";

export type TaskCategory =
  | "DSA"
  | "Revision"
  | "Application"
  | "Mock Interview"
  | "Follow-up"
  | "Project Prep"
  | "HR Practice"
  | "Aptitude"
  | "Other";

export type EventType =
  | "Online Assessment"
  | "Technical Interview"
  | "Managerial Interview"
  | "HR Interview"
  | "Application Deadline"
  | "OA Deadline"
  | "Follow-up"
  | "Offer Deadline"
  | "Mock Test"
  | "Other";

export interface RecruiterContact {
  name: string;
  role?: string;
  email?: string;
  linkedin?: string;
  phone?: string;
  notes?: string;
}

export interface RoundChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface Round {
  id: string;
  companyId: string;
  name: string;
  type: RoundType;
  order: number;
  date?: string; // ISO or YYYY-MM-DD
  time?: string;
  status: RoundStatus;
  score?: string; // e.g. "82%", "4/5", "85/100"
  durationMinutes?: number;
  interviewer?: string;
  topicsAsked?: string[];
  feedback?: string;
  notes?: string;
  performanceRating?: number; // 1 to 5
  checklist?: RoundChecklistItem[];
  nextRoundDate?: string;
}

export interface Question {
  id: string;
  companyId: string;
  companyName?: string;
  roundId?: string;
  roundName?: string;
  question: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  myAnswer?: string;
  correctAnswer?: string;
  confidence: number; // 1 to 5
  needsRevision: boolean;
  dateAdded: string;
  tags?: string[];
  similarToIds?: string[];
}

export interface Offer {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  baseSalary?: string; // e.g. "₹22 LPA" or "2200000"
  totalCtc: string; // e.g. "₹32 LPA"
  joiningBonus?: string;
  stocks?: string;
  location: string;
  bond?: string; // "None" or "1 Year (₹1,00,000)"
  workMode: "Remote" | "Hybrid" | "On-site";
  offerDate: string;
  joiningDate?: string;
  deadlineDate?: string;
  status: OfferStatus;
  notes?: string;
  perks?: string[];
}

export interface Task {
  id: string;
  title: string;
  companyId?: string;
  companyName?: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
  durationMinutes?: number;
  notes?: string;
}

export interface EventItem {
  id: string;
  companyId?: string;
  companyName?: string;
  type: EventType;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // e.g. "10:30 AM"
  locationOrUrl?: string;
  status?: "Upcoming" | "Completed" | "Cancelled";
  notes?: string;
}

export interface ResumeVersion {
  id: string;
  name: string; // e.g. "SDE-focused v2"
  description?: string;
  targetRole: string; // e.g. "SDE / Backend"
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FollowUp {
  id: string;
  companyId: string;
  companyName?: string;
  contactPerson: string;
  contactMethod: "Email" | "LinkedIn" | "Phone" | "WhatsApp" | "Portal";
  message?: string;
  status: FollowUpStatus;
  dueDate: string;
  lastContactDate?: string;
  notes?: string;
}

export interface PlacementGoal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: "Applications" | "Interviews" | "DSA" | "Offers" | "Mocks";
  completed: boolean;
}

export interface ActivityItem {
  id: string;
  type:
    | "applied"
    | "shortlisted"
    | "oa_cleared"
    | "oa_scheduled"
    | "technical_cleared"
    | "technical_scheduled"
    | "offer_received"
    | "rejected"
    | "round_updated"
    | "note_added"
    | "task_completed";
  title: string;
  description: string;
  timestamp: string; // ISO string
  companyId?: string;
  companyName?: string;
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
  applications: number;
  dsaQuestions: number;
  studyHours: number;
  interviews: number;
}

export interface Company {
  id: string;
  name: string;
  role: string;
  jobType: JobType;
  location: string;
  category: CompanyCategory;
  source: ApplicationSource;
  applicationDate: string; // YYYY-MM-DD
  deadline?: string; // YYYY-MM-DD
  status: CompanyStatus;
  currentRoundName?: string;
  nextRoundName?: string;
  packageStipend?: string; // e.g. "₹24 LPA" or "₹80,000/mo"
  expectedCtc?: string;
  offeredCtc?: string;
  recruiter?: RecruiterContact;
  applicationUrl?: string;
  resumeVersionId?: string;
  notes?: string;
  tags: string[];
  rejectionStage?: string; // e.g. "Resume", "Online Assessment", "Technical Round 1", "Technical Round 2", "HR Round"
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  isSample?: boolean;
}

export interface FilterOptions {
  search: string;
  status: string;
  role: string;
  category: string;
  source: string;
  location: string;
  sortBy:
    | "newest"
    | "oldest"
    | "highest_package"
    | "upcoming_event"
    | "recently_updated"
    | "name";
}

export interface UserProfile {
  name: string;
  college: string;
  branch: string;
  targetCtc: string;
  graduationYear: string;
  seasonName: string;
}
