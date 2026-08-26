import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import ClientLogo from "@/models/ClientLogo";
import { clientLogoSchema } from "@/schemas/clientLogo.schema";
import { deleteFromCloudinary } from "@/lib/cloudinary";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const parsed = clientLogoSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const logo = await ClientLogo.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!logo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ logo });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;

  // Retrieve logo to get logoImage URL before deletion
  const logo = await ClientLogo.findById(id).lean();
  if (!logo) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete logo image from Cloudinary
  try {
    if (logo.logoImage) {
      await deleteFromCloudinary(logo.logoImage);
    }
  } catch (err) {
    console.error("Failed to delete client logo image from Cloudinary:", err);
  }

  await ClientLogo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
