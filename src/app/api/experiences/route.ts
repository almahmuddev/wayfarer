import { NextResponse } from "next/server";
import type { FilterQuery } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Experience, type IExperience } from "@/models/Experience";
import type { ExperienceListItem } from "@/types/experience";
import { experienceApiSchema } from "@/lib/validations/experience-api";
import { slugify, randomSlugSuffix } from "@/lib/slugify";

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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in to add an experience." },
        { status: 401 }
      );
    }

    const json = await request.json();
    const parsed = experienceApiSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please check your form fields and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const data = parsed.data;
    const baseSlug = slugify(data.title);

    let slug = baseSlug;
    // Ensure slug uniqueness - append a short random suffix on collision
    // eslint-disable-next-line no-constant-condition
    while (await Experience.exists({ slug })) {
      slug = `${baseSlug}-${randomSlugSuffix()}`;
    }

    const images =
      data.images.length > 0
        ? data.images
        : [`https://picsum.photos/seed/${slug}/1200/800`];

    const experience = await Experience.create({
      ...data,
      images,
      slug,
      currency: "USD",
      host: session.user.id,
      ratingAverage: 0,
      ratingCount: 0,
    });

    return NextResponse.json(
      { id: experience._id.toString(), slug: experience.slug },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/experiences error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
