import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import PortfolioClient from "./PortfolioClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | Ephorsys Pvt Ltd",
  description: "Explore our engineered solutions, live platforms, and software system case studies. Specialized in custom web applications, mobile apps, and LLM integrations.",
};

async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({ isPublished: true }).sort({ isFeatured: -1, startDate: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to load portfolio projects:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();
  return <PortfolioClient projects={projects} />;
}
