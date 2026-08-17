"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Loader2, Mail, ChevronRight, X } from "lucide-react";

type Submission = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDetails: string;
  status: string;
  createdAt: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  responded: "bg-emerald-500/10 text-[#74c316] border border-[#74c316]/20",
  closed: "bg-white/[0.04] text-white/40 border border-white/10",
};

function SubmissionDetail({
  submission,
  onClose,
  onStatusUpdate,
}: {
  submission: Submission;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
}) {
  const [status, setStatus] = useState(submission.status);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (s: string) => {
    setSaving(true);
    const res = await fetch(`/api/admin/contacts/${submission._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: s }),
    });
    if (res.ok) { setStatus(s); onStatusUpdate(submission._id, s); }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#021105]/95 border border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{submission.fullName}</h2>
            <p className="text-xs text-white/55 mt-0.5">{new Date(submission.createdAt).toLocaleDateString()}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Email Address", value: submission.email },
              { label: "Phone Connection", value: submission.phone },
              { label: "Selected Service", value: submission.service },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-widest text-[#74c316] font-bold">{label}</p>
                <p className="text-xs font-semibold text-white/90 mt-1 truncate">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-[#74c316] font-bold">Project Requirements</p>
            <p className="text-xs text-white/85 leading-relaxed whitespace-pre-wrap bg-black/40 border border-white/5 rounded-xl p-4 max-h-48 overflow-y-auto">
              {submission.projectDetails}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[#74c316] font-bold">Update Lead State</p>
            <div className="flex gap-2">
              {["new", "responded", "closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={saving}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                    status === s ? STATUS_COLORS[s] : "bg-white/[0.02] border border-white/5 text-white/40 hover:bg-white/[0.05] hover:text-white"
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

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/contacts?${params}`);
    const data = await res.json();
    setSubmissions(data.submissions ?? []);
    setTotal(data.total ?? 0);
    setPages(data.pages ?? 1);
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => { fetchSubmissions(); }, [fetchSubmissions]);

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission permanently?")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    fetchSubmissions();
  };

  const handleStatusUpdate = (id: string, status: string) => {
    setSubmissions((prev) => prev.map((s) => (s._id === id ? { ...s, status } : s)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Inbox Leads
          </h1>
          <p className="text-xs text-white/45 mt-1 font-medium">{total} total contact inquiries logged</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-xl bg-black/40 border border-white/10 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#74c316] transition-all duration-300 [&>option]:bg-[#021105]"
        >
          <option value="">All Statuses</option>
          {["new", "responded", "closed"].map((s) => (
            <option key={s} value={s}>{s.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-[#74c316]" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
            <Mail className="w-9 h-9 mx-auto mb-3 text-white/20" />
            <p className="text-sm text-white/30 font-medium">Inquiry queue currently empty.</p>
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-[#74c316]/20 hover:scale-[1.005] hover:bg-white/[0.03] transition-all duration-300 cursor-pointer group"
              onClick={() => setSelected(sub)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-white text-base tracking-tight">{sub.fullName}</h3>
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${STATUS_COLORS[sub.status]}`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-white/40 font-medium tracking-wide">
                  {sub.email} · {sub.service} · {new Date(sub.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); deleteSubmission(sub._id); }}
                  className="p-3 text-white/40 hover:text-red-400 transition-all duration-300 bg-white/[0.02] border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8 select-none">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-white/10 text-white/70 hover:bg-white/[0.02] disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
          >
            Previous
          </button>
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Page {page} of {pages}</span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-white/10 text-white/70 hover:bg-white/[0.02] disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}

      {selected && (
        <SubmissionDetail
          submission={selected}
          onClose={() => setSelected(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
