import { LayoutGridDemo } from "@/components/aboutpage/lifeat";
import CompanyOverview from "@/components/aboutpage/companyOverview";
import TeamSection from "@/components/aboutpage/ourTeam";
import AboutUs from "@/components/aboutpage/aboutUs";
import BgHero from "@/components/outlet/bg-hero";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <BgHero
        tag="About Us"
        heading={
          <>
            About Our <span style={{ color: "#74c316" }}>Company</span>
          </>
        }
        description="We deliver reliable, result-driven digital solutions."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-divinetechygirl-1181619_buw8tg.jpg"
      />
      <CompanyOverview />
      <AboutUs />
      <LayoutGridDemo />
      <TeamSection />
    </div>
  );
}
