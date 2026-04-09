"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-99999 flex items-center justify-center bg-white"
        >
          {/* Gradient defs */}
          <svg
            height="0"
            width="0"
            viewBox="0 0 64 64"
            aria-hidden="true"
            style={{ position: "absolute", overflow: "hidden" }}
          >
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="0" x2="0" y1="64" x1="0"
                id="preloader-gradient"
              >
                <stop stopColor="#5fa010" />
                <stop stopColor="#74c316" offset="1" />
                <animateTransform
                  repeatCount="indefinite"
                  keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                  keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                  dur="8s"
                  values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                  type="rotate"
                  attributeName="gradientTransform"
                />
              </linearGradient>
            </defs>
          </svg>

          <div
            className="flex flex-col items-center gap-6"
            style={{ width: "100%", maxWidth: "clamp(180px, 55vw, 520px)", padding: "0 24px" }}
          >
            {/* Text SVG with draw animation */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 120"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Ephorsys"
              role="img"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Syne', sans-serif"
                fontWeight="800"
                fontSize="32"
                letterSpacing="6"
                stroke="url(#preloader-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "draw 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                }}
              >
                EPHORSYS
              </text>

              {/* Shimmer / fill fade-in after draw */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Syne', sans-serif"
                fontWeight="800"
                fontSize="32"
                letterSpacing="6"
                fill="url(#preloader-gradient)"
                style={{
                  opacity: 0,
                  animation: "fillin 0.6s ease forwards 1.8s",
                }}
              >
                EPHORSYS
              </text>

              <style>{`
                @keyframes draw {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                @keyframes fillin {
                  from { opacity: 0; }
                  to   { opacity: 0.15; }
                }
              `}</style>
            </svg>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "#e5e7eb",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, #5fa010, #74c316)",
                  animation: "progress 2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                  transformOrigin: "left",
                }}
              />
            </div>

            <style>{`
              @keyframes progress {
                from { width: 0%; }
                to   { width: 100%; }
              }
            `}</style>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


