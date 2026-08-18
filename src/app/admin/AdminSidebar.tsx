"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Mail,
  Users,
  Home,
  LogOut,
  ChevronRight,
  FolderGit,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderGit },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/about", label: "About Page", icon: Users },
  { href: "/admin/home", label: "Home Page", icon: Home },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#62A611] text-white flex flex-col min-h-screen sticky top-0 h-screen overflow-y-auto border-r border-white">
      {/* Logo */}
   {/* Logo */}
<div className="flex items-center justify-center border-b border-white select-none">
  <img
    src="/logo.png"
    alt="Ephorsys Logo"
    className="w-20 h-20 object-contain"
  />

  <span
    className="text-xl font-black tracking-tight text-white"
    style={{ fontFamily: "var(--font-syne)" }}
  >
    Ephorsys
  </span>
</div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative ${
                isActive
                  ? "bg-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                  : "text-red-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon
                className="w-4 h-4 shrink-0"
                strokeWidth={isActive ? 2.5 : 1.8}
              />

              <span className="flex-1">{label}</span>

              {isActive && (
                <>
                  <ChevronRight
                    className="w-3.5 h-3.5"
                    strokeWidth={2.5}
                  />

                  <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1.5 h-7 bg-red-400 rounded-r-lg" />
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-4 py-6 border-t border-white">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3.5 py-3 w-full rounded-xl text-md font-semibold text-black  bg-white hover:bg-white/10 hover:text-black transition-all duration-300"
        >
          <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.8} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}