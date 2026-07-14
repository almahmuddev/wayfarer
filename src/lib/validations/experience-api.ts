import { z } from "zod";
import { categoryOptions, difficultyOptions } from "@/lib/validations/experience-form";

export const experienceApiSchema = z.object({
  title: z.string().min(5).max(120),
  shortDescription: z.string().min(20).max(200),
  fullDescription: z.string().min(50),
  price: z.number().positive(),
  durationLabel: z.string().min(2).max(40),
  difficulty: z.enum(difficultyOptions),
  category: z.enum(categoryOptions),
  location: z.string().min(2).max(120),
  maxGroupSize: z.number().int().positive(),
  startDates: z.array(z.string()).min(1),
  images: z.array(z.string().url()).default([]),
  highlights: z.array(z.string()).default([]),
  included: z.array(z.string()).default([]),
  isPublished: z.boolean().default(true),
});

export type ExperienceApiInput = z.infer<typeof experienceApiSchema>;
