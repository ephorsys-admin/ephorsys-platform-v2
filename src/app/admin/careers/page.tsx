"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobSchema, type CreateJobInput } from "@/schemas/job.schema";
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronDown, X, Loader2, Download, ExternalLink } from "lucide-react";
import { useAdminUiStore } from "@/store/adminUiStore";

// ─── Types ────────────────────────────────────────────────────────────────────
type Job = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  employmentMode: string;
  isActive: boolean;
  postedAt: string;
  description: string;
  responsibilities: string[];
  experienceRequired: string;
};

type Application = {
  _id: string;
  jobTitleSnapshot: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  linkedIn?: string;
  portfolio?: string;
  experience: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  reviewed: "bg-amber-50 text-amber-700 border-amber-200",
  shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// ─── Job Form Modal ───────────────────────────────────────────────────────────
function JobFormModal({
  job,
  onClose,
  onSaved,
}: {
  job: Job | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    job?.responsibilities?.join("\n") ?? ""
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(createJobSchema),
    defaultValues: job
      ? {
          title: job.title,
          department: job.department,
          location: job.location,
          employmentMode: job.employmentMode,
          type: job.type,
          description: job.description,
          responsibilities: job.responsibilities,
          experienceRequired: job.experienceRequired,
          isActive: job.isActive,
        }
      : { isActive: true, type: "full-time", employmentMode: "onsite" },
  });

  const onSubmit = async (data: any) => {
    data.responsibilities = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const url = job ? `/api/admin/jobs/${job._id}` : "/api/admin/jobs";
    const method = job ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      onSaved();
      onClose();
    }
  };

  const inputCls = "w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";
  const errCls = "text-xs text-red-500 mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-gray-900">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-black text-[#042407]" style={{ fontFamily: "var(--font-syne)" }}>{job ? "Edit Posting" : "New Position"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Title *</label>
              <input {...register("title")} placeholder="e.g. Frontend Engineer" className={inputCls} />
              {errors.title && <p className={errCls}>{errors.title.message?.toString()}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Department *</label>
              <input {...register("department")} placeholder="e.g. Engineering" className={inputCls} />
              {errors.department && <p className={errCls}>{errors.department.message?.toString()}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Location *</label>
              <input {...register("location")} placeholder="e.g. Bhubaneswar" className={inputCls} />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Type *</label>
              <select {...register("type")} className={`${inputCls} [&>option]:bg-white`}>
                <option value="full-time">Full-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Mode *</label>
              <select {...register("employmentMode")} className={`${inputCls} [&>option]:bg-white`}>
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Experience Required</label>
            <input {...register("experienceRequired")} placeholder="e.g. 2+ years" className={inputCls} />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Description *</label>
            <textarea {...register("description")} rows={4} placeholder="Job description..." className={inputCls} />
            {errors.description && <p className={errCls}>{errors.description.message?.toString()}</p>}
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">
              Responsibilities (one per line)
            </label>
            <textarea
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              rows={4}
              placeholder="Build React components&#10;Write unit tests&#10;Code reviews"
              className={inputCls}
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" {...register("isActive")} className="w-4 h-4 rounded accent-[#74c316]" />
            <span className="text-xs font-semibold text-gray-700">Active (visible on public site)</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 rounded-xl py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#74c316] hover:bg-[#62a611] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin text-[#021004]" /> : null}
              {job ? "Save Changes" : "Publish Posting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Application Detail Modal ─────────────────────────────────────────────────
function ApplicationDetailModal({
  application,
  onClose,
  onStatusUpdate,
}: {
  application: Application;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
}) {
  const [status, setStatus] = useState(application.status);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    const res = await fetch(`/api/admin/applications/${application._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setStatus(newStatus);
      onStatusUpdate(application._id, newStatus);
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-gray-900">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>{application.applicantName}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{application.jobTitleSnapshot}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Email Address", value: application.email },
              { label: "Phone Connection", value: application.phone },
              { label: "Experience Level", value: `${application.experience} years` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 border border-gray-200/80 rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-widest text-[#42720e] font-bold">{label}</p>
                <p className="text-xs font-semibold text-gray-900 mt-1 truncate">{value}</p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#74c316] hover:bg-[#62a611] text-[#021004] text-xs font-black px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </a>
            {application.linkedIn && (
              <a
                href={application.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                LinkedIn Profile
              </a>
            )}
            {application.portfolio && (
              <a
                href={application.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                Portfolio Link
              </a>
            )}
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-[#42720e] font-bold">Cover Letter</p>
              <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
                {application.coverLetter}
              </p>
            </div>
          )}

          {/* Status */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[#42720e] font-bold">Application Status Flow</p>
            <div className="flex flex-wrap gap-2">
              {["new", "reviewed", "shortlisted", "rejected", "hired"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={saving}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                    status === s
                      ? STATUS_COLORS[s]
                      : "bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CareersAdminPage() {
  const { activeTab, setActiveTab } = useAdminUiStore();
  const tab = activeTab["careers"] ?? "jobs";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [appTotal, setAppTotal] = useState(0);
  const [appPage, setAppPage] = useState(1);
  const [appPages, setAppPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [editJob, setEditJob] = useState<Job | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/jobs");
    const data = await res.json();
    setJobs(data.jobs ?? []);
    setLoading(false);
  }, []);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(appPage) });
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/applications?${params}`);
    const data = await res.json();
    setApplications(data.applications ?? []);
    setAppTotal(data.total ?? 0);
    setAppPages(data.pages ?? 1);
    setLoading(false);
  }, [appPage, statusFilter]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);
  useEffect(() => { if (tab === "applications") fetchApplications(); }, [tab, fetchApplications]);

  const toggleJobActive = async (job: Job) => {
    await fetch(`/api/admin/jobs/${job._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !job.isActive }),
    });
    fetchJobs();
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Deactivate this job? It will be hidden from the public site.")) return;
    await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
  };

  const handleStatusUpdate = (id: string, status: string) => {
    setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Careers Registry
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">Manage open positions and view incoming applicant dossiers.</p>
        </div>
        {tab === "jobs" && (
          <button
            onClick={() => { setEditJob(null); setShowJobForm(true); }}
            className="flex items-center gap-2 bg-[#74c316] hover:bg-[#62a611] text-[#021004] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Post Position
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-gray-100/85 border border-gray-200/60 rounded-2xl p-1.5 mb-8 w-fit shadow-inner">
        {["jobs", "applications"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab("careers", t)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              tab === t
                ? "bg-[#74c316]/10 text-[#42720e] border border-[#74c316]/25 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── JOBS TAB ── */}
      {tab === "jobs" && (
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-7 h-7 animate-spin text-[#74c316]" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
              <p className="text-sm text-gray-400 font-medium">No postings configured. Create your first position listing above.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-200/60 rounded-2xl p-6 flex items-center justify-between gap-6 shadow-sm hover:border-[#74c316]/30 transition-all duration-300 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-base truncate tracking-tight">{job.title}</h3>
                    <span className="shrink-0 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg bg-gray-105 border border-gray-200 text-gray-650">
                      {job.type}
                    </span>
                    {!job.isActive && (
                      <span className="shrink-0 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {job.department} · {job.location} · {job.employmentMode}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => toggleJobActive(job)}
                    title={job.isActive ? "Deactivate" : "Activate"}
                    className="p-3 text-gray-400 hover:text-[#74c316] transition-colors rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  >
                    {job.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { setEditJob(job); setShowJobForm(true); }}
                    className="p-3 text-gray-400 hover:text-[#74c316] transition-colors rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="p-3 text-gray-400 hover:text-red-500 transition-colors rounded-xl bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── APPLICATIONS TAB ── */}
      {tab === "applications" && (
        <div>
          {/* Filter */}
          <div className="flex items-center justify-between gap-4 mb-6 select-none bg-white border border-gray-200/60 rounded-2xl p-4 shadow-sm">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setAppPage(1); }}
              className="rounded-xl bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#74c316] transition-all duration-300 [&>option]:bg-white"
            >
              <option value="">All Statuses</option>
              {["new", "reviewed", "shortlisted", "rejected", "hired"].map((s) => (
                <option key={s} value={s}>{s.toUpperCase()}</option>
              ))}
            </select>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{appTotal} dossiers loaded</span>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-7 h-7 animate-spin text-[#74c316]" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
                <p className="text-sm text-gray-400 font-medium">No application dossiers matching active query filters.</p>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app._id}
                  onClick={() => setSelectedApp(app)}
                  className="bg-white border border-gray-200/60 rounded-2xl p-6 flex items-center justify-between gap-6 shadow-sm hover:border-[#74c316]/30 hover:scale-[1.005] hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-gray-950 text-base tracking-tight">{app.applicantName}</h3>
                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      {app.jobTitleSnapshot} · {app.email} · {app.experience} years experience
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-400 shrink-0">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {appPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8 select-none">
              <button
                disabled={appPage <= 1}
                onClick={() => setAppPage((p) => p - 1)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
              >
                Previous
              </button>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Page {appPage} of {appPages}</span>
              <button
                disabled={appPage >= appPages}
                onClick={() => setAppPage((p) => p + 1)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {showJobForm && (
        <JobFormModal
          job={editJob}
          onClose={() => setShowJobForm(false)}
          onSaved={fetchJobs}
        />
      )}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
