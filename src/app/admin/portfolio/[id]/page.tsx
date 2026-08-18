"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/schemas/project.schema";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "sonner";

export default function ProjectEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      category: "web_dev",
      status: "completed",
      isFeatured: false,
      isPublished: false,
      teamSize: 1,
      testimonial: { text: "", clientName: "", clientTitle: "", clientPhoto: "" },
    },
  });

  const title = watch("title");

  // Auto-fill slug from title for new projects
  useEffect(() => {
    if (isNew && title) {
      setValue("slug", slugify(title));
    }
  }, [title, isNew, setValue]);

  // Load existing project for editing
  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        const data = await res.json();
        if (data.project) {
          const p = data.project;
          setValue("title", p.title);
          setValue("slug", p.slug);
          setValue("category", p.category);
          setValue("clientName", p.clientName);
          setValue("clientIndustry", p.clientIndustry);
          setValue("thumbnailImage", p.thumbnailImage);
          setValue("tagline", p.tagline);
          setValue("overview", p.overview);
          setValue("solution", p.solution);
          setValue("role", p.role);
          setValue("teamSize", p.teamSize);
          setValue("startDate", p.startDate ? new Date(p.startDate).toISOString().split("T")[0] : "");
          setValue("endDate", p.endDate ? new Date(p.endDate).toISOString().split("T")[0] : "");
          setValue("durationText", p.durationText);
          setValue("status", p.status);
          setValue("isFeatured", p.isFeatured ?? false);
          setValue("isPublished", p.isPublished ?? false);
          setValue("liveUrl", p.liveUrl ?? "");
          setValue("testimonial.text", p.testimonial?.text ?? "");
          setValue("testimonial.clientName", p.testimonial?.clientName ?? "");
          setValue("testimonial.clientTitle", p.testimonial?.clientTitle ?? "");
          setValue("testimonial.clientPhoto", p.testimonial?.clientPhoto ?? "");
          setValue("technologiesInput", p.technologies ? p.technologies.join(", ") : "");
        }
      } catch (err) {
        console.error("Failed to load project details:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew, setValue]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    const tags = data.technologiesInput
      ? data.technologiesInput.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];
    data.technologies = tags;
    delete data.technologiesInput;

    const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${id}`;
    const method = isNew ? "POST" : "PUT";
    
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success(isNew ? "Project case study created!" : "Project changes saved!");
        router.push("/admin/portfolio");
      } else {
        const err = await res.json();
        toast.error(err.error ? String(err.error) : "Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-405 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";
  const labelCls = "text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5";
  const errCls = "text-xs text-red-500 mt-1";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#74c316]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8 select-none">
        <button
          type="button"
          onClick={() => router.push("/admin/portfolio")}
          className="p-3 text-gray-450 hover:text-gray-900 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
          {isNew ? "Create Project Case Study" : "Edit Project Case Study"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-syne)" }}>Project Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Project Title *</label>
              <input {...register("title")} placeholder="e.g. Quantum Financial Platform" className={inputCls} />
              {errors.title && <p className={errCls}>{errors.title.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>URL Slug *</label>
              <input {...register("slug")} placeholder="e.g. quantum-financial-platform" className={inputCls} />
              {errors.slug && <p className={errCls}>{errors.slug.message?.toString()}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Tagline (One-liner summary) *</label>
            <input {...register("tagline")} placeholder="e.g. Custom TCP stack and decentralized load balancing mesh reducing overhead by 42%." className={inputCls} />
            {errors.tagline && <p className={errCls}>{errors.tagline.message?.toString()}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <select {...register("category")} className={`${inputCls} [&>option]:bg-white`}>
                <option value="web_dev">Web Development</option>
                <option value="app_dev">Mobile App Dev</option>
                <option value="seo">SEO Optimization</option>
                <option value="marketing">Digital Marketing</option>
                <option value="branding">Corporate Branding</option>
              </select>
              {errors.category && <p className={errCls}>{errors.category.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>Role Assigned *</label>
              <input {...register("role")} placeholder="e.g. Full-stack Development" className={inputCls} />
              {errors.role && <p className={errCls}>{errors.role.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>Development Team Size *</label>
              <input type="number" {...register("teamSize")} placeholder="e.g. 5" className={inputCls} />
              {errors.teamSize && <p className={errCls}>{errors.teamSize.message?.toString()}</p>}
            </div>
          </div>

          <div>
            <label className={labelCls}>Technologies Used * (Comma-separated)</label>
            <input 
              {...register("technologiesInput", { required: true })} 
              placeholder="e.g. Next.js/React, Tailwind CSS, HTML5, JavaScript, Laravel, PHP, MySQL" 
              className={inputCls} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>Start Date *</label>
              <input type="date" {...register("startDate")} className={inputCls} />
              {errors.startDate && <p className={errCls}>{errors.startDate.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>End Date *</label>
              <input type="date" {...register("endDate")} className={inputCls} />
              {errors.endDate && <p className={errCls}>{errors.endDate.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>Duration Description *</label>
              <input {...register("durationText")} placeholder="e.g. 3 months" className={inputCls} />
              {errors.durationText && <p className={errCls}>{errors.durationText.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>Current Status *</label>
              <select {...register("status")} className={`${inputCls} [&>option]:bg-white`}>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="live">Live / In-Production</option>
              </select>
              {errors.status && <p className={errCls}>{errors.status.message?.toString()}</p>}
            </div>
          </div>
        </div>

        {/* Client details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-syne)" }}>Client Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Client Name *</label>
              <input {...register("clientName")} placeholder="e.g. Vertex Finance" className={inputCls} />
              {errors.clientName && <p className={errCls}>{errors.clientName.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>Client Industry *</label>
              <input {...register("clientIndustry")} placeholder="e.g. Fintech" className={inputCls} />
              {errors.clientIndustry && <p className={errCls}>{errors.clientIndustry.message?.toString()}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Case Study Thumbnail Image *</label>
              <ImageUpload
                value={watch("thumbnailImage")}
                onChange={(url) => setValue("thumbnailImage", url)}
                folder="portfolio"
              />
              {errors.thumbnailImage && <p className={errCls}>{errors.thumbnailImage.message?.toString()}</p>}
            </div>

            <div>
              <label className={labelCls}>External Live Project Link (Optional)</label>
              <input {...register("liveUrl")} placeholder="https://..." className={inputCls} />
            </div>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-syne)" }}>Challenge & Solution</h2>

          <div>
            <label className={labelCls}>The Challenge / Overview *</label>
            <textarea
              {...register("overview")}
              rows={5}
              placeholder="Detail the problem statement or challenge faced by the client..."
              className={inputCls}
            />
            {errors.overview && <p className={errCls}>{errors.overview.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelCls}>Our Execution / Solution *</label>
            <textarea
              {...register("solution")}
              rows={5}
              placeholder="Describe the solution engineered by Ephorsys..."
              className={inputCls}
            />
            {errors.solution && <p className={errCls}>{errors.solution.message?.toString()}</p>}
          </div>
        </div>

        {/* Client Testimonial */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "var(--font-syne)" }}>Client Testimonial</h2>

          <div>
            <label className={labelCls}>Testimonial Statement</label>
            <textarea
              {...register("testimonial.text")}
              rows={3}
              placeholder="What the client said about this project's delivery..."
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Contact Person Name</label>
              <input {...register("testimonial.clientName")} placeholder="e.g. John Doe" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Contact Person Designation / Title</label>
              <input {...register("testimonial.clientTitle")} placeholder="e.g. CTO, Vertex Finance" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>Contact Person Photo</label>
              <ImageUpload
                value={watch("testimonial.clientPhoto")}
                onChange={(url) => setValue("testimonial.clientPhoto", url)}
                folder="portfolio"
              />
            </div>
          </div>
        </div>

        {/* Save & Publish Toggles */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between gap-4 flex-wrap">
       

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/portfolio")}
              className="px-5 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#74c316] hover:bg-[#62a611] text-[#021004] font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-sm"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />}
              {isNew ? "Create Case Study" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
