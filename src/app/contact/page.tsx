import BgHero from "@/components/outlet/bg-hero";
import BookingForm from "@/components/contactpage/BookingForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import FAQ from "@/components/homePage/faq";

export const metadata: Metadata = {
  title: "Contact  Ephorsys Pvt Ltd | Best Software Company in Bhubaneswar, Odisha",
  description:
    "Ephorsys Pvt Ltd, founded in 2025, is a leading software development company in Bhubaneswar, Odisha. We deliver custom web, mobile app, AI, and digital marketing solutions for startups and enterprises across Odisha and pan-India.",
keywords: [
  "Ephorsys",
  "Ephorsys Pvt Ltd",
  "Ephorsys Technologies",
  "software company in Bhubaneswar",
  "best software company in Bhubaneswar",
  "top software company in Bhubaneswar",
  "IT company in Bhubaneswar",
  "IT services company Odisha",
  "software company Odisha",
  "web development company Bhubaneswar",
  "website development Bhubaneswar",
  "custom web development Odisha",
  "app development company Bhubaneswar",
  "mobile app development Odisha",
  "software development company Bhubaneswar",
  "custom software development Odisha",
  "AI development company Bhubaneswar",
  "AI solutions company Odisha",
  "artificial intelligence services",
  "LLM development company",
  "Generative AI solutions",
  "business automation services",
  "AI agent development",
  "digital transformation company",
  "digital marketing company Bhubaneswar",
  "SEO services Bhubaneswar",
  "search engine optimization Odisha",
  "full stack development company",
  "React.js development company",
  "Next.js development company",
  "Node.js development company",
  "MERN stack development company",
  "enterprise software solutions",
  "startup software development company",
  "cloud application development",
  "ecommerce website development",
  "CRM software development",
  "ERP software development",
  "UI UX design company Bhubaneswar",
  "technology consulting company",
  "custom business software",
  "web application development",
  "software outsourcing company India",
  "best web development company Odisha",
]
};


export default function ContactPage() {
  return (
    <div className="bg-brand-white min-h-screen">
      <BgHero
        tag="Contact Us"
        heading={
          <>
            Let's Start a{" "}
            <span style={{ color: "#74c316" }}>Conversation</span>
          </>
        }
        description="Have a question or a project in mind? We'd love to hear from you."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352404/pexels-helenalopes-3688761_k5kyk7.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-24">
        {/* 🔥 Responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">

          {/* ─── Left: Contact Info ─── */}
          <div className="flex flex-col gap-6 sm:gap-8">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#74c316]" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#74c316]">
                  Get In Touch
                </span>
              </div>

              {/* 🔥 Responsive heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-3 sm:mb-4">
                We're here to <span className="text-[#62a611]">help you grow.</span>
              </h2>

              {/* 🔥 Better readable text */}
              <p className="text-gray-500 leading-relaxed max-w-full sm:max-w-md text-sm sm:text-base lg:text-lg">
                Whether you're looking for web development, digital marketing, or just exploring options, our team is ready to provide the insights and solutions you need.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-5 sm:space-y-6 mt-2">

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#74c316]">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h4 className="font-semibold sm:font-bold text-gray-900 text-sm sm:text-base">
                    Phone
                  </h4>
                  <p className="text-gray-500 text-sm sm:text-base mt-0.5">
                    +91 9556536002
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#74c316]">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h4 className="font-semibold sm:font-bold text-gray-900 text-sm sm:text-base">
                    Email
                  </h4>
                  <a
                    href="mailto:business@ephorsys.com"
                    className="text-gray-500 text-sm sm:text-base mt-0.5 hover:text-[#74c316] transition-colors break-all"
                  >
                    business@ephorsys.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#74c316]">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h4 className="font-semibold sm:font-bold text-gray-900 text-sm sm:text-base">
                    Email
                  </h4>
                  <a
                    href="mailto:hr@ephorsys.com"
                    className="text-gray-500 text-sm sm:text-base mt-0.5 hover:text-[#74c316] transition-colors break-all"
                  >
                    hr@ephorsys.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#74c316]">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h4 className="font-semibold sm:font-bold text-gray-900 text-sm sm:text-base">
                    Office
                  </h4>

                  {/* 🔥 Better wrapping */}
                  <p className="text-gray-500 text-sm sm:text-base mt-0.5 leading-relaxed break-words">
                    1st floor, K8/733, Kalinga Nagar, Bhubaneswar, near Sum Ultimate, 751003
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ─── Right: Form ─── */}
          <div className="relative w-full">

            {/* 🔥 Fix overflow on small screen */}
            <div className="absolute inset-0 sm:-inset-4 bg-gradient-to-r from-green-100 to-blue-50 blur-2xl opacity-40 rounded-3xl -z-10"></div>

            <div className="w-full">
              <BookingForm />
            </div>

          </div>
        
        </div>
      </div>

   {/* ─── Google Map ─── */}
<div className="w-full px-4 sm:px-6 lg:px-8 pb-16">
  <div className="max-w-7xl mx-auto">
    
    <div className="mb-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900">
        Visit Our <span className="text-[#74c316]">Office</span>
      </h2>
      <h3 className="text-gray-500 mt-2">
        Find us at our Bhubaneswar office location.
      </h3>
    </div>

<div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.5354372851702!2d85.76926187479921!3d20.278092781189933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2832cd512f60df0d%3A0x61d1ddff084be616!2sEphorsys%20Private%20Limited!5e0!3m2!1sen!2sin!4v1780466333173!5m2!1sen!2sin"
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ephorsys Private Limited Location"
        className="w-full"
      />
    </div>

  </div>
</div>
<FAQ/>
    </div>
  );
}
