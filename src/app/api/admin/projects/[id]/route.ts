import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { updateProjectSchema } from "@/schemas/project.schema";
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
  const project = await Project.findById(id).lean();
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
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
  
  const parsed = updateProjectSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const project = await Project.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { id } = await params;

  // Retrieve project to get thumbnailImage URL before deletion
  const project = await Project.findById(id).lean();
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete project thumbnail image from Cloudinary
  try {
    if (project.thumbnailImage) {
      await deleteFromCloudinary(project.thumbnailImage);
    }
  } catch (err) {
    console.error("Failed to delete project thumbnail from Cloudinary:", err);
  }

  await Project.findByIdAndDelete(id);
  return NextResponse.json({ message: "Project deleted" });
}
