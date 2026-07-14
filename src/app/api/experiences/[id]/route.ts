import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/Experience";
import { Review } from "@/models/Review";

interface RouteParams {
  params: { id: string };
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in to do that." },
        { status: 401 }
      );
    }

    await connectDB();

    const experience = await Experience.findById(params.id);

    if (!experience) {
      return NextResponse.json(
        { message: "Experience not found." },
        { status: 404 }
      );
    }

    const isOwner = experience.host.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { message: "You don't have permission to delete this experience." },
        { status: 403 }
      );
    }

    await Promise.all([
      Experience.deleteOne({ _id: experience._id }),
      Review.deleteMany({ experience: experience._id }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/experiences/[id] error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
