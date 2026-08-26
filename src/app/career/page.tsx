import FullTimeOpportunities from "@/components/careerpage/Fulltimeopportunities";
import InternshipOpportunities from "@/components/careerpage/Internshipopportunities ";
import BgHero from "@/components/outlet/bg-hero";
import type { Metadata } from "next";

import { connectDB } from "@/lib/db";
import Job from "@/models/Job";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Career Ephorsys Pvt Ltd | Best Software Company in Bhubaneswar, Odisha",
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

async function getJobsData() {
  try {
    await connectDB();
    const jobs = await Job.find({ isActive: true }).sort({ postedAt: -1 }).lean();
    const serialized = JSON.parse(JSON.stringify(jobs));
    return {
      fullTime: serialized.filter((j: any) => j.type === "full-time"),
      internships: serialized.filter((j: any) => j.type === "internship"),
    };
  } catch (error) {
    console.error("Failed to load jobs data:", error);
    return { fullTime: [], internships: [] };
  }
}

export default async function Career() {
  const data = await getJobsData();

  return (
    <div>
      <BgHero
        tag="Career"
        heading={
          <>
            Shape Your <span style={{ color: "#74c316" }}>Future With Us</span>
          </>
        }
        description="Join us to innovate, collaborate, and build your future."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg"
      />
      <FullTimeOpportunities jobs={data.fullTime} />
      <InternshipOpportunities jobs={data.internships} />
    </div>
  );
}

