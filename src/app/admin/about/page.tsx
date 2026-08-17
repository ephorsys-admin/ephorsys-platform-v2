"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, type TeamMemberInput } from "@/schemas/team.schema";
import { lifeAtPhotoSchema, type LifeAtPhotoInput } from "@/schemas/lifeAtPhoto.schema";
import { useAdminUiStore } from "@/store/adminUiStore";
import { Plus, Edit2, Trash2, X, Loader2, GripVertical } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

type TeamMember = { _id: string; name: string; position: string; photo: string; linkedIn?: string; category: string; order: number };
type Photo = { _id: string; imageUrl: string; caption?: string; order: number };

// ─── Generic CRUD Form Modal ──────────────────────────────────────────────────
function TeamMemberModal({ member, onClose, onSaved }: { member: TeamMember | null; onClose: () => void; onSaved: () => void }) {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<any>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member ? { ...member, linkedIn: member.linkedIn ?? "" } : { category: "core", order: 0 },
  });
  const inputCls = "w-full rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";

  const onSubmit = async (data: any) => {
    const url = member ? `/api/admin/team/${member._id}` : "/api/admin/team";
    const method = member ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { onSaved(); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#021105]/95 border border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-lg shadow-2xl text-white">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{member ? "Edit Member" : "New Member"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Name *</label>
              <input {...register("name")} className={inputCls} /></div>
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Position *</label>
              <input {...register("position")} className={inputCls} /></div>
          </div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Photo URL</label>
            <ImageUpload
              value={watch("photo")}
              onChange={(url) => setValue("photo", url)}
              placeholder="https://..."
              folder="team"
            />
          </div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">LinkedIn URL</label>
            <input {...register("linkedIn")} placeholder="https://linkedin.com/in/..." className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Category</label>
              <select {...register("category")} className={`${inputCls} [&>option]:bg-[#021105]`}>
                <option value="leader">Leader</option>
                <option value="core">Core Team</option>
              </select></div>
            <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Order</label>
              <input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/10 rounded-xl py-3 text-xs font-bold text-white/70 hover:bg-white/[0.03] hover:text-white transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#85e219] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(116,195,22,0.2)]">
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
  const inputCls = "w-full rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/20 px-3.5 py-2.5 text-sm outline-none focus:border-[#74c316] focus:ring-4 focus:ring-[#74c316]/10 transition-all duration-300";

  const onSubmit = async (data: any) => {
    const url = photo ? `/api/admin/life-at-photos/${photo._id}` : "/api/admin/life-at-photos";
    const method = photo ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) { onSaved(); onClose(); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#021105]/95 border border-white/10 backdrop-blur-xl rounded-2xl w-full max-w-md shadow-2xl text-white">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "var(--font-syne)" }}>{photo ? "Edit Photo" : "Add Gallery Photo"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Image URL *</label>
            <ImageUpload
              value={watch("imageUrl")}
              onChange={(url) => setValue("imageUrl", url)}
              placeholder="https://..."
              folder="gallery"
            />
          </div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Caption</label>
            <input {...register("caption")} placeholder="Optional caption" className={inputCls} /></div>
          <div><label className="text-[10px] font-bold uppercase tracking-widest text-[#74c316] block mb-1.5">Order</label>
            <input type="number" {...register("order", { valueAsNumber: true })} className={inputCls} /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-white/10 rounded-xl py-3 text-xs font-bold text-white/70 hover:bg-white/[0.03] hover:text-white transition-all duration-300">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#74c316] hover:bg-[#85e219] text-[#021004] rounded-xl py-3 text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(116,195,22,0.2)]">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-[#021004]" />}
              Save Photo
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
  const [loading, setLoading] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editPhoto, setEditPhoto] = useState<Photo | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

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

  useEffect(() => { if (tab === "team") fetchMembers(); }, [tab, fetchMembers]);
  useEffect(() => { if (tab === "gallery") fetchPhotos(); }, [tab, fetchPhotos]);

  const deleteMember = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    fetchMembers();
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await fetch(`/api/admin/life-at-photos/${id}`, { method: "DELETE" });
    fetchPhotos();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 select-none">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>About Settings</h1>
          <p className="text-xs text-white/45 mt-1 font-medium">Control the public team showcase and gallery items.</p>
        </div>
        <button
          onClick={() => { if (tab === "team") { setEditMember(null); setShowMemberModal(true); } else { setEditPhoto(null); setShowPhotoModal(true); } }}
          className="flex items-center gap-2 bg-[#74c316] hover:bg-[#85e219] text-[#021004] font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(116,195,22,0.25)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          {tab === "team" ? "Add Member" : "Add Photo"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-8 w-fit shadow-inner">
        {[{ key: "team", label: "Team Members" }, { key: "gallery", label: "Life at Gallery" }].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab("about", key)}
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

      {/* Team Tab */}
      {tab === "team" && (
        <div className="space-y-4">
          {loading ? <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-[#74c316]" /></div> :
          members.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
              <p className="text-sm text-white/30 font-medium">No team members registered yet.</p>
            </div>
          ) : (
            members.map((m) => (
              <div key={m._id} className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:border-[#74c316]/20 transition-all duration-300">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
                    {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> :
                      <div className="w-full h-full bg-[#74c316]/10 border border-[#74c316]/25 flex items-center justify-center text-[#74c316] font-black text-sm">{m.name[0]}</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-bold text-white text-base tracking-tight">{m.name}</p>
                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                        m.category === "leader"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-white/[0.04] text-white/40 border border-white/10"
                      }`}>
                        {m.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 font-medium uppercase tracking-wider mt-1">{m.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => { setEditMember(m); setShowMemberModal(true); }} className="p-3 text-white/40 hover:text-[#74c316] transition-all duration-300 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded-xl"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteMember(m._id)} className="p-3 text-white/40 hover:text-red-400 transition-all duration-300 bg-white/[0.02] border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl"><Trash2 className="w-4 h-4" /></button>
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
            <div className="col-span-full text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
              <p className="text-sm text-white/30 font-medium">No gallery photographs registered yet.</p>
            </div>
          ) : (
            photos.map((p) => (
              <div key={p._id} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] group">
                <div className="relative aspect-square">
                  <img src={p.imageUrl} alt={p.caption ?? ""} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#021105]/75 backdrop-blur-xs group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button onClick={() => { setEditPhoto(p); setShowPhotoModal(true); }} className="p-2.5 bg-[#74c316] hover:bg-[#85e219] rounded-xl text-[#021004] transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deletePhoto(p._id)} className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                {p.caption && <p className="text-xs text-white/50 font-medium px-4 py-3 truncate bg-black/20 border-t border-white/5">{p.caption}</p>}
              </div>
            ))
          )}
        </div>
      )}

      {showMemberModal && <TeamMemberModal member={editMember} onClose={() => setShowMemberModal(false)} onSaved={fetchMembers} />}
      {showPhotoModal && <PhotoModal photo={editPhoto} onClose={() => setShowPhotoModal(false)} onSaved={fetchPhotos} />}
    </div>
  );
}
