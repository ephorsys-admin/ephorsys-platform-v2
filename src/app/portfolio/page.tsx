import BgHero from "@/components/outlet/bg-hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Ephorsys Pvt Ltd",
  description: "View our portfolio of successful web and mobile application projects.",
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <BgHero
        tag="Portfolio"
        heading={
          <>
            Our <span style={{ color: "#74c316" }}>Projects</span>
          </>
        }
        description="Our portfolio is coming soon. We are preparing to showcase our web applications, mobile apps, and custom software systems."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-divinetechygirl-1181619_buw8tg.jpg"
      />
      <div className="max-w-4xl mx-auto text-center py-24 px-4">
        <h2 className="text-3xl font-extrabold text-[#042407] mb-4">
          Under Construction
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          We are currently gathering and designing the case studies for our projects. Please check back later!
        </p>
      </div>
    </div>
  );
}
