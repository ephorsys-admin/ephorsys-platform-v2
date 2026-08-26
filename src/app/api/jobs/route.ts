import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const query: Record<string, unknown> = { isActive: true };
    if (type === "full-time" || type === "internship") {
      query.type = type;
    }

    const jobs = await Job.find(query).sort({ postedAt: -1 }).lean();
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json({ jobs: [] }, { status: 200 });
  }
}
