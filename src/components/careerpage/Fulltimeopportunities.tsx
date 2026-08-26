"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ApplyModal from "./ApplyModal";
import {
  Briefcase,
  MapPin,
  ChevronRight,
  Code2,
  Palette,
  Globe,
  Layers,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────



const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

function getJobIcon(dept: string) {
  const d = dept.toLowerCase();
  if (d.includes("design") || d.includes("graphic") || d.includes("ui") || d.includes("ux")) return Palette;
  if (d.includes("dev") || d.includes("engine") || d.includes("frontend") || d.includes("backend") || d.includes("stack")) return Code2;
  if (d.includes("product") || d.includes("project") || d.includes("lead")) return Globe;
  if (d.includes("data") || d.includes("analyst")) return Layers;
  return Briefcase;
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  onApply,
}: {
  job: {
    _id: string;
    title: string;
    department: string;
    location: string;
    description: string;
    responsibilities?: string[];
    experienceRequired?: string;
  };
  onApply: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = getJobIcon(job.department);

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300",
        "bg-gray-50",
        hovered
          ? "border-primary -translate-y-1"
          : "border-gray-200",
      ].join(" ")}
    >
      {/* Top accent line on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#74c316] to-transparent"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Header row */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={[
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                hovered ? "border-[#74c316] bg-[#74c316]/10" : "border-gray-200 bg-white",
              ].join(" ")}
            >
              <Icon
                className={`h-5 w-5 transition-colors duration-300 ${hovered ? "text-[#74c316]" : "text-gray-400"
                  }`}
                strokeWidth={1.8}
              />
            </div>
            <h3
              className={`text-sm font-bold transition-colors duration-300 sm:text-base ${hovered ? "text-[#74c316]" : "text-gray-900"
                }`}
            >
              {job.title}
            </h3>
          </div>

          <span className="shrink-0 rounded-full border border-[#74c316]/20 bg-[#74c316]/8 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#74c316]">
            Full-Time
          </span>
        </div>

        {/* Meta */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <Briefcase className="h-3 w-3" strokeWidth={1.8} />
            <span>{job.department}</span>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <MapPin className="h-3 w-3" strokeWidth={1.8} />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 line-clamp-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
          {job.description}
        </p>

        {/* Requirements */}
        <div className="mb-5 space-y-3">
          {/* Must Have Skills */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-700">
                Must Have Skills
              </p>

              <div className="flex flex-wrap gap-1.5">
                {job.responsibilities.map((resp, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500"
                  >
                    {resp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {job.experienceRequired && (
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-700">
                Experience
              </p>

              <span className="inline-block rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500">
                {job.experienceRequired}
              </span>
            </div>
          )}
        </div>

        {/* Apply Now */}
        <Button
          onClick={onApply}
          className="w-full justify-between cursor-pointer rounded-xl border-0 bg-[#74c316] font-bold text-white transition-all duration-300 hover:bg-[#62a611]"
        >
          <span>Apply Now</span>
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FullTimeOpportunities({
  jobs,
}: {
  jobs?: {
    _id: string;
    title: string;
    department: string;
    location: string;
    description: string;
    responsibilities?: string[];
    experienceRequired?: string;
  }[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });
  const [selectedJob, setSelectedJob] = useState<{ _id: string; title: string } | null>(null);

  const hasJobs = jobs && jobs.length > 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-white"
    >
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#74c316]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#74c316]">
              Now Hiring
            </span>
          </div>

          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white">
              <Briefcase className="h-5 w-5 text-gray-700" strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Full-Time{" "}
                <span className="text-[#74c316]">Opportunities</span>
              </h2>
              <p className="text-xs text-gray-400">Build your career with us</p>
            </div>
          </div>
        </motion.div>

        {/* Job grid */}
        {hasJobs ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
          >
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onApply={() => setSelectedJob({ _id: job._id, title: job.title })}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-center py-12 px-4 rounded-2xl border border-gray-200 bg-white"
          >
            <p className="text-gray-400 font-medium text-sm">There is no jobs</p>
          </motion.div>
        )}
      </div>

      {selectedJob && (
        <ApplyModal
          jobId={selectedJob._id}
          jobTitle={selectedJob.title}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </section>
  );
}