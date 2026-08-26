"use client";

interface CertificationItem {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
}

const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
 
];

export default function CertificationsSection({
  certificationsData = []
}: {
  certificationsData?: CertificationItem[];
}) {
  const displayItems = certificationsData && certificationsData.length > 0
    ? [...certificationsData].sort((a, b) => a.order - b.order)
    : DEFAULT_CERTIFICATIONS;

  return (
    <section className="py-24 px-6 md:px-12 bg-white max-w-7xl mx-auto w-full">
      <div className="mb-14 text-left select-none max-w-3xl">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300 pb-3">
        
          Certifications
        </span>
            
    
        <h2
          className="text-4xl md:text-5xl font-black text-gray-900 mb-4 mt-2 tracking-tight leading-none"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Trusted & <span className="text-[#74c316]">Certified</span>
        </h2>
        <p className="text-gray-500 text-base md:text-lg leading-relaxed font-body">
          Our commitment to excellence is recognized by leading industry bodies
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-x-8 gap-y-12 items-center justify-items-center">
        {displayItems.map((item, idx) => (
          <div
            key={item._id || `default-cert-${idx}`}
            className="w-full max-w-[140px] h-[55px] flex items-center justify-center transition-transform duration-300 hover:scale-105 select-none group"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="max-h-full max-w-full object-contain filter transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
