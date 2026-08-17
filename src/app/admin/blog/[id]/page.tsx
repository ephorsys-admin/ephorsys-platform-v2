"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema, type CreateBlogInput } from "@/schemas/blog.schema";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

// Shared blog form used for both /admin/blog/new and /admin/blog/[id]
export default function BlogEditorPage() {
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
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      status: "draft",
      readTime: "5 min read",
      author: { name: "", profileImage: "", role: "" },
    },
  });

  const title = watch("title");

  // Auto-fill slug from title (only for new posts and only if slug not manually edited)
  useEffect(() => {
    if (isNew && title) {
      setValue("slug", slugify(title));
    }
  }, [title, isNew, setValue]);

  // Load existing blog for editing
  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await fetch(`/api/admin/blogs/${id}`);
      const data = await res.json();
      if (data.blog) {
        const b = data.blog;
        setValue("title", b.title);
        setValue("slug", b.slug);
        setValue("shortDescription", b.shortDescription);
        setValue("content", b.content);
        setValue("featuredImage", b.featuredImage);
        setValue("category", b.category);
        setValue("subcategory", b.subcategory ?? "");
        setValue("readTime", b.readTime);
        setValue("status", b.status);
        setValue("author.name", b.author.name);
        setValue("author.profileImage", b.author.profileImage);
        setValue("author.role", b.author.role);
      }
      setLoading(false);
    })();
  }, [id, isNew, setValue]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    const url = isNew ? "/api/admin/blogs" : `/api/admin/blogs/${id}`;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const err = await res.json();
      alert(JSON.stringify(err.error));
    }
    setSaving(false);
  };

  const inputCls = "w-full rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";
  const labelCls = "text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5";
  const errCls = "text-xs text-red-400 mt-1";

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
          onClick={() => router.push("/admin/blog")}
          className="p-3 text-white/40 hover:text-white rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
          {isNew ? "Create Article" : "Edit Article"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-5">
          <h2 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-syne)" }}>Post Details</h2>

          <div>
            <label className={labelCls}>Title *</label>
            <input {...register("title")} placeholder="Blog post title" className={inputCls} />
            {errors.title && <p className={errCls}>{errors.title.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelCls}>Slug *</label>
            <input {...register("slug")} placeholder="url-friendly-slug" className={inputCls} />
            {errors.slug && <p className={errCls}>{errors.slug.message?.toString()}</p>}
          </div>

          <div>
            <label className={labelCls}>Short Description *</label>
            <textarea
              {...register("shortDescription")}
              rows={2}
              placeholder="A short teaser shown in blog cards..."
              className={inputCls}
            />
            {errors.shortDescription && <p className={errCls}>{errors.shortDescription.message?.toString()}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <input {...register("category")} placeholder="e.g. Web Development" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Subcategory</label>
              <input {...register("subcategory")} placeholder="Optional" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Read Time</label>
              <input {...register("readTime")} placeholder="5 min read" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Featured Image URL</label>
            <ImageUpload
              value={watch("featuredImage")}
              onChange={(url) => setValue("featuredImage", url)}
              placeholder="https://..."
              folder="blogs"
            />
          </div>

          <div>
            <label className={labelCls}>Content *</label>
            <textarea
              {...register("content")}
              rows={16}
              placeholder="Write your full blog post content here..."
              className={`${inputCls} font-mono text-xs`}
            />
            {errors.content && <p className={errCls}>{errors.content.message?.toString()}</p>}
          </div>
        </div>

        {/* Author */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-4">
          <h2 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-syne)" }}>Author</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Name *</label>
              <input {...register("author.name")} placeholder="Author name" className={inputCls} />
              {(errors as any).author?.name && <p className={errCls}>{(errors as any).author.name.message?.toString()}</p>}
            </div>
            <div>
              <label className={labelCls}>Role</label>
              <input {...register("author.role")} placeholder="e.g. Full Stack Engineer" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Profile Image URL</label>
              <ImageUpload
                value={watch("author.profileImage")}
                onChange={(url) => setValue("author.profileImage", url)}
                placeholder="https://..."
                folder="authors"
              />
            </div>
          </div>
        </div>

        {/* Publish */}
        <div className="bg-[#021105]/80 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-sm flex items-center justify-between gap-4 flex-wrap">
          <div>
            <select {...register("status")} className={`${inputCls} w-40 [&>option]:bg-[#021105]`}>
              <option value="draft">Draft Mode</option>
              <option value="published">Publish Live</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/blog")}
              className="px-5 py-3 border border-white/10 rounded-xl text-xs font-bold text-white/70 hover:bg-white/[0.02] hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#74c316] hover:bg-[#85e219] text-[#021004] font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(116,195,22,0.2)]"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />}
              {isNew ? "Create Post" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
