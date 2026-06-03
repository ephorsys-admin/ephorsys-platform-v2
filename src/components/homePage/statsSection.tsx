"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    number: 25,
    suffix: "+",
    label: "Projects Completed",
    description: "Shipped across SaaS, e-commerce & enterprise",
  },
  {
    number: 30,
    suffix: "+",
    label: "Happy Clients",
    description: "5-star reviews across every engagement",
  },
  {
    number: 15,
    suffix: "+",
    label: "Team Members",
    description: "Designers, engineers & growth specialists",
  },
  {
    number: 99,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "On-time delivery, every single project",
  },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!started || ran.current) return;
    ran.current = true;

    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(ease(p) * target));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return value;
}

function StatCard({
  stat,
  index,
  started,
}: {
  stat: (typeof stats)[0];
  index: number;
  started: boolean;
}) {
  const count = useCountUp(stat.number, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col gap-3"
    >
      <span className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#74c316] font-medium">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="text-[clamp(32px,9vw,88px)] md:text-[clamp(36px,5vw,88px)] lg:text-[clamp(52px,6vw,88px)] font-extrabold tracking-[-0.04em] leading-none text-[#042407]">
        {count}
        <span className="text-[#74c316]">{stat.suffix}</span>
      </div>

      <p className="text-[13px] sm:text-[14px] md:text-[13px] lg:text-[15px] font-semibold text-[#042407] tracking-[-0.01em]">
        {stat.label}
      </p>

      {/* <p className="hidden sm:block text-[11px] sm:text-[12px] md:text-[11px] lg:text-[12.5px] text-[#042407] leading-relaxed">
        {stat.description}
      </p> */}
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-white rounded-[16px] relative overflow-hidden w-full
      px-8 sm:px-10 md:px-12 lg:px-20 xl:px-28
      py-8 sm:py-10 md:py-12 lg:py-14"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8 sm:mb-10 md:mb-12 lg:mb-8"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#74c316]" />
        <span
          className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#042407]"
          style={{ fontFamily: "monospace" }}
        >
          Numbers that speak
        </span>
      </motion.div>

      {/* 2 cols on mobile & tablet, 4 on desktop */}
      <div className="grid text-center grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-8 lg:text-start md:text-center lg:gap-x-14">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} started={isInView} />
        ))}
      </div>
    </section>
  );
}