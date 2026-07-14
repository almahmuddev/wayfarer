import type { ExperiencePreview } from "@/lib/data/experiences";

export interface ExperienceListItem extends ExperiencePreview {
  id: string;
}

export interface ExperiencesApiResponse {
  experiences: ExperienceListItem[];
  total: number;
  page: number;
  totalPages: number;
}

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export interface ExperienceFiltersState {
  q: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  difficulty: string;
  sort: SortValue;
}

export const DEFAULT_FILTERS: ExperienceFiltersState = {
  q: "",
  category: "All",
  location: "",
  minPrice: "",
  maxPrice: "",
  difficulty: "All",
  sort: "recommended",
};
