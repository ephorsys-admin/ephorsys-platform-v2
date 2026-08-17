import TeamShowcase from "@/components/ui/team-showcase";

export default function TeamShowcaseDemo({
  leadersData,
  coreTeamData,
}: {
  leadersData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  coreTeamData?: { name: string; position: string; photo: string; linkedIn?: string }[];
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 ">
      {/* <div className="mx-auto max-w-5xl px-4"> */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold  sm:text-4xl md:text-4xl">
          We have world <span className="text-[#74c316]">expert team</span>
        </h2>
      </div>
      <div className="flex items-center mb-5" >
        <TeamShowcase leadersData={leadersData} coreTeamData={coreTeamData} />
      </div>
    </div>
  );
}

