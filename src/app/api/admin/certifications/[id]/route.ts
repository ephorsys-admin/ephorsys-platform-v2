import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";
import { certificationSchema } from "@/schemas/certification.schema";
import { deleteFromCloudinary } from "@/lib/cloudinary";

async function requireAuth() {
  return (await getServerSession(authOptions)) ?? null;
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
  const parsed = certificationSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const certification = await Certification.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!certification) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ certification });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;

  const certification = await Certification.findById(id).lean();
  if (!certification) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete image from Cloudinary
  try {
    if (certification.imageUrl) {
      await deleteFromCloudinary(certification.imageUrl);
    }
  } catch (err) {
    console.error("Failed to delete certification logo from Cloudinary:", err);
  }

  await Certification.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
