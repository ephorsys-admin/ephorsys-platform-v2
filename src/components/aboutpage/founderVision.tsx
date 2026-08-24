"use client";

import Image from "next/image";

interface FounderVisionProps {
  eyebrow?: string;
  heading?: string;
  quote?: string;
  founderName?: string;
  founderTitle?: string;
  companyName?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function FounderVision({
  eyebrow = "FROM THE FOUNDER & CEO",
  heading = "Why I Built Ephorsys",
  quote = "I started Ephorsys because I believed there was a better way — one where the people who understand your vision are the same people who build it. My goal has always been straightforward: to create a company that businesses can genuinely trust, not just to deliver software, but to become a long-term partner in their growth. Every decision I make, every team member I bring on, and every solution we ship is guided by that same commitment.",
  founderName = "Dipti Ranjan Sahoo",
  founderTitle = "CEO & Founder",
  companyName = "EPHORSYS",
  imageSrc = "https://res.cloudinary.com/devrmpo2p/image/upload/v1775717718/WhatsApp_Image_2026-04-09_at_12.23.19_PM_ds7yuk.jpg",
  imageAlt = "Founder",
}: FounderVisionProps) {
  return (
    <section className="w-full py-16 px-4 sm:px-8 bg-brand-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">
        {/* ── Left: Text ── */}
        <div className="flex-1 min-w-0">
          {/* Eyebrow — same pattern as WhatWeDo's inline span */}
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#74c316]">
            {eyebrow}
          </p>

          {/* Heading — mirrors WhatWeDo h2 exactly */}
          <h2 className="mb-7 text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          {/* Quote — body text, same weight/color family as WhatWeDo paragraphs */}
          <p className="mb-8 text-lg leading-8 text-gray-600 italic sm:text-xl">
            &ldquo;{quote}&rdquo;
          </p>

          {/* Divider */}
          <hr className="mb-7 border-t border-gray-200" />

          {/* Founder name + title + company */}
          <div>
            <p className="text-base font-bold leading-tight text-black">
              {founderName}
            </p>
            {founderTitle && (
              <p className="mt-0.5 text-sm text-gray-500">{founderTitle}</p>
            )}
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#74c316]">
              {companyName}
            </p>
          </div>
        </div>

        {/* ── Right: Circular Photo ── */}
        <div className="flex w-full flex-shrink-0 items-center justify-center lg:w-auto lg:justify-end">
          <div
            className="relative h-64 w-64 overflow-hidden rounded-full sm:h-72 sm:w-72"
            style={{ background: "#e8eaed" }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 256px, 288px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderVision;
