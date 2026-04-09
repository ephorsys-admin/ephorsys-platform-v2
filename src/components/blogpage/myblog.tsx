"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, Lightbulb } from "lucide-react";

/* ─────────────────────────── DATA ─────────────────────────── */
const blogs = [
    {
        id: 1,
        category: "Web & App Development",
        title: "Why Your Business Needs a Website in 2026 (Not Just Social Media)",
        excerpt:
            "Social media gives you reach — but a website gives you ownership. We break down why every serious business needs a professional website in 2026, and what happens when you rely only on Instagram or Facebook.",
        more: "At Ephorsys, we've worked with dozens of businesses that built their entire presence on social platforms — only to lose reach overnight due to algorithm changes or account issues. A website is your owned digital real estate. It gives you control over your brand, your SEO, your data, and your customer journey. In 2026, not having a website isn't just a missed opportunity — it's a credibility gap your competitors will exploit.",
        image: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg",
        slug: "why-your-business-needs-a-website-2026",
        tag: "Web Dev",
        number: "01",
        author: "Shantanu Sabyasachi Swain",
        authorRole: "Full Stack Engineer",
        authorAvatar: "https://i.pravatar.cc/40?img=11",
        date: "Jan 10, 2026",
        featured: true,
    },
    {
        id: 2,
        category: "Web & App Development",
        title: "React vs Next.js — Which One Should You Choose for Your Project?",
        excerpt:
            "Both are powerful, but they solve different problems. Our engineering team breaks down when to use React alone vs when Next.js is the smarter choice — with real project examples from our work.",
        more: "React is a UI library — fast, flexible, and unopinionated. Next.js builds on top of React to add routing, SSR, SSG, API routes, and image optimization out of the box. Our rule of thumb: if you're building a standalone SPA or a component library, stick with React. If you're building a production web application that needs SEO, fast page loads, or a backend API layer, Next.js is almost always the better call. It's the framework we default to for 90% of our client projects.",
        image: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352403/pexels-antonio-batinic-2573434-4164418_n2p1nf.jpg",
        slug: "react-vs-nextjs-which-to-choose",
        tag: "Web Dev",
        number: "02",
        author: "BiswaRanjan Rout",
        authorRole: "Frontend Engineer",
        authorAvatar: "https://i.pravatar.cc/40?img=12",
        date: "Jan 18, 2026",
    },
    {
        id: 3,
        category: "Web & App Development",
        title: "How Much Does It Cost to Build a Website in India? (2026 Guide)",
        excerpt:
            "From a ₹5,000 landing page to a ₹5 lakh SaaS platform — we break down what actually drives website costs in India, what you're really paying for, and how to avoid being overcharged.",
        more: "Cost is driven by three factors: complexity, design fidelity, and ongoing maintenance. A basic landing page can be done in 2–3 days and costs ₹5,000–₹15,000. A multi-page business website with custom design runs ₹30,000–₹1,20,000. A full-stack web app or SaaS product starts at ₹2,50,000 and scales with features. Red flags: agencies quoting ₹5,000 for 'everything' are usually using templates with zero customisation. Always ask for a breakdown — design, development, content, and hosting are separate line items.",
        image: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352404/pexels-nemuel-6424586_zjpb9y.jpg",
        slug: "website-cost-india-2026",
        tag: "Web Dev",
        number: "03",
        author: "Sashwat Mohanty",
        authorRole: "Tech Lead",
        authorAvatar: "https://i.pravatar.cc/40?img=14",
        date: "Feb 3, 2026",
    },
    {
        id: 4,
        category: "Web & App Development",
        title: "7 Signs Your Website Is Actively Hurting Your Business",
        excerpt:
            "A bad website doesn't just fail to help — it actively drives customers away. Here are 7 red flags our team spots during audits, and what we do to fix them fast.",
        more: "The seven signs: (1) Page load over 3 seconds — you're losing 40% of visitors before they see anything. (2) Not mobile-responsive — 70%+ of traffic is mobile in India. (3) No HTTPS — browsers warn users before they even land. (4) Unclear CTA — visitors don't know what to do next. (5) Stock photos everywhere — instant trust killer. (6) Outdated copyright year in the footer — signals neglect. (7) Broken contact forms — you're losing leads in silence. Each of these is fixable in under a sprint.",
        image: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352859/pexels-fauxels-3184339_f4bqd4.jpg",
        slug: "7-signs-website-hurting-business",
        tag: "Web Dev",
        number: "04",
        author: "Samir Kumar Swain",
        authorRole: "UX Engineer",
        authorAvatar: "https://i.pravatar.cc/40?img=18",
        date: "Feb 14, 2026",
    },
    {
        id: 5,
        category: "Digital Growth & Marketing",
        title: "How to Get Your First 100 Customers Online (Without Paid Ads)",
        excerpt:
            "Paid ads aren't the only path. We share the exact organic growth playbook we've used with early-stage clients — from SEO content to LinkedIn outreach — to land their first 100 customers.",
        more: "Our organic playbook has five moves: (1) Publish one high-intent SEO article per week — target problems your customers are already Googling. (2) Claim and optimise your Google Business Profile — free, often ignored. (3) Post case studies on LinkedIn, not just announcements — results get shares, product updates don't. (4) Partner with adjacent freelancers who serve your target customer — they refer, you refer back. (5) Build a 'Start Here' email sequence for new subscribers — it converts 3–5× better than a broadcast newsletter. Clients following this playbook consistently hit 100 customers inside 90 days.",
        image: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352863/pexels-yankrukov-7691722_rbgfzn.jpg",
        slug: "first-100-customers-online",
        tag: "Growth",
        number: "05",
        author: "Ankita Panda",
        authorRole: "Growth Strategist",
        authorAvatar: "https://i.pravatar.cc/40?img=15",
        date: "Dec 20, 2025",
    },
];

