"use client";

import { BackgroundPaths } from "@/components/ui/background-paths";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaGitAlt, FaNpm, FaHtml5, FaJsSquare, FaDatabase, FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiTypescript, SiMongodb, SiExpress,
  SiTailwindcss, SiSupabase, SiPrisma, SiCloudflare,
  SiDigitalocean, SiOpenai, SiRedis, SiPostgresql,
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaReact,        color: "#61DAFB", label: "React" },
  { Icon: FaAws,          color: "#FF9900", label: "AWS" },
  { Icon: FaDocker,       color: "#2496ED", label: "Docker" },
  { Icon: FaNodeJs,       color: "#339933", label: "Node.js" },
  { Icon: SiNextdotjs,    color: "#ffffff", label: "Next.js" },
  { Icon: SiVercel,       color: "#ffffff", label: "Vercel" },
  { Icon: SiTypescript,   color: "#3178C6", label: "TypeScript" },
  { Icon: FaGithub,       color: "#ffffff", label: "GitHub" },
  { Icon: FaGitAlt,       color: "#F05032", label: "Git" },
  { Icon: FaNpm,          color: "#CB3837", label: "npm" },
  { Icon: FaHtml5,        color: "#E34F26", label: "HTML5" },
  { Icon: FaJsSquare,     color: "#F7DF1E", label: "JavaScript" },
  { Icon: FaDatabase,     color: "#4DB33D", label: "Database" },
  { Icon: FaFigma,        color: "#F24E1E", label: "Figma" },
  { Icon: SiMongodb,      color: "#47A248", label: "MongoDB" },
  { Icon: SiExpress,      color: "#ffffff", label: "Express" },
  { Icon: SiTailwindcss,  color: "#06B6D4", label: "Tailwind" },
  { Icon: SiSupabase,     color: "#3ECF8E", label: "Supabase" },
  { Icon: SiPrisma,       color: "#5a67d8", label: "Prisma" },
  { Icon: SiCloudflare,   color: "#F38020", label: "Cloudflare" },
  { Icon: SiDigitalocean, color: "#0080FF", label: "DigitalOcean" },
  { Icon: SiOpenai,       color: "#ffffff", label: "OpenAI" },
  { Icon: SiRedis,        color: "#FF4438", label: "Redis" },
  { Icon: SiPostgresql,   color: "#4169E1", label: "PostgreSQL" },
];

const ORBIT_COUNT = 3;
const ORBIT_GAP   = 8;

//  MOBILE SHIFT CONTROL

const MOBILE_SHIFT = "45%";   // ← change this to move right/left

export default function Techstack() {
  const iconsPerOrbit = Math.ceil(iconConfigs.length / ORBIT_COUNT);

  return (
    <section className="relative w-full h-160 overflow-hidden dark:border-gray-700 dark:bg-black">

      {/* ── Background paths ── */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black">
        <div className="hidden lg:block w-full h-full">
          <BackgroundPaths
            title="OUR TECHNOLOGIES"
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
          />
        </div>
        <div className="lg:hidden w-full h-full">
          <BackgroundPaths
            title="OUR TECHNOLOGIES"
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            titleClassName="hidden md:block"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP  lg+  — original, untouched
      ══════════════════════════════════════ */}
      <div className="relative z-10 hidden lg:flex items-center justify-end w-full h-full">
        <div className="relative w-1/2 h-full flex items-center justify-start overflow-hidden">
          <div className="relative w-200 h-200 translate-x-[45%] flex items-center justify-center">

            <div className="w-24 h-24 rounded-full bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-700 flex items-center justify-center z-10">
              <FaReact className="w-12 h-12 text-blue-400" />
            </div>

            {Array.from({ length: ORBIT_COUNT }).map((_, orbitIdx) => {
              const size      = `${12 + ORBIT_GAP * (orbitIdx + 1)}rem`;
              const angleStep = (2 * Math.PI) / iconsPerOrbit;
              const icons     = iconConfigs.slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit);
              return (
                <div
                  key={orbitIdx}
                  className="absolute rounded-full border border-gray-600/40"
                  style={{ width: size, height: size, animation: `spin ${12 + orbitIdx * 6}s linear infinite` }}
                >
                  {icons.map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x     = 50 + 50 * Math.cos(angle);
                    const y     = 50 + 50 * Math.sin(angle);
                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-gray-900/80 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-700/50"
                        style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                      >
                        <cfg.Icon className="w-8 h-8" style={{ color: cfg.color }} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

          {/* MOBILE / TABLET  below lg
          justify-end  → aligns hub to the right side of the row */}

      <div className="relative z-10 lg:hidden flex items-center justify-end w-full h-full">
        <div
          className="orbit-hub relative shrink-0 flex items-center justify-center"
          style={{
            width:     "28rem",
            height:    "28rem",
            transform: `translateX(${MOBILE_SHIFT}) scale(clamp(0.38, calc(90vw / 448px), 1))`,
          }}
        >
          {/* CENTER ICON */}
          <div className="w-16 h-16 rounded-full bg-gray-900/80 backdrop-blur-sm shadow-lg border border-gray-700 flex items-center justify-center z-10 absolute">
            <FaReact className="w-8 h-8 text-blue-400" />
          </div>

          {/* ORBIT RINGS */}
          {Array.from({ length: ORBIT_COUNT }).map((_, orbitIdx) => {
            const size      = `${12 + ORBIT_GAP * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;
            const icons     = iconConfigs.slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit);
            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-gray-600/40"
                style={{ width: size, height: size, animation: `spin ${12 + orbitIdx * 6}s linear infinite` }}
              >
                {icons.map((cfg, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x     = 50 + 50 * Math.cos(angle);
                  const y     = 50 + 50 * Math.sin(angle);
                  return (
                    <div
                      key={iconIdx}
                      className="absolute bg-gray-900/80 backdrop-blur-sm rounded-full p-1 shadow-md border border-gray-700/50"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                    >
                      <cfg.Icon className="w-11 h-11" style={{ color: cfg.color }} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}