# Wayfarer

A full-stack outdoor adventure & experience booking platform, built with Next.js (App Router) and TypeScript.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Recharts
- **Backend:** Next.js Route Handlers (API), Mongoose (MongoDB)
- **Auth:** NextAuth.js — Credentials (bcrypt) + optional Google OAuth, JWT sessions
- **Validation:** Zod + React Hook Form

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
- [x] **Step 2 — Landing page:** navbar, hero, 8 sections, footer
- [x] **Step 3 — Auth pages:** `/login`, `/register` with validation + demo login
- [x] **Step 4 — Explore page:** `/experiences` — search, filters, sorting, pagination, skeleton loaders
- [x] **Step 5 — Details page:** `/experiences/[slug]` — gallery, overview, specs, reviews, related items
- [x] **Step 6 — Add Item (protected):** `/items/add`
- [x] **Step 7 — Manage Items (protected):** `/items/manage`
- [ ] **Step 8 — Additional pages:** About, Contact, and 1–2 more
- [ ] **Step 9 — Polish pass:** responsiveness, accessibility, empty/error states
- [ ] **Step 10 — Deployment:** Vercel + MongoDB Atlas, seed demo/admin accounts

## Demo Credentials

Run `npm run seed` after setting up `.env.local` to create these accounts:

| Role  | Email                        | Password    |
|-------|------------------------------|-------------|
| User  | demo@wayfarer-travel.com     | Demo@1234   |
| Admin | admin@wayfarer-travel.com    | Admin@1234  |

The "Try Demo Account" button on `/login` auto-fills and signs in with the User account above.
