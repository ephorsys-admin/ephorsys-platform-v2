import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    const query: Record<string, unknown> = { status: "published" };
    if (category) query.category = category;
    if (slug) query.slug = slug;

    if (slug) {
      const blog = await Blog.findOne(query).lean();
      if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ blog });
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1 }).lean();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ blogs: [] }, { status: 200 });
  }
}
