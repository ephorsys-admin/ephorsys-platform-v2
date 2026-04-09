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
    question: "How much does it cost to develop a website or app in India?",
    answer:
      "The cost of website or app development in India typically ranges from ₹20,000 to ₹5,00,000+ depending on complexity, features, and technology stack. Basic websites are more affordable, while custom web apps or mobile applications require higher investment.",
  },
  {
    id: "2",
    question: "How long does it take to build a website or mobile app?",
    answer:
      "A simple website can take 1–3 weeks, while a full-stack web application or mobile app may take 1–3 months. Timelines depend on features, design complexity, and client requirements.",
  },
  {
    id: "3",
    question: "Which technologies do you use for development?",
    answer:
      "We use modern technologies like React.js, Next.js, Node.js, Express.js, MongoDB, and cloud platforms. Our tech stack is chosen based on performance, scalability, and project requirements.",
  },
  {
    id: "4",
    question: "Do you provide SEO and performance optimization?",
    answer:
      "Yes, we optimize websites for SEO, fast loading speed, and mobile responsiveness. This helps improve Google rankings, user experience, and overall performance.",
  },
  {
    id: "5",
    question: "Can you redesign or improve my existing website?",
    answer:
      "Yes, we offer website redesign and performance improvement services. We can upgrade UI/UX, fix bugs, improve speed, and modernize your existing platform.",
  },
  {
    id: "6",
    question: "Do you provide hosting and deployment services?",
    answer:
      "Yes, we help with VPS hosting, domain setup, deployment, and server configuration. We also provide guidance for platforms like Hostinger, AWS, and other cloud providers.",
  },
  {
    id: "7",
    question: "Will my website be mobile-friendly and responsive?",
    answer:
      "Absolutely. All our websites are fully responsive and optimized for mobile, tablet, and desktop devices to ensure the best user experience.",
  },
  {
    id: "8",
    question: "Do you provide maintenance and support after development?",
    answer:
      "Yes, we offer ongoing maintenance, updates, bug fixes, and technical support to ensure your website or application runs smoothly.",
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
