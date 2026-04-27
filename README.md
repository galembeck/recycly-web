<div align="center">

# ♻️ Recycly Web

**A modern platform connecting cooperatives, prefectures, and citizens for smarter recycling.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TanStack](https://img.shields.io/badge/TanStack-Router_+_Query-FF4154?style=flat)](https://tanstack.com)

</div>

---

## Overview

Recycly is a web platform that bridges the gap between citizens who want to recycle and the cooperatives that process recyclable materials. Cooperatives can register collection points visible on an interactive map, track material collection history and sales, and gain visibility in their communities — all through a clean, responsive admin dashboard.

### Key Features

- **Admin Dashboard** — Real-time overview of collects, sales, and material statistics with interactive charts
- **Collection Points on a Map** — Register and manage collection points with Leaflet-powered geolocation
- **Collect History** — Track every collection event with exportable PDF reports
- **Sales Management** — Record and monitor material sales per cooperative
- **Analytics & Statistics** — Visual insights into recycled material volumes over time (Recharts)
- **Public Landing Page** — Onboards new cooperatives and informs citizens about recycling
- **FAQ Pages** — Dedicated FAQ sections for cooperatives and prefectures
- **Dark / Light Mode** — Full theme switching via a theme provider
- **Authentication** — Cookie-based session flow with protected admin routes

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 5.9 |
| **Build Tool** | Vite 7 |
| **Routing** | TanStack Router v1 — file-based, code-split |
| **Server State** | TanStack Query v5 |
| **Styling** | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| **Forms & Validation** | React Hook Form + Zod v4 |
| **Maps** | Leaflet + React Leaflet |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Toasts** | Sonner |
| **PDF Export** | jsPDF + jsPDF AutoTable |
| **Date Utilities** | date-fns |
| **Linting / Formatting** | Biome + ESLint + Ultracite |

---

## Project Structure

```
recycly-web/
├── public/                      # Static assets (logo, icons)
│
└── src/
    ├── api/
    │   └── api.ts               # Base fetch client (GET, POST, PUT, DELETE + error handling)
    │
    ├── components/
    │   ├── ui/                  # shadcn/ui primitives (Button, Badge, Dialog, Card…)
    │   ├── analytics-card.tsx
    │   ├── data-table-*.tsx     # Reusable data table utilities
    │   ├── footer.tsx
    │   ├── navbar.tsx
    │   ├── theme-toggle.tsx
    │   └── …
    │
    ├── constants/               # Static data (navigation links, sidebar items, features…)
    │
    ├── hooks/
    │   ├── use-mobile.ts        # Responsive breakpoint hook
    │   └── services/            # Feature hooks — TanStack Query wrappers per domain
    │       ├── use-auth.ts      # Sign-in, sign-out, session state
    │       ├── use-collection-points.ts
    │       ├── use-collects.ts
    │       ├── use-dashboard.ts
    │       ├── use-materials.ts
    │       ├── use-sales.ts
    │       ├── use-statistics.ts
    │       └── use-user.ts
    │
    ├── lib/
    │   └── utils.ts             # cn() and shared utilities
    │
    ├── pages/                   # File-based routes (TanStack Router)
    │   ├── _auth/               # Unauthenticated routes
    │   │   ├── sign-in/
    │   │   └── sign-up/
    │   ├── _public/             # Public marketing + FAQ pages
    │   │   ├── index.tsx        # Landing page
    │   │   └── faq/
    │   │       ├── cooperatives/
    │   │       └── prefectures/
    │   └── admin/               # Protected admin area
    │       ├── layout.tsx       # Admin shell (sidebar + breadcrumb)
    │       ├── dashboard/       # Overview + analytics tabs
    │       └── _primary/
    │           ├── collection-points/   # Map + CRUD
    │           ├── history/             # Collect history table
    │           ├── sales/               # Sales table
    │           └── statistics/          # Statistics charts
    │
    ├── providers/
    │   ├── auth-provider.tsx    # Session context — exposes useAuth()
    │   └── theme-provider.tsx   # Dark/light theme context
    │
    ├── services/                # Raw API functions — no React, one file per domain
    │   ├── auth.ts
    │   ├── collect.ts
    │   ├── collection-point.ts
    │   ├── dashboard.ts
    │   ├── material.ts
    │   ├── sale.ts
    │   ├── statistics.ts
    │   └── user.ts
    │
    ├── types/                   # TypeScript interfaces and DTOs
    │
    ├── utils/                   # Pure utility functions
    │   ├── export-pdf.ts        # PDF generation helpers
    │   ├── format-masks.ts      # CPF, phone, birth date formatters
    │   ├── is-valid-masks.ts    # CPF validation
    │   └── scroll-to-section.ts
    │
    ├── app.tsx                  # Root — Router + QueryClient + Providers
    ├── main.tsx                 # Entry point
    └── route-tree-gen.ts        # Auto-generated by TanStack Router plugin (do not edit)
```

### Architectural Pattern

```
api.ts  ──►  services/*.ts  ──►  hooks/services/*  ──►  Pages & Components
 (fetch)     (async fns,          (TanStack Query,        (UI only,
              no React)            toasts, navigation)      calls hooks)
```

Keeping these layers separate means the API logic is fully independent of React, every layer is independently testable, and components stay focused on rendering.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or pnpm / bun)
- A running instance of the Recycly API (defaults to `http://localhost:5005`)

### 1 — Clone the repository

```bash
git clone https://github.com/galembeck/recycly-web.git
cd recycly-web
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Configure environment variables

Create a `.env.local` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5005
```

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Recycly REST API | `http://localhost:5005` |

### 4 — Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run check` | Run Ultracite quality checks |
| `npm run fix` | Auto-fix linting issues via Ultracite |

---

## Routing

Routes are **file-based** — TanStack Router reads `src/pages/` and auto-generates `src/route-tree-gen.ts`. Never edit that file manually.

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/sign-in` | Public | Sign-in form |
| `/sign-up` | Public | Registration form |
| `/faq/cooperatives` | Public | FAQ for recycling cooperatives |
| `/faq/prefectures` | Public | FAQ for city hall / prefectures |
| `/admin/dashboard` | Protected | Overview, analytics, tables |
| `/admin/collection-points` | Protected | Map + collection point management |
| `/admin/history` | Protected | Collect history with PDF export |
| `/admin/sales` | Protected | Sales records |
| `/admin/statistics` | Protected | Material volume statistics |

Protected routes redirect to `/sign-in` if no active session is found.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Open a pull request targeting `master`

---

## Author

**Pedro Galembeck** — [github.com/galembeck](https://github.com/galembeck)

---

<div align="center">
Made with 💚 for a more sustainable future.
</div>
