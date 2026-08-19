import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query: Record<string, unknown> = {};
    if (category === "leader" || category === "core" || category === "core-developer" || category === "core-digital-marketing" || category === "core-business-development-executive") {
      query.category = category;
    }

    const members = await TeamMember.find(query).sort({ order: 1 }).lean();
    return NextResponse.json({ members });
  } catch {
    return NextResponse.json({ members: [] }, { status: 200 });
  }
}
