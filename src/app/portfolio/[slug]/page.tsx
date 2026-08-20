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

            {/* Open Live Website */}
            {project.liveUrl && (
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
            )}

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