import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { folder = "ephorsys", public_id } = body;

  // Allow unauthenticated signature generation ONLY for the "resumes" folder
  if (folder !== "resumes") {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder,
  };
  if (public_id) paramsToSign.public_id = public_id;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    signature,
    timestamp,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    folder,
  });
}