const TAG_STYLE: Record<string, { bg: string; text: string }> = {
    "Web Dev": { bg: "bg-[#eff6ff]", text: "text-[#2563eb]" },
    Growth: { bg: "bg-[#fffbeb]", text: "text-[#d97706]" },
};

type Blog = (typeof blogs)[number];

/* ─────────────────────────── TAG BADGE ─────────────────────── */
function TagBadge({ tag }: { tag: string }) {
    const s = TAG_STYLE[tag] ?? { bg: "bg-gray-200", text: "text-gray-900" };
    return (
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${s.bg} ${s.text}`}>
            {tag}
        </span>
    );
}

/* ─────────────────── EXPAND BUTTON ─────────────────────────── */
function ExpandBtn({ open, onClick }: { open: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center gap-2 text-[#74c316] text-[11px] font-bold uppercase tracking-widest mt-4 hover:gap-3 transition-all duration-200"
        >
            {open ? "Show less" : "Read more"}
            <span
                className="flex items-center justify-center w-6 h-6 rounded-full border border-[#74c316]/40 group-hover:bg-[#74c316]/15 transition-all duration-200"
                style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
            >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </span>
        </button>
    );
}

/* ─────────────────── FEATURED CARD ─────────────────────────── */
function FeaturedCard({ post }: { post: Blog }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="group grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden border border-gray-200 bg-white hover:border-[#74c316]/30 transition-colors duration-300">
            <div className="relative lg:col-span-2 h-60 sm:h-72 lg:h-full min-h-70 overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 saturate-[0.6] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#111]/60 hidden lg:block" />
                <div className="absolute inset-0 bg-linear-to-t from-[#111]/60 to-transparent lg:hidden" />
                <span className="absolute top-5 left-5 font-black text-5xl text-black/8 select-none leading-none">
                    {post.number}
                </span>
                <div className="absolute bottom-4 left-4 lg:hidden">
                    <TagBadge tag={post.tag} />
                </div>
            </div>
            <div className="lg:col-span-3 flex flex-col justify-between p-7 sm:p-10">
                <div>
                    {/* Author info */}
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#74c316]/20 shadow-sm">
                            <Image
                                src={post.authorAvatar}
                                alt={post.author}
                                fill
                                className="object-cover"
                                sizes="36px"
                            />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-800">{post.author}</p>
                            <p className="text-[10px] text-gray-400">{post.authorRole} · {post.date}</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 mb-5">
                        <TagBadge tag={post.tag} />
                        <span className="text-gray-400 text-xs">{post.category}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-snug tracking-tight mb-4">
                        {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                    <div
                        style={{ maxHeight: open ? "400px" : "0px", opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease" }}
                    >
                        <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-[#74c316]/40 pl-4 mt-4">
                            {post.more}
                        </p>
                    </div>
                    <ExpandBtn open={open} onClick={() => setOpen(!open)} />
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── GRID CARD ─────────────────────────── */
function GridCard({ post }: { post: Blog }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-[#74c316]/30 hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-44 overflow-hidden shrink-0">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 saturate-[0.55] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d]/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                    <TagBadge tag={post.tag} />
                </div>
                <span className="absolute top-3 right-3 font-black text-3xl text-black/8 select-none leading-none">
                    {post.number}
                </span>
            </div>
            <div className="flex flex-col flex-1 p-5">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-2">{post.category}</p>
                <h3 className="text-gray-900 font-black text-base leading-snug mb-3 group-hover:text-[#74c316] transition-colors duration-200">
                    {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                <div
                    style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0, overflow: "hidden", transition: "max-height 0.5s ease, opacity 0.4s ease" }}
                >
                    <p className="text-gray-500 text-xs leading-relaxed border-l-2 border-[#74c316]/30 pl-3 mt-3">
                        {post.more}
                    </p>
                </div>

                {/* Author row */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-gray-200">
                        <Image
                            src={post.authorAvatar}
                            alt={post.author}
                            fill
                            className="object-cover"
                            sizes="24px"
                        />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500">{post.author}</span>
                    <span className="text-[11px] text-gray-400 ml-auto">{post.date}</span>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-gray-200 mt-3">
                    <ExpandBtn open={open} onClick={() => setOpen(!open)} />
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── NEWSLETTER ────────────────────────── */
function Newsletter() {
    const [email, setEmail] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPopup(false)} />
                    <div
                        className="relative bg-white border border-[#74c316]/30 rounded-3xl px-8 py-10 max-w-sm w-full text-center shadow-2xl"
                        style={{ animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
                    >
                        <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="w-16 h-16 rounded-full bg-[#74c316]/15 border border-[#74c316]/30 flex items-center justify-center mx-auto mb-5">
                            <svg className="w-8 h-8 text-[#74c316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">You&apos;re in! 🎉</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Great to have you. Expect fresh insights from the Ephorsys team straight to your inbox — no noise, just signal.
                        </p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#74c316] text-black text-sm font-black px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300"
                        >
                            Awesome, thanks!
                        </button>
                    </div>
                </div>
            )}
           
        </>
    );
}

/* ──────────────────────────── MAIN ─────────────────────────── */
export default function Myblog() {
    const featured = blogs.find((b) => b.featured)!;
    const rest = blogs.filter((b) => !b.featured);

    return (
        <>
            <style>{`
                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.85) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>

            <section className="bg-[#f5f5f5] min-h-screen py-16 px-4 sm:px-8 lg:px-16">
                <div className="max-w-7xl mx-auto">

                    {/* ── TOP BAR ── */}
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <span className="w-1 h-6 bg-[#74c316] rounded-full" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                Latest Articles
                            </span>
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#74c316] transition-colors duration-200 uppercase tracking-widest"
                        >
                            View all
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* FEATURED */}
                    <div className="mb-8">
                        <FeaturedCard post={featured} />
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        {rest.map((post) => (
                            <GridCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* NEWSLETTER */}
                    <Newsletter />
                </div>
            </section>
        </>
    );
}