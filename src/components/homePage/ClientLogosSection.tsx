"use client";

import Marquee from "react-fast-marquee";
import Link from "next/link";

interface Logo {
  logoImage: string;
  clientName: string;
}

export default function ClientLogosSection({
  logosData,
}: {
  logosData?: Logo[];
}) {
  if (!logosData || logosData.length === 0) return null;

  // Repeat logos so the marquee has enough content
  const marqueeLogos = [...logosData, ...logosData];

  return (
    <section className="w-full overflow-hidden border-y border-gray-100 bg-white py-5">
      <div className="mx-auto mb-8 max-w-7xl px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black sm:text-xs">
          Trusted by companies worldwide
        </p>
      </div>

      <Marquee
        speed={40}
        gradient
        gradientWidth={80}
        pauseOnHover
      >
        {marqueeLogos.map((logo, idx) => (
          <Link
            key={`${logo.clientName}-${idx}`}
            href="/portfolio"
            className="mx-4 flex w-28 flex-shrink-0 items-center justify-center sm:mx-6 sm:w-32 md:mx-8 md:w-36"
          >
            <div className="flex h-20 w-full items-center justify-center">
              <img
                src={logo.logoImage}
                alt={logo.clientName}
                className="h-16 w-16 object-contain md:h-20 md:w-20"
              />
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}