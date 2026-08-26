import { LayoutGridDemo } from "@/components/aboutpage/lifeat";
import TeamSection from "@/components/aboutpage/ourTeam";
import BgHero from "@/components/outlet/bg-hero";
import type { Metadata } from "next";

import { connectDB } from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import LifeAtPhoto from "@/models/LifeAtPhoto";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team & Life at Ephorsys | Software Development Company in Bhubaneswar",
  description:
    "Meet the expert team of developers, designers, and innovators at Ephorsys Pvt Ltd. Explore our work culture, life at Ephorsys, and our commitment to excellence.",
  keywords: [
    "Ephorsys team",
    "Ephorsys pvt ltd team",
    "Ephorsys developers",
    "Ephorsys work culture",
    "life at ephorsys",
    "software developers Bhubaneswar",
    "tech team Odisha",
    "meet our developers",
  ]
};

async function getTeamData() {
  try {
    await connectDB();
    const [members, photos] = await Promise.all([
      TeamMember.find().sort({ order: 1 }).lean(),
      LifeAtPhoto.find().sort({ order: 1 }).lean(),
    ]);

    const serializedMembers = JSON.parse(JSON.stringify(members));
    const serializedPhotos = JSON.parse(JSON.stringify(photos));

    return {
      leaders: serializedMembers.filter((m: any) => m.category === "leader"),
      developers: serializedMembers.filter((m: any) => m.category === "core-developer" || m.category === "core" || m.category === "core-software-engineer"),
      marketing: serializedMembers.filter((m: any) => m.category === "core-digital-marketing" || m.category === "core-marketing-team"),
      bde: serializedMembers.filter((m: any) => m.category === "core-bde" || m.category === "core-business-development-executive"),
      photos: serializedPhotos,
    };
  } catch (error) {
    console.error("Failed to load team data:", error);
    return { leaders: [], developers: [], marketing: [], bde: [], photos: [] };
  }
}

export default async function Team() {
  const data = await getTeamData();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 ">
      <BgHero
        tag="Our Team"
        heading={
          <>
            Meet the <span style={{ color: "#74c316" }}>TEAM</span>
          </>
        }
        description="The talented minds driving innovation and success at Ephorsys."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-divinetechygirl-1181619_buw8tg.jpg"
      />
      <TeamSection
        leadersData={data.leaders}
        developersData={data.developers}
        marketingData={data.marketing}
        bdeData={data.bde}
      />
      <LayoutGridDemo photosData={data.photos} />

      {/* Ready to Join Our Team? Section */}
      <section className="bg-zinc-50 py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to <span className="text-[#74C316]">Join Our Team?</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            We're always looking for passionate individuals who want to make a difference in the world of AI and technology.
          </p>
          <a
            href="/career"
            className="inline-flex items-center justify-center bg-[#62A611] hover:bg-[#74C316] text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}
