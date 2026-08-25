import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | Ephorsys Pvt Ltd",
  description:
    "Explore our engineered solutions, live platforms, and software system case studies. Specialized in custom web applications, mobile apps, and LLM integrations.",
};

async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to load portfolio projects:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  const getCategoryBadgeLabel = (cat: string) => {
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#62a611] selection:text-white select-none">

      {/* ── Hero / Header ── */}
    <section className="pt-8 pb-6 text-center px-4 border-b border-slate-100">
  <p
    className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#62a611] mb-3"
    style={{ fontFamily: "var(--font-syne)" }}
  >
    Portfolio
  </p>

  <h1
    className="text-xl sm:text-2xl md:text-3xl lg:text-[2.8rem] font-black tracking-tight text-slate-900 leading-tight mb-3"
    style={{ fontFamily: "var(--font-syne)" }}
  >
    Our Work  <span className="text-[#62a611]">Speaks for Us</span>
  </h1>

  <p className="text-xs sm:text-sm md:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
    Take a look at what we’ve built —{" "}
    <span className="text-[#62a611] font-semibold italic">
      explore the features, process and technology behind every project.
    </span>
  </p>
</section>
      {/* ── Card Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {projects.length === 0 ? (
          <div className="py-24 text-center text-xs tracking-widest text-slate-400 font-mono">
            No projects published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <article
                key={project._id}
                className="bg-white border border-[#62A611]/35 rounded-[2rem] overflow-hidden flex flex-col group shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(98,166,17,0.15)] hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Thumbnail Image Section */}
                <div className="relative w-full aspect-[16/8] overflow-hidden bg-slate-50 border-b border-[#62A611]/15">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
                  />

                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200/60 text-[#3e5c76] px-4 py-1 text-xs font-bold rounded-full shadow-sm">
                    {getCategoryBadgeLabel(project.category)}
                  </div>
                </div>
                {/* Body Content Area */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  {/* Client Industry Subtitle (Uppercase) */}
                  {project.clientIndustry && (
                    <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#8da9c4] mb-2 block">
                      {project.clientIndustry}
                    </span>
                  )}

                  {/* Project Title */}
                  <h2
                    className="text-base sm:text-lg lg:text-[1.2rem] font-black text-slate-900 group-hover:text-[#62a611] transition-colors duration-300 leading-snug mb-2.5 tracking-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {project.title}
                  </h2>

                  {/* Project Tagline / Description */}
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4.5 flex-1 font-medium">
                    {project.tagline}
                  </p>

                  {/* Technologies Tags List */}
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-5">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-black/10 border border-slate-200/70 text-slate-500 text-[9px] sm:text-[10px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.startDate && (
                    <div className="text-[9px] sm:text-[10px] font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                      Timeline: <span className="text-slate-600 font-bold ml-1">{formatDateRange(project.startDate, project.endDate)}</span>
                    </div>
                  )}

                  {/* Actions Bar (Footer) */}
                  <div className="flex items-center justify-between font-sans mt-auto">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="text-xs sm:text-sm font-bold text-[#62a611] hover:text-[#50880e] flex items-center gap-1 transition-colors"
                    >
                      View Details →
                    </Link>
                    {(() => {
                      if (project.category === "marketing" && project.socialLinks) {
                        const platform = project.socialLinks.primary || "instagram";
                        const url = project.socialLinks[platform];
                        if (url) {
                          return (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
                            >
                              Live
                            </a>
                          );
                        }
                      }
                      if (project.liveUrl) {
                        return (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#72AF29] hover:text-[#62A611] flex items-center gap-1 transition-colors"
                          >
                            Live
<ExternalLink className="h-4 w-4" />
                          </a>
                        );
                      }
                      return null;
                    })()}
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA Footer ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-[#62a611] rounded-3xl px-6 py-9 sm:px-14 sm:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p
              className="text-white/70 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Start a Project
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ready to Build?
            </h2>
            <Link
              href="/consultancy"
              className="inline-block bg-white text-[#62a611] font-black text-[10px] sm:text-xs uppercase tracking-wider px-5 py-3.5 sm:px-7 sm:py-3.5 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
             Schedule a Free Consultation →
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-[9px] sm:text-xs text-white/70 md:text-right font-mono">
            <div><span className="font-bold text-white">[ SYSTEM ]</span> ONLINE</div>
            <div><span className="font-bold text-white">[ EST ]</span> 2025</div>
            <div><span className="font-bold text-white">[ RIGHTS ]</span> © 2026 EPHORSYS PRIVATE LIMITED</div>
          </div>
        </div>
      </section>

    </div>
  );
}