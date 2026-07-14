import BgHero from "@/components/outlet/bg-hero";

export default function TermsOfService() {
  return (
    <div className="bg-brand-white min-h-screen">
      <BgHero
        tag="Company"
        heading={
          <>
            Terms of <span style={{ color: "#74c316" }}>Service</span>
          </>
        }
        description="Please read these terms of service carefully."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774354852/pexels-divinetechygirl-1181619_buw8tg.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-24">
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-600">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Acceptance of <span className="text-[#74c316]">Agreement</span></h2>
          <p className="mb-8">
            By accessing and using the Ephorsys Pvt. Ltd. website and engaging with our services, you accept and agree to be bound by the terms and provisions of this agreement. These terms apply to all visitors, users, and others who access or use our services.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Nature of <span className="text-[#74c316]">Services</span></h2>
          <p className="mb-4">
            Ephorsys Pvt. Ltd. provides a comprehensive suite of digital, technical, and marketing solutions tailored to the unique requirements of each client. Our core services include, but are not limited to:
          </p>
          <ul className="list-none space-y-3 mb-6 ml-2">
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span><strong>App Development:</strong> Cross-platform and native mobile applications tailored for iOS and Android.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span><strong>Web Development:</strong> High-performance, scalable, and responsive web applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span><strong>Software Development:</strong> Custom enterprise software solutions and robust backend architecture.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span><strong>Product Design:</strong> Intuitive UI/UX design, wireframing, prototyping, and user journey mapping.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span><strong>Digital Marketing:</strong> Strategic brand growth, paid advertising, and performance marketing.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span><strong>SEO:</strong> Search engine optimization to drive organic traffic and visibility.</span>
            </li>
          </ul>
          <p className="mb-8">
            The distinct deliverables, timelines, and scope of each engagement will be detailed strictly in separate proposals or formal contracts.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Human-Centric <span className="text-[#74c316]">Communication</span></h2>
          <p className="mb-8">
            We are dedicated to fostering authentic, professional relationships. Ephorsys Pvt. Ltd. strictly handles all client communications manually. We do not engage in automated opt-ins, utilize unsolicited bot messaging, or mandate automated SMS participation. All consultations, follow-ups, and notifications from our team represent direct, human-to-human interaction.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Intellectual <span className="text-[#74c316]">Property</span></h2>
          <p className="mb-8">
            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Ephorsys Pvt. Ltd. and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our explicit, written permission.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Limitation of <span className="text-[#74c316]">Liability</span></h2>
          <p className="mb-8">
            In no event shall Ephorsys Pvt. Ltd., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of our website and preliminary services.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Contact <span className="text-[#74c316]">Information</span></h2>
          <p className="mb-4">
            If you have any questions or require further clarification regarding these Terms of Service, please reach out to us using the contact details provided below:
          </p>
          <ul className="list-none space-y-3 mb-8 ml-2">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] shrink-0" />
              <span><strong>Phone:</strong> <a href="tel:+917873367335" className="text-[#74c316] hover:underline">+91 7873367335</a></span>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] shrink-0" />
              <span><strong>Email:</strong> <a href="mailto:business@ephorsys.com" className="text-[#74c316] hover:underline">business@ephorsys.com</a></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
