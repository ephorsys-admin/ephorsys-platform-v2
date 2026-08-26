import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Stat from "@/models/Stat";

export async function GET() {
  try {
    await connectDB();
    const stats = await Stat.find().sort({ order: 1 }).lean();
    return NextResponse.json({ stats });
  } catch {
    return NextResponse.json({ stats: [] }, { status: 200 });
  }
}
