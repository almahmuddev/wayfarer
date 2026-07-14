"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Compass } from "lucide-react";
import { ExperienceFilters } from "@/components/experiences/experience-filters";
import { Pagination } from "@/components/experiences/pagination";
import { ExperienceCard } from "@/components/cards/experience-card";
import { ExperienceCardSkeleton } from "@/components/cards/experience-card-skeleton";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import {
  DEFAULT_FILTERS,
  type ExperienceFiltersState,
  type ExperiencesApiResponse,
} from "@/types/experience";

const PAGE_SIZE = 8;

export function ExperiencesExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ExperienceFiltersState>(() => ({
    ...DEFAULT_FILTERS,
    category: searchParams.get("category") || DEFAULT_FILTERS.category,
    location: searchParams.get("location") || DEFAULT_FILTERS.location,
  }));
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ExperiencesApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedQ = useDebouncedValue(filters.q, 400);
  const debouncedLocation = useDebouncedValue(filters.location, 400);
  const debouncedMinPrice = useDebouncedValue(filters.minPrice, 400);
  const debouncedMaxPrice = useDebouncedValue(filters.maxPrice, 400);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedQ) params.set("q", debouncedQ);
    if (filters.category !== "All") params.set("category", filters.category);
    if (debouncedLocation) params.set("location", debouncedLocation);
    if (debouncedMinPrice) params.set("minPrice", debouncedMinPrice);
    if (debouncedMaxPrice) params.set("maxPrice", debouncedMaxPrice);
    if (filters.difficulty !== "All") params.set("difficulty", filters.difficulty);
    if (filters.sort !== "recommended") params.set("sort", filters.sort);
    params.set("page", String(page));
    params.set("limit", String(PAGE_SIZE));
    return params.toString();
  }, [
    debouncedQ,
    filters.category,
    debouncedLocation,
    debouncedMinPrice,
    debouncedMaxPrice,
    filters.difficulty,
    filters.sort,
    page,
  ]);

  // Keep the URL shareable/bookmarkable without adding history entries
  useEffect(() => {
    router.replace(`/experiences?${queryString}`, { scroll: false });
  }, [queryString, router]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError("");

    fetch(`/api/experiences?${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load experiences.");
        return res.json();
      })
      .then((json: ExperiencesApiResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load experiences. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryString]);

  const handleFilterChange = useCallback(
    (patch: Partial<ExperienceFiltersState>) => {
      setFilters((prev) => ({ ...prev, ...patch }));
      setPage(1);
    },
    []
  );

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore Experiences
        </h1>
        <p className="mt-2 text-muted-foreground">
          Filter by category, location, price, or difficulty to find your next
          trip.
        </p>
      </div>

      <ExperienceFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        resultCount={data?.total}
      />

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {!error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ExperienceCardSkeleton key={i} />
              ))
            : data?.experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
        </div>
      )}

      {!isLoading && !error && data?.experiences.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <Compass className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-foreground">
            No experiences match your filters
          </p>
          <p className="text-sm text-muted-foreground">
            Try widening your price range or clearing a filter.
          </p>
        </div>
      )}

      {!isLoading && data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
