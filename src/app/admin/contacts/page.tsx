"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Loader2, Mail, ChevronRight, X } from "lucide-react";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { toast } from "sonner";

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
  new: "bg-blue-50 text-blue-700 border-blue-200",
  responded: "bg-emerald-50 text-[#42720e] border-emerald-200",
  closed: "bg-gray-100 text-gray-500 border-gray-200",
};

function SubmissionDetail({
  submission,
  onClose,
  onStatusUpdate,
  onDelete,
}: {
  submission: Submission;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string) => void;
  onDelete: (id: string, name: string) => void;
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
    if (res.ok) {
      toast.success(`Status updated to "${s}".`);
      setStatus(s); onStatusUpdate(submission._id, s);
    } else {
      toast.error("Failed to update status.");
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto text-gray-900">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>{submission.fullName}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{new Date(submission.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { onClose(); onDelete(submission._id, submission.fullName); }}
              className="p-2.5 text-gray-400 hover:text-red-500 transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-200 rounded-xl"
              title="Delete submission"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 border border-gray-200 rounded-xl">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Email Address", value: submission.email },
              { label: "Phone Connection", value: submission.phone },
              { label: "Selected Service", value: submission.service },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 border border-gray-200/80 rounded-xl p-3">
                <p className="text-[9px] uppercase tracking-widest text-[#42720e] font-bold">{label}</p>
                <p className="text-xs font-semibold text-gray-900 mt-1 truncate">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-[#42720e] font-bold">Project Requirements</p>
            <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
              {submission.projectDetails}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-[#42720e] font-bold">Update Lead State</p>
            <div className="flex gap-2">
              {["new", "responded", "closed"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={saving}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                    status === s ? STATUS_COLORS[s] : "bg-gray-50 border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

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
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Submission deleted.");
      fetchSubmissions();
    } else {
      toast.error("Failed to delete submission.");
    }
    setDeleteTarget(null);
  };

  const handleStatusUpdate = (id: string, status: string) => {
    setSubmissions((prev) => prev.map((s) => (s._id === id ? { ...s, status } : s)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Inbox Leads
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">{total} total contact inquiries logged</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-xl bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#74c316] transition-all duration-300 [&>option]:bg-white"
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
          <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
            <Mail className="w-9 h-9 mx-auto mb-3 text-gray-350" />
            <p className="text-sm text-gray-400 font-medium">Inquiry queue currently empty.</p>
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white border border-gray-200/60 rounded-2xl p-6 flex items-center justify-between gap-6 shadow-sm hover:border-[#74c316]/30 hover:scale-[1.005] hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => setSelected(sub)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-bold text-gray-950 text-base tracking-tight">{sub.fullName}</h3>
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${STATUS_COLORS[sub.status]}`}>
                    {sub.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium tracking-wide">
                  {sub.email} · {sub.service} · {new Date(sub.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                   onClick={(e) => { e.stopPropagation(); setDeleteTarget({ id: sub._id, name: sub.fullName }); }}
                  className="p-3 text-gray-400 hover:text-red-500 transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-200 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
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
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-750 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
          >
            Previous
          </button>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Page {page} of {pages}</span>
          <button
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-gray-200 text-gray-750 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-all duration-300"
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
          onDelete={(id, name) => setDeleteTarget({ id, name })}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Submission"
          description={`Are you sure you want to permanently delete the submission from "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={() => deleteSubmission(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
