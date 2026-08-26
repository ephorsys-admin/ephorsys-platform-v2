import TeamShowcase from "@/components/ui/team-showcase";

export default function TeamShowcaseDemo({
  leadersData,
  developersData,
  marketingData,
  bdeData,
}: {
  leadersData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  developersData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  marketingData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  bdeData?: { name: string; position: string; photo: string; linkedIn?: string }[];
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 ">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold  sm:text-4xl md:text-4xl">
          We have world <span className="text-[#74c316]">expert team</span>
        </h2>
      </div>
      <div className="flex items-center mb-5 w-full" >
        <TeamShowcase
          leadersData={leadersData}
          developersData={developersData}
          marketingData={marketingData}
          bdeData={bdeData}
        />
      </div>
    </div>
  );
}

