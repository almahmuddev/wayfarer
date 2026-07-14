import { NextResponse } from "next/server";
import type { FilterQuery } from "mongoose";
import { connectDB } from "@/lib/db";
import { Experience, type IExperience } from "@/models/Experience";
import type { ExperienceListItem } from "@/types/experience";

const DEFAULT_LIMIT = 8;

function buildSort(sort: string | null): Record<string, 1 | -1> {
  switch (sort) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "rating-desc":
      return { ratingAverage: -1 };
    case "newest":
      return { createdAt: -1 };
    default:
      return { ratingAverage: -1, ratingCount: -1 };
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category")?.trim();
    const location = searchParams.get("location")?.trim();
    const difficulty = searchParams.get("difficulty")?.trim();
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(
      24,
      Math.max(1, Number(searchParams.get("limit")) || DEFAULT_LIMIT)
    );

    const filter: FilterQuery<IExperience> = { isPublished: true };

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ title: regex }, { shortDescription: regex }, { location: regex }];
    }

    if (category && category !== "All") {
      filter.category = category as IExperience["category"];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty as IExperience["difficulty"];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      Experience.find(filter)
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Experience.countDocuments(filter),
    ]);

    const experiences: ExperienceListItem[] = docs.map((doc) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      title: doc.title,
      shortDescription: doc.shortDescription,
      image: doc.images?.[0] ?? "",
      price: doc.price,
      currency: doc.currency,
      durationLabel: doc.durationLabel,
      difficulty: doc.difficulty,
      category: doc.category,
      location: doc.location,
      ratingAverage: doc.ratingAverage,
      ratingCount: doc.ratingCount,
    }));

    return NextResponse.json({
      experiences,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    console.error("GET /api/experiences error:", error);
    return NextResponse.json(
      { message: "Could not load experiences." },
      { status: 500 }
    );
  }
}
