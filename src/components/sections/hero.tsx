"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/site-config";

export function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    router.push(`/experiences${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background px-6">
      {/* soft decorative background shapes */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <span className="mb-4 rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground">
          Guided adventures, led by locals
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Explore the Wild, One Trail at a Time
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hand-picked hikes, camps, and river routes across Bangladesh &mdash;
          booked directly with the people who know them best.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        onSubmit={handleSearch}
        className="relative z-10 mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:flex-row"
      >
        <label className="flex flex-1 items-center gap-2 rounded-md border border-input px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 w-full bg-transparent text-sm outline-none"
            aria-label="Category"
          >
            <option value="">Any category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-1 items-center gap-2 rounded-md border border-input px-3">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where to? e.g. Sylhet"
            className="h-10 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </label>

        <Button type="submit" size="lg" className="sm:w-auto">
          Search
        </Button>
      </motion.form>

      <a
        href="#categories"
        className="absolute bottom-6 z-10 animate-bounce text-muted-foreground"
        aria-label="Scroll to categories"
      >
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
}
