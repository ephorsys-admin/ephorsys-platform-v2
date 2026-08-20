import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import ConsultancySubmission from "@/models/ConsultancySubmission";

async function requireAuth() {
  return (await getServerSession(authOptions)) ?? null;
}

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = 20;

  const query: Record<string, unknown> = {};
  if (status) query.status = status;

  const [submissions, total] = await Promise.all([
    ConsultancySubmission.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    ConsultancySubmission.countDocuments(query),
  ]);

  return NextResponse.json({ submissions, total, page, pages: Math.ceil(total / limit) });
}
