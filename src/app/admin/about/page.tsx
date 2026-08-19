"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { heroStatSchema } from "@/schemas/heroStat.schema";
import { certificationSchema } from "@/schemas/certification.schema";
import ImageUpload from "@/components/admin/ImageUpload";

// ─── About Stat Modal ─────────────────────────────────────────────────────────
function AboutStatModal({ item, onClose, onSaved }: { item: any | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<any>({
    resolver: zodResolver(heroStatSchema),
    defaultValues: item ?? { value: "", label: "", order: 0 },
  });
  const inputCls = "w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-450 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";
  const labelCls = "text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5";

  const onSubmit = async (data: any) => {
    const url = item?._id ? `/api/admin/hero-stats/${item._id}` : "/api/admin/hero-stats";
    const res = await fetch(url, { method: item?._id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) {
      toast.success("About Stat saved!");
      onSaved(); onClose();
    } else {
      toast.error("Failed to save stat. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-2xl text-gray-900">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>Edit About Stat</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div><label className={labelCls}>Value * (e.g. "13+" or "100%")</label><input {...register("value")} className={inputCls} /></div>
          <div><label className={labelCls}>Label *</label><input {...register("label")} placeholder="Projects Shipped" className={inputCls} /></div>
          <input type="hidden" {...register("order", { valueAsNumber: true })} />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#62a611] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />} Save Stat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Certification Modal ──────────────────────────────────────────────────────
function CertificationModal({ item, onClose, onSaved }: { item: any | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<any>({
    resolver: zodResolver(certificationSchema),
    defaultValues: item ?? { name: "", imageUrl: "", order: 0 },
  });
  const inputCls = "w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-450 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";
  const labelCls = "text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5";

  const onSubmit = async (data: any) => {
    const url = item?._id ? `/api/admin/certifications/${item._id}` : "/api/admin/certifications";
    const res = await fetch(url, {
      method: item?._id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Certification saved!");
      onSaved(); onClose();
    } else {
      toast.error("Failed to save certification. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl text-gray-900">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
            {item ? "Edit Certification" : "Add Certification"}
          </h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className={labelCls}>Name *</label>
            <input {...register("name")} placeholder="e.g. Startup India" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Order</label>
            <input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Certification Logo *</label>
            <ImageUpload
              value={watch("imageUrl")}
              onChange={(url) => setValue("imageUrl", url)}
              folder="certifications"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#62a611] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />} Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminAboutPage() {
  const [tab, setTab] = useState("stats");
  const [aboutStats, setAboutStats] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [editAboutStat, setEditAboutStat] = useState<any | null>(null);
  const [showAboutStatModal, setShowAboutStatModal] = useState(false);

  const [editCertification, setEditCertification] = useState<any | null>(null);
  const [showCertificationModal, setShowCertificationModal] = useState(false);

  const fetchAboutStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/hero-stats");
      const data = await res.json();
      setAboutStats(data.heroStats ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certifications");
      const data = await res.json();
      setCertifications(data.certifications ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "stats") {
      fetchAboutStats();
    } else if (tab === "certifications") {
      fetchCertifications();
    }
  }, [tab, fetchAboutStats, fetchCertifications]);

  const handleDeleteCertification = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete certification "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/certifications/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Certification deleted successfully!");
        fetchCertifications();
      } else {
        toast.error("Failed to delete certification.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error occurred while deleting.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>About Settings</h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">Control the public about page story stats and certification logos.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-gray-100/85 border border-gray-200/60 rounded-2xl p-1.5 mb-8 w-fit shadow-inner">
        {[
          { key: "stats", label: "Story Stats" },
          { key: "certifications", label: "Certifications" }
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              tab === key
                ? "bg-white text-[#42720e] border border-gray-200/40 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* About Stats Tab */}
      {tab === "stats" && (
        loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-[#74c316]" /></div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-[#42720e] uppercase tracking-widest mb-6">About Page Story Counter Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat 1: Projects Shipped (order -11) */}
                {(() => {
                  const item = aboutStats.find((s) => s.order === -11) || {
                    value: "13+",
                    label: "Projects Shipped",
                    order: -11,
                  };
                  return (
                    <div className="bg-white border border-gray-200/60 rounded-xl p-5 flex flex-col justify-between min-h-[160px] shadow-sm hover:border-[#74c316]/30 transition-all">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">Projects Shipped</span>
                        <div className="mt-4">
                          <p className="text-3xl font-black text-[#74c316]">{item.value}</p>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{item.label}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => {
                            setEditAboutStat(item);
                            setShowAboutStatModal(true);
                          }}
                          className="flex items-center gap-2 bg-[#74c316]/10 hover:bg-[#74c316]/20 text-[#42720e] font-black text-xs px-4 py-2 rounded-xl transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Stat 2: Happy Clients (order -12) */}
                {(() => {
                  const item = aboutStats.find((s) => s.order === -12) || {
                    value: "10+",
                    label: "Happy Clients",
                    order: -12,
                  };
                  return (
                    <div className="bg-white border border-gray-200/60 rounded-xl p-5 flex flex-col justify-between min-h-[160px] shadow-sm hover:border-[#74c316]/30 transition-all">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">Happy Clients</span>
                        <div className="mt-4">
                          <p className="text-3xl font-black text-[#74c316]">{item.value}</p>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{item.label}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => {
                            setEditAboutStat(item);
                            setShowAboutStatModal(true);
                          }}
                          className="flex items-center gap-2 bg-[#74c316]/10 hover:bg-[#74c316]/20 text-[#42720e] font-black text-xs px-4 py-2 rounded-xl transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Stat 3: On-Time Delivery (order -13) */}
                {(() => {
                  const item = aboutStats.find((s) => s.order === -13) || {
                    value: "100%",
                    label: "On-Time Delivery",
                    order: -13,
                  };
                  return (
                    <div className="bg-white border border-gray-200/60 rounded-xl p-5 flex flex-col justify-between min-h-[160px] shadow-sm hover:border-[#74c316]/30 transition-all">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">On-Time Delivery</span>
                        <div className="mt-4">
                          <p className="text-3xl font-black text-[#74c316]">{item.value}</p>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{item.label}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => {
                            setEditAboutStat(item);
                            setShowAboutStatModal(true);
                          }}
                          className="flex items-center gap-2 bg-[#74c316]/10 hover:bg-[#74c316]/20 text-[#42720e] font-black text-xs px-4 py-2 rounded-xl transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Stat 4: Repeat Client Rate (order -14) */}
                {(() => {
                  const item = aboutStats.find((s) => s.order === -14) || {
                    value: "70%",
                    label: "Repeat Client Rate",
                    order: -14,
                  };
                  return (
                    <div className="bg-white border border-gray-200/60 rounded-xl p-5 flex flex-col justify-between min-h-[160px] shadow-sm hover:border-[#74c316]/30 transition-all">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">Repeat Client Rate</span>
                        <div className="mt-4">
                          <p className="text-3xl font-black text-[#74c316]">{item.value}</p>
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{item.label}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => {
                            setEditAboutStat(item);
                            setShowAboutStatModal(true);
                          }}
                          className="flex items-center gap-2 bg-[#74c316]/10 hover:bg-[#74c316]/20 text-[#42720e] font-black text-xs px-4 py-2 rounded-xl transition-all"
                        >
                          <Edit2 className="w-3.5 h-3.5" strokeWidth={2.5} /> Edit
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )
      )}

      {/* Certifications Tab */}
      {tab === "certifications" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-[#42720e] uppercase tracking-widest">
                Company Certification Logos
              </h3>
              <button
                onClick={() => {
                  setEditCertification(null);
                  setShowCertificationModal(true);
                }}
                className="bg-[#74c316] hover:bg-[#62a611] text-[#021004] font-black text-xs px-5 py-3 rounded-xl transition-all shadow-sm"
              >
                Add Certification
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-[#74c316]" /></div>
            ) : certifications.length === 0 ? (
              <div className="text-center py-20 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-sm text-gray-400 font-medium">No certifications uploaded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {certifications.map((cert) => (
                  <div
                    key={cert._id}
                    className="relative bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-between min-h-[140px] shadow-xs group hover:border-[#74c316]/30 transition-all duration-300"
                  >
                    <div className="w-full aspect-video flex items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 p-2">
                      <img src={cert.imageUrl} alt={cert.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-xs font-bold text-gray-700 truncate max-w-[120px]">{cert.name}</p>
                      <p className="text-[10px] text-gray-450 font-medium mt-0.5">Order: {cert.order}</p>
                    </div>
                    
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-xs group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-2 rounded-2xl">
                      <button
                        onClick={() => {
                          setEditCertification(cert);
                          setShowCertificationModal(true);
                        }}
                        className="p-2.5 bg-[#74c316] hover:bg-[#62a611] rounded-xl text-[#021004] transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCertification(cert._id, cert.name)}
                        className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showAboutStatModal && (
        <AboutStatModal
          item={editAboutStat}
          onClose={() => setShowAboutStatModal(false)}
          onSaved={fetchAboutStats}
        />
      )}

      {showCertificationModal && (
        <CertificationModal
          item={editCertification}
          onClose={() => setShowCertificationModal(false)}
          onSaved={fetchCertifications}
        />
      )}
    </div>
  );
}

import { Trash2 } from "lucide-react";
