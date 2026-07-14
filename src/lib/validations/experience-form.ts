import { z } from "zod";

export const categoryOptions = [
  "Hiking",
  "Camping",
  "Water Adventure",
  "Cultural",
  "Wildlife",
  "Photography",
] as const;

export const difficultyOptions = ["Easy", "Moderate", "Challenging"] as const;

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const todayAtMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const experienceFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title is too long"),
  shortDescription: z
    .string()
    .min(20, "Short description must be at least 20 characters")
    .max(200, "Keep the short description under 200 characters"),
  fullDescription: z
    .string()
    .min(50, "Full description must be at least 50 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  durationLabel: z
    .string()
    .min(2, "Duration is required (e.g. '2 days', 'Half day')")
    .max(40, "Keep it short (e.g. '2 days')"),
  difficulty: z.enum(difficultyOptions, {
    errorMap: () => ({ message: "Select a difficulty" }),
  }),
  category: z.enum(categoryOptions, {
    errorMap: () => ({ message: "Select a category" }),
  }),
  location: z.string().min(2, "Location is required").max(120),
  maxGroupSize: z.coerce
    .number()
    .int("Must be a whole number")
    .positive("Group size must be at least 1"),
  startDate: z
    .string()
    .min(1, "Start date is required")
    .refine((val) => new Date(val) >= todayAtMidnight(), {
      message: "Start date must be today or later",
    }),
  imageUrl: z
    .string()
    .trim()
    .refine((val) => val === "" || isValidUrl(val), {
      message: "Enter a valid URL",
    })
    .optional(),
  additionalImages: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .every(isValidUrl),
      { message: "Each line must be a valid URL" }
    ),
  highlights: z.string().optional(),
  included: z.string().optional(),
  isPublished: z.boolean(),
});

export type ExperienceFormInput = z.infer<typeof experienceFormSchema>;

export function parseLines(value?: string): string[] {
  if (!value) return [];
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
