import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactSubmission from "@/models/ContactSubmission";
import { contactSubmissionSchema } from "@/schemas/contact.schema";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const submission = await ContactSubmission.create(parsed.data);
    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
