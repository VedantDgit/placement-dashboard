# PLACEMENT COMMAND CENTER ⚡
### Linear-Grade Personal Placement Tracker • Applications • Assessments • Interviews • Offers

**Placement Command Center** is a production-quality personal application tracking system (ATS) and placement dashboard built specifically for engineering students tracking campus and off-campus placements.

Built to answer instantly:
- *"Where do I stand with every company?"*
- *"How many companies have I applied to?"*
- *"Which companies have I cleared?"*
- *"Which round is next?"*
- *"Where am I getting rejected?"*
- *"Which companies need follow-up?"*
- *"How is my placement season progressing?"*

---

## 🔗 Connected Ecosystem
- **Live Production URL**: [https://placement-dashboard-flame.vercel.app](https://placement-dashboard-flame.vercel.app)
- **GATE 2027 Personal Dashboard**: [https://gate-2027-personal-dashboard.vercel.app/](https://gate-2027-personal-dashboard.vercel.app/) (Connected directly inside the Sidebar, Command Palette `Ctrl+K`, Header, and Dashboard banner)
- **GitHub Repository**: [https://github.com/VedantDgit/placement-dashboard](https://github.com/VedantDgit/placement-dashboard)

---

## 🚀 Key Features

1. **Linear-Grade Dark Aesthetics**: Dark charcoal/black canvas with subtle borders, glowing accents, compact density, and smooth micro-interactions.
2. **Deterministic Placement Analytics**:
   - **Step-by-Step Funnel**: Applications → Shortlisted → OA → Technical → HR → Offers.
   - **Rejection Drop-off Analysis**: Stage-wise drop-off breakdown with automated root cause diagnosis.
   - **Role & Source Yield**: Applications by profile (SDE, AI/ML, Data, Full Stack) and acquisition channel (Campus, Referral, LinkedIn, Hackathon).
3. **12-Week Commit Heatmap**: GitHub-style activity grid tracking daily applications, DSA problem count, and study hours.
4. **Interactive Kanban Pipeline**: Drag-and-drop board across 8 recruitment stages (`Applied`, `Shortlisted`, `Assessment`, `Technical`, `Managerial`, `HR`, `Offer`, `Rejected`).
5. **Dynamic Round Timeline**: Per-company sequential progression tree with scores, interviewer notes, ratings, preparation checklists, and linked interview questions.
6. **Interview Question Bank with Duplicate Detection**: Algorithmic text similarity (Levenshtein + Token Jaccard) to flag repeated questions asked across companies.
7. **Offers Hub**: Comprehensive compensation comparison (Base Salary, Total CTC, Joining Bonus, RSUs, Bond, Work Mode).
8. **Resume Version Tracking**: Measure shortlist conversion rates per resume variant.
9. **Global Command Palette (`Ctrl+K`)**: Universal search across companies, questions, rounds, tasks, and routes.
10. **Zero-Backend Local-First & Backup Engine**: Instant state persistence in LocalStorage with full JSON export and import capabilities.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Search Command**: [cmdk](https://cmdk.paco.me/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark / Light / System)

---

## 📦 Getting Started Locally

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
```bash
# Clone or navigate to the directory
cd "v:\Placement Dashboard"

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build & Verification

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

---

## ☁️ Vercel Deployment

This project is structured for 1-click deployment on [Vercel](https://vercel.com/):

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in Vercel.
3. Deploy! (Zero environment variables required for local-first mode).

---

## 🔮 Future Supabase Integration Roadmap

The application's store architecture (`src/store/usePlacementStore.ts`) uses strict TypeScript interfaces (`src/types/index.ts`). To connect Supabase:
1. Initialize the `@supabase/supabase-js` client.
2. Replace local Zustand setters in `src/store/usePlacementStore.ts` with Supabase asynchronous table mutations (`companies`, `rounds`, `questions`, `offers`, `tasks`, `events`).
3. UI components will remain unchanged because they consume the store interface!

---

## 📄 License
MIT License. Built for engineering students conquering their placement season.
