"use client"
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

export default function SocialMedia() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Desktop */}
      <div className="fixed left-2 top-1/2 z-[999] hidden -translate-y-1/2 lg:flex flex-col gap-2">
        {socialLinks.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-300 hover:-translate-x-2 hover:scale-110"
              style={{
                color: item.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = item.color;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = item.color;
              }}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>

     
    {/* Mobile */}
<div className="fixed left top-74 z-[999] lg:hidden">
  <div className="flex flex-col items-start gap-2">
    {/* Toggle */}
    <button
      onClick={() => setOpen(!open)}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-200 shadow-xl"
    >
      <  FaChevronRight

        size={18}
        className={`transition-all duration-300 ${
          open ? "rotate-90 text-[#E8A33D]" : "text-[#1C2B33]"
        }`}
      />
    </button>

    {/* Icons */}
    <div
      className={`flex flex-col items-center gap-2 overflow-hidden transition-all duration-500 ${
      open
      ? "ml-1 max-h-80 opacity-100"
      : "ml-0 max-h-0 opacity-0"
  }`}
     
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md transition-all duration-300 hover:scale-110"
            style={{
              color: item.color,
              transitionDelay: open ? `${index * 70}ms` : "0ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = item.color;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = item.color;
            }}
          >
            <Icon size={17} />
          </a>
        );
      })}
    </div>
  </div>
</div>
    </>
  );
}