"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import {
  Calendar,
  Clock,
  Code2,
  Lightbulb,
  Cpu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: number;
  image: string;
  category: string;
  categoryIcon: React.ElementType;
  categoryColor: string;
  categoryBg: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  title: string;
  excerpt: string;
  featured?: boolean;
  slug: string;
}

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  category: string;
  subcategory?: string;
  readTime: string;
  publishedAt?: string;
  author: {
    name: string;
    profileImage: string;
    role: string;
  };
};

// ─── Helper for Category Icon and Color mapping ───────────────────────────────

function getCategoryConfig(category: string) {
  const normalized = category?.toLowerCase() || "";
  if (normalized.includes("web") || normalized.includes("app") || normalized.includes("dev")) {
    return {
      categoryIcon: Code2,
      categoryColor: "#2563eb",
      categoryBg: "#eff6ff",
    };
  } else if (normalized.includes("growth") || normalized.includes("market") || normalized.includes("digital") || normalized.includes("seo")) {
    return {
      categoryIcon: Lightbulb,
      categoryColor: "#d97706",
      categoryBg: "#fffbeb",
    };
  } else {
    return {
      categoryIcon: Cpu,
      categoryColor: "#10b981",
      categoryBg: "#ecfdf5",
    };
  }
}

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Category Chip ────────────────────────────────────────────────────────────

