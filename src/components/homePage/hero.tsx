"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const hexRef = useRef(null);

  const statsRows = [
    { icon: "〜", label: "Projects Delivered", val: "13+" },
    { icon: "◷", label: "Active Clients", val: "15+" },
    { icon: "○", label: "Success Rates", val: "98%" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600&display=swap');

        :root {
          --green: #74c316;
          --green-dark: #74c316;
          --bg: #eef4ee;
          --text-dark: #0d1f0d;
          --text-muted: #4a604a;
        }

        body { font-family: 'Inter', sans-serif; }
        .font-syne { font-family: 'Syne', sans-serif !important; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.3); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(6px); }
        }

        .animate-pulse-dot     { animation: pulse     2s   ease-in-out infinite; }
        .animate-float-up      { animation: floatUp   3s   ease-in-out infinite; }
        .animate-float-up-slow { animation: floatUp   4s   ease-in-out infinite; }
        .animate-float-down    { animation: floatDown 3.5s ease-in-out infinite; }

        .hexagon {
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          background: #74c316;
        }

        .btn-primary:hover  { background: #74c316 !important; }
        .btn-secondary:hover { border-color: #74c316 !important; }
      `}</style>

      <div className="min-h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
        <section className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen
                            px-5 sm:px-8 md:px-12 lg:px-[5vw]
                            gap-8 max-w-350 mx-auto
                            pb-16 ">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5 sm:gap-6 z-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#d4e8d4]
                            rounded-md px-3 py-1.5 w-fit
                            text-xs sm:text-xs md:text-lg lg:text-sm font-semibold tracking-widest mt-9"
              style={{ color: "var(--text-dark)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse-dot "
                style={{ background: "var(--green-dark)" }} />
              <h4 className="">EPHORSYS</h4>
            </div>

            {/* Headline */}
            <h1 className="font-syne text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold
                           leading-[1.05] tracking-tight"
              style={{ color: "var(--text-dark)" }}>
              software that<br />
              drive{" "}
              <span className="inline-block rounded-lg mr-4 text-[95%] pr-1"
                style={{ background: "var(--green)", color: "var(--text-dark)" }}>
                innovation
              </span>
            </h1>

            {/* Sub */}
            <p className="text-sm sm:text-base leading-relaxed max-w-105"
              style={{ color: "var(--text-muted)" }}>
              Our solutions are designed with modern architecture, high performance, and reliability at their core—empowering businesses to adapt, evolve, and succeed in a fast-changing digital world.
            </p>

            {/* CTAs */}
            <div className="flex flex-row flex-wrap gap-3">
              <button onClick={() => router.push("/contact")} className="btn-primary rounded-full px-4 py-2 text-sm font-semibold
                     text-white border-none cursor-pointer transition-all duration-200
                     hover:-translate-y-0.5"
                style={{ background: "var(--text-dark)", fontFamily: "Inter, sans-serif" }}>
                <h4>Start Building</h4>
              </button>
              <button onClick={() => router.push("/blog")} className="btn-secondary rounded-full px-5 py-2 text-sm font-semibold
                     cursor-pointer transition-all duration-200 hover:-translate-y-0.5
                     bg-transparent border-[1.5px] border-[#b8d0b8]"
                style={{ color: "var(--text-dark)", fontFamily: "Inter, sans-serif" }}>
                <h4>Read Docs</h4>
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════
              MOBILE / TABLET  (< lg)
              Cards stack vertically — NO overlap
          ══════════════════════════════════════ */}
          <div className="flex lg:hidden flex-col gap-4 w-full">

            {/* Decorative hex banner */}


            {/* Uptime card */}
            <div className="animate-float-up bg-white rounded-2xl px-5 py-4
                            shadow-[0_6px_30px_rgba(0,0,0,0.10)]">
              <div className="font-syne text-3xl font-extrabold leading-none"
                style={{ color: "var(--green-dark)" }}>
                99.9%
              </div>
              <div className="text-[0.7rem] font-bold tracking-widest mt-1"
                style={{ color: "var(--text-muted)" }}>
                client satisfaction
              </div>
            </div>

            {/* Progress card */}
            <div className="animate-float-down bg-white rounded-2xl px-5 py-4
                            shadow-[0_6px_30px_rgba(0,0,0,0.10)]">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white text-[0.7rem] font-bold px-2 py-1
                                 rounded-lg tracking-wider"
                  style={{ background: "var(--text-dark)" }}>
                  Startup Progress
                </span>
                <span className="text-white text-[0.65rem] font-bold px-2 py-1
                                 rounded-lg tracking-wide"
                  style={{ background: "var(--text-dark)" }}>
                  Live Status
                </span>
              </div>

              {statsRows.map(({ icon, label, val }) => (
                <div key={label}
                  className="flex justify-between items-center py-2
                                border-b border-[#f0f0f0] last:border-b-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[0.75rem]" style={{ color: "var(--text-muted)" }}>{icon}</span>
                    <span className="text-white text-[0.68rem] font-semibold
                                     px-1.5 py-0.5 rounded-[3px]"
                      style={{ background: "var(--text-dark)" }}>
                      {label}
                    </span>
                  </div>
                  <span className="text-white text-[0.7rem] font-bold px-2 py-0.5 rounded-[3px]"
                    style={{ background: "var(--text-dark)" }}>
                    {val}
                  </span>
                </div>
              ))}

              {/* Sparkline */}
              <div className="mt-3 h-11 rounded-lg overflow-hidden relative"
                style={{ background: "linear-gradient(135deg,#e6ffed 0%,#b8f5cc 100%)" }}>
                <svg className="absolute inset-0 w-full h-full"
                  viewBox="0 0 260 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cg-m" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00c944" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00c944" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 40 C30 35,60 20,90 25 C120 30,140 15,180 18 C210 20,240 28,260 22 L260 50 L0 50 Z"
                    fill="url(#cg-m)" />
                  <path d="M0 40 C30 35,60 20,90 25 C120 30,140 15,180 18 C210 20,240 28,260 22"
                    stroke="#00c944" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* Deploy card */}
            <div className="animate-float-up-slow rounded-2xl px-5 py-4
                            shadow-[0_6px_30px_rgba(0,0,0,0.20)] text-white"
              style={{ background: "var(--text-dark)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center
                              text-base mb-2" style={{ background: "var(--green)" }}>
                ⬡
              </div>
              <div className="font-syne text-[1rem] font-extrabold leading-tight mb-1">
                Effortless deployment at scale.
              </div>
              <div className="text-[0.72rem] leading-relaxed" style={{ color: "#8aad8a" }}>
                High performance, security, and reliability—built in.
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════
              DESKTOP  (lg+)
              Absolute-positioned cards over hexagon
          ══════════════════════════════════════ */}
          <div className="hidden lg:flex relative items-center justify-center h-145">

            {/* Hexagon */}
            <div ref={hexRef}
              className="absolute -right-15 top-1/2 -translate-y-1/2
                             w-130 h-130"
              style={{ transformOrigin: "center center" }}>
              <div className="hexagon w-full h-full" />
            </div>

            {/* Uptime Card */}
            <div className="animate-float-up absolute top-15 left-5
                            bg-white rounded-2xl p-5
                            shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-10">
              <div className="font-syne text-[2.4rem] font-extrabold leading-none"
                style={{ color: "var(--green-dark)" }}>
                99.9%
              </div>
              <div className="text-[0.7rem] font-bold tracking-widest mt-1"
                style={{ color: "var(--text-muted)" }}>
                client satisfaction
              </div>
            </div>

            {/* Cluster Card */}
            <div className="animate-float-down absolute top-20 right-0 w-75
                            bg-white rounded-2xl p-5
                            shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white text-[0.7rem] font-bold px-2 py-1
                                 rounded-lg tracking-wider"
                  style={{ background: "var(--text-dark)" }}>
                  Startup Progress
                </span>
                <span className="text-white text-[0.65rem] font-bold px-2 py-1
                                 rounded-lg tracking-wide"
                  style={{ background: "var(--text-dark)" }}>
                  Live Status
                </span>
              </div>

              {statsRows.map(({ icon, label, val }) => (
                <div key={label}
                  className="flex justify-between items-center py-2
                                border-b border-[#f0f0f0] last:border-b-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[0.75rem]" style={{ color: "var(--text-muted)" }}>{icon}</span>
                    <span className="text-white text-[0.68rem] font-semibold
                                     px-1.5 py-0.5 rounded-[3px]"
                      style={{ background: "var(--text-dark)" }}>
                      {label}
                    </span>
                  </div>
                  <span className="text-white text-[0.7rem] font-bold px-2 py-0.5 rounded-[3px]"
                    style={{ background: "var(--text-dark)" }}>
                    {val}
                  </span>
                </div>
              ))}

              <div className="mt-4 h-12.5 rounded-lg overflow-hidden relative"
                style={{ background: "linear-gradient(135deg,#e6ffed 0%,#b8f5cc 100%)" }}>
                <svg className="absolute inset-0 w-full h-full"
                  viewBox="0 0 260 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cg-d" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00c944" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00c944" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 40 C30 35,60 20,90 25 C120 30,140 15,180 18 C210 20,240 28,260 22 L260 50 L0 50 Z"
                    fill="url(#cg-d)" />
                  <path d="M0 40 C30 35,60 20,90 25 C120 30,140 15,180 18 C210 20,240 28,260 22"
                    stroke="#00c944" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* Deploy Card */}
            <div className="animate-float-up-slow absolute bottom-15 -right-5 w-52.5
                            rounded-2xl p-5
                            shadow-[0_8px_40px_rgba(0,0,0,0.25)] z-20 text-white"
              style={{ background: "var(--text-dark)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center
                              text-base mb-3" style={{ background: "var(--green)" }}>
                ⬡
              </div>
              <div className="font-syne text-[1rem] font-extrabold leading-tight mb-1.5">
                Effortless deployment at scale.
              </div>
              <div className="text-[0.72rem] leading-relaxed" style={{ color: "#8aad8a" }}>
                High performance, security, and reliability—built in.
              </div>
            </div>

          </div>

        </section>
      </div>
    </>
  );
}