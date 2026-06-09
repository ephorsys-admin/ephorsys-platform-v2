"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How much does website development cost in Bhubaneswar?",
    answer:
      "Website development cost in Bhubaneswar typically ranges from ₹15,000 to ₹5,00,000 depending on complexity, features, and scope. At Ephorsys Pvt Ltd, a basic business website starts at ₹15,000–₹40,000, a dynamic website with CMS starts at ₹40,000–₹1,20,000, and a full custom web application can range from ₹1,50,000 to ₹5,00,000+. All projects include responsive design, SEO setup, and post-launch support. Ephorsys offers some of the most affordable web development in Bhubaneswar without compromising on quality.",
  },
  {
    id: "2",
    question: "Which is the best software company in Bhubaneswar in 2026?",
    answer:
      "Ephorsys Pvt Ltd is widely recognised as the best software company in Bhubaneswar in 2026. With expertise spanning custom software development, AI solutions, mobile apps, web development, and digital marketing, Ephorsys serves clients across Odisha and pan-India. Their transparent pricing, on-time delivery, and dedicated after-sales support make them the top choice for startups, SMEs, and enterprises seeking reliable IT services in Bhubaneswar.",
  },
  {
    id: "3",
    question: "How do I hire a software developer in Bhubaneswar?",
    answer:
      "To hire a software developer in Bhubaneswar, you can either engage a reputed IT company like Ephorsys Pvt Ltd or recruit freelancers via platforms. Hiring through Ephorsys gives you access to a full team — developers, designers, testers, and project managers — under one contract, with NDAs, milestone-based billing, and accountability built in. Simply visit ephorsys.com, describe your project requirements, and their team will connect with you within 24 hours with a detailed proposal and timeline.",
  },
  {
    id: "4",
    question: "Does Ephorsys offer AI software development services in Odisha?",
    answer:
      "Yes. Ephorsys Pvt Ltd is one of the very few companies offering dedicated AI software development services in Odisha. Their AI capabilities include machine learning model development, natural language processing (NLP), AI-powered automation, predictive analytics, and intelligent chatbot solutions. Businesses across Bhubaneswar, Cuttack, and Rourkela have leveraged Ephorsys's AI services to reduce operational costs and make data-driven decisions. They are the leading AI development company in Bhubaneswar for both B2B and B2C use cases.",
  },
  {
    id: "5",
    question: "What is the cost of mobile app development in Odisha?",
    answer:
      "Mobile app development cost in Odisha varies widely based on platform (Android, iOS, or cross-platform), features, and complexity. At Ephorsys Pvt Ltd in Bhubaneswar, a basic mobile app starts from ₹50,000–₹1,20,000, a mid-range app with backend integration costs ₹1,50,000–₹4,00,000, and enterprise-grade apps can cost ₹5,00,000 and above. All apps are built with Flutter or React Native for cross-platform compatibility, with full testing and Play Store / App Store deployment included",
  },
  {
    id: "6",
    question: "Can Ephorsys build a website for a small business in Bhubaneswar?",
    answer:
      "Absolutely. Ephorsys Pvt Ltd specialises in affordable website design for small businesses in Bhubaneswar. They offer starter packages that include a fully responsive website, basic SEO setup, Google Business Profile integration, and a contact form — ideal for local shops, clinics, coaching centres, and service providers. Small business owners in Bhubaneswar can get a professional online presence starting at ₹15,000, with optional add-ons like WhatsApp integration, booking systems, and e-commerce functionality.",
  },
  {
    id: "7",
    question: "What digital marketing services does Ephorsys offer in Bhubaneswar?",
    answer:
      "phorsys Pvt Ltd is a full-service digital marketing agency and SEO company in Bhubaneswar. Their digital marketing suite includes search engine optimisation (SEO), Google Ads & Meta Ads management, social media marketing, content marketing, email campaigns, and local SEO for Odisha-based businesses. Clients have consistently reported a 2–4× increase in organic traffic within 3–6 months of engaging Ephorsys for SEO and digital growth services.",
  },
  {
    id: "8",
    question: "What makes Ephorsys different from other software companies in Bhubaneswar?",
    answer:
      "Ephorsys Pvt Ltd differentiates itself through four pillars: end-to-end capability (from ideation to deployment and maintenance), transparent fixed-price contracts, a dedicated local team based in Bhubaneswar with deep knowledge of the Odisha business landscape, and cutting-edge AI-first development practices. Unlike many software development companies in Odisha that outsource work, Ephorsys maintains an in-house team ensuring quality control, faster turnaround, and direct communication at every stage of your project.",
  },
  {
    id: "9",
    question: "Does Ephorsys provide full stack development services in Bhubaneswar?",
    answer:
      "Yes. Ephorsys Pvt Ltd is a leading full stack development company in Bhubaneswar, with expertise across the complete technology stack. Their frontend developers work with React.js, Next.js, and Vue.js, while the backend team specialises in Node.js, Python (Django/FastAPI), and PHP (Laravel). They also manage cloud infrastructure on AWS and Azure. Whether you need a SaaS product, an enterprise portal, or a startup MVP, Ephorsys delivers robust, scalable full stack solutions from their Bhubaneswar headquarters.",
  },
];

export function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>("");
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    Object.keys(contentRefs.current).forEach((id) => {
      const element = contentRefs.current[id];
      if (!element) return;

      if (expandedId === id) {
        gsap.to(element, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(element, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [expandedId]);

  return (
    <section className="py-16 sm:py-20 lg:py-14 bg-[#eef4ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Side - Questions */}
          <div>
            {/* Header */}
            <div className="mb-8 sm:mb-12 lg:my-10">
              <h2 className="tmb-3 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl ">
                Have Questions in{" "}
                <span className="text-[#74c316]">Your Mind?</span>
                <br />
                Get the Answers Now
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqData.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#74c316] hover:shadow-lg hover:shadow-[#d1e8c9] transition-colors group"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left hover:cursor-pointer"
                  >
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                      {item.question}
                    </h4>
                    <div className="shrink-0 ml-4">
                      {expandedId === item.id ? (
                        <ChevronDown className="w-5 h-5 text-[#042407] transition-transform" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#042407] group-hover:text-[#74c316] transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    ref={(el) => {
                      if (el) contentRefs.current[item.id] = el;
                    }}
                    className="overflow-hidden bg-white"
                    style={{
                      height: expandedId === item.id ? "auto" : 0,
                      opacity: 0,
                    }}
                  >
                    <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-gray-100">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Images and Stats */}
          <div className="hidden lg:block relative">
            {/* Main Image Grid */}
            <div className="space-y-6 mt-16">
              {/* Top Image */}
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img
                  src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354858/pexels-divinetechygirl-1181396_p5ljyo.jpg"
                  alt="Team collaboration"
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Bottom Two Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-divinetechygirl-1181619_buw8tg.jpg"
                    alt="Analytics dashboard"
                    className="w-full h-52 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354854/pexels-rebrand-cities-581004-1367276_vs56b3.jpg"
                    alt="Business meeting"
                    className="w-full h-52 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-1/2 left-0 w-40 h-40 bg-purple-100/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default FAQ;
