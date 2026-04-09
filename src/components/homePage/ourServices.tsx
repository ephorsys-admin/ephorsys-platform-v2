"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { services, type Service } from "@/lib/image-data";


// ─── Hidden preloader: renders all images as real DOM <img> tags ───────────
// The browser prioritizes these, caches them, and they're ready before hover.
function ImagePreloader() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0,
        zIndex: -1,
      }}
    >
      {services.map((service) => (
        <img
          key={service.id}
          src={service.image}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={340}
          height={255}
        />
      ))}
    </div>
  );
}


export default function ServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY, isTouchDevice]);

  // ── Removed the old JS Image() preload useEffect — DOM preloader above handles it ──

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        fontFamily:
          "'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "#fff",
        position: "relative",
        overflowX: "hidden",
        padding: "0",
      }}
    >
      {/* ── Preload all hover images immediately on mount ── */}
      <ImagePreloader />

      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "140vw",
          height: "100vh",
          background:
            "radial-gradient(ellipse, rgba(116,195,22,0.45) 0%, rgba(4,36,7,0.6) 40%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={
              isTouchDevice
                ? {
                    position: "fixed",
                    right: "clamp(12px, 5vw, 48px)",
                    top: "clamp(12px, 5vw, 48px)",
                    width: "clamp(120px, 36vw, 220px)",
                    aspectRatio: "4/3",
                    borderRadius: "6px",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 50,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                  }
                : {
                    position: "fixed",
                    left: springX,
                    top: springY,
                    translateX: "-50%",
                    translateY: "-60%",
                    width: "clamp(200px, 22vw, 340px)",
                    aspectRatio: "4/3",
                    borderRadius: "4px",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 50,
                    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
                  }
            }
          >
            <img
              src={services[activeIndex].image}
              alt={services[activeIndex].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(30%) contrast(1.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(160,50,20,0.15) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          padding: "clamp(12px, 1.5vw, 24px) clamp(20px, 5vw, 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.h2
          className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl mb-10 mt-10"
        >
          <span className="text-[#ffffff]">Our</span>{" "}
          <span className="text-[#74c316]">Services</span>
        </motion.h2>

        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "clamp(11px, 1.2vw, 13px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 500,
          }}
        >
          Est. 2025
        </motion.span>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 0 clamp(16px, 2vw, 32px) 0",
        }}
        className="cursor-pointer"
      >
        {services.map((service, i) => (
          <Link key={service.id} href={service.href}>
            <div>
              <ServiceRow
                service={service}
                index={i}
                isHovered={activeIndex === i}
                isAnyHovered={activeIndex !== null}
                isTouchDevice={isTouchDevice}
                onHover={() => setActiveIndex(i)}
                onLeave={() => setActiveIndex(null)}
                onTap={() =>
                  setActiveIndex((prev) => (prev === i ? null : i))
                }
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  index,
  isHovered,
  isAnyHovered,
  isTouchDevice,
  onHover,
  onLeave,
  onTap,
}: {
  service: (typeof services)[0];
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  isTouchDevice: boolean;
  onHover: () => void;
  onLeave: () => void;
  onTap: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 * index, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={!isTouchDevice ? onHover : undefined}
      onMouseLeave={!isTouchDevice ? onLeave : undefined}
      onTouchStart={isTouchDevice ? onTap : undefined}
      style={{
        borderTop: `1px solid rgba(255,255,255,${isHovered ? 0.15 : 0.07})`,
        cursor: "default",
        transition: "border-color 0.3s ease",
      }}
    >
      <div
        className="grid-service-row"
        style={{
          display: "grid",
          alignItems: "start",
          gap: "0 clamp(8px, 2vw, 24px)",
          padding: "clamp(14px, 2.2vw, 28px) clamp(16px, 5vw, 72px)",
          transition: "all 0.4s ease",
        }}
      >
        {/* Col 1 — Index */}
        <motion.span
          animate={{ color: isHovered ? service.accent : "#74c316" }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "clamp(9px, 1vw, 12px)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            lineHeight: 1,
            paddingTop: "6px",
            whiteSpace: "nowrap",
          }}
        >
          {service.id}
        </motion.span>

        {/* Col 2 — Title + mobile description */}
        <motion.div
          animate={{
            opacity: isAnyHovered ? (isHovered ? 1 : 0.28) : 1,
            x: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ minWidth: 0 }}
        >
          <h2
            style={{
              fontSize: "clamp(13px, 2vw, 28px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: 0,
              color: "#ffffff",
            }}
            className="cursor-pointer"
          >
            {service.title}
          </h2>

          <p
            className="services-desc-mobile"
            style={{
              fontSize: "13px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.5)",
              margin: "8px 0 0 0",
            }}
          >
            {service.description}
          </p>
        </motion.div>

        {/* Col 3 — Description tablet + desktop */}
        <motion.p
          className="desktop-desc-col cursor-pointer"
          animate={{
            opacity: isHovered ? 0.75 : isAnyHovered ? 0.15 : 0.45,
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: "clamp(10px, 1.05vw, 13.5px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.6)",
            margin: "2px 0 0 0",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {service.description}
        </motion.p>

        {/* Col 4 — Arrow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            justifySelf: "end",
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(14px, 1.6vw, 22px)",
            whiteSpace: "nowrap",
            paddingTop: "4px",
          }}
        >
          →
        </motion.div>
      </div>

      <motion.div
        animate={{
          scaleX: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "1px",
          background: "#74c316",
          transformOrigin: "left",
          marginLeft: "clamp(16px, 5vw, 72px)",
        }}
      />

      <style>{`
        .services-desc-mobile { display: block; }
        .desktop-desc-col { display: none !important; }
        .grid-service-row {
          grid-template-columns: clamp(24px, 4vw, 56px) 1fr clamp(20px, 3vw, 48px);
        }
        @media (min-width: 768px) {
          .services-desc-mobile { display: none !important; }
          .desktop-desc-col { display: -webkit-box !important; }
          .grid-service-row {
            grid-template-columns: clamp(24px, 4vw, 56px) 1fr clamp(200px, 30vw, 380px) clamp(20px, 3vw, 48px);
          }
        }
      `}</style>
    </motion.div>
  );
}