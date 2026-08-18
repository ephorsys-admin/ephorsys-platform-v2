import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isFeatured = searchParams.get("featured");

    const query: Record<string, unknown> = { isPublished: true };
    if (category) query.category = category;
    if (isFeatured === "true") query.isFeatured = true;

    const projects = await Project.find(query).sort({ isFeatured: -1, startDate: -1 }).lean();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ projects: [] }, { status: 200 });
  }
}
