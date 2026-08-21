import Image from "next/image";
import Link from "next/link";

export default function Industry() {
    return (
        <section className="bg-white px-4 sm:px-8 lg:px-16 py-10 sm:py-12 lg:py-14 border-b border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 md:gap-10 lg:gap-14 items-center">

                    {/* ── LEFT ──────────────────────────────── */}
                    <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">

                        {/* Top label row */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#74c316] animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#74c316]">
                                    Ephorsys
                                </span>
                            </div>
                            <span className="w-px h-3 bg-gray-200" />
                            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                                Knowledge Hub
                            </span>
                        </div>

                        {/* Main heading */}
                        <h1 className="text-[2.2rem] sm:text-4xl md:text-3xl lg:text-5xl xl:text-[3.6rem] font-black text-gray-900 leading-[1.02] tracking-tight">
                            Insights &amp;{" "}
                            <span className="relative whitespace-nowrap">
                                <span className="relative z-10 text-[#74c316]">Industry</span>

                            </span>{" "}
                            Thinking.
                        </h1>

                        {/* Sub text */}
                        <p className="text-gray-500 text-sm md:text-sm lg:text-base xl:text-[17px] leading-[1.75] max-w-[520px]">
                            At{" "}
                            <span className="font-semibold text-gray-800">Ephorsys</span>, we
                            don&apos;t just build software — we share what we learn. Dive into
                            expert takes on AI, cloud architecture, digital transformation, and
                            the strategies powering the next generation of technology.
                        </p>

                        {/* Topic chips */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            {[
                                { label: "AI & Automation", color: "bg-[#74c316]/10 text-[#4a8a00] border-[#74c316]/20" },
                                { label: "Cloud Solutions", color: "bg-sky-50 text-sky-600 border-sky-100" },
                                { label: "Web Development", color: "bg-gray-100 text-gray-600 border-gray-200" },
                                { label: "IT Strategy", color: "bg-violet-50 text-violet-600 border-violet-100" },
                                { label: "UX & Design", color: "bg-amber-50 text-amber-600 border-amber-100" },
                            ].map((t) => (
                                <span
                                    key={t.label}
                                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${t.color}`}
                                >
                                    {t.label}
                                </span>
                            ))}
                        </div>

                        {/* Bottom brand strip */}

                    </div>

                    {/* ── RIGHT IMAGE ───────────────────────── */}
                    <div className="relative flex items-center justify-center md:justify-end">

                        {/* Subtle background shape */}
                        <div className="absolute inset-0 bg-[#74c316]/5 rounded-3xl -rotate-2 scale-95 -z-10" />

                        <div className="relative w-full max-w-60 md:max-w-full">

                            {/* Image — portrait, smaller aspect ratio */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-gray-200/80 aspect-[4/5]">
                                <Image
                                    src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-fauxels-3184418_j4e6fs.jpg"
                                    alt="Ephorsys team working together"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* subtle overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

                                {/* Quote overlay at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-md">
                                        <p className="text-gray-800 text-xs font-semibold leading-relaxed">
                                            &ldquo;Turning complex technology into clear, actionable
                                            insights — that&apos;s the Ephorsys way.&rdquo;
                                        </p>
                                        <div className="flex items-center gap-2 mt-2.5">
                                            <div className="w-6 h-6 rounded-full bg-[#74c316] flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-500 text-[10px] font-medium">Verified · Ephorsys</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Small floating chip — top left */}
                            <div className="absolute -top-3 -left-3 bg-white border border-gray-100 shadow-md rounded-xl px-3 py-2 flex items-center gap-2 z-10">
                                <span className="text-base">✍️</span>
                                <div className="leading-none">
                                    <p className="text-gray-900 text-[11px] font-black">Weekly Posts</p>
                                    <p className="text-gray-400 text-[9px] mt-0.5">Fresh insights</p>
                                </div>
                            </div>

                            {/* Green dot accent — bottom right */}
                       
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}