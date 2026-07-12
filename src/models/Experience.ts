import { Schema, model, models, type Document, type Model, type Types } from "mongoose";

export type Difficulty = "Easy" | "Moderate" | "Challenging";
export type ExperienceCategory =
  | "Hiking"
  | "Camping"
  | "Water Adventure"
  | "Cultural"
  | "Wildlife"
  | "Photography";

export interface IExperience extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number;
  currency: string;
  durationLabel: string; // e.g. "3 days", "6 hours"
  difficulty: Difficulty;
  category: ExperienceCategory;
  location: string;
  maxGroupSize: number;
  startDates: Date[];
  highlights: string[];
  included: string[];
  host: Types.ObjectId;
  ratingAverage: number;
  ratingCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true, maxlength: 200 },
    fullDescription: { type: String, required: true },
    images: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    durationLabel: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Hiking",
        "Camping",
        "Water Adventure",
        "Cultural",
        "Wildlife",
        "Photography",
      ],
      required: true,
    },
    location: { type: String, required: true },
    maxGroupSize: { type: Number, required: true, min: 1 },
    startDates: { type: [Date], default: [] },
    highlights: { type: [String], default: [] },
    included: { type: [String], default: [] },
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ExperienceSchema.index({ category: 1, location: 1, price: 1 });

export const Experience: Model<IExperience> =
  models.Experience || model<IExperience>("Experience", ExperienceSchema);
