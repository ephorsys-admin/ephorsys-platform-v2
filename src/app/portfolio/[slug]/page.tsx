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
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white select-none">
      {/* Return to log header */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-black font-bold">
          <div className="bg-[#8FDD33] p-1 rounded-3xl">
              <Link href="/portfolio" className="hover:underline flex items-center gap-2">
            ←  RETURN TO ACTIVE LOG 
          </Link>
          </div>
        
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black" />
            <span className="uppercase">{project.category.replace("_", " ")}</span>
          </div>
        </div>
      </div>

      {/* Hero Cover */}
      <div className="border-b border-black bg-zinc-50 relative max-h-[480px] overflow-hidden flex items-center justify-center">
        <img
          src={project.thumbnailImage}
          alt={project.title}
          className="w-90 h-90 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 max-w-7xl mx-auto text-white">
          <span className="text-[8px] sm:text-[9px] rounded-full tracking-widest font-bold bg-[#8FDD33] text-black px-2 py-0.5 uppercase">
            {project.status}
          </span>
          <h1
            className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-[#0D1F0D]  uppercase mt-2"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {project.title}
          </h1>
        </div>
      </div>

      {/* Meta Grid Section */}
      <div className="border-b border-black bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] sm:text-xs divide-y md:divide-y-0 md:divide-x divide-black/10">
          <div className="pr-2">
            <span className="block font-extrabold text-[#8FDD33] mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase">
              [ CLIENT ]
            </span>
            <span className="font-bold text-black uppercase tracking-tight block truncate">{project.clientName}</span>
            <span className="block text-[9px] sm:text-[10px] text-zinc-550 truncate">{project.clientIndustry}</span>
          </div>
          <div className="pt-3 md:pt-0 md:pl-6 pr-2">
            <span className="block font-extrabold text-[#8FDD33] mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase">
              [ ROLE / ASSIGNMENT ]
            </span>
            <span className="font-bold text-black uppercase tracking-tight block truncate">{project.role}</span>
            <span className="block text-[9px] sm:text-[10px] text-zinc-550">Team Size: {project.teamSize}</span>
          </div>
          <div className="pt-3 md:pt-0 md:pl-6 pr-2">
            <span className="block font-extrabold text-[#8FDD33] mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase">
              [ DURATION ]
            </span>
            <span className="font-bold text-black uppercase tracking-tight block truncate">{project.durationText}</span>
            <span className="block text-[9px] sm:text-[10px] text-zinc-550">
              {formatDateLabel(project.startDate)} - {formatDateLabel(project.endDate)}
            </span>
          </div>
          <div className="pt-3 md:pt-0 md:pl-6 pr-2">
            <span className="block font-extrabold text-[#8FDD33] mb-1 tracking-wider text-[8px] sm:text-[9px] uppercase">
              [ LIVE DEMO ]
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-500 hover:underline uppercase tracking-widest inline-flex items-center gap-1"
              >
                View Website ↗
              </a>
            ) : (
              <span className="font-bold text-zinc-450 uppercase tracking-widest block truncate">[ INTRANET ONLY ]</span>
            )}
          </div>
        </div>
      </div>

      {/* Case Study Core Body (Challenge and Execution) */}
      <div className="max-w-7xl mx-auto border-b border-black grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black">
        {/* Challenge Section */}
        <div className="p-6 sm:p-10 md:p-12">
          <span className="block font-extrabold text-[#8FDD33] mb-4 tracking-widest text-[9px] sm:text-[10px] uppercase">
            [ CHALLENGE & REQUIREMENTS ]
          </span>
          <div className="font-sans font-medium text-xs sm:text-sm text-zinc-800 leading-relaxed space-y-4">
            {project.overview.split("\n\n").map((para: string, idx: number) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* Execution Section */}
        <div className="p-6 sm:p-10 md:p-12">
          <span className="block font-extrabold text-[#8FDD33] mb-4 tracking-widest text-[9px] sm:text-[10px] uppercase">
            [ EXECUTION & ENGINEERING ]
          </span>
          <div className="font-sans font-medium text-xs sm:text-sm text-zinc-800 leading-relaxed space-y-4">
            {project.solution.split("\n\n").map((para: string, idx: number) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Client Testimonial if configured */}
      {project.testimonial?.text && (
        <div className="border-b border-black bg-zinc-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
            <span className="block font-extrabold text-[#8FDD33] mb-6 tracking-widest text-[9px] sm:text-[10px] uppercase">
              [ CLIENT ADVOCACY & FEEDBACK ]
            </span>
            <blockquote className="text-base sm:text-lg md:text-xl font-bold font-sans italic text-zinc-900 leading-relaxed mb-6 max-w-2xl mx-auto">
              "{project.testimonial.text}"
            </blockquote>
            <div className="inline-flex items-center gap-3">
              {project.testimonial.clientPhoto && (
                <img
                  src={project.testimonial.clientPhoto}
                  alt={project.testimonial.clientName}
                  className="w-10 h-10 rounded-full border border-black object-cover"
                />
              )}
              <div className="text-left text-[10px] sm:text-xs">
                <span className="block font-bold uppercase tracking-tight">{project.testimonial.clientName}</span>
                <span className="block text-[9px] text-zinc-500 uppercase tracking-wider">
                  {project.testimonial.clientTitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next case study footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div>
          <h2
            className="text-3xl md:text-5xl font-black tracking-tighter text-[#0D1F0D] uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Looking to<br />Consult?
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
            <span className="font-bold text-black">[ RUNTIME ]</span> LIVE
          </div>
          <div>
            <span className="font-bold text-black">[ SYS_EST ]</span> 2025
          </div>
          <div>
            <span className="font-bold text-black">[ RIGHTS ]</span> © 2026 EPHORSYS PRIVATE LIMITED
          </div>
        </div>
      </div>
    </div>
  );
}