function CategoryChip({
  label,
  icon: Icon,
  color,
  bg,
  small = false,
}: {
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold ${small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]"
        }`}
      style={{ backgroundColor: bg, color }}
    >
      <Icon className={small ? "h-2.5 w-2.5" : "h-3 w-3"} strokeWidth={2.2} />
      {label}
    </span>
  );
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(220px, 28vw, 320px)" }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className={`object-cover transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Featured pill */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-800 shadow-md backdrop-blur-sm">
          <Cpu className="h-3 w-3 text-[#74c316]" strokeWidth={2.5} />
          Featured
        </div>

        {/* Category on image bottom */}
        <div className="absolute bottom-4 left-4">
          <CategoryChip
            label={post.category}
            icon={post.categoryIcon}
            color={post.categoryColor}
            bg="rgba(255,255,255,0.93)"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Author + meta */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#6E54F3]/20 shadow-sm">
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
              <p className="text-[10px] text-gray-400">{post.authorRole}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Calendar className="h-3 w-3" strokeWidth={1.8} />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock className="h-3 w-3" strokeWidth={1.8} />
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          className={`mb-3 text-xl font-black leading-snug transition-colors duration-300 sm:text-2xl ${hovered ? "text-[#74c316]" : "text-gray-900"
            }`}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-6 flex-1 line-clamp-3 text-sm leading-relaxed text-gray-500 sm:text-base">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Link href={`/blog#${post.slug}`}>
            <button
              className="relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:-translate-y-px active:translate-y-0 group"
              style={{
                background: '#74c316',
                color: '#021a0a',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              <span className="relative text-white font-bold">Read Article</span>
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Side Card ────────────────────────────────────────────────────────────────

function SideCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex gap-4 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50 sm:gap-5 sm:p-5"
    >
      {/* Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className={`object-cover transition-transform duration-500 ${hovered ? "scale-110" : "scale-100"}`}
          sizes="112px"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 pb-1.5 pt-4">
          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            <post.categoryIcon className="h-2.5 w-2.5" strokeWidth={2.2} />
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        {/* Author + date */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="relative h-5 w-5 overflow-hidden rounded-full border border-gray-200">
              <Image
                src={post.authorAvatar}
                alt={post.author}
                fill
                className="object-cover"
                sizes="20px"
              />
            </div>
            <span className="text-[11px] font-semibold text-gray-600">
              {post.author}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Calendar className="h-2.5 w-2.5" strokeWidth={1.8} />
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`mb-2 text-sm font-bold leading-snug transition-colors duration-300 sm:text-[15px] ${hovered ? "text-[#74c316]" : "text-gray-900"
            }`}
        >
          <Link href={`/blog#${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-400">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Fallback Data ─────────────────────────────────────────────────────────────

const fallbackBlogs: BlogItem[] = [
  {
    _id: "fb1",
    title: "Why Your Business Needs a Website in 2026 (Not Just Social Media)",
    slug: "why-your-business-needs-a-website-2026",
    shortDescription: "Social media gives you reach — but a website gives you ownership. We break down why every serious business needs a professional website in 2026, and what happens when you rely only on Instagram or Facebook.",
    content: "Content",
    featuredImage: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg",
    category: "Web & App Development",
    subcategory: "Web Dev",
    readTime: "5 min read",
    publishedAt: "2026-01-10T00:00:00.000Z",
    author: {
      name: "Shantanu Sabyasachi Swain",
      profileImage: "https://i.pravatar.cc/40?img=11",
      role: "Full Stack Engineer",
    },
  },
  {
    _id: "fb2",
    title: "React vs Next.js — Which One Should You Choose for Your Project?",
    slug: "react-vs-nextjs-which-to-choose",
    shortDescription: "Both are powerful, but they solve different problems. Our engineering team breaks down when to use React alone vs when Next.js is the smarter choice — with real project examples from our work.",
    content: "Content",
    featuredImage: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352403/pexels-antonio-batinic-2573434-4164418_n2p1nf.jpg",
    category: "Web & App Development",
    subcategory: "Web Dev",
    readTime: "5 min read",
    publishedAt: "2026-01-18T00:00:00.000Z",
    author: {
      name: "BiswaRanjan Rout",
      profileImage: "https://i.pravatar.cc/40?img=12",
      role: "Frontend Engineer",
    },
  },
  {
    _id: "fb3",
    title: "How Much Does It Cost to Build a Website in India? (2026 Guide)",
    slug: "website-cost-india-2026",
    shortDescription: "From a ₹5,000 landing page to a ₹5 lakh SaaS platform — we break down what actually drives website costs in India, what you're really paying for, and how to avoid being overcharged.",
    content: "Content",
    featuredImage: "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352404/pexels-nemuel-6424586_zjpb9y.jpg",
    category: "Web & App Development",
    subcategory: "Web Dev",
    readTime: "5 min read",
    publishedAt: "2026-02-03T00:00:00.000Z",
    author: {
      name: "Sashwat Mohanty",
      profileImage: "https://i.pravatar.cc/40?img=14",
      role: "Tech Lead",
    },
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogSection({ blogsData }: { blogsData?: BlogItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.06 });

  const displayBlogs = blogsData && blogsData.length > 0 ? blogsData : fallbackBlogs;

  // Map data to local structure
  const activeBlogs = displayBlogs.map((b, idx) => {
    const catConfig = getCategoryConfig(b.category);
    return {
      id: idx + 1,
      image: b.featuredImage || "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg",
      category: b.category,
      categoryIcon: catConfig.categoryIcon,
      categoryColor: catConfig.categoryColor,
      categoryBg: catConfig.categoryBg,
      author: b.author?.name || "Ephorsys Team",
      authorRole: b.author?.role || "Team Member",
      authorAvatar: b.author?.profileImage || "https://i.pravatar.cc/40?img=11",
      date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
      title: b.title,
      excerpt: b.shortDescription,
      featured: idx === 0,
      slug: b.slug,
    };
  });

  // If there are no blogs to display (should not happen with fallbacks), don't render
  if (activeBlogs.length === 0) return null;

  const featured = activeBlogs.find((p) => p.featured) || activeBlogs[0];
  const sidePosts = activeBlogs.filter((p) => p !== featured);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-white"
    >
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-15 lg:pb-15">

        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.55 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Insights on Software,{" "}
              <span className="text-[#74c316]">AI & IT</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-black sm:text-base">
              Practical articles on software engineering, artificial intelligence, and IT consulting — written by our team at Ephorsys.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-7"
        >
          {/* Featured */}
          {featured && <FeaturedCard post={featured} />}

          {/* Side posts */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {sidePosts.map((post) => (
              <SideCard key={post.id} post={post} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}