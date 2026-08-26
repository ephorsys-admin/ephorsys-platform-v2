import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import LifeAtPhoto from "@/models/LifeAtPhoto";
import { lifeAtPhotoSchema } from "@/schemas/lifeAtPhoto.schema";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const photos = await LifeAtPhoto.find().sort({ order: 1 }).lean();
  return NextResponse.json({ photos });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const parsed = lifeAtPhotoSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const photo = await LifeAtPhoto.create(parsed.data);
  return NextResponse.json({ photo }, { status: 201 });
}
