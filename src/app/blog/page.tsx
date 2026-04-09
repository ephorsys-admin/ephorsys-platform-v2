"use client";

import Industry from "@/components/blogpage/Industry";
import Myblog from "@/components/blogpage/myblog";
import BgHero from "@/components/outlet/bg-hero";

export default function Blog() {
  return (
    <div>
      <BgHero
        tag="Blogs"
        heading={
          <>
            Our <span style={{ color: "#74c316" }}>Blogs</span>
          </>
        }
        description="We deliver reliable, result-driven digital solutions."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352402/pexels-fauxels-3183148_z5qdff.jpg"
      />
      <Industry />
      <Myblog />
    </div>
  );
}
