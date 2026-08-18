"use client";

import Marquee from "react-fast-marquee";
import Link from "next/link";

interface Logo {
  logoImage: string;
  clientName: string;
}

export default function ClientLogosSection({ logosData }: { logosData?: Logo[] }) {
  if (!logosData || logosData.length === 0) return null;

  return (
    <section className="w-full overflow-hidden border-y border-gray-100 bg-white py-10 sm:py-14">
      <div className="mx-auto mb-8 max-w-7xl px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 sm:text-xs">
          Trusted by companies worldwide
        </p>
      </div>

      <Marquee speed={40} gradient={true} gradientWidth={80} pauseOnHover={true}>
        {logosData.map((logo, idx) => (
          <Link
            key={idx}
            href="/portfolio"
            className="mx-8 flex w-24 flex-shrink-0 flex-col items-center justify-center gap-2 sm:mx-12 sm:w-32 md:mx-16 md:w-36"
          >
            <div className="flex h-12 w-full items-center justify-center sm:h-14 md:h-16">
              <img
                src={logo.logoImage}
                alt={logo.clientName}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="whitespace-nowrap text-center text-[11px] font-extrabold text-[#0D1F0D] hover:text-[#8FDD33] sm:text-xs">
              {logo.clientName}
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}