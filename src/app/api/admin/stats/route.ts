import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Stat from "@/models/Stat";
import { statSchema } from "@/schemas/stat.schema";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const stats = await Stat.find().sort({ order: 1 }).lean();
  return NextResponse.json({ stats });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const parsed = statSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const stat = await Stat.create(parsed.data);
  return NextResponse.json({ stat }, { status: 201 });
}
