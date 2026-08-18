"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplicationSchema, type CreateApplicationInput } from "@/schemas/application.schema";
import { X, Loader2, Upload, CheckCircle2 } from "lucide-react";

interface ApplyModalProps {
  jobId: string;
  jobTitle: string;
  onClose: () => void;
}

export default function ApplyModal({ jobId, jobTitle, onClose }: ApplyModalProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(createApplicationSchema),
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    // 1. Get signature
    const signRes = await fetch("/api/upload/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder: "resumes" }),
    });

    if (!signRes.ok) throw new Error("Failed to get upload signature");
    const signData = await signRes.json();

    // 2. Upload to Cloudinary
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

    if (!uploadRes.ok) throw new Error("Failed to upload file to Cloudinary");
    const uploadData = await uploadRes.json();
    return uploadData.secure_url;
  };

  const onSubmit = async (data: CreateApplicationInput) => {
    setStatus("uploading");
    setErrorMessage("");

    try {
      const file = data.resumeFile?.[0];
      if (!file) {
        setErrorMessage("Please select a resume file");
        setStatus("error");
        return;
      }

      // Upload file to Cloudinary
      const resumeUrl = await uploadToCloudinary(file);

      setStatus("submitting");

      // Submit application details to API
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName: data.applicantName,
          email: data.email,
          phone: data.phone,
          experience: data.experience,
          coverLetter: data.coverLetter || "",
          linkedIn: data.linkedIn || "",
          portfolio: data.portfolio || "",
          resumeUrl,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit application");
      }

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-2 focus:ring-[#74c316]/20 transition-all";
  const labelCls = "text-[11px] font-bold uppercase tracking-widest text-gray-500 block mb-1";
  const errCls = "text-xs text-red-500 mt-1";

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl relative">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-200 mx-auto">
            <CheckCircle2 className="h-8 w-8 text-green-500" strokeWidth={1.8} />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-sm text-gray-500 mb-6">
            Thank you for applying to the {jobTitle} position. We will review your application soon.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#74c316] text-[#042407] font-bold py-2.5 rounded-xl hover:bg-[#62a611] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg my-8 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-[#042407]">Apply for Position</h2>
            <p className="text-xs text-gray-500 mt-0.5">{jobTitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pt-3 pb-6 space-y-3 flex-1 overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Name *</label>
              <input
                {...register("applicantName")}
                placeholder="Your name"
                className={inputCls}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^a-zA-Z\s]/g, "")
                    .replace(/\s{2,}/g, " ");

                  setValue("applicantName", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />

              {errors.applicantName && (
                <p className={errCls}>
                  {errors.applicantName.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input type="email" {...register("email")} placeholder="your@email.com" className={inputCls} />
              {errors.email && <p className={errCls}>{errors.email.message?.toString()}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Phone *</label>
              <input
                {...register("phone")}
                placeholder="10-digit number"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setValue("phone", val);
                }}
                className={inputCls}
              />
              {errors.phone && <p className={errCls}>{errors.phone.message?.toString()}</p>}
            </div>
            <div>
              <label className={labelCls}>Experience *</label>
              <select {...register("experience")} className={inputCls}>
                <option value="0-1">0-1 Years</option>
                <option value="2-3">2-3 Years</option>
                <option value="4-5">4-5 Years</option>
                <option value="5+">5+ Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Resume File * (PDF, DOCX)</label>
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              {...register("resumeFile")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("resumeUrl", "selected"); // dummy value to satisfy validation
                }
              }}
              className={`${inputCls} file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer`}
            />
            {errors.resumeUrl && <p className={errCls}>{errors.resumeUrl.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelCls}>Cover Letter</label>
            <textarea
              {...register("coverLetter")}
              rows={3}
              placeholder="Tell us why you are a good fit..."
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>LinkedIn URL</label>
              <input {...register("linkedIn")} placeholder="https://..." className={inputCls} />
              {errors.linkedIn && <p className={errCls}>{errors.linkedIn.message?.toString()}</p>}
            </div>
            <div>
              <label className={labelCls}>Portfolio URL</label>
              <input {...register("portfolio")} placeholder="https://..." className={inputCls} />
              {errors.portfolio && <p className={errCls}>{errors.portfolio.message?.toString()}</p>}
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl px-3.5 py-2.5 border border-red-100">
              {errorMessage}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={status === "uploading" || status === "submitting"}
              className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "uploading" || status === "submitting"}
              className="flex-1 bg-[#74c316] text-[#042407] rounded-xl py-2.5 text-sm font-bold hover:bg-[#62a611] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {(status === "uploading" || status === "submitting") && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {status === "uploading"
                ? "Uploading Resume..."
                : status === "submitting"
                  ? "Submitting..."
                  : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
