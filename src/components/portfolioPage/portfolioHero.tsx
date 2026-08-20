import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Portfolio | Ephorsys Pvt Ltd",
    description:
        "Explore our engineered solutions, live platforms, and software system case studies. Specialized in custom web applications, mobile apps, and LLM integrations.",
};

async function getProjects() {
    try {
        await connectDB();
        const projects = await Project.find({ isPublished: true })
            .sort({ isFeatured: -1, startDate: -1 })
            .lean();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to load portfolio projects:", error);
        return [];
    }
}

const INDUSTRY_TAGS = [
  "Healthcare & Medical",
  "Automotive & Car Rental",
  "Education & E-Learning",
  "Schools & Educational Institutions",
  "Salon & Spa",
  "Events & Event Management",
  "Food & Hospitality",
  "E-Commerce & Retail",
  "Jewellery & Lifestyle",
  "NGO & Foundations",
];

export default async function PortfolioHero() {
    const projects = await getProjects();

    const getCategoryBadgeLabel = (cat: string) => {
        switch (cat) {
            case "web_dev": return "Web Application";
            case "app_dev": return "Mobile App Dev";
            case "seo": return "SEO Optimization";
            case "marketing": return "Digital Marketing";
            case "branding": return "Branding Project";
            default: return cat;
        }
    };

    return (
        <div className=" bg-[#f8f9fa] text-slate-900 selection:bg-[#62a611] selection:text-white select-none">

            {/* ══ HERO SECTION ══ */}
            <section
                className="relative w-full overflow-hidden"
                style={{
                    background:
                        "linear-gradient(135deg, #0f1f07 0%, #1a3a0a 30%, #62a611 70%, #8fd832 100%)",
                    minHeight: "400px",
                }}
            >
                {/* Radial glow — top right */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 85% 50%, rgba(143,216,50,0.22) 0%, transparent 60%)",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-white/50 font-semibold mb-8 tracking-wide">
                        <Link href="/" className="hover:text-white transition-colors duration-200">
                            Home
                        </Link>
                        <span className="text-white/30">›</span>
                        <span className="text-white/90">Portfolio</span>
                    </nav>

                    {/* Title */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Proven Work
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-[0.95rem] text-white/65 max-w-xl leading-relaxed mb-10">
                        Explore the digital products and technology solutions we've delivered
                        across healthcare, mobility, education, e-commerce, hospitality, and
                        other industries.
                    </p>

                    {/* Industry Pill Tags */}
                    <div className="flex flex-wrap gap-2.5">
                        {INDUSTRY_TAGS.map((tag) => (
                            <span
                                key={tag}
                                className="border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full"
                                style={{ background: "rgba(255,255,255,0.07)" }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                </div>
            </section>

        </div>
    );
}