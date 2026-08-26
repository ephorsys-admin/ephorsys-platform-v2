import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import HeroStat from "@/models/HeroStat";
import { heroStatSchema } from "@/schemas/heroStat.schema";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const heroStats = await HeroStat.find().sort({ order: 1 }).lean();
  return NextResponse.json({ heroStats });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const parsed = heroStatSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const heroStat = await HeroStat.create(parsed.data);
  return NextResponse.json({ heroStat }, { status: 201 });
}
