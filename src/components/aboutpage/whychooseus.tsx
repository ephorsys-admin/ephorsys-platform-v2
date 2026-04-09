"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
    {
        title: "App Development",
        desc: "Custom-built applications designed to meet your business needs with scalability and efficiency.",
        emoji: "⚡",
        // Tailwind arbitrary glow + line classes per card
        glowClass: "bg-amber-400/20",
        lineClass: "bg-gradient-to-r from-transparent via-amber-400/60 to-transparent",
    },
    {
        title: "Web Development",
        desc: "Robust, responsive websites that deliver seamless user experiences and drive business growth.",
        emoji: "🤖",
        glowClass: "bg-[#6E54F3]/15",
        lineClass: "bg-gradient-to-r from-transparent via-[#6E54F3]/60 to-transparent",
    },
    {
        title: "Digital Marketing",
        desc: "Data-driven marketing strategies to increase brand awareness, engagement, and conversions.",
        emoji: "☁️",
        glowClass: "bg-sky-400/15",
        lineClass: "bg-gradient-to-r from-transparent via-sky-400/60 to-transparent",
    },
    {
        title: "SEO Optimization",
        desc: "Advanced SEO techniques to improve search visibility, drive traffic, and boost online presence.",
        emoji: "💼",
        glowClass: "bg-orange-800/15",
        lineClass: "bg-gradient-to-r from-transparent via-orange-700/55 to-transparent",
    },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: (typeof services)[number] }) {
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative flex flex-col rounded-2xl border border-[#6E54F3]/10
                 bg-[#f5f3ff] p-7 cursor-pointer overflow-hidden
                 hover:border-[#6E54F3]/25 hover:bg-[#ede9fe]/60
                 shadow-[0_2px_16px_rgba(110,84,243,0.06)]
                 hover:shadow-[0_12px_40px_rgba(110,84,243,0.14)]
                 transition-all duration-300"
        >
            {/* Per-card glow blob — pure Tailwind color class */}
            <div
                className={`pointer-events-none absolute -top-8 -left-8 h-36 w-36 rounded-full
                    blur-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-500 ${service.glowClass}`}
            />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 h-px w-14 bg-linear-to-l from-[#6E54F3]/20 to-transparent" />
            <div className="absolute top-0 right-0 w-px h-14 bg-linear-to-b from-[#6E54F3]/20 to-transparent" />

            {/* Emoji */}
            <div className="mb-5 text-5xl leading-none select-none">{service.emoji}</div>

            {/* Title */}
            <h3 className="mb-3 text-base font-bold text-gray-900 tracking-tight">
                {service.title}
            </h3>

            {/* Desc */}
            <p className="flex-1 text-sm leading-relaxed text-gray-500 mb-6">
                {service.desc}
            </p>

            {/* shadcn Button — ghost, no green ring */}
            <Button
                variant="ghost"
                size="sm"
                className="w-fit gap-1.5 px-0 text-[#74c316] font-semibold
                   hover:text-[#74c316] hover:bg-transparent
                   focus-visible:ring-0 focus-visible:ring-offset-0
                   focus-visible:outline-none ring-0 ring-offset-0
                   transition-colors duration-300"
            >
                Read More
                <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                />
            </Button>

            {/* Animated bottom line — pure Tailwind gradient class */}
            <span
                className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
                    rounded-full transition-all duration-500 ${service.lineClass}`}
            />
        </motion.div>
    );
}

// Main block 

export default function Whychooseus() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.12 });

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-brand-white"
        >
            {/* Subtle dot grid  */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(rgba(110,84,243,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(110,84,243,0.04)_1px,transparent_1px)]
                   bg-size-[60px_60px]"
            />

            {/* Top radial glow*/}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0
                   bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(110,84,243,0.12)_0%,transparent_70%)]"
            />

            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-15">

                {/* ── Header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    transition={{ duration: 0.6 }}
                    className="mb-14 text-center"
                >
                   

                    {/* Heading — "Us?" outlined using Tailwind [paint-order] + [-webkit-text-stroke] */}
                    <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        Why Choose{" "}
                        <span className="text-[#74c316]">
                            Us?
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
                        Comprehensive technology services to power your business forward
                    </p>
                </motion.div>

                {/* ── Cards grid — responsive ── */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {services.map((service) => (
                        <ServiceCard key={service.title} service={service} />
                    ))}
                </motion.div>

                {/* ── Bottom CTA ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
                >
                    {/* shadcn Button — solid primary */}


                </motion.div>
            </div>
        </section>
    );
}