import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { testimonialSchema } from "@/schemas/testimonial.schema";
import { deleteFromCloudinary } from "@/lib/cloudinary";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const parsed = testimonialSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const testimonial = await Testimonial.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ testimonial });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;

  // Retrieve testimonial to get clientPhoto URL before deletion
  const testimonial = await Testimonial.findById(id).lean();
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete client photo from Cloudinary
  try {
    if (testimonial.clientPhoto) {
      await deleteFromCloudinary(testimonial.clientPhoto);
    }
  } catch (err) {
    console.error("Failed to delete client photo from Cloudinary:", err);
  }

  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
