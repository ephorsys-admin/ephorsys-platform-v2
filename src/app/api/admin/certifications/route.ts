import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";
import { certificationSchema } from "@/schemas/certification.schema";

async function requireAuth() {
  return (await getServerSession(authOptions)) ?? null;
}

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const certifications = await Certification.find().sort({ order: 1 }).lean();
  return NextResponse.json({ certifications });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json();
  const parsed = certificationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const certification = await Certification.create(parsed.data);
  return NextResponse.json({ certification }, { status: 201 });
}
