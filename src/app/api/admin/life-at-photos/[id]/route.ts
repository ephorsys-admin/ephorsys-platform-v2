import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import LifeAtPhoto from "@/models/LifeAtPhoto";
import { lifeAtPhotoSchema } from "@/schemas/lifeAtPhoto.schema";
import { deleteFromCloudinary } from "@/lib/cloudinary";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const parsed = lifeAtPhotoSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const photo = await LifeAtPhoto.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ photo });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;

  // Retrieve photo to get imageUrl URL before deletion
  const photo = await LifeAtPhoto.findById(id).lean();
  if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete gallery photo from Cloudinary
  try {
    if (photo.imageUrl) {
      await deleteFromCloudinary(photo.imageUrl);
    }
  } catch (err) {
    console.error("Failed to delete gallery image from Cloudinary:", err);
  }

  await LifeAtPhoto.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
