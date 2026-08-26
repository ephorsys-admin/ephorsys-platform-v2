import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { teamMemberSchema } from "@/schemas/team.schema";
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
  const parsed = teamMemberSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const member = await TeamMember.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ member });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;

  // Retrieve member to get photo URL before deletion
  const member = await TeamMember.findById(id).lean();
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Delete team member photo from Cloudinary
  try {
    if (member.photo) {
      await deleteFromCloudinary(member.photo);
    }
  } catch (err) {
    console.error("Failed to delete team member photo from Cloudinary:", err);
  }

  await TeamMember.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
