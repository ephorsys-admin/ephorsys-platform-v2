"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Smartphone,
  Globe,
  Code2,
  Bot,
  Palette,
  Megaphone,
  Search,
  Building2,
  BookOpen,
  Users,
  Layers,
  Zap,
  BarChart3,
} from "lucide-react";

const SERVICES = [
  { href: "/services/app-development", label: "App Development" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/software-development", label: "Software Development" },
  { href: "/services/ai-development", label: "AI Development" },
  { href: "/services/product-design", label: "Product Design" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/seo", label: "SEO" },
] as const;

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/team", label: "Team" },
] as const;

/* ─── Meta map ──────────────────────────────────────────────────────────────── */
type IconComponent = React.FC<{ className?: string }>;

// iconBg  = pill background   iconColor = icon stroke color
const ITEM_META: Record<
  string,
  { icon: IconComponent; desc: string; iconBg: string; iconColor: string }
> = {
  "App Development": {
    icon: Smartphone,
    desc: "iOS & Android solutions",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-300",
  },
  "Web Development": {
    icon: Globe,
    desc: "Modern, scalable websites",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-300",
  },
  "Software Development": {
    icon: Code2,
    desc: "Custom software systems",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-300",
  },
  "AI Development": {
    icon: Bot,
    desc: "Intelligent AI-powered apps",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-300",
  },
  "Product Design": {
    icon: Palette,
    desc: "UI/UX that users love",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-300",
  },
  "Digital Marketing": {
    icon: Megaphone,
    desc: "Grow your online presence",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-300",
  },
  SEO: {
    icon: BarChart3,
    desc: "Rank higher, get found",
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-300",
  },
  About: {
    icon: Building2,
    desc: "Our story & mission",
    iconBg: "bg-lime-500/20",
    iconColor: "text-lime-300",
  },
  Blog: {
    icon: BookOpen,
    desc: "Insights & articles",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-300",
  },
  Team: {
    icon: Users,
    desc: "The people behind it",
    iconBg: "bg-fuchsia-500/20",
    iconColor: "text-fuchsia-300",
  },
};

/* ─── Full-width Mega Menu ──────────────────────────────────────────────────── */
const DropdownMenu = memo(function DropdownMenu({
  label,
  items,
  isActive,
  navRef,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  isActive?: boolean;
  navRef: React.RefObject<HTMLElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* ── Position helpers ── */
  const calcTop = useCallback(() => {
    if (navRef.current)
      setPanelTop(navRef.current.getBoundingClientRect().bottom);
  }, [navRef]);

  useEffect(() => {
    if (open) calcTop();
  }, [open, calcTop]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", calcTop, { passive: true });
    window.addEventListener("resize", calcTop, { passive: true });
    return () => {
      window.removeEventListener("scroll", calcTop);
      window.removeEventListener("resize", calcTop);
    };
  }, [open, calcTop]);

  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 100);
  };

  /* ── Column splits ──
     Services (7 items) → 3 columns: 3 / 2 / 2
     Company  (3 items) → 2 columns: 2 / 1          */
  const isServices = label === "Services";

  const columns: Array<{ heading: string; items: typeof items }> = isServices
    ? [
        { heading: "Build", items: items.slice(0, 3) },
        { heading: "Design", items: items.slice(3, 5) },
        { heading: "Grow", items: items.slice(5) },
      ]
    : [
        { heading: "Company", items: items.slice(0, 2) },
        { heading: "More", items: items.slice(2) },
      ];

  /* ── Single item renderer ── */
  const renderItem = ({
    href,
    label: itemLabel,
  }: {
    href: string;
    label: string;
  }) => {
    const meta = ITEM_META[itemLabel];
    const Icon = meta?.icon ?? Layers;
    const iconBg = meta?.iconBg ?? "bg-white/10";
    const iconColor = meta?.iconColor ?? "text-white/70";
    const desc = meta?.desc ?? "";

    return (
      <Link
        key={href}
        href={href}
        role="menuitem"
        onClick={() => setOpen(false)}
        className="
          group/item flex items-start gap-3 px-3 py-2.5 rounded-xl
          transition-all duration-150
          hover:bg-white/6
        "
      >
        {/* Colored icon pill */}
        <div
          className={`
          w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center
          transition-all duration-150 mt-0.5
          ${iconBg}
          group-hover/item:scale-110
        `}
        >
          <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
        </div>

        {/* Label + desc */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white/90 group-hover/item:text-white transition-colors duration-150 leading-tight">
            {itemLabel}
          </span>
          {desc && (
            <span className="text-[11px] text-white/40 group-hover/item:text-white/60 transition-colors duration-150 mt-0.5 leading-snug">
              {desc}
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative"
      role="navigation"
      aria-label={label}
    >
      {/* ── Trigger ── */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={`
          relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg
          text-sm font-body font-semibold tracking-wide
          transition-all duration-200 cursor-pointer select-none
          ${
            isActive
              ? "bg-[#74c316]/12 text-[#4a8c00]"
              : "text-[#74c316] hover:bg-[#74c316]/8 hover:text-[#4a8c00]"
          }
        `}
      >
        {label}
        <ChevronDown
          className={`
          w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200
          ${open || isActive ? "stroke-[#4a8c00]" : "stroke-[#74c316]"}
          ${open ? "rotate-180" : ""}
        `}
        />
        {isActive && (
          <span className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[#74c316]" />
        )}
      </button>

      {/* ── Full-width panel ── */}
      {open && (
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          role="menu"
          style={{ top: panelTop }}
          className="fixed left-0 right-0 z-[999]"
        >
          {/* Top green accent hairline */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#74c316]/60 to-transparent" />

          {/* Dark panel */}
          <div
            className="relative border-b border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            style={{
              background:
                "linear-gradient(135deg, #0a1a07 0%, #0d2209 40%, #0a1a07 100%)",
            }}
          >
            {/* Subtle radial glow blob top-center */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden
            >
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse, #74c316 0%, transparent 70%)",
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-8 py-7">
              {/* Column grid — 3 cols for Services, 2 for Company */}
              <div
                className={`grid gap-x-6 ${isServices ? "grid-cols-3" : "grid-cols-2"}`}
              >
                {columns.map((col, ci) => (
                  <div
                    key={ci}
                    className={
                      ci < columns.length - 1
                        ? "border-r border-white/8 pr-6"
                        : ""
                    }
                  >
                    {/* Column heading */}
                    <p
                      className="
                      text-[10px] font-bold uppercase tracking-[0.16em]
                      text-[#74c316]/50 mb-3 px-3
                    "
                    >
                      {col.heading}
                    </p>
                    <div className="space-y-0.5">
                      {col.items.map(renderItem)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA strip */}
              <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* <Zap className="w-3.5 h-3.5 text-[#74c316]/60" /> */}
                  <span className="text-xs text-white/35 font-medium">
                    Not sure which service fits your project?
                  </span>
                </div>
                <Link
                  href="/consultancy"
                  onClick={() => setOpen(false)}
                  className="
                    group/cta flex items-center gap-1.5
                    text-xs font-bold text-[#74c316]
                    hover:text-[#a0e040]
                    transition-colors duration-150
                  "
                >
                  Book a free consultation
                  <span className="transition-transform duration-150 group-hover/cta:translate-x-0.5 inline-block">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

/* ─── Desktop nav link ─────────────────────────────────────────────────────── */
const DesktopNavLink = ({
  href,
  children,
  isActive,
  className,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}) => (
  <Link
    href={href}
    className={`relative px-2.5 py-1.5 text-sm font-body font-semibold text-[#74c316] hover:text-[#4a8c00] hover:bg-[#74c316]/8 rounded-lg transition-all tracking-wide group ${className ?? ""}`}
  >
    {children}
    <span
      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#74c316] transition-all duration-300 ease-out group-hover:w-[70%]"
      style={{ width: isActive ? "70%" : "0%" }}
    />
  </Link>
);

/* ─── Mobile dropdown ──────────────────────────────────────────────────────── */
const MobileDropdown = memo(function MobileDropdown({
  label,
  name,
  items,
  activeDropdown,
  onToggle,
  onClose,
  isActive,
}: {
  label: string;
  name: string;
  items: readonly { href: string; label: string }[];
  activeDropdown: string | null;
  onToggle: (name: string) => void;
  onClose: () => void;
  isActive?: boolean;
}) {
  const isOpen = activeDropdown === name;

  return (
    <div>
      <button
        onClick={() => onToggle(name)}
        type="button"
        className="group w-full text-left px-6 py-4 flex items-center justify-between tracking-wide transition-colors duration-150 hover:bg-[#74c316]/8 border-b border-[#74c316]/8"
        aria-expanded={isOpen}
      >
        <span className="relative text-base font-body font-semibold text-[#74c316] group-hover:text-[#4a8c00] transition-colors duration-150">
          {label}
          {isActive && (
            <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-[#74c316]" />
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:stroke-[#4a8c00] ${
            isOpen ? "rotate-180 stroke-[#74c316]" : "stroke-[#74c316]"
          }`}
        />
      </button>

      {isOpen && (
        <div className="bg-[#f7fff0] mx-3 mb-2 rounded-xl border border-[#74c316]/12 overflow-hidden">
          {items.map(({ href, label: itemLabel }, i) => {
            const meta = ITEM_META[itemLabel];
            const Icon: IconComponent =
              meta?.icon ??
              (({ className }) => <span className={className}>⚡</span>);
            const desc = meta?.desc ?? "";

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`group/item flex items-center gap-3 px-4 py-3 text-sm font-body font-medium text-[#5a8a25] transition-all duration-150 hover:bg-[#74c316]/10 hover:text-[#3d6b12] ${
                  i < items.length - 1 ? "border-b border-[#74c316]/8" : ""
                }`}
              >
                <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center bg-[#74c316]/10 group-hover/item:bg-[#74c316]/20 transition-colors duration-150">
                  <Icon className="w-3.5 h-3.5 text-[#4a8c00]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-[#2d5a00] leading-tight">
                    {itemLabel}
                  </span>
                  {desc && (
                    <span className="text-xs text-[#74c316]/60 mt-0.5 leading-tight">
                      {desc}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
});

/* ─── Mobile nav link ──────────────────────────────────────────────────────── */
const MobileNavLink = ({
  href,
  children,
  onClick,
  badge,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  badge?: string;
  isActive?: boolean;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="group flex items-center justify-between px-6 py-4 transition-colors duration-150 hover:bg-[#74c316]/8 border-b border-[#74c316]/8 last:border-b-0 tracking-wide"
  >
    <span
      className={`relative text-base font-body font-semibold transition-colors duration-150 group-hover:text-[#4a8c00] ${isActive ? "text-[#74c316]" : "text-[#74c316]"}`}
    >
      {children}
      <span
        className="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#74c316] transition-all duration-300"
        style={{ width: isActive ? "100%" : "0%" }}
      />
    </span>
    {badge && (
      <span className="text-[10px] font-semibold bg-[#74c316]/15 text-[#74c316] px-2 py-0.5 rounded-md tracking-widest">
        {badge}
      </span>
    )}
  </Link>
);

/* ─── Navbar ───────────────────────────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isServicesActive = SERVICES.some((s) => pathname === s.href);
  const isCompanyActive = COMPANY.some((item) => pathname === item.href);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimerRef.current) return;
      scrollTimerRef.current = setTimeout(() => {
        setScrolled(window.scrollY > 20);
        scrollTimerRef.current = null;
      }, 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const toggleDropdown = useCallback(
    (name: string) => setActiveDropdown((cur) => (cur === name ? null : name)),
    [],
  );

  return (
    <>
      {/* NOTE: removed `contain: layout` — it clips fixed-position children */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-brand-white border-b border-[#74c316]/10 shadow-md"
            : "bg-brand-white border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto py-2 px-3 sm:px-2 lg:px-2">
          <div className="flex items-center h-14 sm:h-16 md:h-16">
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/Ephorsyslogo2.png"
                  alt="Ephorsys Logo"
                  width={350}
                  height={100}
                  className="w-[250px] h-[90px] object-cover object-center"
                  priority
                />
              </Link>
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex lg:flex-1 items-center justify-center gap-2">
              <DesktopNavLink href="/" isActive={pathname === "/"}>
                Home
              </DesktopNavLink>

              <DropdownMenu
                label="Company"
                items={COMPANY}
                isActive={isCompanyActive}
                navRef={navRef}
              />

              <DropdownMenu
                label="Services"
                items={SERVICES}
                isActive={isServicesActive}
                navRef={navRef}
              />

              <DesktopNavLink href="/career" isActive={pathname === "/career"}>
                Career
              </DesktopNavLink>
              <DesktopNavLink
                href="/"
                isActive={pathname === "/"}
              >
                Courses
              </DesktopNavLink>
              <DesktopNavLink
                href="/portfolio"
                isActive={pathname === "/portfolio"}
              >
                Portfolio
              </DesktopNavLink>
              <DesktopNavLink
                href="/contact"
                isActive={pathname === "/contact"}
              >
                Contact
              </DesktopNavLink>
            </div>

            {/* CTA + hamburger */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <Link href="/consultancy" className="hidden lg:block">
                <button
                  type="button"
                  className="relative overflow-hidden px-4 py-2 h-9 rounded-lg text-sm font-body font-bold tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98] group whitespace-nowrap cursor-pointer"
                  style={{ background: "#74c316", color: "#021a0a" }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                  <span className="relative">Book Free Consultancy</span>
                </button>
              </Link>

              <button
                onClick={toggleMobile}
                type="button"
                className="lg:hidden p-2 rounded-xl hover:bg-[#74c316]/8 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 text-[#74c316] transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 text-[#74c316] transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 z-[70] h-dvh w-[88vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#74c316]/10">
          <span
            className="text-xl font-extrabold tracking-tight text-[#74c316]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ephorsys
          </span>
          <button
            onClick={closeMobileMenu}
            type="button"
            className="p-2 rounded-xl text-[#74c316] transition-colors duration-150 hover:bg-[#74c316]/10 hover:text-[#4a8c00] active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          <MobileNavLink
            href="/"
            onClick={closeMobileMenu}
            isActive={pathname === "/"}
          >
            Home
          </MobileNavLink>

          <MobileDropdown
            label="Company"
            name="company"
            items={COMPANY}
            activeDropdown={activeDropdown}
            onToggle={toggleDropdown}
            onClose={closeMobileMenu}
            isActive={isCompanyActive}
          />
          <MobileDropdown
            label="Services"
            name="services"
            items={SERVICES}
            activeDropdown={activeDropdown}
            onToggle={toggleDropdown}
            onClose={closeMobileMenu}
            isActive={isServicesActive}
          />

          <MobileNavLink
            href="/career"
            onClick={closeMobileMenu}
            isActive={pathname === "/career"}
          >
            Career
          </MobileNavLink>
          <MobileNavLink
            href="/"
            onClick={closeMobileMenu}
            isActive={pathname === "/"}
          >
            Courses
          </MobileNavLink>
          <MobileNavLink
            href="/portfolio"
            onClick={closeMobileMenu}
            isActive={pathname === "/portfolio"}
          >
            Portfolio
          </MobileNavLink>
          <MobileNavLink
            href="/contact"
            onClick={closeMobileMenu}
            isActive={pathname === "/contact"}
          >
            Contact
          </MobileNavLink>
        </div>

        <div className="shrink-0 sticky bottom-0 bg-white p-4 border-t border-[#74c316]/10 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Link href="/consultancy" onClick={closeMobileMenu} className="block">
            <button
              type="button"
              className="group relative w-full py-3.5 rounded-xl text-base font-body font-bold tracking-wide overflow-hidden transition-all duration-200 hover:brightness-110 active:scale-[0.97] cursor-pointer shadow-lg"
              style={{ background: "#74c316", color: "#021a0a" }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              <span className="relative">Book Free Consultancy</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
