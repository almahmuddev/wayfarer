import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const setupChecklist = [
  "Next.js 14 (App Router) + TypeScript",
  "Tailwind CSS + shadcn/ui design tokens",
  "MongoDB connection via Mongoose",
  "NextAuth.js (Credentials + optional Google)",
  "User & Experience data models",
  "Route protection middleware for /items/add & /items/manage",
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
          Step 1 &middot; Project Scaffold
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Wayfarer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover guided outdoor adventures &mdash; hiking, camping, water
          expeditions, and cultural experiences hosted by locals.
        </p>
        <Button className="mt-6" size="lg">
          This button proves Tailwind + shadcn/ui are wired up
        </Button>
      </div>

      <Card className="mt-16 w-full max-w-xl">
        <CardHeader>
          <CardTitle>Scaffold status</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {setupChecklist.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            This page is a temporary confirmation screen. It will be replaced
            with the full landing page (navbar, hero, 7+ sections, footer) in
            the next build step.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
