import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import LifeAtPhoto from "@/models/LifeAtPhoto";

export async function GET() {
  try {
    await connectDB();
    const photos = await LifeAtPhoto.find().sort({ order: 1 }).lean();
    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ photos: [] }, { status: 200 });
  }
}
