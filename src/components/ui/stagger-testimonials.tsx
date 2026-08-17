"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Working with COMPANY has helped us scale our impact efficiently and reach more communities.",
    by: "Priyanka Subudhi, Deputi Asst. at Usthi Foundation India",
    initials: "P",
    image: "",
  },
  {
    tempId: 1,
    testimonial: "COMPANY made managing large-scale events smooth and stress-free for our entire team.",
    by: "Janhabi Behera, Event Manager at Rivora Eventz",
    initials: "J",
    image: "",
  },
  {
    tempId: 2,
    testimonial: "Our customers love the seamless booking experience. COMPANY truly transformed our operations.",
    by: "Sunil Sethi, Operations Head at RentRideCar",
    initials: "S",
    image: "",
  },
  {
    tempId: 3,
    testimonial: "COMPANY’s system has significantly improved our workflow and patient management.",
    by: "Ratan Barik, General Secretary at Usthi Hospital Nayapalli",
    initials: "R",
    image: "",
  },
  {
    tempId: 4,
    testimonial: "We evaluated several vendors across Odisha before choosing Ephorsys. As the best software company in Bhubaneswar, they delivered our ERP system on time and within budget. Their professionalism is truly unmatched.",
    by: "Tarakanta Sahoo, Manager at S8 Eco Resort",
    initials: "T",
    image: "",
  },
  {
    tempId: 5,
    testimonial: "Ephorsys is the most reliable IT company in Bhubaneswar we have worked with. As a web development company in Bhubaneswar, they revamped our entire online presence in just three weeks, with global quality and local understanding.",
    by: "Pakash Das, CEO of Das Enterprises",
    initials: "P",
    image: "",
  },
  {
    tempId: 6,
    testimonial: "The best app development company in Bhubaneswar, no question. Ephorsys built our cross-platform logistics app that reduced order errors by 40%. Their mobile app development expertise in Bhubaneswar is genuinely world class.",
    by: "Ananya Mishra, Founder of GreenLeaf Organics",
    initials: "A",
    image: "",
  },
  {
    tempId: 7,
    testimonial: "Ephorsys is our go to digital solutions company in Bhubaneswar. From CRM to cloud migration, they handled everything seamlessly. As a trusted software development company across Odisha, our operational efficiency improved by 60%.",
    by: "Arjun Rao, CTO at Techkit Solutions",
    initials: "A",
    image: "",
  },
  {
    tempId: 8,
    testimonial: "Finding a true AI development company in Bhubaneswar was a challenge, until Ephorsys. Their custom software development in Bhubaneswar gave us an AI forecasting tool that predicts stock needs with 92% accuracy, saving us lakhs every quarter.",
     by: "Vikash Nayak, Founder of Swiftmove Logistics",
    initials: "V",
    image: "",
  },
  {
    tempId: 9,
    testimonial: "Ephorsys is a complete package, top web design company, the sharpest digital marketing agency, and the most effective SEO company in Bhubaneswar. Our Google rankings moved from page 2 to top 3 in under 90 days",
    by: "Sunita Mohanty, CEO, Emerald Retail Pvt. Ltd.",
    initials: "s",
    image: "",
  },
  {
    tempId: 10,
    testimonial: "As a funded startup, we needed a company that could move fast. Ephorsys is the best full stack development company in Bhubaneswar built our entire SaaS platform in under 7 weeks. They are not just developers, they are truely the best technology partners.",
    by: "Tanmay Rout, Co-founder, Skill Bridge EdTech",
    initials: "s",
    image: "",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
  isMobile: boolean;
}

/**
 * ClientAvatar
 * Shows a client photo if `image` is provided and loads successfully.
 * Falls back to styled initials box on error or when no image given.
 */
