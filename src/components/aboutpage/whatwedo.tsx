"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

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

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
  

          <h2 className=" text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl">
            Built By The Same People
            <br />
            <span className="text-[#74c316]">
              Who Understand Your Vision
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
            We work closely with every client from idea to launch, keeping
            communication clear, context intact, and execution accountable.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-8 lg:p-10"
          >
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-wider text-[#74c316]">
              Who We Are
            </span>

            <h3 className="mb-5 text-2xl font-bold leading-tight text-black sm:text-3xl">
              A Team That Stays With You Beyond Launch
            </h3>

            <p className="leading-8 text-gray-600">
              We are a team of fifteen engineers, designers, marketers, and
              strategists, based in Kalinga Nagar, Bhubaneswar, and connected
              to clients across India and beyond.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We are not the biggest software company in the room. We are the
              one that will answer your message at 10pm when something breaks,
              that will tell you honestly when an idea needs more thinking
              before it gets built, and that will still be your partner two
              years after the project went live.
              If that is the kind of team you have been looking for… we should talk.
            </p>

    
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-[#74c316] p-7 text-white shadow-lg sm:p-8 lg:p-10"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-14 -left-14 h-44 w-44 rounded-full bg-white/10" />

            <div className="relative">
              <h4 className="mb-4 inline-block text-sm font-bold uppercase tracking-wider text-white/80">
                How We Work
              </h4>

              <h3 className="mb-5 text-2xl font-bold leading-tight sm:text-3xl">
                No Handoffs. No Lost Context.
              </h3>

              <p className="leading-8 text-white/90">
                Here is something we are genuinely proud of: the person who
                sits with you to understand your vision is the same person, or
                is sitting next to the same person, who writes the code that
                brings it to life.
              </p>

              <p className="mt-4 leading-8 text-white/90">
                There are no handoffs at Ephorsys. No lost context. No junior
                team quietly inheriting your project after the pitch is won.
              </p>

              <p className="mt-4 leading-8 text-white/90">
                The people who plan are the people who build. That is rarer
                than it should be, and we think it is the reason our clients
                keep coming back.
              </p>

              <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium leading-7 text-white/90">
                  Direct communication. Honest planning. Accountable execution.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}