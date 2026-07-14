import { Schema, model, models, type Document, type Model, type Types } from "mongoose";

export interface IReview extends Document {
  experience: Types.ObjectId;
  authorName: string;
  authorLocation?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    experience: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
      index: true,
    },
    authorName: { type: String, required: true, trim: true, maxlength: 80 },
    authorLocation: { type: String, trim: true, maxlength: 80 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Review: Model<IReview> =
  models.Review || model<IReview>("Review", ReviewSchema);
