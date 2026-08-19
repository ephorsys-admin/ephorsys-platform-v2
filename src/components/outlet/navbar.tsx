"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const SERVICES = [
  { href: "/services/app-development", label: "App Development" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/software-development", label: "Software Development" },
  { href: "/services/product-design", label: "Product Design" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/seo", label: "SEO" },
] as const;

/* ─── Desktop dropdown ─────────────────────────────────────────────────────── */
const DropdownMenu = memo(function DropdownMenu({
  label,
  items,
  isActive,
}: {
  label: string;
  items: readonly { href: string; label: string }[];
  isActive?: boolean;
}) {
  return (
    <div className="relative group">
      <h4 className="relative px-2.5 py-1.5 text-base font-body font-medium text-[#74c316] hover:text-[#74c316] rounded-lg transition-all tracking-wide flex items-center gap-1 cursor-pointer">
        {label}
        <ChevronDown className="w-4 h-4 transition-transform duration-250 group-hover:rotate-180 stroke-[#a8c97a] group-hover:stroke-[#74c316]" />
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#74c316] transition-all duration-300 ease-out"
          style={{ width: isActive ? "70%" : "0%" }}
        />
      </h4>

      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 bg-brand-white border border-[#74c316]/15 rounded-2xl p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-1 transition-all duration-200 z-50 shadow-2xl shadow-black/60">
        {items.slice(0, 3).map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block px-3 py-2 text-sm font-medium text-[#a8c97a] hover:text-[#74c316] hover:scale-105 rounded-lg transition-all duration-150 hover:pl-5"
          >
            <h4 className="text-sm font-body font-medium text-[#a8c97a] group-hover:text-[#74c316] transition-colors">
              {label}
            </h4>
          </Link>
        ))}
        <div className="my-1.5 h-px " />
        {items.slice(3).map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block px-3 py-2 text-sm text-[#74c316] hover:text-[#74c316] hover:scale-105 rounded-lg transition-all duration-150 hover:pl-5"
          >
            <h4 className="text-sm font-body font-medium text-[#a8c97a] group-hover:text-[#74c316] transition-colors">
              {label}
            </h4>
          </Link>
        ))}
      </div>
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
    className={`relative px-2.5 py-1.5 text-base font-body font-medium  text-[#74c316] hover:text-[#74c316] rounded-lg transition-all tracking-wide group ${className ?? ""}`}
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
      {/* Trigger row — full-width hover bg, text + chevron both animate */}
      <button
        onClick={() => onToggle(name)}
        className="
          group w-full text-left
          px-6 py-4
          flex items-center justify-between
          tracking-wide
          transition-colors duration-150
          hover:bg-[#74c316]/8
          border-b border-[#74c316]/8
        "
        aria-expanded={isOpen}
      >
        <span className="relative text-base font-body font-semibold text-[#74c316] group-hover:text-[#5fa010] transition-colors duration-150">
          {label}
          {/* Active underline */}
          {isActive && (
            <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-[#74c316]" />
          )}
        </span>
        <ChevronDown
          className={`
            w-4 h-4 flex-shrink-0
            transition-transform duration-300
            group-hover:stroke-[#5fa010]
            ${isOpen ? "rotate-180 stroke-[#74c316]" : "stroke-[#74c316]"}
          `}
        />
      </button>

      {/* Submenu panel */}
      {isOpen && (
        <div className="bg-[#f7fff0] mx-3 mb-2 rounded-xl border border-[#74c316]/12 overflow-hidden">
          {items.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`
                group/item flex items-center gap-2
                px-5 py-3
                text-sm font-body font-medium
                text-[#5a8a25]
                transition-all duration-150
                hover:bg-[#74c316]/10
                hover:text-[#3d6b12]
                hover:pl-7
                ${i < items.length - 1 ? "border-b border-[#74c316]/8" : ""}
              `}
            >
              {/* Dot indicator */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#74c316]/30 group-hover/item:bg-[#74c316] transition-colors duration-150 flex-shrink-0" />
              {label}
            </Link>
          ))}
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
    className="
      group flex items-center justify-between
      px-6 py-4
      transition-colors duration-150
      hover:bg-[#74c316]/8
      border-b border-[#74c316]/8 last:border-b-0
      tracking-wide
    "
  >
    <span
      className={`
        relative text-base font-body font-semibold
        transition-colors duration-150
        group-hover:text-[#5fa010]
        ${isActive ? "text-[#74c316]" : "text-[#74c316]"}
      `}
    >
      {children}
      {/* Active underline */}
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

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isServicesActive = SERVICES.some((s) => pathname === s.href);

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
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-brand-white border-b border-[#74c316]/10 shadow-md"
            : "bg-brand-white border-b border-transparent"
        }`}
        style={{ contain: "layout" }}
      >
        <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-6">
          <div className="flex items-center h-14 sm:h-16 md:h-16 ">
            {/* ── Logo (left) ── */}
            <div className="flex-1 flex justify-start lg:flex-1 ">
     
                {/* Small screen logo */}
        

                {/* Larger screen logo */}
                <div className="flex-1 flex justify-start">
                  <Link href="/" className="flex items-center shrink-0 ">
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
              
            </div>

            {/* ── Desktop links (center) ── */}
            <div className="hidden lg:flex lg:flex-1 items-center justify-center gap-2">
              <DesktopNavLink href="/" isActive={pathname === "/"}>
                Home
              </DesktopNavLink>
              <DesktopNavLink href="/about" isActive={pathname === "/about"}>
                About
              </DesktopNavLink>
              <DropdownMenu
                label="Services"
                items={SERVICES}
                isActive={isServicesActive}
              />
              <DesktopNavLink href="/blog" isActive={pathname === "/blog"}>
                Blog
              </DesktopNavLink>
              <DesktopNavLink href="/career" isActive={pathname === "/career"}>
                Career
              </DesktopNavLink>
              <DesktopNavLink href="/team" isActive={pathname === "/team"}>
                Team
              </DesktopNavLink>
              <DesktopNavLink
                href="/portfolio"
                isActive={pathname === "/portfolio"}
              >
                Portfolio
              </DesktopNavLink>
            </div>

            {/* ── CTA (right) + Mobile hamburger ── */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <Link href="/contact" className="hidden lg:block">
                <button
                  className="
                    relative overflow-hidden
                    px-4 py-2
                    h-9
                    rounded-lg
                    text-sm font-body font-bold tracking-wide
                    transition-all duration-200
                    hover:brightness-110
                    active:scale-[0.98]
                    group
                    whitespace-nowrap
                    cursor-pointer
                  "
                  style={{
                    background: "#74c316",
                    color: "#021a0a",
                  }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
                  <span className="relative">Contact Us</span>
                </button>
              </Link>

              {/* ── Mobile hamburger ── */}
              <button
                onClick={toggleMobile}
                className="lg:hidden p-2 rounded-xl hover:bg-[#74c316]/8 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 text-[#74c316] transition-all duration-300 ${
                      mobileOpen
                        ? "opacity-0 rotate-90 scale-75"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 text-[#74c316] transition-all duration-300 ${
                      mobileOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* ── Mobile menu sidebar ── */}
      <div
        className={`fixed top-0 right-0 z-[70] h-dvh w-[88vw] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#74c316]/10">
          <span
            className="text-xl font-extrabold tracking-tight text-[#74c316]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ephorsys
          </span>
          <button
            onClick={closeMobileMenu}
            className="
              p-2 rounded-xl
              text-[#74c316]
              transition-colors duration-150
              hover:bg-[#74c316]/10
              hover:text-[#5fa010]
              active:scale-95
            "
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto pb-4">
          <MobileNavLink
            href="/"
            onClick={closeMobileMenu}
            isActive={pathname === "/"}
          >
            Home
          </MobileNavLink>

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
            href="/about"
            onClick={closeMobileMenu}
            isActive={pathname === "/about"}
          >
            About
          </MobileNavLink>

          <MobileNavLink
            href="/team"
            onClick={closeMobileMenu}
            isActive={pathname === "/team"}
          >
            Team
          </MobileNavLink>

          <MobileNavLink
            href="/blog"
            onClick={closeMobileMenu}
            isActive={pathname === "/blog"}
          >
            Blog
          </MobileNavLink>

          <MobileNavLink
            href="/portfolio"
            onClick={closeMobileMenu}
            isActive={pathname === "/portfolio"}
          >
            Portfolio
          </MobileNavLink>

          <MobileNavLink
            href="/career"
            onClick={closeMobileMenu}
            isActive={pathname === "/career"}
          >
            Career
          </MobileNavLink>
        </div>

        {/* Mobile CTA */}
        <div className="shrink-0 sticky bottom-0 bg-white p-4 border-t border-[#74c316]/10 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Link href="/contact" onClick={closeMobileMenu} className="block">
            <button
              className="group relative w-full py-3.5 rounded-xl text-base font-body font-bold tracking-wide overflow-hidden transition-all duration-200 hover:brightness-110 active:scale-[0.97] cursor-pointer shadow-lg"
              style={{
                background: "#74c316",
                color: "#021a0a",
              }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              <span className="relative">Contact Us</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
