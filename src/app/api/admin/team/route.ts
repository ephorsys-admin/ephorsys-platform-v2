import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { teamMemberSchema } from "@/schemas/team.schema";

async function requireAuth() {
  return (await getServerSession(authOptions)) ?? null;
}

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const members = await TeamMember.find().sort({ order: 1 }).lean();
  return NextResponse.json({ members });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const parsed = teamMemberSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const member = await TeamMember.create(parsed.data);
  return NextResponse.json({ member }, { status: 201 });
}
