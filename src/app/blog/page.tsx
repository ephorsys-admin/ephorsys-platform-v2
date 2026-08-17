import Industry from "@/components/blogpage/Industry";
import Myblog from "@/components/blogpage/myblog";
import BgHero from "@/components/outlet/bg-hero";
import type { Metadata } from "next";

import { connectDB } from "@/lib/db";
import BlogModel from "@/models/Blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Ephorsys Pvt Ltd | Best Software Company in Bhubaneswar, Odisha",
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

async function getBlogsData() {
  try {
    await connectDB();
    const blogs = await BlogModel.find({ status: "published" }).sort({ publishedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Failed to load blogs data:", error);
    return [];
  }
}

export default async function Blog() {
  const blogsData = await getBlogsData();

  return (
    <div>
      <BgHero
        tag="Blogs"
        heading={
          <>
            Our <span style={{ color: "#74c316" }}>Blogs</span>
          </>
        }
        description="We deliver reliable, result-driven digital solutions."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352402/pexels-fauxels-3183148_z5qdff.jpg"
      />
      <Industry />
      <Myblog blogsData={blogsData} />
    </div>
  );
}

