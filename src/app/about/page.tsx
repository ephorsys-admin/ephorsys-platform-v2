import { LayoutGridDemo } from "@/components/aboutpage/lifeat";
import CompanyOverview from "@/components/aboutpage/companyOverview";
import TeamSection from "@/components/aboutpage/ourTeam";
import AboutUs from "@/components/aboutpage/aboutUs";
import BgHero from "@/components/outlet/bg-hero";
import type { Metadata } from "next";
import WhatWeDo from "@/components/aboutpage/whatwedo";

export const metadata: Metadata = {
  title: "About Ephorsys Pvt Ltd | Best Software Company in Bhubaneswar, Odisha",
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



export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <BgHero
        tag="About Us"
        heading={
          <>
            About <span style={{ color: "#74c316" }}>EPHORSYS</span>
          </>
        }
        description="We deliver reliable, result-driven digital solutions."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-divinetechygirl-1181619_buw8tg.jpg"
      />
      <CompanyOverview />
      <AboutUs />
      <WhatWeDo/>
      <LayoutGridDemo />
      <TeamSection />
    </div>
  );
}
