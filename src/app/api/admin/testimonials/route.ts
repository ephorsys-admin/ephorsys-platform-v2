import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { testimonialSchema } from "@/schemas/testimonial.schema";

async function requireAuth() { return (await getServerSession(authOptions)) ?? null; }

export async function GET() {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const testimonials = await Testimonial.find().sort({ order: 1 }).lean();
  return NextResponse.json({ testimonials });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const parsed = testimonialSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const testimonial = await Testimonial.create(parsed.data);
  return NextResponse.json({ testimonial }, { status: 201 });
}
