"use client";

import { ArrowRight, Rocket, Code2, ShieldCheck, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FULL_TEXT =
  "Your vision, our expertise — delivered with precision and punctuality. We follow a flexible, agile model that prioritises collaboration, transparency, and streamlined execution.";

const AVATARS = [
  "https://i.pravatar.cc/32?img=11",
  "https://i.pravatar.cc/32?img=22",
  "https://i.pravatar.cc/32?img=33",
  "https://i.pravatar.cc/32?img=44",
];

const steps = [
  { number: "01", title: "Discovery & Planning", desc: "Understanding your vision, goals, and challenges to map out a clear strategic roadmap.", Icon: Globe, color: "#6E54F3", bg: "#f5f3ff" },
  { number: "02", title: "Design & Development", desc: "Building robust, scalable solutions with clean code and modern architecture.", Icon: Code2, color: "#2563eb", bg: "#eff6ff" },
  { number: "03", title: "Testing & QA", desc: "Rigorous testing across all scenarios to ensure reliability and performance.", Icon: ShieldCheck, color: "#059669", bg: "#ecfdf5" },
  { number: "04", title: "Deployment & Support", desc: "Smooth launches with ongoing maintenance and continuous improvement.", Icon: Rocket, color: "#d97706", bg: "#fffbeb" },
];

type StatItem = { value: number; suffix: string; label: string; dark: boolean };

const stats: StatItem[] = [
  { value: 13, suffix: "+", label: "Projects", dark: false },
  { value: 10, suffix: "+", label: "Clients", dark: true },
  { value: 8, suffix: "+", label: "Months", dark: false },
];

function StatBadge({ stat, posClass }: { stat: StatItem; posClass: string }) {
  return (
    <div
      className={[
        "absolute flex flex-col items-center rounded-xl px-3 py-2 shadow-lg",
        posClass,
        stat.dark ? "bg-[#74c316] text-white" : "bg-white border border-gray-100 text-[#74c316]",
      ].join(" ")}
    >
      <span className="text-sm font-black sm:text-base">
        {stat.value}{stat.suffix}
      </span>
      <span className={`text-[9px] font-semibold uppercase tracking-wider ${stat.dark ? "text-white/60" : "text-gray-400"}`}>
        {stat.label}
      </span>
    </div>
  );
}

function AvatarStack() {
  return (
    <div className="flex items-center">
      {AVATARS.map((src, i) => (
        <div
          key={i}
          className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white shadow"
          style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 10 - i }}
        >
          <Image src={src} alt="" fill className="object-cover" sizes="28px" />
        </div>
      ))}
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#74c316] text-[9px] font-bold text-white shadow"
        style={{ marginLeft: -8, zIndex: 6 }}
      >
        +8
      </div>
    </div>
  );
}

function ApproachCard() {
  return (
    <div className="w-full shrink-0 lg:mt-10 lg:w-[42%] xl:w-[38%]">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="relative w-full" style={{ height: "clamp(180px, 30vw, 280px)" }}>
          <Image
            src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352403/pexels-fauxels-3183150_qjsnpi.jpg"
            alt="Our team"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
         
          <div className="absolute bottom-3 right-3">
            <AvatarStack />
          </div>
          <StatBadge stat={stats[0]} posClass="top-3 right-3" />
          <StatBadge stat={stats[1]} posClass="bottom-12 left-3" />
          <StatBadge stat={stats[2]} posClass="bottom-12 right-3" />
        </div>
        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-sm font-bold text-gray-800">Ephorsys Digital Agency</p>
          <p className="mt-0.5 text-xs text-gray-400">Delivering scalable, result-driven digital solutions worldwide.</p>
        </div>
      </div>
    </div>
  );
}

function StepCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {steps.map((step) => {
        const Icon = step.Icon;
        return (
          <div
            key={step.number}
            className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-md"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: step.bg }}
            >
              <Icon className="h-5 w-5" style={{ color: step.color }} strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: step.color }}>
                  {step.number}
                </span>
                <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function OurApproach() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">
          <ApproachCard />

          <div className="w-full min-w-0 lg:flex-1">
            <h2 className="mb-3 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Our <span className="text-[#74c316]">Approach</span>
            </h2>

            <div className="mb-8">
              <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
                {FULL_TEXT}
              </p>
            </div>

            <StepCards />

            <div className="mt-8 grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold whitespace-nowrap text-white bg-[#74c316] shadow-md w-full transition-all duration-300 hover:scale-[1.02] sm:w-auto sm:px-7"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>

              <Link
                href="/about"
                className="group flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold whitespace-nowrap bg-white text-gray-700 border border-gray-200 w-full transition-all duration-300 hover:border-[#74c316] hover:text-[#74c316] sm:w-auto sm:px-7"
              >
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}