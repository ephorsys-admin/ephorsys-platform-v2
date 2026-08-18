"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ExternalLink, Calendar, Users, Briefcase, Activity } from "lucide-react";

interface Project {
  _id: string;
  id: string;
  title: string;
  slug: string;
  category: "web_dev" | "app_dev" | "seo" | "marketing" | "branding";
  clientName: string;
  clientIndustry: string;
  thumbnailImage: string;
  tagline: string;
  overview: string;
  solution: string;
  role: string;
  teamSize: number;
  startDate: string;
  endDate: string;
  durationText: string;
  status: "completed" | "ongoing" | "live";
  isFeatured: boolean;
  liveUrl?: string;
  testimonial?: {
    text: string;
    clientName: string;
    clientTitle: string;
    clientPhoto?: string;
  };
}

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-24 text-center text-xs tracking-widest text-zinc-400">
        [ NO ACTIVE CASE STUDIES CONFIGURED ]
      </div>
    );
  }

  const activeProject = projects[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "web_dev": return "Web Development";
      case "app_dev": return "Mobile App Dev";
      case "seo": return "SEO Optimization";
      case "marketing": return "Digital Marketing";
      case "branding": return "Branding";
      default: return cat;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white select-none">
      {/* Monospace System Header */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-black font-bold">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black animate-pulse" />
            <span>SYSTEM :: ONLINE</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <span>ENGINEERS</span>
            <span className="border-b border-black pb-0.5">WORK [SLIDER]</span>
            <span className="hidden sm:inline">PROTOCOLS</span>
            <span className="hidden sm:inline">ARCHIVE</span>
          </div>
        </div>
      </div>

      {/* Hero Headline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 border-b border-black">
        <h1 
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-none"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Engineered<br />Outcomes.
        </h1>
      </div>

      {/* Meta Bar & Bhubaneswar Location */}
      <div className="border-b border-black bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[10px] sm:text-xs tracking-wider text-zinc-650">
          <div>
            <span className="font-bold text-black">[ LOC ]</span> 20.2961° N, 85.8245° E (BHUBANESWAR, IN)
          </div>
          <div className="sm:text-center">
            <span className="font-bold text-black">[ BUILD ]</span> V4.0.2-STABLE
          </div>
          <div className="sm:text-right">
            <span className="font-bold text-black">[ DEPT ]</span> SOFTWARE ENGINEERING
          </div>
        </div>
      </div>

      {/* Company Work Summary & Custom Statistics */}
      <div className="border-b border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 border border-black p-6 bg-zinc-50">
              <span className="block font-bold text-zinc-400 mb-3 tracking-widest text-[8px] uppercase">
                [ ENG_CAPABILITIES ]
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Our Engineering Ethos</h3>
              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                We craft performant custom web platforms, mobile software applications, and backend agentic AI integrations. Our systems are engineered for sub-millisecond latencies, bulletproof security, and seamless scale.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="border border-black p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-400 font-bold tracking-widest">[ SYSTEM_01 ]</span>
                <span className="text-2xl font-black mt-2 tracking-tight">50+ LIVE</span>
                <span className="text-[10px] text-zinc-600 mt-1 uppercase font-bold">Custom Deployments</span>
              </div>
              <div className="border border-black p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-400 font-bold tracking-widest">[ SYSTEM_02 ]</span>
                <span className="text-2xl font-black mt-2 tracking-tight">99.99%</span>
                <span className="text-[10px] text-zinc-600 mt-1 uppercase font-bold">Production Uptime</span>
              </div>
              <div className="border border-black p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-400 font-bold tracking-widest">[ SYSTEM_03 ]</span>
                <span className="text-2xl font-black mt-2 tracking-tight">12+ AI</span>
                <span className="text-[10px] text-zinc-600 mt-1 uppercase font-bold">Agents & LLM Pipelines</span>
              </div>
              <div className="border border-black p-4 flex flex-col justify-between">
                <span className="text-[9px] text-zinc-400 font-bold tracking-widest">[ SYSTEM_04 ]</span>
                <span className="text-2xl font-black mt-2 tracking-tight">100%</span>
                <span className="text-[10px] text-zinc-600 mt-1 uppercase font-bold">Decentralized Load Balancers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Project Horizontal Slider */}
      <div className="border-b border-black bg-zinc-50/50 py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <span className="font-bold text-zinc-400 tracking-widest text-[9px] uppercase">
              [ DIRECTORY_INDEX: {activeIndex + 1}/{projects.length} ]
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handlePrev} 
                className="p-2.5 border border-black bg-white hover:bg-black hover:text-white transition-all active:scale-[0.95]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext} 
                className="p-2.5 border border-black bg-white hover:bg-black hover:text-white transition-all active:scale-[0.95]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Project Carousel List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <div 
                  key={project._id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsExpanded(true);
                  }}
                  className={`border cursor-pointer transition-all duration-300 p-4 flex flex-col justify-between ${
                    isCurrent 
                      ? "border-black bg-white ring-2 ring-black/5 shadow-md translate-y-[-4px]" 
                      : "border-zinc-200 bg-white/70 hover:border-zinc-450 hover:bg-white"
                  }`}
                >
                  <div>
                    {/* Compact Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 border border-black/10 mb-4">
                      <img 
                        src={project.thumbnailImage} 
                        alt={project.title} 
                        className={`w-full h-full object-cover transition-all duration-500 ${isCurrent ? "" : "grayscale opacity-60"}`}
                      />
                      {project.isFeatured && (
                        <div className="absolute top-2 left-2 bg-black text-white px-1.5 py-0.5 text-[7px] font-bold tracking-widest uppercase">
                          FEATURED
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                      <span className="text-[8px] font-bold tracking-wider uppercase text-zinc-400 block">
                        [ Category: {getCategoryLabel(project.category)} ]
                      </span>
                      <span className={`w-2 h-2 rounded-full ${project.status === "completed" || project.status === "live" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-tight line-clamp-1">{project.title}</h3>
                    <p className="font-sans text-[10px] text-zinc-550 mt-1 line-clamp-2 leading-relaxed">{project.tagline}</p>
                  </div>

                  <div className="border-t border-black/10 pt-3 mt-4 flex items-center justify-between text-[9px] text-zinc-400 uppercase font-bold">
                    <span>{project.durationText}</span>
                    <span className={isCurrent ? "text-[#74c316]" : ""}>
                      {isCurrent ? "[ ACTIVE ]" : "[ SELECT ]"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expandable Project Details (Inline Case Study) */}
      <AnimatePresence mode="wait">
        {isExpanded && activeProject && (
          <motion.div
            key={activeProject._id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="border-b border-black bg-zinc-50 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
              {/* Top details bar */}
              <div className="border border-black bg-white p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] sm:text-xs">
                <div>
                  <span className="block font-bold text-zinc-400 mb-1 tracking-wider text-[8px] uppercase">
                    [ CLIENT ]
                  </span>
                  <span className="font-bold text-black uppercase tracking-tight block truncate">{activeProject.clientName}</span>
                  <span className="block text-[9px] text-zinc-500 truncate">{activeProject.clientIndustry}</span>
                </div>
                <div className="border-t border-zinc-150 pt-3 md:pt-0 md:border-t-0 md:border-l md:pl-6">
                  <span className="block font-bold text-zinc-400 mb-1 tracking-wider text-[8px] uppercase">
                    [ ROLE / ASSIGNMENT ]
                  </span>
                  <span className="font-bold text-black uppercase tracking-tight block truncate">{activeProject.role}</span>
                  <span className="block text-[9px] text-zinc-500">Team Size: {activeProject.teamSize}</span>
                </div>
                <div className="border-t border-zinc-150 pt-3 md:pt-0 md:border-t-0 md:border-l md:pl-6">
                  <span className="block font-bold text-zinc-400 mb-1 tracking-wider text-[8px] uppercase">
                    [ DURATION ]
                  </span>
                  <span className="font-bold text-black uppercase tracking-tight block truncate">{activeProject.durationText}</span>
                  <span className="block text-[9px] text-zinc-500">
                    {new Date(activeProject.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} - {new Date(activeProject.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </span>
                </div>
                <div className="border-t border-zinc-150 pt-3 md:pt-0 md:border-t-0 md:border-l md:pl-6">
                  <span className="block font-bold text-zinc-400 mb-1 tracking-wider text-[8px] uppercase">
                    [ PROJECT LINK ]
                  </span>
                  {activeProject.liveUrl ? (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#74c316] hover:underline uppercase tracking-widest inline-flex items-center gap-1 mt-0.5"
                    >
                      LAUNCH DEPLOYMENT <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="font-bold text-zinc-450 uppercase tracking-widest block mt-0.5">[ INTRANET ONLY ]</span>
                  )}
                </div>
              </div>

              {/* Challenge vs Execution Text Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-l border-r border-b border-black bg-white divide-y md:divide-y-0 md:divide-x divide-black">
                {/* Challenge */}
                <div className="p-6 sm:p-8">
                  <span className="block font-bold text-zinc-450 mb-3 tracking-widest text-[8px] sm:text-[9px] uppercase">
                    [ CHALLENGE & REQUIREMENTS ]
                  </span>
                  <div className="font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed space-y-3">
                    {activeProject.overview.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Execution */}
                <div className="p-6 sm:p-8">
                  <span className="block font-bold text-zinc-450 mb-3 tracking-widest text-[8px] sm:text-[9px] uppercase">
                    [ EXECUTION & SOLUTION ]
                  </span>
                  <div className="font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed space-y-3">
                    {activeProject.solution.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Quote if present */}
              {activeProject.testimonial?.text && (
                <div className="border-l border-r border-b border-black bg-zinc-50/50 p-6 sm:p-8 text-center flex flex-col items-center">
                  <span className="block font-bold text-zinc-450 mb-4 tracking-widest text-[8px] uppercase">
                    [ VERIFICATION & FEEDBACK ]
                  </span>
                  <blockquote className="text-xs sm:text-sm font-bold font-sans italic text-zinc-900 leading-relaxed mb-4 max-w-xl">
                    "{activeProject.testimonial.text}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    {activeProject.testimonial.clientPhoto && (
                      <img 
                        src={activeProject.testimonial.clientPhoto} 
                        alt={activeProject.testimonial.clientName}
                        className="w-8 h-8 rounded-full border border-black object-cover bg-white"
                      />
                    )}
                    <div className="text-left text-[9px] sm:text-[10px]">
                      <span className="block font-bold uppercase tracking-tight">{activeProject.testimonial.clientName}</span>
                      <span className="block text-[8px] text-zinc-500 uppercase tracking-wider">
                        {activeProject.testimonial.clientTitle}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div>
          <h2 
            className="text-3xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Ready to<br />Build?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-black hover:bg-zinc-850 text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest px-6 py-3.5 transition-all duration-300 active:scale-[0.98]"
          >
            INITIALIZE CONNECTION
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
  );
}
