"use client";

import { Star } from "lucide-react";

const services = [
  "UI/UX DESIGN",
  "PRODUCT DESIGN",
  "WEB DEVELOPMENT",
  "BRANDING",
  "WEBSITE DESIGN",
  "DIGITAL MARKETING",
  "SEO OPTIMIZATION",
  "CLOUD SOLUTIONS",
  "MOBILE APPS",
];

export default function SlidingService() {
  const items = [...services, ...services, ...services];

  return (
    <div className="w-full bg-[#021a0a]/98 overflow-hidden py-3.5 select-none group">
      <div className="flex w-max animate-marquee group-hover:paused">
        {items.map((service, i) => (
          <div key={i} className="flex items-center gap-4 px-5 shrink-0">
            <span className="text-white font-semibold text-sm sm:text-base tracking-widest whitespace-nowrap">
              {service}
            </span>
            <Star className="text-white/60 w-3.5 h-3.5 shrink-0" fill="currentColor" />
          </div>
        ))}
      </div>
    </div>
  );
}