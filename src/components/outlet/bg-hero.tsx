"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
}

interface BgHeroProps {
  tag?: string;
  tagIcon?: LucideIcon;
  heading: React.ReactNode;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctas?: HeroCTA[];
  align?: "center" | "left";
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BgHero({
  tag,
  tagIcon: TagIcon,
  heading,
  description,
  imageSrc,
  imageAlt = "Hero background",
  ctas = [],
  align = "center",
  className = "",
}: BgHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight: "62vh" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap');
      `}</style>

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.38) contrast(1.1) saturate(0.85)" }}
            priority
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #071a07 0%, #0a2a0a 40%, #0d1f0d 100%)",
            }}
          />
        )}

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,18,6,0.55) 0%, rgba(6,18,6,0.35) 50%, rgba(6,18,6,0.88) 100%)",
          }}
        />

        {/* Green radial glow at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(116,194,22,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Fine dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(116,194,22,0.09) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Subtle horizontal rules */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: "38%", height: 1, background: "rgba(255,255,255,0.04)" }}
        />
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: "62%", height: 1, background: "rgba(255,255,255,0.03)" }}
        />
      </div>

      {/* ── Content ── */}
      <div
        className={`relative z-10 flex flex-col w-full max-w-6xl mx-auto
                    px-4 sm:px-8 lg:px-12
                    pt-20 pb-16 sm:pt-28 sm:pb-24
                    ${isCenter ? "items-center text-center" : "items-start text-left"}`}
      >
        {/* Tag pill */}
        {tag && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-5 sm:mb-7"
            style={{
              padding: "6px 16px",
              borderRadius: 99,
              border: "1px solid rgba(116,194,22,0.3)",
              background: "rgba(116,194,22,0.08)",
              backdropFilter: "blur(8px)",
            }}
          >
            {TagIcon && (
              <TagIcon
                style={{ color: "#74c316", width: 13, height: 13 }}
                strokeWidth={2.5}
              />
            )}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#9ed44e",
              }}
            >
              {tag}
            </span>
          </motion.div>
        )}

        {/* ✅ FIXED Heading — clamp now starts at 1.75rem on tiny screens */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.07 }}
          className={`w-full ${isCenter ? "max-w-4xl" : "max-w-3xl"}`}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            /* 
              xs (320px) → ~1.75rem  (28px)
              sm (640px) → ~2.8rem   (45px)
              lg (1024px)→ ~4.6rem   (74px)
              clamp(min, preferred, max)
            */
            fontSize: "clamp(1.75rem, 5vw + 0.5rem, 4.6rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            margin: 0,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {heading}
        </motion.h1>

        {/* Green accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{
            marginTop: 16,
            width: 48,
            height: 3,
            borderRadius: 99,
            background: "#74c316",
            transformOrigin: isCenter ? "center" : "left",
          }}
        />

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className={`w-full ${isCenter ? "max-w-xl" : "max-w-lg"}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.85rem, 1.5vw + 0.3rem, 1.05rem)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.48)",
              marginTop: 18,
            }}
          >
            {description}
          </motion.p>
        )}

        {/* CTAs */}
        {ctas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className={`flex flex-wrap gap-3 mt-7 sm:mt-8 ${isCenter ? "justify-center" : ""}`}
          >
            {ctas.map((cta, i) => {
              const isPrimary =
                (cta.variant ?? (i === 0 ? "primary" : "outline")) === "primary";
              const Tag = cta.href ? "a" : "button";

              return (
                <Tag
                  key={cta.label}
                  href={cta.href}
                  onClick={cta.onClick}
                  className="group inline-flex items-center justify-center gap-2 cursor-pointer
                     transition-all duration-200 hover:-translate-y-px whitespace-nowrap"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    height: 44,
                    padding: "0 22px",
                    minWidth: 130,
                    borderRadius: 99,
                    textDecoration: "none",
                    boxSizing: "border-box",
                    ...(isPrimary
                      ? {
                          background: "#74c316",
                          color: "#071a07",
                          border: "2px solid #74c316",
                          boxShadow: "0 4px 20px rgba(116,194,22,0.3)",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(255,255,255,0.75)",
                          border: "2px solid rgba(255,255,255,0.16)",
                        }),
                  }}
                >
                  {cta.label}
                </Tag>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom fade edge */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: 80,
          background: "linear-gradient(to top, #061206 0%, transparent 100%)",
        }}
      />
    </section>
  );
}