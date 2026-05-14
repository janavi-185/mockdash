# Hintro Dashboard

This is a frontend dashboard built for the Hintro platform. It gives users a live view of their call sessions, usage stats, and a way to submit feedback. The project is built with Next.js and communicates with a centralized mock backend.

**Deployed UI:** https://hintrodash.vercel.app/  
<!-- **Backend Base URL:** https://mock-backend-hintro.vercel.app -->

---

## Table of Contents

1. Tech Stack
2. Getting Started
3. Project Structure
4. API Reference
5. Feedback System Logic
6. User Management & Switching
8. Assumptions Made

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui (Radix UI primitives) |
| Icons | lucide-react |
| Package Manager | pnpm |

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd Hintro
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

The application will be available at:

```
http://localhost:3000
```

To run a full type check separately:

```bash
pnpm run typecheck
```

To format the codebase using Prettier:

```bash
pnpm run format
```

---

## Project Structure

```
Hintro/
├── app/
│   ├── Dashboard/
│   │   ├── dashboard/         Main dashboard page with stats and calls
│   │   ├── feedback-history/  Feedback history listing page
│   │   ├── layout.tsx         Shared layout with Sidebar, Topbar, and Feedback Modal
│   │   └── page.tsx           Redirects to /Dashboard/dashboard
│   ├── Login/
│   │   └── page.tsx           Login page with manual login flow
│   ├── globals.css            Global styles and CSS custom properties (color palette)
│   ├── layout.tsx             Root layout with font and theme setup
│   ├── not-found.tsx          Custom 404 page
│   └── page.tsx               Root redirect to /Login
│
├── components/
│   ├── ui/                    Auto-generated shadcn/ui primitives (Button, etc.)
│   ├── calls.tsx              Call history table with pagination
│   ├── feedBackHist.tsx       Feedback history list for the current user
│   ├── FeedbackModal.tsx      Feedback submission modal with star rating
│   ├── logout.tsx             Logout button component
│   ├── Sidebar.tsx            Left navigation sidebar
│   ├── Topbar.tsx             Top navigation bar with menu toggle
│   └── theme-provider.tsx     next-themes wrapper
│
├── lib/
│   └── api.ts                 All API fetch functions and TypeScript interfaces
│
├── package.json
└── tsconfig.json
```

---

## API Reference

All API calls are made from `lib/api.ts`. The user identity is passed via the `x-user-id` request header on every request. The value is read from `localStorage` under the key `hintro_user_id`.

### Base URL

```
https://mock-backend-hintro.vercel.app
```

### Endpoints

**GET /api/auth/profile**
Returns the profile of the currently active user.

---

**GET /api/auth/dashboard**
Returns combined user, subscription, and usage data for the dashboard.

---

**GET /api/call-sessions/stats**
Returns aggregate call statistics for the user.

---

**GET /api/call-sessions?limit=10&page=1**
Returns a paginated list of call sessions for the user.

---

### Test Users

| User ID | Email | Behaviour |
|---|---|---|
| u1 | john@example.com | Empty state, no calls, no stats |
| u2 | jane@hintro.com | Active state with call sessions and stats |

---

## Feedback System Logic

The feedback feature operates in the browser using `localStorage` to ensure data persistence for the prototype.

**User Isolation**

Each user's feedback is stored under a separate key in localStorage:
- User 1 stores under `local_feedback_u1`
- User 2 stores under `local_feedback_u2`

**Submission Flow**

1. The user clicks "Feedback" in the sidebar.
2. The user selects a star rating (1 to 5).
3. Contextual prompts appear based on the rating.
4. Description is mandatory for submission.
5. On submit, data is saved to the user's specific key.
6. A success confirmation appears and stays visible until manually closed via the X button.

---

## User Management & Switching

**Manual Login Flow**

The application features a manual login flow at `/Login`. 
- Entering `user2@hintro.com` logs you in as User 2 (Active).
- Entering any other email logs you in as User 1 (New).

**User Switching (Upgrade Button)**

For rapid testing and demonstration, the **Upgrade** button in the sidebar is configured to toggle the active user between `u1` and `u2` instantly. Clicking this button updates the `hintro_user_id` in localStorage and reloads the application to reflect the other user's data and history.

---


## Assumptions Made

- Authentication is simulated through localStorage IDs.
- The sidebar "Upgrade" button serves as a convenient user-switcher for testing.
- All pages inside the Dashboard are assumed to be protected routes.
- Navigation items like "Knowledge Base" and "Prompts" are placeholders for future features.
