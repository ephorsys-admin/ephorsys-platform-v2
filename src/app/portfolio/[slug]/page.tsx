import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { Layers, Building2, Code2, ExternalLink, Calendar, Users, Briefcase, Activity, User } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}
async function getProject(slug: string) {
  try {
    await connectDB();
    const project = await Project.findOne({ slug, isPublished: true }).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Failed to load project details:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found | Ephorsys" };
  return {
    title: `${project.title} - Case Study | Ephorsys`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "web_dev": return "Web Application";
      case "app_dev": return "Mobile App Dev";
      case "seo": return "SEO Optimization";
      case "marketing": return "Digital Marketing";
      case "branding": return "Branding Project";
      default: return cat;
    }
  };

  const formatDateRange = (startStr?: string, endStr?: string) => {
    if (!startStr) return "";
    const options: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };
    try {
      const start = new Date(startStr).toLocaleDateString("en-US", options);
      const end = endStr ? new Date(endStr).toLocaleDateString("en-US", options) : "Present";
      return `${start} - ${end}`;
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 selection:bg-[#62a611] selection:text-white select-none pb-20">

      {/* ── Top Nav Bar ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="/portfolio"
            className="text-xs font-bold text-slate-500 hover:text-[#62a611] transition-colors flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            ← Back to Portfolio
          </a>
          <span
            className="text-[10px] font-extrabold uppercase tracking-widest text-[#62a611]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Case Study Detail
          </span>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ══ LEFT COLUMN (spans 2) ══ */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Contained Image Card */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.03)] flex items-center justify-center p-4 sm:p-6 min-h-[220px] sm:min-h-[300px]">
              <div className="relative w-full aspect-[16/8.5] max-h-[360px] overflow-hidden flex items-center justify-center">
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Project Header block */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.03)] p-6 sm:p-8 flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#62a611] mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                {getCategoryLabel(project.category)}
              </span>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-3"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {project.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-semibold">
                {project.tagline}
              </p>
            </div>



            {/* Project Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-6 sm:p-8">
              <h2
                className="text-xl sm:text-2xl font-black text-slate-900 mb-1 tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Project Overview
              </h2>
              <p className="text-xs text-[#62a611] font-semibold mb-5">
                Full details of what we delivered for this client.
              </p>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                {project.overview
                  ? project.overview.split("\n\n").map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))
                  : <p className="text-slate-400 italic">No overview provided.</p>
                }
              </div>
            </div>

            {/* Solution Card */}
            {project.solution && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-6 sm:p-8">
                <h2
                  className="text-xl sm:text-2xl font-black text-slate-900 mb-1 tracking-tight"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Our Solution
                </h2>
                <p className="text-xs text-[#62a611] font-semibold mb-5">
                  How we approached and executed the project.
                </p>
                <div className="text-sm text-slate-600 leading-relaxed space-y-4">
                  {project.solution.split("\n\n").map((para: string, idx: number) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial Card */}
            {project.testimonial?.text && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-6 sm:p-8">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}>
                  Client Testimonial
                </p>
                <blockquote className="text-base sm:text-lg font-bold italic text-slate-800 leading-relaxed mb-6 border-l-4 border-[#62a611] pl-5">
                  "{project.testimonial.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  {project.testimonial.clientPhoto && (
                    <img
                      src={project.testimonial.clientPhoto}
                      alt={project.testimonial.clientName}
                      className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                    />
                  )}
                  <div>
                    <span className="block text-sm font-black text-slate-900 tracking-tight"
                      style={{ fontFamily: "var(--font-syne)" }}>
                      {project.testimonial.clientName}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                      {project.testimonial.clientTitle}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Project Snapshot Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-5">
              <h3
                className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Project Snapshot
              </h3>
              <div className="flex flex-col gap-4">
                {/* Client Name */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#62a611]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                      Client
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {project.clientName}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="w-3.5 h-3.5 text-[#62a611]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                      Category
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                </div>

                {/* Client Industry */}
                {project.clientIndustry && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#62a611]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                        Client Industry
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {project.clientIndustry}
                      </span>
                    </div>
                  </div>
                )}

                {/* Role */}
                {project.role && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-[#62a611]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                        Role Assigned
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {project.role}
                      </span>
                    </div>
                  </div>
                )}

                {/* Team Size */}
                {project.teamSize && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-[#62a611]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                        Team Size
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {project.teamSize} {project.teamSize === 1 ? "Person" : "People"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {project.startDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#62a611]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                        Timeline
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {formatDateRange(project.startDate, project.endDate)}
                        {project.durationText && ` (${project.durationText})`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Status */}
                {project.status && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#62a611]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-3.5 h-3.5 text-[#62a611]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                        Project Status
                      </span>
                      <span className="text-xs font-bold text-slate-800 capitalize">
                        {project.status}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Technologies Card */}
            {project.technologies?.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-5">
                <h3
                  className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="border border-slate-200 text-slate-600 bg-slate-50 text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Open Live Website / Social Links */}
            {project.category === "marketing" && (project.socialLinks?.instagram || project.socialLinks?.facebook || project.socialLinks?.youtube) ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-5">
                <h3
                  className="text-xs font-extrabold uppercase tracking-widest text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Social Profiles
                </h3>
                <div className="flex flex-col gap-2.5">
                  {project.socialLinks.instagram && (
                    <a
                      href={project.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50/50 transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 text-pink-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-pink-600 transition-colors">Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:text-pink-500 transition-colors" />
                    </a>
                  )}
                  {project.socialLinks.facebook && (
                    <a
                      href={project.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Facebook</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:text-blue-500 transition-colors" />
                    </a>
                  )}
                  {project.socialLinks.youtube && (
                    <a
                      href={project.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/50 transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5 text-red-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto group-hover:text-red-500 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            ) : project.liveUrl ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)] p-5">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-sm font-bold text-[#62a611] hover:text-[#4e880e] transition-colors"
                >
                  <span>Open Live Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : null}

            {/* CTA Card */}
            <div className="bg-[#62a611] rounded-2xl p-5">
              <h3
                className="text-sm font-black text-white mb-1"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Need a similar project?
              </h3>
              <p className="text-xs text-white/80 mb-4 leading-relaxed">
                Free 30-minute consultation. No obligation.
              </p>
              <Link
                href="/contact"
                className="block w-full bg-white text-[#62a611] text-xs font-black text-center py-2.5 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-200 mb-3"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Contact Us
              </Link>
              <Link
                href="/consultancy"
                className="block w-full bg-white text-[#62a611] text-xs font-black text-center py-2.5 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Book Free Consultation
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}