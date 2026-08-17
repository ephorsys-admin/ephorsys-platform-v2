import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import ClientLogo from "@/models/ClientLogo";
import { clientLogoSchema } from "@/schemas/clientLogo.schema";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const logos = await ClientLogo.find().sort({ order: 1 }).lean();
  return NextResponse.json({ logos });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const parsed = clientLogoSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const logo = await ClientLogo.create(parsed.data);
  return NextResponse.json({ logo }, { status: 201 });
}
