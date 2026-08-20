import BgHero from "@/components/outlet/bg-hero";
import ConsultancyPage from "@/components/consultancyPage/consultancy";

export default async function Consultancy() {
    return (
        <div>
            <BgHero
                tag="Consultancy"
                heading={
                    <>
                        Think Better.{" "}
                        <span style={{ color: "#74c316" }}>Build Smarter.</span>
                    </>
                }
                description="Practical technology consulting to help you make informed decisions and build solutions that move your business forward."
                imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352862/pexels-yankrukov-7698805_zwk7hu.jpg"
            />
            <ConsultancyPage />
        </div>
    );
}