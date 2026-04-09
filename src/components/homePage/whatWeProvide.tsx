"use client";

import { useEffect, useRef, useState } from "react";
import {
  Shield,
  Zap,
  Cpu,
  BarChart2,
  Smartphone,
  Globe,
  Code2,
  Layers,
  Rocket,
  CheckCircle2,
  TrendingUp,
  Users,
  Star,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// Scenario Data 

const scenarios = [
  {
    id: 0,
    category: "Authentication & Security",
    icon: Shield,
    color: "#74c316",
    services: [
      { name: "Custom Auth System", tag: "Tailored" },
      { name: "Better Auth Integration", tag: "Modern" },
      { name: "Clerk / NextAuth Setup", tag: "Fast" },
      { name: "Role-Based Access Control", tag: "Secure" },
      { name: "OAuth & SSO Support", tag: "Enterprise" },
    ],
    topRight: {
      icon: Shield,
      label: "SEC_MODULE",
      title: "Bulletproof Security",
      description:
        "We build secure-by-default authentication flows — from simple login systems to enterprise SSO — tailored exactly to your product needs.",
      visual: "shield",
      highlight: "Zero-trust architecture",
    },
    bottomLeft: {
      label: "CLIENT_TRUST",
      live: true,
      title: "Trusted by Growing Teams",
      description:
        "Our auth implementations handle thousands of users with near-zero downtime and rock-solid session management.",
      chartData: [40, 55, 62, 70, 78, 85, 95],
      chartLabel: "User Growth",
    },
    bottomRight: {
      icon: Users,
      label: "AUTH_STATS",
      title: "Rapid Integration",
      description:
        "From kickoff to live auth in as little as 3 days. We handle the complexity so your team ships faster.",
      stat: "3 days",
    },
  },
  {
    id: 1,
    category: "Web & Mobile Applications",
    icon: Smartphone,
    color: "#74c316",
    services: [
      { name: "Next.js / React Web Apps", tag: "Modern" },
      { name: "React Native Mobile", tag: "Cross-Platform" },
      { name: "Progressive Web Apps", tag: "Offline-Ready" },
      { name: "Admin Dashboards", tag: "Data-Rich" },
      { name: "E-commerce Platforms", tag: "Scalable" },
    ],
    topRight: {
      icon: Globe,
      label: "APP_MODULE",
      title: "End-to-End Products",
      description:
        "From MVP to full-scale product — we design and build responsive, performant web and mobile applications that users love.",
      visual: "globe",
      highlight: "Ship in weeks, not months",
    },
    bottomLeft: {
      label: "PERF_SCORE",
      live: true,
      title: "Lighthouse 95+ Scores",
      description:
        "Every app we build is optimized for performance, SEO and accessibility out of the box.",
      chartData: [60, 70, 75, 82, 88, 92, 97],
      chartLabel: "Performance Score",
    },
    bottomRight: {
      icon: Rocket,
      label: "DELIVERY",
      title: "Fast Delivery",
      description:
        "Our agile process means you get working software in your hands within the first week of every sprint.",
      stat: "1 week",
    },
  },
  {
    id: 2,
    category: "API & Backend Systems",
    icon: Code2,
    color: "#74c316",
    services: [
      { name: "REST & GraphQL APIs", tag: "Flexible" },
      { name: "Microservices Architecture", tag: "Scalable" },
      { name: "Database Design & ORM", tag: "Optimized" },
      { name: "Third-party Integrations", tag: "Connected" },
      { name: "Real-time with WebSockets", tag: "Live" },
    ],
    topRight: {
      icon: Cpu,
      label: "API_MODULE",
      title: "Robust Backends",
      description:
        "We architect scalable APIs and backend systems built to handle real-world load — clean, documented and easy for your team to maintain.",
      visual: "cpu",
      highlight: "100ms average response time",
    },
    bottomLeft: {
      label: "API_LATENCY",
      live: true,
      title: "Blazing Fast APIs",
      description:
        "Optimized queries, caching layers and edge deployment keep every request snappy at any scale.",
      chartData: [90, 75, 85, 70, 80, 65, 60],
      chartLabel: "Response Time (ms)",
    },
    bottomRight: {
      icon: BarChart2,
      label: "UPTIME",
      title: "99.9% Uptime SLA",
      description:
        "Production-hardened infrastructure with monitoring, alerting and automated recovery baked in.",
      stat: "99.9%",
    },
  },
  {
    id: 3,
    category: "UI/UX Design & Branding",
    icon: Layers,
    color: "#74c316",
    services: [
      { name: "Brand Identity & Logo", tag: "Memorable" },
      { name: "Figma UI/UX Design", tag: "User-First" },
      { name: "Design Systems", tag: "Consistent" },
      { name: "Landing Page Design", tag: "Conversion" },
      { name: "Motion & Interactions", tag: "Delightful" },
    ],
    topRight: {
      icon: Star,
      label: "DESIGN_MODULE",
      title: "Designs That Convert",
      description:
        "We craft pixel-perfect interfaces backed by UX research — beautiful enough to impress, intuitive enough to convert.",
      visual: "star",
      highlight: "+35% avg. conversion lift",
    },
    bottomLeft: {
      label: "USER_SATISFACTION",
      live: true,
      title: "Users Love It",
      description:
        "Post-redesign satisfaction scores consistently hit 4.8/5 across our client projects.",
      chartData: [50, 58, 65, 72, 80, 87, 96],
      chartLabel: "Satisfaction Score",
    },
    bottomRight: {
      icon: TrendingUp,
      label: "IMPACT",
      title: "Measurable ROI",
      description:
        "Better design means better business outcomes — every pixel we ship is tied to a real user goal.",
      stat: "+35%",
    },
  },
];

// Mini Bar Chart 

function MiniBarChart({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const dimColor = color + "33"; // ~20% opacity hex
  const chartData = {
    labels: data.map(() => ""),
    datasets: [
      {
        data,
        backgroundColor: data.map((_, i) =>
          i === data.length - 1 ? color : dimColor
        ),
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    animation: { duration: 700 },
  } as const;

  return (
    <div className="absolute bottom-0 right-0 w-40 h-24 opacity-60">
      <Bar data={chartData} options={options} />
    </div>
  );
}

// Top-right decorative visual 

function DecorativeVisual({
  type,
  color,
}: {
  type: string;
  color: string;
}) {
  const icons: Record<string, React.ElementType> = {
    shield: Shield,
    globe: Globe,
    cpu: Cpu,
    star: Star,
  };
  const Icon = icons[type] ?? Shield;
  return (
    <div
      className="absolute top-5 right-5 opacity-15"
      style={{ color }}
    >
      <div
        className="w-28 h-28 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: color }}
      >
        <div
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: color }}
        >
          <Icon size={30} />
        </div>
      </div>
    </div>
  );
}

//  Service List Card (top-left) 

function ServiceListCard({
  scenario,
}: {
  scenario: (typeof scenarios)[0];
}) {
  const Icon = scenario.icon;
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-xl h-full">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: scenario.color + "22" }}
        >
          <Icon size={15} style={{ color: scenario.color }} />
        </div>
        <span
          className="text-[11px] font-mono tracking-widest uppercase font-semibold"
          style={{ color: scenario.color }}
        >
          {scenario.category}
        </span>
      </div>

      {/* Tabs row */}
      <div className="px-5 pt-3 pb-1 flex gap-1 flex-wrap">
        {scenarios.map((s, i) => {
          const SIcon = s.icon;
          const isActive = s.id === scenario.id;
          return (
            <div
              key={s.id}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono transition-all border ${
                isActive
                  ? "border-current font-semibold"
                  : "border-transparent text-white/30"
              }`}
              style={isActive ? { color: scenario.color, borderColor: scenario.color + "66" } : {}}
            >
              <SIcon size={10} />
              {s.id === 0 ? "Auth" : s.id === 1 ? "Apps" : s.id === 2 ? "API" : "Design"}
            </div>
          );
        })}
      </div>

      {/* Service list */}
      <div className="p-5 space-y-2.5">
        {scenario.services.map((service, i) => (
          <div
            key={i}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={14}
                style={{ color: scenario.color }}
                className="shrink-0"
              />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">
                {service.name}
              </span>
            </div>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0"
              style={{
                color: scenario.color,
                borderColor: scenario.color + "44",
                backgroundColor: scenario.color + "11",
              }}
            >
              {service.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div
        className="mx-5 mb-5 px-4 py-3 rounded-xl flex items-center justify-between"
        style={{ backgroundColor: scenario.color + "11", borderLeft: `3px solid ${scenario.color}` }}
      >
        <span className="text-xs text-white/60">
          Custom solutions built for your requirements
        </span>
        <Rocket size={13} style={{ color: scenario.color }} className="shrink-0 ml-2" />
      </div>
    </div>
  );
}

// Main Component 

export default function WhatWeProvide() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scenario = scenarios[activeIdx];
  const tr = scenario.topRight;
  const bl = scenario.bottomLeft;
  const br = scenario.bottomRight;
  const TrIcon = tr.icon;
  const BrIcon = br.icon;

  function switchTo(idx: number) {
    if (idx === activeIdx) return;
    clearInterval(intervalRef.current!);
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setFading(false);
      startAutoRotate();
    }, 300);
  }

  function startAutoRotate() {
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % scenarios.length);
        setFading(false);
      }, 300);
    }, 5000);
  }

  useEffect(() => {
    startAutoRotate();
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-4 bg-black">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Everything Your{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: scenario.color }}
            >
              Product Needs
            </span>
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            From concept to deployment — we handle the full stack so you can
            focus on your vision.
          </p>
        </div>

        {/* ── Category Pills ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {scenarios.map((s, i) => {
            const SIcon = s.icon;
            const isActive = i === activeIdx;
            return (
              <button
                key={s.id}
                onClick={() => switchTo(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/40 border-white/10 hover:border-white/30 hover:text-white/60"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: s.color,
                        borderColor: s.color,
                        color: "#FFFFFF",
                      }
                    : {}
                }
              >
                <SIcon size={12} />
                {s.category}
              </button>
            );
          })}
        </div>

        {/* ── 4-Card Grid ── */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Top-left: Service List */}
          <ServiceListCard scenario={scenario} />

          {/* Top-right: Feature highlight */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 relative overflow-hidden flex flex-col justify-end min-h-70">
            <DecorativeVisual type={tr.visual} color={scenario.color} />
            <div
              className="absolute top-4 left-5 text-[10px] font-mono tracking-widest uppercase"
              style={{ color: scenario.color + "99" }}
            >
              {tr.label}
            </div>
            <div className="absolute top-4 right-5">
              <TrIcon size={16} style={{ color: scenario.color + "99" }} />
            </div>
            {/* Highlight badge */}
            <div
              className="mb-4 inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[10px] font-mono font-semibold"
              style={{
                backgroundColor: scenario.color + "18",
                color: scenario.color,
                border: `1px solid ${scenario.color}33`,
              }}
            >
              <Zap size={9} />
              {tr.highlight}
            </div>
            <div className="z-10">
              <h3 className="text-white text-xl font-bold mb-2">{tr.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {tr.description}
              </p>
            </div>
          </div>

          {/* Bottom-left: Live chart */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 relative overflow-hidden min-h-50 flex flex-col justify-end">
            <div
              className="absolute top-4 left-5 text-[10px] font-mono tracking-widest uppercase"
              style={{ color: scenario.color + "99" }}
            >
              {bl.label}
            </div>
            {bl.live && (
              <div className="absolute top-4 right-5 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: scenario.color }}
                />
                <span
                  className="text-[10px] font-mono tracking-widest"
                  style={{ color: scenario.color }}
                >
                  LIVE
                </span>
              </div>
            )}
            <MiniBarChart data={bl.chartData} color={scenario.color} />
            <div className="z-10 relative">
              <h3 className="text-white text-xl font-bold mb-2">{bl.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                {bl.description}
              </p>
            </div>
          </div>

          {/* Bottom-right: Stat */}
          <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 relative overflow-hidden min-h-50 flex flex-col justify-end">
            <div
              className="absolute top-4 left-5 text-[10px] font-mono tracking-widest uppercase"
              style={{ color: scenario.color + "99" }}
            >
              {br.label}
            </div>
            <div className="absolute top-4 right-5">
              <BrIcon size={16} style={{ color: scenario.color + "99" }} />
            </div>
            {/* Big decorative stat */}
            <div
              className="absolute top-1/2 right-5 -translate-y-1/2 font-black font-mono select-none text-4xl sm:text-5xl"
              style={{ color: scenario.color + "22" }}
            >
              {br.stat}
            </div>
            {/* Progress dots */}
            <div className="absolute bottom-5 right-5 flex gap-1.5">
              {scenarios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchTo(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      i === activeIdx ? scenario.color : scenario.color + "33",
                    transform: i === activeIdx ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
            </div>
            <div className="z-10 relative">
              <h3 className="text-white text-xl font-bold mb-2">{br.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                {br.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="mt-6 flex items-center gap-3 max-w-xs mx-auto">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => switchTo(i)}
              className="flex-1 h-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === activeIdx ? scenario.color : scenario.color + "22",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}