"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "App Development",
    desc: "Custom-built applications designed to meet your business needs with scalability and efficiency.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="4"
          width="16"
          height="26"
          rx="3"
          stroke="white"
          strokeWidth="2.2"
        />
        <rect
          x="10"
          y="7"
          width="12"
          height="16"
          rx="1.5"
          fill="white"
          fillOpacity="0.25"
        />
        <circle cx="16" cy="27" r="1.5" fill="white" />
        <path
          d="M26 10h5a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2h-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 16l3 3-3 3"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Web Development",
    desc: "Robust, responsive websites that deliver seamless user experiences and drive business growth.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="7"
          width="32"
          height="22"
          rx="3"
          stroke="white"
          strokeWidth="2.2"
        />
        <path d="M4 12h32" stroke="white" strokeWidth="2" />
        <circle cx="9" cy="9.5" r="1.2" fill="white" />
        <circle cx="13.5" cy="9.5" r="1.2" fill="white" />
        <circle cx="18" cy="9.5" r="1.2" fill="white" />
        <path
          d="M13 20l4 4-4 4"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 33h16"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20 29v4"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven marketing strategies to increase brand awareness, engagement, and conversions.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 28 L8 20 L14 17 L20 12 L26 15 L32 8"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="32"
          cy="8"
          r="3"
          fill="white"
          fillOpacity="0.5"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M6 32h28"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M8 28v4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 22v10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 18v14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M26 20v12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "SEO Optimization",
    desc: "Advanced SEO techniques to improve search visibility, drive traffic, and boost online presence.",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="18" cy="18" r="10" stroke="white" strokeWidth="2.2" />
        <path
          d="M25.5 25.5L34 34"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M14 18h8M18 14v8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="18"
          cy="18"
          r="5"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </svg>
    ),
  },
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className={[
        "group relative flex flex-col items-center overflow-hidden rounded-2xl",
        "border-[1.5px] p-6 text-center cursor-pointer",
        "hover:bg-linear-to-br ",
      ].join(" ")}
    >
      {/* Icon blob */}
      <div
        className={[
          "mb-5 flex h-18 w-18 items-center justify-center",
          "rounded-[40%_60%_60%_40%/40%_40%_60%_60%]",
          "bg-linear-to-br from-brand-secondary to-brand-primary",
          "group-hover:bg-white/20 group-hover:shadow-[0_0_0_4px_rgba(255,255,255,0.15)]",
          "transition-all duration-300",
        ].join(" ")}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-bold text-[#74c316] transition-colors duration-300 ">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mb-6 flex-1 text-sm leading-relaxed transition-colors duration-300 text-shadow-brand-light">
        {service.desc}
      </p>

      <Button
        variant="default"
        size="sm"
        className={["mt-auto gap-2 rounded-lg font-semibold"].join(" ")}
      >
        Read More
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      </Button>

      {/* Bottom accent line */}
      <span
        className={[
          "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.75 rounded-full",
          "w-0 group-hover:w-[60%] bg-white/35",
          "transition-all duration-300",
        ].join(" ")}
      />
    </motion.div>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(110,84,243,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(110,84,243,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >

          <h2 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            Innovative IT Services
            <br />
            <span className="text-black">Tailored </span>
            <span className="text-[#74c316]">For Your Success.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            Comprehensive technology services to power your business forward
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
