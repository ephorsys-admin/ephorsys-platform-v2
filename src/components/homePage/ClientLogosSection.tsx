"use client";

import Marquee from "react-fast-marquee";

interface Logo {
  logoImage: string;
  clientName: string;
}

export default function ClientLogosSection({ logosData }: { logosData?: Logo[] }) {
  if (!logosData || logosData.length === 0) return null;

  return (
    <section className="bg-white py-12 border-t border-b border-gray-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-bold">
          Trusted by companies worldwide
        </p>
      </div>

      <Marquee speed={40} gradient={true} gradientWidth={80} pauseOnHover={true}>
        {logosData.map((logo, idx) => (
          <div key={idx} className="mx-12 flex items-center justify-center h-14">
            <img
              src={logo.logoImage}
              alt={logo.clientName}
              className="h-10 w-auto object-contain opacity-40 hover:opacity-85 transition-opacity duration-300 filter grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
