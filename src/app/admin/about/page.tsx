"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, type TeamMemberInput } from "@/schemas/team.schema";
import { lifeAtPhotoSchema, type LifeAtPhotoInput } from "@/schemas/lifeAtPhoto.schema";
import { useAdminUiStore } from "@/store/adminUiStore";
import { Plus, Edit2, Trash2, X, Loader2, GripVertical } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { toast } from "sonner";
import { heroStatSchema } from "@/schemas/heroStat.schema";

type TeamMember = { _id: string; name: string; position: string; photo: string; linkedIn?: string; category: string; order: number };
type Photo = { _id: string; imageUrl: string; caption?: string; order: number };

// ─── Generic CRUD Form Modal ──────────────────────────────────────────────────
function TeamMemberModal({ member, onClose, onSaved }: { member: TeamMember | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<any>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member ? { ...member, linkedIn: member.linkedIn ?? "" } : { category: "core", order: 0 },
  });
  const inputCls = "w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-405 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";

  const onSubmit = async (data: any) => {
    const url = member ? `/api/admin/team/${member._id}` : "/api/admin/team";
    const method = member ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) {
      toast.success(member ? "Team member updated!" : "Team member added!");
      onSaved(); onClose();
    } else {
      toast.error("Failed to save team member. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl text-gray-900">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>{member ? "Edit Member" : "New Member"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Name *</label>
              <input {...register("name")} className={inputCls} /></div>
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Position *</label>
              <input {...register("position")} className={inputCls} /></div>
          </div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Photo URL</label>
            <ImageUpload
              value={watch("photo")}
              onChange={(url) => setValue("photo", url)}
              placeholder="https://..."
              folder="team"
            />
          </div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">LinkedIn URL</label>
            <input {...register("linkedIn")} placeholder="https://linkedin.com/in/..." className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Category</label>
              <select {...register("category")} className={`${inputCls} [&>option]:bg-white`}>
                <option value="leader">Leader</option>
                <option value="core">Core Team</option>
              </select></div>
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Order</label>
              <input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#62a611] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />}
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PhotoModal({ photo, onClose, onSaved }: { photo: Photo | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<any>({
    resolver: zodResolver(lifeAtPhotoSchema),
    defaultValues: photo ?? { caption: "", order: 0 },
  });
  const inputCls = "w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-405 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";

  const onSubmit = async (data: any) => {
    const url = photo ? `/api/admin/life-at-photos/${photo._id}` : "/api/admin/life-at-photos";
    const method = photo ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) {
      toast.success(photo ? "Photo updated!" : "Photo added to gallery!");
      onSaved(); onClose();
    } else {
      toast.error("Failed to save photo. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl text-gray-900">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>{photo ? "Edit Photo" : "Add Gallery Photo"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Image URL *</label>
            <ImageUpload
              value={watch("imageUrl")}
              onChange={(url) => setValue("imageUrl", url)}
              placeholder="https://..."
              folder="gallery"
            />
          </div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Caption</label>
            <input {...register("caption")} placeholder="Optional caption" className={inputCls} /></div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#42720e] block mb-1.5">Order</label>
            <input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#62a611] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />}
              Save Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminAboutPage() {
  const { activeTab, setActiveTab } = useAdminUiStore();
  const tab = activeTab["about"] ?? "team";

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [aboutStats, setAboutStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editPhoto, setEditPhoto] = useState<Photo | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editAboutStat, setEditAboutStat] = useState<any | null>(null);
  const [showAboutStatModal, setShowAboutStatModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "member" | "photo"; id: string; name?: string } | null>(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/team");
    const data = await res.json();
    setMembers(data.members ?? []);
    setLoading(false);
  }, []);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/life-at-photos");
    const data = await res.json();
    setPhotos(data.photos ?? []);
    setLoading(false);
  }, []);

  const fetchAboutStats = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/hero-stats");
    const data = await res.json();
    setAboutStats(data.heroStats ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (tab === "team") fetchMembers(); }, [tab, fetchMembers]);
  useEffect(() => { if (tab === "gallery") fetchPhotos(); }, [tab, fetchPhotos]);
  useEffect(() => { if (tab === "about-stats") fetchAboutStats(); }, [tab, fetchAboutStats]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const url = deleteTarget.type === "member"
      ? `/api/admin/team/${deleteTarget.id}`
      : `/api/admin/life-at-photos/${deleteTarget.id}`;
    const res = await fetch(url, { method: "DELETE" });
    if (res.ok) {
      toast.success(`${deleteTarget.type === "member" ? "Team member" : "Photo"} deleted successfully.`);
      if (deleteTarget.type === "member") fetchMembers();
      else fetchPhotos();
    } else {
      toast.error("Failed to delete. Please try again.");
    }
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>About Settings</h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">Control the public team showcase and gallery items.</p>
        </div>
        {tab !== "about-stats" && (
          <button
            onClick={() => { if (tab === "team") { setEditMember(null); setShowMemberModal(true); } else { setEditPhoto(null); setShowPhotoModal(true); } }}
            className="flex items-center gap-2 bg-[#74c316] hover:bg-[#62a611] text-[#021004] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            {tab === "team" ? "Add Member" : "Add Photo"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-gray-100/85 border border-gray-200/60 rounded-2xl p-1.5 mb-8 w-fit shadow-inner">
        {[
          { key: "team", label: "Team Members" },
          { key: "gallery", label: "Life at Gallery" },
          { key: "about-stats", label: "About Stats" }
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab("about", key)}
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

      {/* Team Tab */}
      {tab === "team" && (
        <div className="space-y-4">
          {loading ? <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-[#74c316]" /></div> :
          members.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
              <p className="text-sm text-gray-400 font-medium">No team members registered yet.</p>
            </div>
          ) : (
            members.map((m) => (
              <div key={m._id} className="bg-white border border-gray-200/60 rounded-2xl p-6 flex items-center justify-between gap-6 shadow-sm hover:border-[#74c316]/30 transition-all duration-300">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> :
                      <div className="w-full h-full bg-[#74c316]/10 border border-[#74c316]/20 flex items-center justify-center text-[#42720e] font-black text-sm">{m.name[0]}</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-bold text-gray-900 text-base tracking-tight">{m.name}</p>
                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                        m.category === "leader"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                        {m.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">{m.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => { setEditMember(m); setShowMemberModal(true); }} className="p-3 text-gray-400 hover:text-[#74c316] transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-xl"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget({ type: "member", id: m._id, name: m.name })} className="p-3 text-gray-400 hover:text-red-500 transition-all duration-300 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-200 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Gallery Tab */}
      {tab === "gallery" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? <div className="col-span-full flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-[#74c316]" /></div> :
          photos.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white border border-gray-200/60 rounded-2xl">
              <p className="text-sm text-gray-400 font-medium">No gallery photographs registered yet.</p>
            </div>
          ) : (
            photos.map((p) => (
              <div key={p._id} className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm hover:border-[#74c316]/30 border transition-all group">
                <div className="relative aspect-square">
                  <img src={p.imageUrl} alt={p.caption ?? ""} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-xs group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button onClick={() => { setEditPhoto(p); setShowPhotoModal(true); }} className="p-2.5 bg-[#74c316] hover:bg-[#62a611] rounded-xl text-[#021004] transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteTarget({ type: "photo", id: p._id, name: p.caption || "this photo" })} className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {p.caption && <p className="text-xs text-gray-500 font-medium px-4 py-3 truncate bg-gray-50 border-t border-gray-150">{p.caption}</p>}
              </div>
            ))
          )}
        </div>
      )}

      {/* About Stats Tab */}
      {tab === "about-stats" && !loading && (
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
      )}

      {showMemberModal && <TeamMemberModal member={editMember} onClose={() => setShowMemberModal(false)} onSaved={fetchMembers} />}
      {showPhotoModal && <PhotoModal photo={editPhoto} onClose={() => setShowPhotoModal(false)} onSaved={fetchPhotos} />}
      {showAboutStatModal && (
        <AboutStatModal
          item={editAboutStat}
          onClose={() => setShowAboutStatModal(false)}
          onSaved={fetchAboutStats}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title={deleteTarget.type === "member" ? "Delete Team Member" : "Delete Photo"}
          description={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
