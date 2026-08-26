import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ClientLogo from "@/models/ClientLogo";

export async function GET() {
  try {
    await connectDB();
    const logos = await ClientLogo.find().sort({ order: 1 }).lean();
    return NextResponse.json({ logos });
  } catch {
    return NextResponse.json({ logos: [] }, { status: 200 });
  }
}
