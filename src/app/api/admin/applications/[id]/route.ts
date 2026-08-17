import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import JobApplication from "@/models/JobApplication";

async function requireAuth() {
  return (await getServerSession(authOptions)) ?? null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const application = await JobApplication.findById(id).lean();
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ application });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const { status } = body;
  const validStatuses = ["new", "reviewed", "shortlisted", "rejected", "hired"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const application = await JobApplication.findByIdAndUpdate(id, { status }, { new: true });
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ application });
}
