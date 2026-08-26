import BgHero from "@/components/outlet/bg-hero";
import PortfolioPage from "@/components/portfolioPage/portfolio";
import PortfolioHero from "@/components/portfolioPage/portfolioHero";

export default async function Portfolio() {
  return (
    <div>
      {/* <BgHero
        tag="Our Portfolio"
        heading={
          <>
            Turning Ideas Into{" "}
            <span style={{ color: "#74c316" }}>Digital Solutions</span>
          </>
        }
        description="Explore the projects, platforms, and digital experiences we've built to solve real-world challenges."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg"
      /> */} {/*Bghero looks better in this  */}
      <PortfolioHero/>
      <PortfolioPage />
    </div>
  );
}