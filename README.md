# Wayfarer

A full-stack outdoor adventure & experience booking platform, built with Next.js (App Router) and TypeScript.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Recharts
- **Backend:** Next.js Route Handlers (API), Mongoose (MongoDB)
- **Auth:** NextAuth.js — Credentials (bcrypt) + optional Google OAuth, JWT sessions
- **Validation:** Zod + React Hook Form

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and fill in your own values:
   ```bash
   cp .env.example .env.local
   ```

   - `MONGODB_URI` — your MongoDB connection string (Atlas or local)
   - `NEXTAUTH_SECRET` — generate one with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `http://localhost:3000` for local dev
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional, only needed if you want Google login

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) — you should see the scaffold confirmation page.

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts   # NextAuth handler
│   ├── globals.css                       # Design tokens (colors, radius)
│   ├── layout.tsx
│   └── page.tsx                          # Temporary scaffold status page
├── components/ui/                        # shadcn/ui primitives (Button, Card, Input, Label)
├── lib/
│   ├── auth.ts                           # NextAuth options
│   ├── db.ts                             # Mongoose connection (cached)
│   └── utils.ts                          # cn() class merge helper
├── models/
│   ├── User.ts
│   └── Experience.ts                     # Core "listing" entity
├── types/next-auth.d.ts                  # Session/JWT type augmentation
└── middleware.ts                         # Protects /items/add & /items/manage
```

## Build Roadmap (step by step)

- [x] **Step 1 — Scaffold:** project setup, DB connection, auth config, design tokens, base UI components
- [ ] **Step 2 — Landing page:** navbar, hero, 7+ sections, footer
- [ ] **Step 3 — Auth pages:** `/login`, `/register` with validation + demo login
- [ ] **Step 4 — Explore page:** `/experiences` — search, filters, sorting, pagination, skeleton loaders
- [ ] **Step 5 — Details page:** `/experiences/[slug]` — gallery, overview, specs, reviews, related items
- [ ] **Step 6 — Add Item (protected):** `/items/add`
- [ ] **Step 7 — Manage Items (protected):** `/items/manage`
- [ ] **Step 8 — Additional pages:** About, Contact, and 1–2 more
- [ ] **Step 9 — Polish pass:** responsiveness, accessibility, empty/error states
- [ ] **Step 10 — Deployment:** Vercel + MongoDB Atlas, seed demo/admin accounts

## Demo Credentials

_To be added once auth + seed data are built (Step 3)._
