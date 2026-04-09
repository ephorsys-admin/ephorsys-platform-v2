"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data — Ephorsys: Software, AI & IT Consulting ───────────────────────────

const modules = [
    {
        id: "MOD-01",
        title: "AI-Powered Automation",
        desc: "Deploys intelligent agents that monitor business workflows, auto-scale processing units, and reroute tasks to optimised execution pipelines during peak loads.",
        specs: [
            { label: "Runtime", value: "Python / Node.js" },
            { label: "Latency", value: "< 12ms" },
            { label: "Init Time", value: "0.6s" },
        ],
    },
    {
        id: "MOD-02",
        title: "Distributed API Gateway",
        desc: "Integrates directly with microservices and third-party platforms via a unified gateway layer — managing auth, rate-limiting, and load distribution in real time.",
        specs: [
            { label: "Protocol", value: "REST / GraphQL" },
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Throughput", value: "10k req/s" },
        ],
    },
    {
        id: "MOD-03",
        title: "Intelligent Data Caching",
        desc: "Aggressive static and dynamic delivery engine that serves cached responses for heavy database queries — reducing compute overhead during high-demand windows.",
        specs: [
            { label: "Storage", value: "NVMe Distributed" },
            { label: "Cache Hit Rate", value: "96.4%" },
            { label: "Purge Latency", value: "Instant" },
        ],
    },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

// ─── Module Card ──────────────────────────────────────────────────────────────

function ModuleCard({
    mod,
    index,
}: {
    mod: (typeof modules)[0];
    index: number;
}) {
    return (
        <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex h-full flex-col border-t border-white/10 pt-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 hover:border-[#7EC832]/60"
        >
            {/* Module ID */}
            <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#7EC832]">
                {mod.id}
            </span>

            {/* Title */}
            <h3 className="mb-4 font-['Georgia',serif] text-2xl font-bold leading-snug text-white sm:text-3xl">
                {mod.title}
            </h3>

            {/* Description — flex-1 pushes specs to bottom */}
            <p className="mb-8 flex-1 text-sm leading-relaxed text-white/55 sm:text-base">
                {mod.desc}
            </p>

            {/* Specs table — always at bottom */}
            <div className="mt-auto">
                {mod.specs.map(({ label, value }, i) => (
                    <div
                        key={label}
                        className={`flex items-center justify-between gap-4 py-3 ${
                            i < mod.specs.length - 1
                                ? "border-b border-white/10"
                                : ""
                        }`}
                    >
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#7EC832]/80">
                            {label}
                        </span>
                        <span className="text-right text-xs font-bold text-white/80 sm:text-sm">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SystemArchitecture() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.08 });

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#0d3320]"
        >
            {/* Subtle noise texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Decorative half-circle top-left */}
            <div
                className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-70 sm:h-72 sm:w-72"
                style={{ background: "#7EC832" }}
            />
            <div
                className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full sm:h-72 sm:w-72"
                style={{ background: "#0d3320" }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute left-0 -top-1 h-28 w-56 sm:h-36 sm:w-72"
                style={{ background: "#0d3320" }}
            />

            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

                {/* Top section — left aligned header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-xl lg:mb-20"
                >
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#7EC832]">
                        System Architecture
                    </p>

                    <h2 className="mb-5 font-['Georgia',serif] text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                        Why build on a<br />
                        <span className="text-[#7EC832]">scalable stack?</span>
                    </h2>

                    <p className="text-sm leading-relaxed text-white/50 sm:text-base">
                        Our proprietary execution engine eliminates redundant processing layers,
                        directly reducing infrastructure overhead at the core level —
                        without sacrificing performance or reliability.
                    </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mb-12 h-px w-full origin-left bg-white/10"
                />

                {/* Three module cards — equal height via items-stretch */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="grid grid-cols-1 items-stretch gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-white/10"
                >
                    {modules.map((mod, i) => (
                        <div
                            key={mod.id}
                            className={`flex flex-col${i > 0 ? " lg:pl-10 xl:pl-14" : ""}`}
                        >
                            <ModuleCard mod={mod} index={i} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}