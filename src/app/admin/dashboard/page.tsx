import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import JobApplication from "@/models/JobApplication";
import Blog from "@/models/Blog";
import ContactSubmission from "@/models/ContactSubmission";
import ConsultancySubmission from "@/models/ConsultancySubmission";
import { Briefcase, FileText, Mail, Users, Headphones } from "lucide-react";

async function getStats() {
  await connectDB();
  const [jobs, applications, blogs, contacts, consultancies] = await Promise.all([
    Job.countDocuments({ isActive: true }),
    JobApplication.countDocuments({ status: "new" }),
    Blog.countDocuments({ status: "published" }),
    ContactSubmission.countDocuments({ status: "new" }),
    ConsultancySubmission.countDocuments({ status: "new" }),
  ]);
  return { jobs, applications, blogs, contacts, consultancies };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Active Jobs", value: stats.jobs, icon: Briefcase, color: "#74c316" },
    { label: "New Applications", value: stats.applications, icon: Users, color: "#3b82f6" },
    { label: "Published Blogs", value: stats.blogs, icon: FileText, color: "#8b5cf6" },
    { label: "New Contacts", value: stats.contacts, icon: Mail, color: "#f59e0b" },
    { label: "Consultancy", value: stats.consultancies, icon: Headphones, color: "#10b981" },
  ];

  return (
    <div>
      {/* Title block */}
      <div className="mb-10 select-none">
        <h1 className="text-3xl font-black text-[#042407] tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
          Console Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1.5 font-medium">Real-time status overview of the Ephorsys platform.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-[#74c316]/30 hover:shadow-[0_10px_30px_rgba(116,195,22,0.05)] transition-all duration-300 flex flex-col gap-4 group"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}10`, border: `1px solid ${color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color }} strokeWidth={2} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">Live</span>
            </div>
            <div>
              <p className="text-4xl font-black text-gray-900 tracking-tight">{value}</p>
              <p className="text-xs font-semibold text-gray-500 tracking-wide mt-1 uppercase">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links section */}
      <div className="mt-10 bg-white border border-gray-200/60 rounded-2xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
        <h2 className="text-lg font-bold text-[#042407] tracking-tight mb-5" style={{ fontFamily: "var(--font-syne)" }}>System Controllers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/admin/careers", label: "Openings Registry" },
            { href: "/admin/careers?tab=applications", label: "Job Applicants Inbox" },
            { href: "/admin/blog", label: "Publish Articles" },
            { href: "/admin/contacts", label: "Contact Submissions" },
            { href: "/admin/consultancy", label: "Consultancy Leads" },
            { href: "/admin/about", label: "Team & Life Gallery" },
            { href: "/admin/home", label: "Homepage Metrics & Logos" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs font-bold text-[#42720e] uppercase tracking-wider bg-[#74c316]/5 hover:bg-[#74c316]/10 border border-[#74c316]/20 hover:border-[#74c316]/40 rounded-xl px-5 py-4 transition-all duration-300 text-center hover:scale-[1.02] active:scale-[0.98]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
