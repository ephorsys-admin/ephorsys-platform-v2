"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-white text-gray-900">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#010702] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#041a08] via-[#021004] to-[#010702] text-gray-200">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