const ClientAvatar: React.FC<{
  image?: string;
  initials: string;
  isCenter: boolean;
  isMobile: boolean;
}> = ({ image, initials, isCenter, isMobile }) => {
  const [imgError, setImgError] = useState(false);
  const dimension = isMobile ? 40 : 56;
  const size = { width: dimension, height: dimension };

  if (image && !imgError) {
    return (
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{
          ...size,
          marginBottom: isMobile ? 10 : 16,
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      >
        <img
          src={image}
          alt={initials}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center font-black flex-shrink-0"
      style={{
        ...size,
        marginBottom: isMobile ? 10 : 16,
        fontSize: isMobile ? 14 : 20,
        background: isCenter ? "rgba(0,0,0,0.15)" : "#74c316",
        color: isCenter ? "#fff" : "#021a0a",
        boxShadow: "3px 3px 0px hsl(var(--background))",
      }}
    >
      {initials}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  isMobile,
}) => {
  const isCenter = position === 0;

  // On mobile only render center + immediate left/right neighbours; hide the rest
  const isVisible = isMobile ? Math.abs(position) <= 1 : true;

  const pad = isMobile ? 16 : 32;
  const clipCorner = isMobile ? 28 : 50;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-[#74c316] text-primary-foreground border-[#74c316]"
          : "z-0 bg-white text-card-foreground border-border hover:border-primary/50",
        !isVisible && "opacity-0 pointer-events-none"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        padding: pad,
        clipPath: `polygon(${clipCorner}px 0%, calc(100% - ${clipCorner}px) 0%, 100% ${clipCorner}px, 100% 100%, calc(100% - ${clipCorner}px) 100%, ${clipCorner}px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      {/* Decorative corner cut line */}
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: isMobile ? 26 : 48,
          width: SQRT_5000,
          height: 2,
        }}
      />

      <ClientAvatar
        image={testimonial.image}
        initials={testimonial.initials}
        isCenter={isCenter}
        isMobile={isMobile}
      />

      <h3
        className={cn(
          "font-medium leading-snug",
          isCenter ? "text-primary-foreground" : "text-foreground"
        )}
        style={{ fontSize: isMobile ? 14 : 18 }}
      >
        "{testimonial.testimonial}"
      </h3>

      <p
        className={cn(
          "absolute italic",
          isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
        )}
        style={{
          bottom: pad,
          left: pad,
          right: pad,
          fontSize: isMobile ? 12 : 13,
        }}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC<{
  testimonialsData?: { clientPhoto: string; feedbackText: string; clientName: string }[];
}> = ({ testimonialsData }) => {
  const [cardSize, setCardSize] = useState(365);
  const [isMobile, setIsMobile] = useState(false);

  const initialList = testimonialsData && testimonialsData.length >= 3
    ? testimonialsData.map((t, idx) => ({
        tempId: idx,
        testimonial: t.feedbackText,
        by: t.clientName,
        initials: t.clientName[0] || "?",
        image: t.clientPhoto || "",
      }))
    : testimonials;

  const [testimonialsList, setTestimonialsList] = useState(initialList);

  // Sync if testimonialsData changes
  useEffect(() => {
    if (testimonialsData && testimonialsData.length >= 3) {
      setTestimonialsList(
        testimonialsData.map((t, idx) => ({
          tempId: idx,
          testimonial: t.feedbackText,
          by: t.clientName,
          initials: t.clientName[0] || "?",
          image: t.clientPhoto || "",
        }))
      );
    }
  }, [testimonialsData]);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const mobile = !window.matchMedia("(min-width: 640px)").matches;
      setIsMobile(mobile);
      if (mobile) {
        // Card takes ~80vw, capped at 280px so it always fits the screen
        setCardSize(Math.min(Math.floor(window.innerWidth * 0.80), 280));
      } else {
        setCardSize(365);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const containerHeight = isMobile ? 360 : 600;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ height: containerHeight }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            isMobile={isMobile}
          />
        );
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex items-center justify-center transition-colors",
            "bg-brand-white border-2 border-border hover:bg-[#74c316] hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isMobile ? "h-10 w-10 text-lg" : "h-14 w-14 text-2xl"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={isMobile ? 18 : 24} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex items-center justify-center transition-colors",
            "bg-brand-white border-2 border-border hover:bg-[#74c316] hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isMobile ? "h-10 w-10 text-lg" : "h-14 w-14 text-2xl"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight size={isMobile ? 18 : 24} />
        </button>
      </div>
    </div>
  );
};