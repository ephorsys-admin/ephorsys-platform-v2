"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Eye, Loader2, BookOpen } from "lucide-react";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { toast } from "sonner";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/blogs?page=${page}`);
    const data = await res.json();
    setBlogs(data.blogs ?? []);
    setPages(data.pages ?? 1);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const deleteBlog = async (id: string) => {
    const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Blog post deleted.");
      fetchBlogs();
    } else {
      toast.error("Failed to delete blog post.");
    }
    setDeleteTarget(null);
  };

  const toggleStatus = async (blog: Blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/admin/blogs/${blog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      toast.success(`Post ${newStatus === "published" ? "published" : "moved to draft"}.`);
      fetchBlogs();
    } else {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Articles Log
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">{total} posts configured total</p>
        </div>
        <button
          onClick={() => router.push("/admin/blog/new")}
          className="flex items-center gap-2 bg-[#74c316] hover:bg-[#62a611] text-[#021004] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Create Post
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-[#74c316]" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
            <BookOpen className="w-9 h-9 mx-auto mb-3 text-gray-350" />
            <p className="text-sm text-gray-400 font-medium">No blog posts drafted or published yet.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-gray-200/60 rounded-2xl p-6 flex items-center justify-between gap-6 shadow-sm hover:border-[#74c316]/30 transition-all duration-300 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-base truncate tracking-tight">{blog.title}</h3>
                  <span
                    className={`shrink-0 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                      blog.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-150 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
                <p className="text-xs text-gray-550 font-medium tracking-wide">
                  /{blog.slug} · {blog.category} ·{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleStatus(blog)}
                  title={blog.status === "published" ? "Unpublish" : "Publish"}
                  className={`p-3 rounded-xl transition-all duration-300 bg-gray-50 border border-gray-200 ${
                    blog.status === "published"
                      ? "text-[#74c316] hover:bg-emerald-50"
                      : "text-gray-400 hover:text-[#74c316] hover:bg-gray-100"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => router.push(`/admin/blog/${blog._id}`)}
                  className="p-3 text-gray-400 hover:text-[#74c316] transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget({ id: blog._id, title: blog.title })}
                  className="p-3 text-gray-400 hover:text-red-500 transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-200 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8 select-none">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
          >
            Previous
          </button>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Page {page} of {pages}</span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Blog Post"
          description={`Are you sure you want to permanently delete "${deleteTarget.title}"? This action cannot be undone.`}
          onConfirm={() => deleteBlog(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
