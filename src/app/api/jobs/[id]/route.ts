import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import JobApplication from "@/models/JobApplication";
import { createApplicationSchema } from "@/schemas/application.schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const job = await Job.findOne({ _id: id, isActive: true }).lean();
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ job });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const job = await Job.findOne({ _id: id, isActive: true });
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    const body = await request.json();
    const parsed = createApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const application = await JobApplication.create({
      jobId: job._id,
      jobTitleSnapshot: job.title,
      ...parsed.data,
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("POST /api/jobs/[id]/apply error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
