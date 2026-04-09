import Image from "next/image";

export default function BgHeroCareer() {
  return (
    <section className="relative w-full h-[65vh] min-h-120 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/about1.webp"
          alt="About hero background"
          fill
          className="object-cover brightness-[0.65] contrast-[1.1]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#021a0f] via-[#042407]/90 to-[#042407]/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#74c316]/10 border border-[#74c316]/30 backdrop-blur-lg mb-6">
          <span className="text-sm font-semibold text-[#c5e08a]">
            Careers
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-xl">
          Shape Your Future With Us
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#c5e08a] max-w-3xl mx-auto font-light leading-relaxed">
         Explore exciting career opportunities in an environment that values talent, innovation, collaboration, and long-term growth.
        </p>
      </div>
    </section>
  );
}