import Link from "next/link";
import {
  FaLinkedin, FaInstagram,
  FaFacebook, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaPhone
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const companyLinks = [
  { label: "Home",       path: "/" },
  { label: "About Us",  path: "/about" },
  { label: "Careers",   path: "/career" },
  { label: "Blog",      path: "/blog" },
  { label: "Contact Us",path: "/contact" },
];

const SERVICES = [
  { href: "/services/app-development", label: "App Development" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/software-development", label: "Software Development" },
  { href: "/services/product-design", label: "Product Design" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/seo", label: "SEO" },
] as const;

const industries = [
  "Startups", "Healthcare", "E-Commerce",
  "Education", "FinTech", "Enterprise Solutions",
];

const socials = [
  { href: "https://www.linkedin.com/company/ephorsys/",    icon: <FaLinkedin size={20} /> },
  { href: "https://www.instagram.com/ephorsysofficial",    icon: <FaInstagram size={20} /> },
  { href: "https://x.com/ephorsys?s=20",                   icon: <BsTwitterX size={20} /> },
  { href: "https://www.facebook.com/share/1D8b4PDFrf/",    icon: <FaFacebook size={20} /> },
  { href: "https://youtube.com/@ephorsys",                 icon: <FaYoutube size={20} /> },
];

export default function Footer() {
  return (
    <footer className="relative bg-linear-to-br from-[#042407] via-[#0a2f1e] to-[#042407]
                       text-white overflow-hidden
                       px-4 sm:px-6 md:px-10
                       rounded-3xl sm:rounded-4xl lg:rounded-5xl
                       mx-2 sm:mx-4 md:mx-6 mb-4">

      {/* Watermark — desktop only */}
      <div className="absolute inset-0 mt-70  flex font-heading justify-center pointer-events-none select-none">
        <h1 className="hidden lg:block lg:text-8xl lg:pt-36 xl:text-9xl xl:pt-6
                         bg-linear-to-t from-[#74c316]/10 via-[#74c316]/25 to-[#74c316]/15
                         bg-clip-text text-transparent font-extrabold "
                        //  style={{ fontFamily: "'Nunito', sans-serif" }}
                         >
          EPHORSYS
        </h1>
      </div>

      <div className="relative mx-auto py-10 sm:py-12 md:py-16 max-w-7xl">

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                        gap-8 sm:gap-10
                        px-0 sm:px-4 md:px-8 lg:px-10">

          {/* ── Col 1: Logo + Contact + Social ── */}
          <div className="flex flex-col gap-4 sm:col-span-2  lg:col-span-1 ">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-[#74c316]">
                Ephorsys
              </h2>
            </Link>

            <div className="space-y-3 text-sm text-[#c5e08a]">
              <p className="flex items-center gap-2">
                <FaPhone className="text-[#74c316] shrink-0" />
                <span>+91 7873367335</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-[#74c316] shrink-0" />
                <a href="mailto:business@ephorsys.com"
                   className="hover:text-[#74c316] transition break-all">
                  business@ephorsys.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-[#74c316] shrink-0" />
                <a href="mailto:hr@ephorsys.com"
                   className="hover:text-[#74c316] transition break-all">
                  hr@ephorsys.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-[#74c316] mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Ephorsys Private Limited: 7QHC+6PW, K8 Kalinga Nagar,
                  Kalinganagar, Bhubaneswar, Odisha 751003
                </span>
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 pt-3 flex-wrap">
              {socials.map(({ href, icon }) => (
                <Link key={href} href={href} target="_blank"
                      className="text-[#c5e08a] hover:text-[#74c316]
                                 transition-all hover:scale-110
                                 w-9 h-9 flex items-center justify-center
                                 rounded-full border border-white/10 hover:border-[#74c316]/40">
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2: What We Do ── */}
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-semibold mb-4 sm:mb-5
                           text-[#74c316] tracking-wider uppercase">
              What We Do
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 font-heading text-sm text-[#c5e08a]">
              {SERVICES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                        className="hover:text-[#74c316] transition-colors duration-200
                                   hover:translate-x-0.5 inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Company ── */}
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-semibold mb-4 sm:mb-5
                           text-[#74c316] tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-[#c5e08a]">
              {companyLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link href={path}
                        className="hover:text-[#74c316] font-heading transition-colors duration-200
                                   hover:translate-x-0.5 inline-block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Industries ── */}
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-semibold mb-4 sm:mb-5
                           text-[#74c316] tracking-wider uppercase">
              Industries
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-sm text-[#c5e08a]">
              {industries.map((industry) => (
                <li key={industry} className="flex  font-heading items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#74c316] rounded-full shrink-0" />
                  {industry}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Divider on mobile: thin visual separator between cols ── */}
        {/* <div className="block sm:hidden mt-2 border-t border-white/5" /> */}

        {/* ── Copyright ── */}
        <div className="mt-10 sm:mt-14 md:mt-18
                        pt-6 sm:pt-14 xl:mt-25
                        border-t border-white/10
                        text-center text-[0.65rem] sm:text-xs
                        font-heading text-white/70">
          © {new Date().getFullYear()} Ephorsys Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}