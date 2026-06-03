import Image from "next/image";
import { BadgeCheck, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="w-full bg-brand-white py-12 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
        {/* ── LEFT CONTENT ── */}
        <div className="flex flex-col">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold leading-tight text-foreground mb-4 sm:mb-5">
            Boost Business with Our <br className="hidden sm:block" />
            <span className="text-[#74c316]">Innovative IT Solutions</span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
            Ephorsys help businesses accelerate growth through our scalable
            digital solutions. From web and app development to product design,
            software engineering, SEO, and digital marketing, we craft
            strategies that enhance your online presence, optimize performance,
            and drive measurable results. Trusted by 15+ active clients across healthcare, e commerce, real estate and tech.
          </p>

          {/* Feature 1 */}
          <div className="flex gap-3 sm:gap-4 items-start mb-5 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-light/30 flex items-center justify-center shrink-0">
              <TrendingUp className="text-[#74c316] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">
                Your Growth, Our Mission.
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Ephorsys helps you build, scale, and grow with powerful digital
                solutions tailored for real business impact.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-3 sm:gap-4 items-start mb-8 sm:mb-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-light/30 flex items-center justify-center shrink-0">
              <BadgeCheck className="text-[#74c316] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">
                Certified & Authorized Company 
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Ephorsys is a certified and authorized Bhubaneswar based custom software devlopment company committed to
                delivering reliable, secure, and high-quality digital solutions
                you can trust.
              </p>
            </div>
          </div>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
            href="/about"
              className="relative rounded-full px-6 sm:px-7 py-2.5 sm:py-3 text-sm font-semibold
                         text-white cursor-pointer transition-all duration-200
                         hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#74c316]/30
                         active:translate-y-0"
              style={{
                background: "#74c316",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              <span className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              <h4 className="relative text-white font-bold">Learn More</h4>
            </Link>
          </div>
        </div>

        {/* ── RIGHT IMAGE GRID ── */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 relative mt-4 lg:mt-0">
          {/* Dot decoration - top right */}
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 grid grid-cols-5 gap-1 sm:gap-1.5 z-10 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#74c316]/25"
              />
            ))}
          </div>

          {/* Cell 1: Main large photo — col 1, rows 1–2 */}
          <div className="row-span-2 rounded-xl sm:rounded-2xl overflow-hidden relative min-h-50 sm:min-h-70 md:min-h-80 lg:min-h-85">
            <Image
              src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352410/pexels-divinetechygirl-1181357_eulrhu.jpg"
              alt="IT professional"
              fill
              priority
              sizes="(max-width: 639px) 45vw, (max-width: 1023px) 40vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Cell 2: Experience badge — col 2, row 1 */}
          <div className="rounded-xl sm:rounded-2xl bg-brand-dark flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 min-h-23.75 sm:min-h-32.5 md:min-h-37.5">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none">
              1+
            </span>
            <span className="text-brand-light text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">
              Years of Excellence in Software Solutions
            </span>
          </div>

          {/* Cell 3: Photo — col 2, row 2 */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden relative min-h-23.75 sm:min-h-32.5 md:min-h-37.5">
            <Image
              src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352404/pexels-helenalopes-3688761_k5kyk7.jpg"
              alt="Cybersecurity professional"
              fill
              sizes="(max-width: 639px) 45vw, (max-width: 1023px) 40vw, 25vw"
              className="object-cover"
            />
          </div>

          {/* Cell 4: Clients badge — col 1, row 3 */}
          <div className="rounded-xl sm:rounded-2xl bg-[#74c316] p-3 sm:p-4 md:p-5 flex items-center gap-2 sm:gap-3">
            {/* Avatar stack */}
            <div className="flex -space-x-1.5 sm:-space-x-2 shrink-0">
              {["#a78bfa", "#7c3aed", "#6d28d9"].map((bg, i) => (
                <div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] sm:text-[10px] md:text-xs font-bold"
                  style={{ backgroundColor: bg }}
                >
                  {["A", "B", "C"][i]}
                </div>
              ))}
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-white text-[9px] sm:text-[10px] md:text-xs font-bold">
                +
              </div>
            </div>
            <span className="text-white font-semibold text-[10px] sm:text-xs md:text-sm leading-tight">
              30+ Satisfied Clients
            </span>
          </div>

          {/* Cell 5: Photo — col 2, row 3 */}
          <div className="rounded-xl sm:rounded-2xl overflow-hidden relative min-h-20 sm:min-h-27.5 md:min-h-32.5">
            <Image
              src="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352401/desola-lanre-ologun-kwzWjTnDPLk-unsplash_o4gx6u.jpg"
              alt="Tech professional"
              fill
              sizes="(max-width: 639px) 45vw, (max-width: 1023px) 40vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
