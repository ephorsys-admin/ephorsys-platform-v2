"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaChevronRight,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Ephorsys.Pvt.Ltd/",
    icon: FaFacebookF,
    color: "#1877F2",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ephorsysofficial/",
    icon: FaInstagram,
    color: "#E4405F",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ephorsys_official",
    icon: FaYoutube,
    color: "#FF0000",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ephorsys/?viewAsMember=true/",
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
];

const BRAND_NAVY = "#1C2B33";

export default function SocialMedia() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* ================= DESKTOP — flush to top-left corner, icons centered in box ================= */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[999] hidden lg:flex flex-col items-center gap-1 bg-white p-"
        style={{
          borderTop: "1px solid #e5e7eb",
          borderRight: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          borderLeft: "none",
          borderRadius: "0 12px 12px 0",
          boxShadow: "0 8px 24px rgba(28,43,51,0.12)",
        }}
      >
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105"
              style={{ color: item.color }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = item.color;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = item.color;
              }}
            >
              <Icon size={16} />
            </a>
          );
        })}
      </div>

      {/* ================= MOBILE — flush to top-left corner, same box treatment ================= */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[999] lg:hidden">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close social links" : "Open social links"}
            className="flex h-10 w-10 items-center justify-center bg-white shadow-lg transition-colors"
            style={{
              borderRight: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              borderTop: "none",
              borderLeft: "none",
              borderRadius: "0 0 12px 0",
            }}
          >
            <FaChevronRight
              size={15}
              className={`transition-transform duration-300 ${
                open ? "rotate-90" : ""
              }`}
              style={{ color: BRAND_NAVY }}
            />
          </button>

          <div
            className={`flex flex-col gap-1 overflow-hidden rounded-xl bg-white transition-all duration-500 ${
              open ? "max-h-80  opacity-100 border" : "max-h-0 p-0 opacity-0 border-0"
            }`}
            style={{ borderColor: "#e5e7eb", boxShadow: open ? "0 8px 24px rgba(28,43,51,0.12)" : "none" }}
          >
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 hover:scale-105"
                  style={{
                    color: item.color,
                    transitionDelay: open ? `${index * 60}ms` : "0ms",
                  }}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}