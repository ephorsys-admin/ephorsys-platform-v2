import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function deleteFromCloudinary(url: string, resourceType: "image" | "raw" | "video" = "image") {
  if (!url || !url.includes("cloudinary.com")) return;
  try {
    // Extract public_id: everything after /upload/v<digits>/ or /upload/ up to the last extension
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(\.[^.]+)?$/);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }
  } catch (err) {
    console.error("Cloudinary deletion failed for URL:", url, err);
  }
}

export { cloudinary };
