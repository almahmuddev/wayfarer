"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/site-config";
import {
  SORT_OPTIONS,
  DEFAULT_FILTERS,
  type ExperienceFiltersState,
} from "@/types/experience";

const difficulties = ["All", "Easy", "Moderate", "Challenging"];

interface ExperienceFiltersProps {
  filters: ExperienceFiltersState;
  onChange: (patch: Partial<ExperienceFiltersState>) => void;
  onClear: () => void;
  resultCount?: number;
}

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ExperienceFilters({
  filters,
  onChange,
  onClear,
  resultCount,
}: ExperienceFiltersProps) {
  const isFiltered = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 rounded-md border border-input px-3">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <Input
          value={filters.q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Search experiences by name or description..."
          className="h-10 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className={selectClass}
          aria-label="Category"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>

        <Input
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="Location"
        />

        <Input
          type="number"
          min={0}
          value={filters.minPrice}
          onChange={(e) => onChange({ minPrice: e.target.value })}
          placeholder="Min price"
        />

        <Input
          type="number"
          min={0}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: e.target.value })}
          placeholder="Max price"
        />

        <select
          value={filters.difficulty}
          onChange={(e) => onChange({ difficulty: e.target.value })}
          className={selectClass}
          aria-label="Difficulty"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All difficulties" : d}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) =>
            onChange({ sort: e.target.value as ExperienceFiltersState["sort"] })
          }
          className={selectClass}
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {typeof resultCount === "number"
            ? `${resultCount} experience${resultCount === 1 ? "" : "s"} found`
            : ""}
        </p>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="mr-1.5 h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
