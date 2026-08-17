"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statSchema, type StatInput } from "@/schemas/stat.schema";
import { testimonialSchema, type TestimonialInput } from "@/schemas/testimonial.schema";
import { clientLogoSchema, type ClientLogoInput } from "@/schemas/clientLogo.schema";
import { useAdminUiStore } from "@/store/adminUiStore";
import { Plus, Edit2, Trash2, X, Loader2, Eye, EyeOff } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const inputCls = "w-full rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";
const labelCls = "text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5";

// ─── Stat Modal ───────────────────────────────────────────────────────────────
function StatModal({ item, onClose, onSaved }: { item: any | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<any>({
    resolver: zodResolver(statSchema),
    defaultValues: item ?? { value: "", label: "", order: 0 },
  });
  const onSubmit = async (data: any) => {
    const url = item?._id ? `/api/admin/stats/${item._id}` : "/api/admin/stats";
    const res = await fetch(url, { method: item?._id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { onSaved(); onClose(); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#021105]/95 border border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-sm shadow-2xl text-white">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{item?._id ? "Edit Stat" : "Add Stat"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-white/40 hover:text-white transition-colors" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div><label className={labelCls}>Value * (e.g. "500+" or "98%")</label><input {...register("value")} className={inputCls} /></div>
          <div><label className={labelCls}>Label *</label><input {...register("label")} placeholder="Projects Completed" className={inputCls} /></div>
          <div><label className={labelCls}>Order</label><input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/10 rounded-xl py-3 text-xs font-bold text-white/70 hover:bg-white/[0.03] hover:text-white transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#85e219] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(116,195,22,0.2)]">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />} Save Stat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TestimonialModal({ item, onClose, onSaved }: { item: any | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<any>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: item ?? { clientPhoto: "", feedbackText: "", clientName: "", isActive: true, order: 0 },
  });
  const onSubmit = async (data: any) => {
    const url = item?._id ? `/api/admin/testimonials/${item._id}` : "/api/admin/testimonials";
    const res = await fetch(url, { method: item?._id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { onSaved(); onClose(); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#021105]/95 border border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl text-white">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{item?._id ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-white/40 hover:text-white transition-colors" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div><label className={labelCls}>Client Name *</label><input {...register("clientName")} className={inputCls} /></div>
          <div><label className={labelCls}>Client Photo URL</label>
            <ImageUpload
              value={watch("clientPhoto")}
              onChange={(url) => setValue("clientPhoto", url)}
              placeholder="https://..."
              folder="testimonials"
            />
          </div>
          <div><label className={labelCls}>Feedback *</label><textarea {...register("feedbackText")} rows={4} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Order</label><input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
            <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer pb-2.5"><input type="checkbox" {...register("isActive")} className="w-4 h-4 rounded accent-[#74c316]" /><span className="text-xs font-semibold text-white/75">Active</span></label></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/10 rounded-xl py-3 text-xs font-bold text-white/70 hover:bg-white/[0.03] hover:text-white transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#85e219] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(116,195,22,0.2)]">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />} Save Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Client Logo Modal ────────────────────────────────────────────────────────
function LogoModal({ item, onClose, onSaved }: { item: any | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<any>({
    resolver: zodResolver(clientLogoSchema),
    defaultValues: item ?? { logoImage: "", clientName: "", order: 0 },
  });
  const onSubmit = async (data: any) => {
    const url = item?._id ? `/api/admin/client-logos/${item._id}` : "/api/admin/client-logos";
    const res = await fetch(url, { method: item?._id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { onSaved(); onClose(); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#021105]/95 border border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-sm shadow-2xl text-white">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{item?._id ? "Edit Logo" : "Add Client Logo"}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-white/40 hover:text-white transition-colors" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div><label className={labelCls}>Logo Image URL *</label>
            <ImageUpload
              value={watch("logoImage")}
              onChange={(url) => setValue("logoImage", url)}
              placeholder="https://..."
              folder="client-logos"
            />
          </div>
          <div><label className={labelCls}>Client Name * (for alt text)</label><input {...register("clientName")} className={inputCls} /></div>
          <div><label className={labelCls}>Order</label><input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/10 rounded-xl py-3 text-xs font-bold text-white/70 hover:bg-white/[0.03] hover:text-white transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#85e219] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(116,195,22,0.2)]">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />} Save Logo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminHomePage() {
  const { activeTab, setActiveTab } = useAdminUiStore();
  const tab = activeTab["home"] ?? "stats";

  type StatItem = StatInput & { _id: string };
  type TestimonialItem = TestimonialInput & { _id: string };
  type LogoItem = ClientLogoInput & { _id: string };

  const [stats, setStats] = useState<StatItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [editStat, setEditStat] = useState<StatItem | null>(null);
  const [showStatModal, setShowStatModal] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState<TestimonialItem | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editLogo, setEditLogo] = useState<LogoItem | null>(null);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const fetchStats = useCallback(async () => { setLoading(true); const r = await fetch("/api/admin/stats"); const d = await r.json(); setStats(d.stats ?? []); setLoading(false); }, []);
  const fetchTestimonials = useCallback(async () => { setLoading(true); const r = await fetch("/api/admin/testimonials"); const d = await r.json(); setTestimonials(d.testimonials ?? []); setLoading(false); }, []);
  const fetchLogos = useCallback(async () => { setLoading(true); const r = await fetch("/api/admin/client-logos"); const d = await r.json(); setLogos(d.logos ?? []); setLoading(false); }, []);

  useEffect(() => { if (tab === "stats") fetchStats(); }, [tab, fetchStats]);
  useEffect(() => { if (tab === "testimonials") fetchTestimonials(); }, [tab, fetchTestimonials]);
  useEffect(() => { if (tab === "logos") fetchLogos(); }, [tab, fetchLogos]);

  const deleteStat = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/stats/${id}`, { method: "DELETE" }); fetchStats(); };
  const deleteTestimonial = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" }); fetchTestimonials(); };
  const deleteLogo = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/client-logos/${id}`, { method: "DELETE" }); fetchLogos(); };
  const toggleTestimonial = async (t: TestimonialItem) => { await fetch(`/api/admin/testimonials/${t._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !t.isActive }) }); fetchTestimonials(); };

  const TABS = [{ key: "stats", label: "Stats Counters" }, { key: "testimonials", label: "Testimonials" }, { key: "logos", label: "Client Logos" }];

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>Homepage Settings</h1>
          <p className="text-xs text-white/45 mt-1 font-medium">Manage main landing metrics, partner logs, and reviews.</p>
        </div>
        <button
          onClick={() => {
            if (tab === "stats") { setEditStat(null); setShowStatModal(true); }
            else if (tab === "testimonials") { setEditTestimonial(null); setShowTestimonialModal(true); }
            else { setEditLogo(null); setShowLogoModal(true); }
          }}
          className="flex items-center gap-2 bg-[#74c316] hover:bg-[#85e219] text-[#021004] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(116,195,22,0.25)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          Add {tab === "stats" ? "Stat" : tab === "testimonials" ? "Testimonial" : "Logo"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-8 w-fit shadow-inner">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab("home", key)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
              tab === key
                ? "bg-[#74c316]/10 text-[#74c316] border border-[#74c316]/25 shadow-[0_2px_10px_rgba(116,195,22,0.1)]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-[#74c316]" /></div>}

      {/* Stats Tab */}
      {tab === "stats" && !loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
              <p className="text-sm text-white/30 font-medium">No statistical values registered yet.</p>
            </div>
          ) : (
            stats.map((s) => (
              <div key={s._id} className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-[#74c316]/20 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <p className="text-3xl font-black text-[#74c316] drop-shadow-[0_0_15px_rgba(116,195,22,0.2)]">{s.value}</p>
                  <p className="text-xs font-bold text-white/60 uppercase tracking-wider mt-2">{s.label}</p>
                </div>
                <div className="flex gap-2.5 mt-4 pt-3 border-t border-white/5">
                  <button onClick={() => { setEditStat(s); setShowStatModal(true); }} className="p-2 text-white/40 hover:text-[#74c316] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded-xl transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteStat(s._id)} className="p-2 text-white/40 hover:text-red-400 bg-white/[0.02] border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Testimonials Tab */}
      {tab === "testimonials" && !loading && (
        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
              <p className="text-sm text-white/30 font-medium">No client reviews registered yet.</p>
            </div>
          ) : (
            testimonials.map((t) => (
              <div key={t._id} className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-[#74c316]/20 transition-all duration-300">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p className="font-bold text-white text-base tracking-tight">{t.clientName}</p>
                    <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                      t.isActive
                        ? "bg-emerald-500/10 text-[#74c316] border border-[#74c316]/20"
                        : "bg-white/[0.04] text-white/40 border border-white/10"
                    }`}>
                      {t.isActive ? "active" : "hidden"}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-1">{t.feedbackText}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => toggleTestimonial(t)} className="p-3 text-white/40 hover:text-[#74c316] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded-xl transition-all">{t.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  <button onClick={() => { setEditTestimonial(t); setShowTestimonialModal(true); }} className="p-3 text-white/40 hover:text-[#74c316] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteTestimonial(t._id)} className="p-3 text-white/40 hover:text-red-400 bg-white/[0.02] border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Logos Tab */}
      {tab === "logos" && !loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {logos.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
              <p className="text-sm text-white/30 font-medium">No partner client logos configured yet.</p>
            </div>
          ) : (
            logos.map((l) => (
              <div key={l._id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group relative">
                <img src={l.logoImage} alt={l.clientName} className="w-full h-12 object-contain mb-3 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[10px] font-bold text-center text-white/40 truncate uppercase tracking-wider">{l.clientName}</p>
                <div className="absolute inset-0 bg-[#021105]/90 backdrop-blur-xs group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button onClick={() => { setEditLogo(l); setShowLogoModal(true); }} className="p-2 bg-[#74c316] hover:bg-[#85e219] rounded-lg text-[#021004] transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteLogo(l._id)} className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showStatModal && <StatModal item={editStat} onClose={() => setShowStatModal(false)} onSaved={fetchStats} />}
      {showTestimonialModal && <TestimonialModal item={editTestimonial} onClose={() => setShowTestimonialModal(false)} onSaved={fetchTestimonials} />}
      {showLogoModal && <LogoModal item={editLogo} onClose={() => setShowLogoModal(false)} onSaved={fetchLogos} />}
    </div>
  );
}
