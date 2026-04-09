"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CryptoIcon {
  icon: React.ReactNode;
  label: string;
  position: { x: string; y: string };
}

interface Web3MediaHeroProps {
  logo?: string;
  contactButton?: {
    label: string;
    href: string;
  };
  title: string;
  highlightedText?: string;
  subtitle: string;
  ctaButton?: {
    label: string;
    href: string;
  };
  cryptoIcons?: CryptoIcon[];
  trustedByText?: string;
  brands?: Array<{
    name: string;
    logo: React.ReactNode;
  }>;
  className?: string;
}

export function Web3MediaHero({
  logo = "",
  contactButton,
  title,
  highlightedText = "Web3 Visibility",
  subtitle,
  ctaButton,
  cryptoIcons = [],
  trustedByText = "Trusted by",
  brands = [],
  className,
}: Web3MediaHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex flex-col overflow-hidden bg-white",
        className
      )}
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex justify-between items-center px-6 lg:px-16 py-6"
      >
        <div className="text-black font-semibold text-lg">{logo}</div>

        {contactButton && (
          <Link
            href={contactButton.href}
            className="px-5 py-2 rounded-full border border-black/20 text-black hover:scale-105 transition text-sm"
          >
            {contactButton.label}
          </Link>
        )}
      </motion.header>

      {/* Floating Icons */}
      {cryptoIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-20 flex flex-col items-center gap-2"
          style={{
            left: item.position.x,
            top: item.position.y,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: index * 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="bg-white shadow-md rounded-full p-3 border border-black/10">
            {item.icon}
          </div>

          <span className="text-xs text-black font-medium">
            {item.label}
          </span>
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 lg:px-8 pt-16 md:pt-20 lg:pt-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-6 md:space-y-8"
        >
          <div className="text-black/60 text-xs tracking-widest">
            {logo}
          </div>

          <h1 className="text-black font-medium leading-tight text-[clamp(28px,5vw,64px)]">
            {title}
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-transparent bg-clip-text font-semibold">
              {highlightedText}
            </span>
          </h1>

          <p className="text-black/70 max-w-xl mx-auto text-sm md:text-base">
            {subtitle}
          </p>

          {ctaButton && (
            <Link
              href={ctaButton.href}
              className="inline-block px-7 py-3 border border-black/20 text-black rounded-md hover:scale-105 transition text-sm md:text-base"
            >
              {ctaButton.label}
            </Link>
          )}
        </motion.div>
      </div>

      {/* Brand Slider */}
      {brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full overflow-hidden pb-16"
        >
          <div className="text-center mb-8 text-black/50 uppercase tracking-widest text-xs">
            {trustedByText}
          </div>

          <motion.div
            className="flex items-center gap-16 md:gap-20 pl-10 md:pl-20"
            animate={{
              x: [0, -(brands.length * 200)],
            }}
            transition={{
              repeat: Infinity,
              duration: brands.length * 6,
              ease: "linear",
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 opacity-60 hover:opacity-100 transition"
              >
                {brand.logo}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}