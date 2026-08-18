import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import JobApplication from "@/models/JobApplication";
import Job from "@/models/Job";
import { deleteFromCloudinary } from "@/lib/cloudinary";

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
  const application = await JobApplication.findById(id).populate("jobId", "type").lean();
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;

  // Fetch the application to get the resumeUrl before deleting
  const application = await JobApplication.findById(id).lean();
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete resume from Cloudinary
  try {
    const resumeUrl = (application as any).resumeUrl as string;
    if (resumeUrl) {
      // PDF/DOCX are raw resources, but sometimes uploaded as image. Try raw first, then fallback.
      await deleteFromCloudinary(resumeUrl, "raw");
      await deleteFromCloudinary(resumeUrl, "image");
    }
  } catch (cloudErr) {
    console.error("Cloudinary resume deletion failed:", cloudErr);
  }

  // Delete the application document from MongoDB
  await JobApplication.findByIdAndDelete(id);

  return NextResponse.json({ message: "Application and resume deleted successfully." });
}
