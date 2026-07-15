import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check your details and try again." },
        { status: 400 }
      );
    }

    await connectDB();
    await ContactMessage.create(parsed.data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
