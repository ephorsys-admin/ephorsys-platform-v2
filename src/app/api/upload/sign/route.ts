import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { folder = "ephorsys", public_id } = body;

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
