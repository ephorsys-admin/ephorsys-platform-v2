"use client";

import Link from "next/link";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  MousePointer2,
  Sparkles,
  Globe2,
  ShieldCheck,
  Cpu,
} from "lucide-react";

// Data

const STATS = [
  { value: "13+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
  { value: "100%", label: "On-Time Delivery" },
  { value: "70%", label: "Repeat Client Rate" },
];

const TRAITS = [
  {
    icon: Globe2,
    label: "Remote-First",
    desc: "We work across time zones, seamlessly.",
  },
  {
    icon: Cpu,
    label: "Tech-Forward",
    desc: "Modern stacks, no legacy baggage.",
  },
  {
    icon: ShieldCheck,
    label: "Reliability",
    desc: "We ship what we promise, when we promise.",
  },
  {
    icon: Sparkles,
    label: "Design-Obsessed",
    desc: "Craft matters at every pixel.",
  },
];

// Floating stat chip

function StatChip({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 160 }}
      className="flex flex-col items-center rounded-2xl  px-5 py-3 text-center backdrop-blur-md"
    >
      <span
        className="text-xl font-black text-white sm:text-2xl"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {value}
      </span>
      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-white/50">
        {label}
      </span>
    </motion.div>
  );
}

// Trait pill

function TraitPill({
  trait,
  index,
  inView,
}: {
  trait: (typeof TRAITS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = trait.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-default overflow-hidden rounded-2xl border border-gray-100 bg-brand-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {/* hover fill */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(116,194,22,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ background: "rgba(116,194,22,0.12)" }}
      >
        <Icon
          className="h-4 w-4"
          style={{ color: "#74c316" }}
          strokeWidth={1.8}
        />
      </div>
      <p className="mb-1 text-sm font-black text-gray-900">{trait.label}</p>
      <p className="text-xs leading-relaxed text-gray-400">{trait.desc}</p>
    </motion.div>
  );
}

// Main Component

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const traitsInView = useInView(traitsRef, { once: true, amount: 0.2 });
  const textInView = useInView(textRef, { once: true, amount: 0.2 });

  // Parallax on the image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-white"
    >
      {/* HERO SPLIT: Dark left + Image right */}

      <div className="relative grid min-h-135 grid-cols-1 lg:grid-cols-2">
        {/* ── LEFT: Dark panel ── */}

        {/* ── LEFT: Dark panel ── */}
        <div
          className="relative flex flex-col justify-center overflow-hidden px-8 py-16 sm:px-12 md:px-16 md:py-20 md:items-center lg:py-24 lg:items-start"
          style={{ background: "#0e0e0e" }}
        >
          {/* Green blob */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 md:h-96 md:w-96 rounded-full opacity-25 blur-3xl"
            style={{ background: "#74c316" }}
          />

          <div className="relative z-10 max-w-lg md:pl-5 md:text-center lg:text-left">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
            >
              <MousePointer2
                className="h-3 w-3 text-[#74c316]"
                strokeWidth={2}
              />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                Who We Are
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Our Story
              <span>
                {" "}
                <span style={{ color: "#74c316" }}>&</span> Vision
              </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mb-8 text-sm leading-relaxed text-white/50 sm:text-base md:text-base md:max-w-md md:mx-auto lg:mx-0"
            >
              We're a lean, full-service digital agency, young in structure,
              grounded in real world execution. Our team has shipped products
              for startups and growing businesses, and we're just getting
              started.
            </motion.p>

            {/* Stat grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-2"
            >
              {STATS.map((s, i) => (
                <StatChip
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  delay={0.3 + i * 0.08}
                />
              ))}
            </motion.div>

            {/* CTA */}
            <Link href="/contact">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.5 }}
                className="group mt-8 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:brightness-110 cursor-pointer ml-8 md:ml-auto md:mr-auto lg:ml-8 lg:mr-0"
                style={{ background: "#74c316" }}
              >
                Start a Project with Us
              </motion.button>
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Parallax image ── */}
        <div className="relative min-h-85 overflow-hidden lg:min-h-0">
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-0 scale-110"
          >
            <Image
              src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354859/pexels-yankrukov-7793678_szr7vm.jpg"
              alt="Ephorsys team"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-[#0e0e0e]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e]/40 via-transparent to-transparent" />
          </motion.div>

          {/* Floating corner badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            className="absolute bottom-6 right-6 flex flex-col gap-1 rounded-2xl border border-white/20 bg-black/50 px-4 py-3 backdrop-blur-md"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Founded
            </span>
            <span
              className="text-2xl font-black text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              2025
            </span>
          </motion.div>
        </div>
      </div>

      {/* BODY: Narrative + Traits */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/*  Two-col narrative  */}
        <div
          ref={textRef}
          className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20"
        >
          {/* Left copy */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-5 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Built to close the gap between ideas and execution.
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="space-y-4 text-sm leading-[1.85] text-gray-500 sm:text-[15px]"
            >
              <p>
                Ephorsys, Established in 2025, is a full service and the best
                software development company in bhubaneswaar that designs,
                engineers, and ships digital products people actually want to
                use. We work across custom web development, mobile app
                development, AI powered software solutions, full stack
                development, and digital marketing and SEO, not as separate
                departments that pass work between them, but as one tightly
                integrated team that sees every project from first brief to
                final launch.
              </p>
              {/* <p>
                We're a full-service digital studio that designs, builds, and
                ships. Our team blends engineering precision with design
                thinking, so what we create isn't just functional — it's
                something people actually want to use.
              </p> */}
            </motion.div>
          </div>

          {/* Right copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col justify-between gap-6"
          >
            <div className="space-y-4 text-sm leading-[1.85] text-gray-500 sm:text-[15px]">
              <p>
                We partner with startups and scaling businesses — from
                validating an MVP to overhauling an entire product. Our edge is
                that the same people who plan your project are the ones who
                build it. No handoffs, no lost context.
              </p>
              <p>
                With a strong foundation in modern web technologies and a
                human-first mindset, we build digital products that drive growth
                ones that are fast, scalable, and built to last.
              </p>
            </div>

            {/* Highlight quote card */}
            <div
              className="rounded-2xl border-l-[3px] bg-brand-white p-5 shadow-sm"
              style={{ borderColor: "#74c316" }}
            >
              <p className="text-sm italic leading-relaxed text-gray-500">
                "We measure success not in lines of code, but in the growth of
                our clients."
              </p>
              <p
                className="mt-3 text-xs font-black uppercase tracking-widest"
                style={{ color: "#74c316" }}
              >
                — Ephorsys Team
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Horizontal rule with label ── */}
        <div className="mb-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300">
            What defines us
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* ── Traits grid ── */}
        <div ref={traitsRef} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TRAITS.map((trait, i) => (
            <TraitPill
              key={trait.label}
              trait={trait}
              index={i}
              inView={traitsInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
