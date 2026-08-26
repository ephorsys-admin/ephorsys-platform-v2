import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import HeroStat from "@/models/HeroStat";
import { heroStatSchema } from "@/schemas/heroStat.schema";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  const parsed = heroStatSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const heroStat = await HeroStat.findByIdAndUpdate(id, parsed.data, { new: true });
  if (!heroStat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ heroStat });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { id } = await params;
  await HeroStat.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
