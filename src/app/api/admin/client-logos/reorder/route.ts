import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import ClientLogo from "@/models/ClientLogo";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body: { id: string; order: number }[] = await request.json();
  await Promise.all(body.map(({ id, order }) => ClientLogo.findByIdAndUpdate(id, { order })));
  return NextResponse.json({ message: "Reordered" });
}
