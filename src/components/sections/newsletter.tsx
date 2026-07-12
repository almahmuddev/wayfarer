"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    // NOTE: no backend endpoint yet - this will POST to /api/newsletter
    // once the subscriber list is built out later in the project.
    setSubmitted(true);
  }

  return (
    <section className="container py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-xl border border-border bg-card px-6 py-10 text-center shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          Get New Trails in Your Inbox
        </h2>
        <p className="mt-2 text-muted-foreground">
          One email a month: new experiences, seasonal routes, and host
          spotlights. No spam.
        </p>

        {submitted ? (
          <div className="mt-6 flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">
              You&apos;re on the list &mdash; thanks!
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full flex-col gap-3 sm:flex-row"
            noValidate
          >
            <div className="flex-1 text-left">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
              />
              {error && (
                <p className="mt-1 text-xs text-destructive">{error}</p>
              )}
            </div>
            <Button type="submit" className="sm:w-auto">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
