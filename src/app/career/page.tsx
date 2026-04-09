import FullTimeOpportunities from "@/components/careerpage/Fulltimeopportunities";
import InternshipOpportunities from "@/components/careerpage/Internshipopportunities ";
import BgHero from "@/components/outlet/bg-hero";

export default function Career() {
  return (
    <div>
      <BgHero
        tag="Career"
        heading={
          <>
            Shape Your <span style={{ color: "#74c316" }}>Future With Us</span>
          </>
        }
        description= "Join us to innovate, collaborate, and build your future."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg"
      />
      <FullTimeOpportunities />
      <InternshipOpportunities />
    </div>
  );
}
