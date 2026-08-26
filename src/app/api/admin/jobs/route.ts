import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { createJobSchema } from "@/schemas/job.schema";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const query: Record<string, unknown> = {};
  if (type === "full-time" || type === "internship") query.type = type;

  const jobs = await Job.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ jobs });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();
  const parsed = createJobSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const job = await Job.create(parsed.data);
  return NextResponse.json({ job }, { status: 201 });
}
