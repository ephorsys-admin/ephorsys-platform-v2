import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { createProjectSchema } from "@/schemas/project.schema";
import { slugify } from "@/lib/utils";
import crypto from "crypto";

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

  const [projects, total] = await Promise.all([
    Project.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Project.countDocuments(),
  ]);

  return NextResponse.json({ projects, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();

  // Auto-generate slug if not provided
  if (!body.slug && body.title) body.slug = slugify(body.title);

  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // Generate UUID id
  const { technologiesInput, ...projectFields } = parsed.data;
  const projectData = {
    ...projectFields,
    id: crypto.randomUUID(),
  };

  const project = await Project.create(projectData);
  return NextResponse.json({ project }, { status: 201 });
}
