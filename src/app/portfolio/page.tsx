import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | Ephorsys Pvt Ltd",
  description: "Explore our engineered solutions, live platforms, and software system case studies. Specialized in custom web applications, mobile apps, and LLM integrations.",
};

async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({ isPublished: true }).sort({ isFeatured: -1, startDate: -1 }).lean();
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-black selection:text-white select-none pb-20">
      {/* Monospace System Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-zinc-500 font-mono font-bold">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#62a611]" />
            <span className="text-black">SYSTEM :: PORTFOLIO</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <span>ENGINEERS</span>
            <span className="border-b border-black pb-0.5 text-black">ACTIVE LOGS</span>
            <span className="hidden sm:inline">PROTOCOLS</span>
            <span className="hidden sm:inline">ARCHIVE</span>
          </div>
        </div>
      </div>

      {/* Hero Headline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 border-b border-slate-200 bg-white">
        <h1 
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-none"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Engineered<br />Outcomes.
        </h1>
      </div>

      {/* Meta Bar */}
      <div className="border-b border-slate-200 bg-white font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] sm:text-xs tracking-wider text-zinc-500">
          <div>
            <span className="font-bold text-black">[ LOC ]</span> 20.2961° N, 85.8245° E (BHUBANESWAR)
          </div>
          <div className="sm:text-center">
            <span className="font-bold text-black">[ BUILD ]</span> V4.0.2-STABLE
          </div>
          <div className="sm:text-right">
            <span className="font-bold text-black">[ DEPT ]</span> SOFTWARE ARCHITECTURE
          </div>
        </div>
      </div>

      {/* Card Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {projects.length === 0 ? (
          <div className="py-20 text-center text-xs tracking-widest text-zinc-400 font-mono">
            [ NO ACTIVE CASE STUDIES CONFIGURED ]
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <div 
                key={project._id} 
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-150 border-b border-slate-100">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-103"
                  />
                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200/50 text-slate-800 px-3.5 py-1 text-[9px] sm:text-[10px] font-extrabold rounded-full shadow-sm">
                    {getCategoryBadgeLabel(project.category)}
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Client Industry Subtitle */}
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      {project.clientIndustry}
                    </span>
                    {/* Project Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    {/* Project Tagline */}
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                      {project.tagline}
                    </p>

                    {/* Technologies Tags List */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="bg-slate-50 border border-slate-200/50 text-slate-500 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold font-sans tracking-wide"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between font-sans">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#62a611] hover:underline"
                    >
                      View Details →
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 hover:text-black uppercase tracking-wider"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-10 border-t border-slate-200 mt-12 bg-white rounded-3xl shadow-sm">
        <div>
          <h2 
            className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to<br />Build?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-black hover:bg-zinc-850 text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest px-6 py-3.5 transition-all duration-300 active:scale-[0.98] rounded-xl"
          >
            INITIALIZE CONNECTION
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-[10px] sm:text-xs text-zinc-500 md:text-right font-mono">
          <div>
            <span className="font-bold text-black">[ SYSTEM ]</span> ONLINE
          </div>
          <div>
            <span className="font-bold text-black">[ EST ]</span> 2025
          </div>
          <div>
            <span className="font-bold text-black">[ RIGHTS ]</span> © 2026 EPHORSYS PRIVATE LIMITED
          </div>
        </div>
      </div>
    </div>
  );
}
