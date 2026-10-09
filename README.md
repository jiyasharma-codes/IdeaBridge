# IdeaBridge MVP — Complete Consumer & Startup Innovation Platform

IdeaBridge connects FMCG/CPG startups directly with verified consumer co-creators.

## Features Included

### 1. Consumer Innovation Experience
- **Landing Page**: Clean, modern light mode by default with live community highlights.
- **Explore & Filter**: Instant search with Enter key navigation, category pills, and sorting.
- **Idea Cards & Details**: Click card body or "Details" button to open detailed validation modals.
- **Validation Engine**: Anti-inflation exact `+1` / `-1` toggle support for voting on consumer concepts.
- **Idea Lifecycle**: Three-step submission pipeline: Draft → Review → Live Submission.
- **Community Challenges**: Browse, inspect rewards, and submit entries directly to active FMCG brand mandates.
- **Appearance & Preferences**: Explicit Light/Dark theme toggle persisting across sessions.

### 2. Startup / Brand R&D Command Center
- **Isolated Brand Context**: Secure single-startup session (no context bleeding across brand portals).
- **Executive Overview**: Key FMCG metrics, category radar, and direct links to pending submissions.
- **Financial Intelligence**: Detailed revenue, production cost, operating margin, and net profit analytics.
- **Consumer Ideas Management**: 8-stage lifecycle status filters, review modals, and status transitions.
- **AI Idea Clustering & Insights**: User-triggered semantic synthesis and strategic R&D recommendations.
- **Concept Lab & Formulation**: Dynamic unit economics, scenario analysis graphs, and live simulation recalculation that immediately responds to price, weight/volume, and cost adjustments.
- **Innovation Challenges Hub**: Create and launch brand bounties to the consumer community.

---

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open your browser at the local server URL (e.g. `http://localhost:3001` or `http://localhost:5173`).

### Production Build & Type Check
```bash
# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview build locally
npm run preview
```

---

## Deployment
This project is configured for deployment to **Vercel**, **Netlify**, or any modern static web host. A `vercel.json` rewrite file is included to support client-side routing.
