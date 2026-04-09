"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Rocket, Zap } from "lucide-react";

// Types & Data 

type Badge = { icon: React.ElementType; label: string };
type Milestone = {
  number: string;
  year: string;
  title: string;
  badges: Badge[];
  description: string;
  accent: string;
};

const MILESTONES: Milestone[] = [
  {
    number: "1",
    year: "2025 Nov →",
    title: "Ephorsys is Founded",
    badges: [
      { icon: Rocket, label: "Born Digital-First" },
      { icon: Users, label: "Core Team of 3" },
    ],
    description:
      "Launched as a bootstrapped, lean digital agency with one mission — close the gap between great ideas and great execution. From day one, we focused on building real products for real businesses, with no fluff and no bloat.",
    accent: "#74c316",
  },
  {
    number: "2",
    year: "2026 Feb →",
    title: "First 10 Projects Shipped",
    badges: [
      { icon: Zap, label: "13+ Projects Delivered" },
      { icon: Users, label: "10+ Clients Served" },
    ],
    description:
      "Scaled rapidly by earning trust through delivery. We partnered with startups across SaaS, e-commerce, and services — building everything from landing pages to full-stack platforms. Our repeat client rate crossed 70%.",
    accent: "#74c316",
  },
  {
    number: "3",
    year: "2026 March →",
    title: "Ephorsys 2.0 — Where We're Going",
    badges: [
      { icon: Rocket, label: "Product Studio Mode" },
      { icon: Zap, label: "12+ Clients by 2026" },
    ],
    description:
      "Evolving from a service agency into a product partner. We're launching retainer programs, co-building SaaS products with founders, and expanding our design systems practice. The next chapter is about depth, not just delivery.",
    accent: "#74c316",
  },
];

//  Single Milestone Row 

function MilestoneRow({
  milestone,
  index,
  isLast,
}: {
  milestone: Milestone;
  index: number;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.25 });

  return (
    <div ref={rowRef} className="relative flex items-start gap-4 xl:gap-8">
      {/* ── LEFT: Ghost Number ── */}
      <div className="relative w-10 sm:w-20 md:w-20 lg:w-24 xl:w-32 md:ml-6">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="select-none font-black leading-none text-white sm:text-2xl"
          style={{
            fontSize: "clamp(3rem, 8vw, 9rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            paddingTop: "0.15em",
          }}
        >
          {milestone.number}
        </motion.span>
      </div>

      {/* ── CENTER: Line + Dot ── */}
      <div className="relative flex shrink-0 flex-col items-center" style={{ width: 28 }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15, type: "spring", stiffness: 200 }}
          className="relative z-10 mt-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-lg"
          style={{ background: milestone.accent }}
        >
          {/* pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: milestone.accent }}
            animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.4 }}
          />
        </motion.div>

        {/* Vertical line below dot */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-1 w-px origin-top flex-1"
            style={{
              background: "linear-gradient(to bottom, #d1d5db, #f3f4f6)",
              minHeight: 80,
            }}
          />
        )}
      </div>

      {/* ── RIGHT: Card ── */}
      <div className="min-w-0 flex-1 pb-16 pl-6 sm:pl-8 md:pl-8 lg:pl-10">
        {/* Year pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-3 mt-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
          style={{ background: `${milestone.accent}18`, color: milestone.accent }}
        >
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: milestone.accent }}
          />
          {milestone.year}
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mb-4 text-xl font-black leading-tight text-gray-900 sm:text-2xl lg:text-3xl"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {milestone.title}
        </motion.h3>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-4 flex flex-wrap gap-2"
        >
          {milestone.badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <span
                key={badge.label}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: milestone.accent }}
                  strokeWidth={2}
                />
                {badge.label}
              </span>
            );
          })}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.32 }}
          className="max-w-lg text-sm leading-relaxed text-gray-500"
        >
          {milestone.description}
        </motion.p>
      </div>
    </div>
  );
}

// Main Component 

export default function CompanyTimeline() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section className="relative w-full overflow-hidden bg-brand-white">

      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="dm-sans relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="syne text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Where It All Began…{" "}
            <span className="text-[#74c316]">and Where We're Going</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base"
          >
            A quick look at the milestones that shaped Ephorsys — and the
            ambitious roadmap ahead.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {MILESTONES.map((milestone, i) => (
            <MilestoneRow
              key={milestone.number}
              milestone={milestone}
              index={i}
              isLast={i === MILESTONES.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}