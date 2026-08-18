import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

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
  if (!project) {
    return {
      title: "Project Not Found | Ephorsys",
    };
  }
  return {
    title: `${project.title} - Case Study | Ephorsys`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const formatDateLabel = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-black selection:text-white select-none pb-20">
      {/* Return to log header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-zinc-500 font-mono font-bold">
          <Link href="/portfolio" className="hover:underline flex items-center gap-2 text-black">
            ← [ RETURN TO ACTIVE LOG ]
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#62a611]" />
            <span className="uppercase text-black">{project.category.replace("_", " ")}</span>
          </div>
        </div>
      </div>

      {/* Case Study Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Hero Cover */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] max-h-[440px] w-full overflow-hidden flex items-center justify-center border-b border-slate-100">
            <img
              src={project.thumbnailImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[8px] sm:text-[9px] tracking-widest font-bold bg-white text-black px-2.5 py-0.5 rounded-md uppercase">
                {project.status}
              </span>
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-2.5 leading-tight"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {project.title}
              </h1>
            </div>
          </div>

          {/* Meta Information Details Box */}
          <div className="bg-slate-50/50 border-b border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 text-[10px] sm:text-xs divide-y md:divide-y-0 md:divide-x divide-slate-200/60 font-sans">
              <div className="pr-2">
                <span className="block font-bold text-slate-400 mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase font-mono">
                  [ CLIENT ]
                </span>
                <span className="font-extrabold text-slate-900 uppercase tracking-tight block truncate">{project.clientName}</span>
                <span className="block text-[10px] text-slate-500 truncate mt-0.5">{project.clientIndustry}</span>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6 pr-2">
                <span className="block font-bold text-slate-400 mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase font-mono">
                  [ ROLE & TEAM ]
                </span>
                <span className="font-extrabold text-slate-900 uppercase tracking-tight block truncate">{project.role}</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">Team Size: {project.teamSize}</span>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6 pr-2">
                <span className="block font-bold text-slate-400 mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase font-mono">
                  [ TIMELINE ]
                </span>
                <span className="font-extrabold text-slate-900 uppercase tracking-tight block truncate">{project.durationText}</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">
                  {formatDateLabel(project.startDate)} - {formatDateLabel(project.endDate)}
                </span>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6 pr-2">
                <span className="block font-bold text-slate-400 mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase font-mono">
                  [ LIVE DEPLOYMENT ]
                </span>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-[#62a611] hover:underline uppercase tracking-wider inline-flex items-center gap-1 mt-0.5"
                  >
                    LAUNCH PROJECT ↗
                  </a>
                ) : (
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider block mt-0.5">[ LOCAL ONLY ]</span>
                )}
              </div>
            </div>
          </div>

          {/* Technologies Section (NEW) */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-white">
              <span className="block font-bold text-slate-400 mb-2.5 tracking-wider text-[8px] sm:text-[9px] uppercase font-mono">
                [ INFRASTRUCTURE & TECHNOLOGIES USED ]
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, idx: number) => (
                  <span 
                    key={idx} 
                    className="bg-slate-50 border border-slate-200/50 text-slate-500 px-3 py-1 rounded-lg text-xs font-semibold font-sans tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Case Study Core Body (Challenge and Execution) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white">
            {/* Challenge Section */}
            <div className="p-6 sm:p-8">
              <span className="block font-bold text-slate-400 mb-4 tracking-widest text-[9px] sm:text-[10px] uppercase font-mono">
                [ CHALLENGE & REQUIREMENTS ]
              </span>
              <div className="font-sans font-medium text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
                {project.overview.split("\n\n").map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Execution Section */}
            <div className="p-6 sm:p-8">
              <span className="block font-bold text-slate-400 mb-4 tracking-widest text-[9px] sm:text-[10px] uppercase font-mono">
                [ EXECUTION & SOLUTION ]
              </span>
              <div className="font-sans font-medium text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
                {project.solution.split("\n\n").map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Client Testimonial quote */}
          {project.testimonial?.text && (
            <div className="border-t border-slate-100 bg-slate-50/50">
              <div className="p-6 sm:p-8 text-center flex flex-col items-center">
                <span className="block font-bold text-slate-400 mb-4 tracking-widest text-[8px] sm:text-[9px] uppercase font-mono">
                  [ CLIENT VERIFICATION & ADVOCACY ]
                </span>
                <blockquote className="text-sm sm:text-base font-bold font-sans italic text-slate-900 leading-relaxed mb-6 max-w-2xl">
                  "{project.testimonial.text}"
                </blockquote>
                <div className="inline-flex items-center gap-3">
                  {project.testimonial.clientPhoto && (
                    <img
                      src={project.testimonial.clientPhoto}
                      alt={project.testimonial.clientName}
                      className="w-10 h-10 rounded-full border border-slate-200 object-cover bg-white"
                    />
                  )}
                  <div className="text-left text-[10px] sm:text-xs font-sans">
                    <span className="block font-extrabold uppercase tracking-tight text-slate-900">{project.testimonial.clientName}</span>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">
                      {project.testimonial.clientTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
