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

export interface ExperienceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number;
  currency: string;
  durationLabel: string;
  difficulty: string;
  category: string;
  location: string;
  maxGroupSize: number;
  startDates: string[];
  highlights: string[];
  included: string[];
  ratingAverage: number;
  ratingCount: number;
  host: { name: string; image?: string };
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ManageExperienceItem {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
  hostName?: string; // only populated for admin view
}
