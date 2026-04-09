"use client";

import { useEffect, useRef, useState } from "react";

interface CapabilityCardProps {
  index: number;
  title: string;
  desc: string;
}

export function CapabilityCard({ index, title, desc }: CapabilityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={`group relative overflow-hidden rounded-[20px] p-6
                  bg-white border border-black/6
                  transition-all duration-500 ease-out
                  hover:border-[#74c316]/40 hover:shadow-[0_8px_32px_rgba(116,194,22,0.12)]
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px
                    bg-linear-to-r from-transparent via-[#74c316]/40 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Number badge */}
      <div
        className="inline-flex items-center justify-center w-9 h-9 rounded-full
                    bg-[#74c316]/10 border border-[#74c316]/20 mb-4
                    text-[0.75rem] font-black text-[#74c316] tracking-wider
                    group-hover:bg-[#74c316] group-hover:text-[#020504]
                    transition-all duration-300"
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <h3 className="text-[1rem] font-extrabold text-black leading-snug mb-2">
        {title}
      </h3>
      <p className="text-[0.875rem] leading-[1.7] text-black/55">{desc}</p>

      {/* Hover glow */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-full pointer-events-none
                    bg-[radial-gradient(circle,rgba(116,194,22,0.12),transparent_70%)]
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
}