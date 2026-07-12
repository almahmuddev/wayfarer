import { Schema, model, models, type Document, type Model } from "mongoose";

export type UserRole = "user" | "host" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // absent for OAuth-only accounts
  image?: string;
  role: UserRole;
  provider: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // never returned by default queries
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "host", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  models.User || model<IUser>("User", UserSchema);
