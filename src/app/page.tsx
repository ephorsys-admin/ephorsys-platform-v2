import OurApproach from "@/components/homePage/ourapproch";
import AboutSection from "@/components/homePage/about";
import WhatWeProvide from "@/components/homePage/whatWeProvide";
import type { Metadata } from "next";
import { Testimonials } from "@/components/homePage/testimonial";
import FAQSection from "@/components/homePage/faq";
import HeroSection from "@/components/homePage/hero";
import SlidingService from "@/components/homePage/slidingServices";
import StatsSection from "@/components/homePage/statsSection";
import Techstack from "@/components/homePage/techstack";
import OurServices from "@/components/homePage/ourServices";
import BlogSection from "@/components/homePage/ourblog";
import ClientLogosSection from "@/components/homePage/ClientLogosSection";

import { connectDB } from "@/lib/db";
import Stat from "@/models/Stat";
import Testimonial from "@/models/Testimonial";
import ClientLogo from "@/models/ClientLogo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Ephorsys Pvt Ltd | Best Software Company in Bhubaneswar, Odisha",
  description:
    "Ephorsys Pvt Ltd, founded in 2025, is a leading software development company in Bhubaneswar, Odisha. We deliver custom web, mobile app, AI, and digital marketing solutions for startups and enterprises across Odisha and pan-India.",
  keywords: [
    "Ephorsys",
    "Ephorsys Pvt Ltd",
    "Ephorsys Technologies",
    "software company in Bhubaneswar",
    "best software company in Bhubaneswar",
    "top software company in Bhubaneswar",
    "IT company in Bhubaneswar",
    "IT services company Odisha",
    "software company Odisha",
    "web development company Bhubaneswar",
    "website development Bhubaneswar",
    "custom web development Odisha",
    "app development company Bhubaneswar",
    "mobile app development Odisha",
    "software development company Bhubaneswar",
    "custom software development Odisha",
    "AI development company Bhubaneswar",
    "AI solutions company Odisha",
    "artificial intelligence services",
    "LLM development company",
    "Generative AI solutions",
    "business automation services",
    "AI agent development",
    "digital transformation company",
    "digital marketing company Bhubaneswar",
    "SEO services Bhubaneswar",
    "search engine optimization Odisha",
    "full stack development company",
    "React.js development company",
    "Next.js development company",
    "Node.js development company",
    "MERN stack development company",
    "enterprise software solutions",
    "startup software development company",
    "cloud application development",
    "ecommerce website development",
    "CRM software development",
    "ERP software development",
    "UI UX design company Bhubaneswar",
    "technology consulting company",
    "custom business software",
    "web application development",
    "software outsourcing company India",
    "best web development company Odisha",
  ]
};

async function getHomeData() {
  try {
    await connectDB();
    const [stats, testimonials, logos] = await Promise.all([
      Stat.find().sort({ order: 1 }).lean(),
      Testimonial.find({ isActive: true }).sort({ order: 1 }).lean(),
      ClientLogo.find().sort({ order: 1 }).lean(),
    ]);

    return {
      stats: JSON.parse(JSON.stringify(stats)),
      testimonials: JSON.parse(JSON.stringify(testimonials)),
      logos: JSON.parse(JSON.stringify(logos)),
    };
  } catch (error) {
    console.error("Failed to load home page data:", error);
    return { stats: [], testimonials: [], logos: [] };
  }
}

export default async function Home() {
  const data = await getHomeData();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <HeroSection />
      <SlidingService />
      <AboutSection />
      <Techstack />
      <OurApproach />
      
      <OurServices />
      
      <BlogSection />
      <WhatWeProvide />
      <StatsSection statsData={data.stats} />
      <Testimonials testimonialsData={data.testimonials} />
      <ClientLogosSection logosData={data.logos} />
      <FAQSection />
    </div>
  );
}