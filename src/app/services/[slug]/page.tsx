import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { CapabilityCard } from "@/components/servicepage/CapabilityCard";

/* ─── Static params ─────────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};
  return {
    title: `${service.title}`,
    description: service.tagline,
  };
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full bg-[#020504] text-white">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden min-h-[72vh]">
        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354851/about1_wjhujv.webp"
            alt={service.title}
            fill
            className="object-cover brightness-[0.32] contrast-[1.1] saturate-[0.8]"
            priority
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-[#020504]/50 via-[#020504]/30 to-[#020504]/95" />
          {/* Green radial glow */}
          <div className="absolute pointer-events-none -top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(116,194,22,0.10)_0%,transparent_65%)]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle,#74c316 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Hero content */}
        <div
          className="
            relative z-10 flex flex-col items-center justify-center text-center
            w-full max-w-5xl mx-auto
            px-4 sm:px-8
            pt-[clamp(90px,16vw,160px)] pb-[clamp(64px,10vw,120px)]
          "
        >
          {/* Service tag */}
          <div
            className="
              inline-flex items-center gap-2 rounded-full
              px-4 py-1.5 mb-5 sm:mb-6
              bg-[#74c316]/10 border border-[#74c316]/30
              text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#9ed44e]
            "
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#74c316]" />
            Our Services
          </div>

          {/* Title */}
          <h1
            className="
              text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold  leading-[1.02] tracking-[-0.025em]
              text-white mb-4
            "
          >
            {service.title}
          </h1>

          {/* Tagline */}
          <p
            className="
              text-[clamp(0.95rem,2vw,1.2rem)] font-normal leading-[1.7]
              text-[rgba(197,224,138,0.85)]
              max-w-[90%] sm:max-w-160 lg:max-w-155
              mb-8
            "
          >
            {service.tagline}
          </p>

          {/* Hero stats */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {service.heroStats.map((s) => (
              <div
                key={s.label}
                className="
                  flex flex-col items-center rounded-[14px]
                  px-4 sm:px-5.5 py-2.5 sm:py-3
                  bg-white/4 border border-[#74c316]/20 backdrop-blur-sm
                  min-w-20 sm:min-w-25
                "
              >
                <span className="text-[1.4rem] sm:text-[1.6rem] font-black leading-none text-[#74c316]">
                  {s.value}
                </span>
                <span className="mt-1 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-white/40">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#020504] to-transparent pointer-events-none z-10" />
      </section>

      {/*  2. OVERVIEW  */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-start">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#74c316]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
                Overview
              </span>
            </div>

            <h2
              className="
                text-[clamp(1.7rem,3.5vw,2.8rem)] font-extrabold
                leading-[1.1] tracking-[-0.02em] text-white mb-6
              "
            >
              Empowering your business with elite{" "}
              <span className="text-[#74c316]">{service.title}</span> solutions
            </h2>

            <p className="text-[clamp(0.875rem,1.4vw,1.05rem)] leading-[1.8] text-[rgba(197,224,138,0.75)] mb-8">
              {service.longDescription}
            </p>

            <h3 className="text-[1.1rem] sm:text-[1.2rem] font-extrabold tracking-[-0.01em] text-white mb-5">
              What's Included
            </h3>

            <ul className="space-y-3 mb-8 sm:mb-10">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="shrink-0 mt-0.5 text-[#74c316]"
                    size={18}
                  />
                  <span className="text-[0.9rem] sm:text-[0.95rem] leading-[1.6] text-[rgba(232,255,208,0.9)]">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div
                className="
                  inline-flex items-center gap-2 rounded-full px-4 py-2
                  bg-[#74c316]/8 border border-[#74c316]/20
                  text-xs font-semibold text-[#9ed44e]
                "
              >
                <Clock size={13} />
                {service.timeline}
              </div>
              {service.idealFor.slice(0, 2).map((item) => (
                <div
                  key={item}
                  className="
                    inline-flex items-center font-heading gap-2 rounded-full px-4 py-2
                    bg-white/4 border border-white/8
                    text-xs font-medium text-white/50
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — image + floating card */}
          <div className="relative mt-6 lg:mt-0">
            {/* Glow */}
            <div
              className="
                absolute -inset-4 sm:-inset-6 rounded-[32px] blur-xl pointer-events-none
                bg-[radial-gradient(circle_at_60%_40%,rgba(116,194,22,0.12),transparent_65%)]
              "
            />

            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#74c316]/15 aspect-4/3">
              <Image
                src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352401/desola-lanre-ologun-kwzWjTnDPLk-unsplash_o4gx6u.jpg"
                alt={service.title}
                fill
                className="object-cover transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating deliverables card */}
            <div
              className="
                absolute -bottom-4 sm:-bottom-6 -left-3 sm:-left-6
                bg-[rgba(4,36,7,0.9)] backdrop-blur-xl
                border border-[#74c316]/25 rounded-2xl
                p-3.5 sm:p-4
                max-w-55 sm:max-w-65
              "
            >
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-[#74c316] mb-2">
                You'll Receive
              </p>
              {service.deliverables.slice(0, 3).map((d) => (
                <div key={d} className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.25 h-1.25 rounded-full bg-[#74c316] shrink-0" />
                  <span className="text-[11px] sm:text-xs text-[rgba(232,255,208,0.8)]">
                    {d}
                  </span>
                </div>
              ))}
              <p className="text-[10px] sm:text-[11px] text-white/30 mt-1.5">
                +{service.deliverables.length - 3} more deliverables
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DELIVER — Capabilities */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#74c316]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
                Capabilities
              </span>
              <span className="h-px w-8 bg-[#74c316]" />
            </div>
            <h2 className="text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold tracking-[-0.02em] text-black">
              What We Deliver
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {service.whatWeDeliver.map((item, i) => (
              <CapabilityCard
                key={i}
                index={i}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#74c316]" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
            How We Work
          </span>
        </div>
        <h2 className="text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold tracking-[-0.02em] text-white mb-10 sm:mb-12">
          Our Process
        </h2>

        <div className="relative">
          {/* Vertical connector — desktop only */}
          <div
            className="
              absolute hidden lg:block left-6 top-6 bottom-6 w-px
              bg-linear-to-b from-[#74c316]/50 to-[#74c316]/5
            "
          />

          <div className="space-y-5 sm:space-y-8">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 sm:gap-6 lg:gap-10 items-start"
              >
                {/* Step circle */}
                <div
                  className={`
                    shrink-0 flex items-center justify-center
                    w-10 h-10 sm:w-12 sm:h-12 rounded-full z-1
                    border border-[#74c316]/40 text-[0.7rem] sm:text-[0.75rem] font-black tracking-[0.05em]
                    ${i === 0 ? "bg-[#74c316] text-[#020504]" : "bg-[#74c316]/10 text-[#74c316]"}
                  `}
                >
                  {step.step}
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white/2.5 border border-white/6 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 sm:py-5">
                  <h3 className="text-[0.9rem] sm:text-base font-extrabold text-white mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[0.85rem] sm:text-[0.9rem] leading-[1.7] text-[rgba(197,224,138,0.65)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. TECH STACK
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#74c316]/8 py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="h-px w-8 bg-[#74c316]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
              Tech Stack
            </span>
          </div>

          {/* Responsive grid: 2 cols on mobile → 4 cols on lg */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {service.techStack.map((cat) => (
              <div key={cat.category}>
                <p className="text-[0.75rem] sm:text-[0.8rem] font-extrabold tracking-[0.05em] uppercase text-black mb-3">
                  {cat.category}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {cat.tools.map((tool) => (
                    <span
                      key={tool}
                      className="
                        text-[11px] sm:text-xs font-semibold
                        px-2.5 sm:px-3 py-1 sm:py-1.25 rounded-full
                        bg-[#74c316]/8 border border-[#74c316]/18 text-[#9ed44e]
                      "
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#74c316]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
              Pricing
            </span>
            <span className="h-px w-8 bg-[#74c316]" />
          </div>
          <h2 className="text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold tracking-[-0.02em] text-white">
            Transparent Pricing
          </h2>
          <p className="text-[0.9rem] text-white/40 max-w-sm mx-auto mt-3 px-4">
            No hidden fees. No surprises. Choose a plan that fits where you are
            today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 lg:gap-6 items-start">
          {service.pricing.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative min-w-0 overflow-hidden rounded-[22px]
                px-5 md:px-4 lg:px-7
                py-7 sm:py-8
                ${
                  tier.highlight
                    ? "bg-[#74c316]/8 border border-[#74c316]/45"
                    : "bg-white/2.5 border border-white/6"
                }
              `}
            >
              {/* ── Most Popular banner ── */}
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 py-2 text-center bg-[#74c316] text-[#020504] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  Most Popular
                </div>
              )}

              <div className={tier.highlight ? "mt-7" : ""}>
                {/* Plan name */}
                <p className="text-[0.95rem] sm:text-[1rem] font-extrabold text-white mb-2">
                  {tier.name}
                </p>

                {/*
                  ── Price block ──
                */}
                <div className="mb-3">
                  <h1
                    className={` black font-black text-2xl sm:text-2xl md:text-2xl lg:text-3xl break
                    ${tier.highlight ? "text-[#74c316]" : "text-white"}
                    `}
                  >
                    {tier.price}
                  </h1>
                  <span className="block text-[0.75rem] text-white/40 mt-0.5">
                    / {tier.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[0.82rem] leading-[1.65] text-[rgba(197,224,138,0.6)] mb-5 sm:mb-6">
                  {tier.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 sm:space-y-2.5 mb-7 sm:mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 sm:gap-2.5">
                      <CheckCircle2
                        className="shrink-0 mt-0.5 text-[#74c316]"
                        size={15}
                      />
                      <span className="text-[0.82rem] leading-snug text-[rgba(232,255,208,0.85)]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <Link href="/contact">
                  <div
                    className={`
                      w-full text-center rounded-xl py-3
                      text-[13px] font-bold tracking-[0.02em]
                      transition-all duration-200 cursor-pointer
                      ${
                        tier.highlight
                          ? "bg-[#74c316] text-[#020504] hover:brightness-110"
                          : "bg-[#74c316]/10 border border-[#74c316]/25 text-[#9ed44e] hover:bg-[#74c316]/20"
                      }
                    `}
                  >
                    Get Started →
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. TESTIMONIALS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white text-black py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="h-px w-8 bg-[#74c316]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
              Client Stories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {service.testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-black/6 rounded-[20px] p-5 sm:p-7 shadow-sm"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-[#74c316] fill-[#74c316]"
                    />
                  ))}
                </div>

                <p className="text-[0.9rem] sm:text-[0.95rem] leading-[1.75] text-black italic mb-5 sm:mb-6">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#74c316]/25">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[0.85rem] font-extrabold text-black">
                      {t.name}
                    </p>
                    <p className="text-[0.78rem] text-[#74c316]/70">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-[#74c316]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#74c316]">
              FAQs
            </span>
            <span className="h-px w-8 bg-[#74c316]" />
          </div>
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold tracking-[-0.02em] text-white">
            Common Questions
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/2.5 border border-white/6 rounded-xl sm:rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-5 sm:px-5.5 py-4 sm:py-4.5 list-none">
                <span className="text-[0.9rem] sm:text-[0.95rem] font-bold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[#74c316] transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="px-5 sm:px-5.5 pb-5 text-[0.85rem] sm:text-[0.9rem] leading-[1.75] text-[rgba(197,224,138,0.7)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. IDEAL FOR + DELIVERABLES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#74c316]/3 border-t border-[#74c316]/8 py-14 sm:py-16">
        <div
          className="
            w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12
            grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12
          "
        >
          {/* Ideal For */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Users size={18} className="text-[#74c316]" />
              <h3 className="text-[1rem] sm:text-[1.1rem] font-extrabold text-white">
                Ideal For
              </h3>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {service.idealFor.map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center font-heading gap-3 bg-white/2.5 border border-white/6
                    rounded-xl px-4 py-3 text-[0.85rem] sm:text-[0.875rem] text-[rgba(232,255,208,0.8)]
                  "
                >
                  <Zap size={13} className="text-[#74c316] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 size={18} className="text-[#74c316]" />
              <h3 className="text-[1rem] sm:text-[1.1rem] font-extrabold text-white">
                What You'll Receive
              </h3>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {service.deliverables.map((d) => (
                <div
                  key={d}
                  className="
                    flex items-center font-heading gap-3 bg-white/2.5 border border-white/6
                    rounded-xl px-4 py-3 text-[0.85rem] sm:text-[0.875rem] text-[rgba(232,255,208,0.8)]
                  "
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74c316] shrink-0" />
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA */}
      <section className="w-full bg-white px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div
            className="
              relative overflow-hidden rounded-[22px] sm:rounded-[28px]
              p-[clamp(32px,6vw,72px)]
              bg-[linear-gradient(135deg,rgba(13,31,13,0.95)_0%,rgba(13,31,13,0.85)_100%)]
              border border-[#74c316]/25
            "
          >
            {/* Glow */}
            <div
              className="
                absolute -right-16 -top-16 w-72 h-72 rounded-full pointer-events-none
                bg-[radial-gradient(circle,rgba(116,194,22,0.18)_0%,transparent_65%)]
              "
            />
            {/* Dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle,#74c316 1px,transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7 sm:gap-8"> */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-7 md:gap-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#74c316] mb-2">
                  Ready to get started?
                </p>
                {/* <h2 className="text-l sm:text-l md:text-xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white"> */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
                  Let's build something
                  <br />
                  <span className="text-[#74c316]">exceptional together.</span>
                </h2>
                <p className="text-[0.875rem] sm:text-[0.9rem] text-white/50 max-w-95 mt-3">
                  Book a free 30-minute discovery call. No commitment, no
                  pressure — just clarity.
                </p>
              </div>

              <div className="flex flex-col xs:flex-row sm:flex-col md:flex-col lg:flex-row gap-3 shrink-0 w-full sm:w-auto">
              {/* <div className="flex flex-row gap-3 shrink-0 w-full md:w-auto"> */}
                <Link href="/contact" className="w-full sm:w-auto">
                  <div
                    className="inline-flex items-center justify-center gap-2 cursor-pointer bg-[#74c316] text-[#0d1f0d] font-bold text-[13px] px-6 sm:px-7 py-3 rounded-full whitespace-nowrap w-full min-w-50 shadow-[0_4px_24px_rgba(116,194,22,0.3)] transition-all duration-200 hover:brightness-110 font-heading"
                  >
                    Contact Now
                    <ArrowRight size={15} />
                  </div>
                </Link>

                <Link href="/" className="w-full sm:w-auto">
                  <div
                    className="inline-flex items-center justify-center gap-2 cursor-pointer bg-white/6 text-white/70 font-semibold text-[13px] px-6 sm:px-7 py-3 rounded-full whitespace-nowrap w-full min-w-50 border border-white/15 transition-all duration-200 hover:text-white hover:border-white/30 font-heading"
                  >
                    Back to Home
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
}
