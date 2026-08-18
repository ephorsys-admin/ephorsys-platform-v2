"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Eye, Loader2, FolderGit, Check, X, Star } from "lucide-react";

type Project = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  category: "web_dev" | "app_dev" | "seo" | "marketing" | "branding";
  clientName: string;
  tagline: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
};

export default function AdminPortfolioPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects?page=${page}`);
      const data = await res.json();
      setProjects(data.projects ?? []);
      setPages(data.pages ?? 1);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project case study permanently?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublish = async (project: Project) => {
    const updatedStatus = !project.isPublished;
    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: updatedStatus }),
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (project: Project) => {
    const updatedStatus = !project.isFeatured;
    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: updatedStatus }),
      });
      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "web_dev":
        return "Web Dev";
      case "app_dev":
        return "App Dev";
      case "seo":
        return "SEO";
      case "marketing":
        return "Marketing";
      case "branding":
        return "Branding";
      default:
        return cat;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Case Studies Log
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">{total} projects configured total</p>
        </div>
        <button
          onClick={() => router.push("/admin/portfolio/new")}
          className="flex items-center gap-2 bg-[#74c316] hover:bg-[#62a611] text-[#021004] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Create Project
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-[#74c316]" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
            <FolderGit className="w-9 h-9 mx-auto mb-3 text-gray-350" />
            <p className="text-sm text-gray-400 font-medium">No projects added yet.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-gray-200/60 rounded-2xl p-6 flex items-center justify-between gap-6 shadow-sm hover:border-[#74c316]/30 transition-all duration-300 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-base truncate tracking-tight">{project.title}</h3>
                  <span className="shrink-0 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border bg-gray-50 text-gray-550 border-gray-200">
                    {getCategoryLabel(project.category)}
                  </span>
                  {project.isFeatured && (
                    <span className="shrink-0 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-700" />
                      Featured
                    </span>
                  )}
                  <span
                    className={`shrink-0 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                      project.isPublished
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-150 text-gray-550 border-gray-200"
                    }`}
                  >
                    {project.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-gray-550 font-medium tracking-wide">
                  /{project.slug} · Client: <strong className="text-gray-700">{project.clientName}</strong> · Tagline: "{project.tagline}"
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Feature Toggle */}
                <button
                  onClick={() => toggleFeatured(project)}
                  title={project.isFeatured ? "Remove from Featured" : "Feature Project"}
                  className={`p-3 rounded-xl transition-all duration-300 bg-gray-50 border border-gray-200 ${
                    project.isFeatured
                      ? "text-amber-500 hover:bg-amber-50"
                      : "text-gray-400 hover:text-amber-500 hover:bg-gray-100"
                  }`}
                >
                  <Star className={`w-4 h-4 ${project.isFeatured ? "fill-amber-500" : ""}`} />
                </button>
                {/* Publish Toggle */}
                <button
                  onClick={() => togglePublish(project)}
                  title={project.isPublished ? "Unpublish Project" : "Publish Project"}
                  className={`p-3 rounded-xl transition-all duration-300 bg-gray-50 border border-gray-200 ${
                    project.isPublished
                      ? "text-[#74c316] hover:bg-emerald-50"
                      : "text-gray-400 hover:text-[#74c316] hover:bg-gray-100"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
                {/* Edit Button */}
                <button
                  onClick={() => router.push(`/admin/portfolio/${project._id}`)}
                  className="p-3 text-gray-400 hover:text-[#74c316] transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => deleteProject(project._id)}
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
    </div>
  );
}
