import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ConsultancySubmission from "@/models/ConsultancySubmission";
import { consultancySubmissionSchema } from "@/schemas/consultancy.schema";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = consultancySubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Strip empty optional strings so they don't get stored as ""
    const data = Object.fromEntries(
      Object.entries(parsed.data).filter(
        ([, v]) => v !== undefined && v !== ""
      )
    );

    const submission = await ConsultancySubmission.create(data);
    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error("POST /api/consultancy error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
