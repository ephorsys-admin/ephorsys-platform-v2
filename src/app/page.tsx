import OurApproach from "@/components/homePage/ourapproch";
import AboutSection from "@/components/homePage/about";
import WhatWeProvide from "@/components/homePage/whatWeProvide";

import {Testimonials} from "@/components/homePage/testimonial";
import FAQSection  from "@/components/homePage/faq";
import HeroSection from "@/components/homePage/hero";
import SlidingService from "@/components/homePage/slidingServices";
import StatsSection from "@/components/homePage/statsSection";
import Techstack from "@/components/homePage/techstack";
import OurServices from "@/components/homePage/ourServices";
import BlogSection from "@/components/homePage/ourblog";




export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <HeroSection />
      <SlidingService />
      <AboutSection />
      <Techstack />
      <OurApproach/>
      
      <OurServices />
      
      <BlogSection />
      <WhatWeProvide />
      <StatsSection/>
      <Testimonials />
      <FAQSection />
    </div>
  );
}