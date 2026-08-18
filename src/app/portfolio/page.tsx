import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | Ephorsys Pvt Ltd",
  description: "Explore our engineered solutions and software case studies. Specialized in web applications, mobile apps, and AI integrations.",
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

  return (
    <>  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');

        :root {
          --green: #74c316;
          --green-dark: #74c316;
          --bg: #eef4ee;
          --text-dark: #0d1f0d;
          --text-muted: #4a604a;
        }

        body { font-family: 'Inter', sans-serif; }
        .font-syne { font-family: 'Syne', sans-serif !important; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(6px); }
        }

        .animate-pulse-dot     { animation: pulse     2s   ease-in-out infinite; }
        .animate-float-up      { animation: floatUp   3s   ease-in-out infinite; }
        .animate-float-up-slow { animation: floatUp   4s   ease-in-out infinite; }
        .animate-float-down    { animation: floatDown 3.5s ease-in-out infinite; }

        .hexagon {
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          background: #74c316;
        }

        .btn-primary:hover  { background: #74c316 !important; }
        .btn-secondary:hover { border-color: #74c316 !important; }
      `}</style>
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white select-none">
      {/* Monospace System Header */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-black font-bold">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black" />
            <span>SYSTEM</span>
          </div>
          {/* <div className="flex items-center gap-4 sm:gap-8">
            <span>ENGINEERS</span>
            <span className="border-b border-black pb-0.5">WORK [ACTIVE]</span>
            <span className="hidden sm:inline">PROTOCOLS</span>
            <span className="hidden sm:inline">ARCHIVE</span>
          </div> */}
        </div>
      </div>

      {/* Hero Headline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 border-b border-black">
        <h1 
          className="text-3xl sm:text-3xl md:text-6xl font-black text-black uppercase "
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Engineered<br />    <span className="inline-block rounded-lg mr-4 text-[95%] pr-1"
                style={{ background: "var(--green)", color: "var(--text-dark)" }}>
                Outcomes. 
              </span>
        </h1>
      </div>

      {/* Meta Bar */}
      <div className="border-b border-black bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] sm:text-xs tracking-wider text-zinc-600">
          <div>
            <span className="font-bold text-black">[ HQ ]</span> BHUBANESWAR, INDIA
          </div>
          <div className="sm:text-center">
            <span className="font-bold text-black">[ BUILD ]</span> V4.0.2-STABLE
          </div>
          <div className="sm:text-right">
            <span className="font-bold text-black">[ DEPT ]</span> SOFTWARE ARCHITECTURE
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto border-b border-black">
        {projects.length === 0 ? (
          <div className="py-20 text-center text-xs tracking-widest text-[#8FDD33]">
            [ NO ACTIVE CASE STUDIES CONFIGURED ]
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black border-l border-r border-black">
            {projects.map((project: any) => (
              <div key={project._id} className="flex flex-col group border-b lg:border-b-0 border-black last:border-b-0">
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 border-b border-black flex items-center justify-center">
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-80 h-80 "
                  />
                  {project.isFeatured && (
                    <div className="absolute top-3 left-3 bg-black text-white px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                      FEATURED
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-black text-black px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                    {project.category.replace("_", " ")}
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-[#0D1F0D] mb-1">
                      {project.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-black-70 mb-6 font-medium leading-normal">
                      {project.tagline}
                    </p>

                    {/* Challenge and Execution Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-5 border-t border-black/10 text-[11px] sm:text-xs">
                      <div className="space-y-1">
                        <span className="block font-extrabold text-[#8FDD33] tracking-widest text-[8px] sm:text-[9px] uppercase">
                          [ CHALLENGE ]
                        </span>
                        <p className="text-zinc-800 leading-relaxed font-sans font-medium line-clamp-3 sm:line-clamp-4">
                          {project.overview}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="block font-extrabold text-[#8FDD33] tracking-widest text-[8px] sm:text-[9px] uppercase">
                          [ EXECUTION ]
                        </span>
                        <p className="text-zinc-800 leading-relaxed font-sans font-medium line-clamp-3 sm:line-clamp-4">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* View Case Study CTA */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black tracking-widest uppercase hover:underline text-black"
                    >
                      VIEW DETAILS ↗
                    </Link>
                    <span className="text-md font-bold text-[#8FDD33]">
                      {project.durationText}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div>
          <h2 
            className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to<br />Build?
          </h2>
<Link href="/contact">
                <button
                  className="
                    relative overflow-hidden
                    px-5 py-2 lg:px-6 lg:py-2.5
                    h-10 lg:h-11
                    rounded-xl
                    text-sm lg:text-md font-bold tracking-wide
                    transition-all duration-200
                    hover:brightness-110
                    active:scale-[0.98]
                    group
                    whitespace-nowrap
                    cursor-pointer
                  "
                  style={{
                    background: "#74c316",
                    color: "#021a0a",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                  <h4 className="relative">Contact Us</h4>
                </button>
              </Link>
        </div>
        <div className="flex flex-col gap-2 text-[10px] sm:text-xs text-zinc-500 md:text-right">
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
    </>
  );
}
