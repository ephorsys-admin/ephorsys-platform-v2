import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import TeamMember from "@/models/TeamMember";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();

  // Body: [{ id: string, order: number }, ...]
  const body: { id: string; order: number }[] = await request.json();
  await Promise.all(
    body.map(({ id, order }) => TeamMember.findByIdAndUpdate(id, { order }))
  );
  return NextResponse.json({ message: "Reordered" });
}
