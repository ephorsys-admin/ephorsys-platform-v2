import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { createBlogSchema } from "@/schemas/blog.schema";
import { slugify } from "@/lib/utils";

async function requireAuth() {
  return (await getServerSession(authOptions)) ?? null;
}

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = 20;

  const [blogs, total] = await Promise.all([
    Blog.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Blog.countDocuments(),
  ]);

  return NextResponse.json({ blogs, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();

  // Auto-generate slug if not provided
  if (!body.slug && body.title) body.slug = slugify(body.title);

  const parsed = createBlogSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // Set publishedAt when publishing
  if (parsed.data.status === "published" && !parsed.data.publishedAt) {
    (parsed.data as Record<string, unknown>).publishedAt = new Date().toISOString();
  }

  const blog = await Blog.create(parsed.data);
  return NextResponse.json({ blog }, { status: 201 });
}
