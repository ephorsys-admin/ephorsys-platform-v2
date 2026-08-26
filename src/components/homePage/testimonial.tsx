import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

interface TestimonialsProps {
  testimonialsData?: { clientPhoto: string; feedbackText: string; clientName: string }[];
}

const Testimonials = ({ testimonialsData }: TestimonialsProps) => {
  return (
    <div
      className="relative flex w-full min-h-screen justify-center items-center overflow-hidden"
      style={{
        background: `
         #000000
        `,
      }}
    >


      {/* Radial vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Subtle noise grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Faint decorative corner accents */}
      <div
        className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
        style={{
          borderTop: "1px solid ",
          borderLeft: "1px solid ",
        }}
      />
      <div
        className="absolute top-6 right-6 w-16 h-16 pointer-events-none"
        style={{
          borderTop: "1px solid ",
          borderRight: "1px solid ",
        }}
      />
      <div
        className="absolute bottom-6 left-6 w-16 h-16 pointer-events-none"
        style={{
          borderBottom: "1px solid ",
          borderLeft: "1px solid ",
        }}
      />
      <div
        className="absolute bottom-6 right-6 w-16 h-16 pointer-events-none"
        style={{
          borderBottom: "1px solid ",
          borderRight: "1px solid ",
        }}
      />

      {/* Subtle bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #b8960c 30%, #e8c84a 50%, #b8960c 70%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-center">
            Real Stories.{" "}
            <span
              className="transition-colors duration-500 text-[#74C316]"
              
            >
              Real Results.
            </span>
          </h2>
        <StaggerTestimonials testimonialsData={testimonialsData} />
      </div>
    </div>
  );
};

export { Testimonials };
