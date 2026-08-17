"use client";

import { useState } from "react";
import { Upload, Loader2, Trash2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = "general" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Restrict only to PNG, JPG, and JPEG files
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Only PNG and JPG/JPEG formats are permitted.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // 1. Fetch signature
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (!signRes.ok) throw new Error("Failed to get signature");
      const signData = await signRes.json();

      // 2. Upload to Cloudinary using /auto/upload for robustness
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.api_key);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloud_name}/auto/upload`,
        { method: "POST", body: formData }
      );

      if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
      const uploadData = await uploadRes.json();

      onChange(uploadData.secure_url);
    } catch (err: any) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {uploading ? (
        <div className="border border-white/10 bg-black/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[120px]">
          <Loader2 className="w-6 h-6 animate-spin text-[#74c316] mb-2" />
          <span className="text-xs text-white/60 font-semibold tracking-wide uppercase">Uploading to Cloudinary...</span>
        </div>
      ) : value ? (
        // Preview + Change/Remove actions
        <div className="flex items-center gap-4 bg-black/20 border border-white/5 p-4 rounded-2xl">
          <div className="relative w-16 h-16 rounded-xl border border-white/10 overflow-hidden shrink-0 bg-black/40">
            <img src={value} alt="Uploaded file" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            <label className="relative flex items-center justify-center gap-2 bg-[#74c316]/10 hover:bg-[#74c316]/20 text-[#74c316] border border-[#74c316]/20 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 select-none text-[11px] font-black uppercase tracking-wider">
              Change Image
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-xl transition-all duration-300 select-none text-[11px] font-black uppercase tracking-wider"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        // Upload trigger (dropzone styling)
        <label className="border-2 border-dashed border-white/10 hover:border-[#74c316]/30 bg-black/20 hover:bg-black/30 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[120px] select-none text-center">
          <Upload className="w-6 h-6 text-[#74c316] mb-2" />
          <span className="text-xs font-bold text-white/80">Click to upload image</span>
          <span className="text-[10px] text-white/40 mt-1 font-medium">Supports PNG, JPG, JPEG only</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
}
