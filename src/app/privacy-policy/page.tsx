import BgHero from "@/components/outlet/bg-hero";

export default function PrivacyPolicy() {
  return (
    <div className="bg-brand-white min-h-screen">
      <BgHero
        tag="Company"
        heading={
          <>
            Privacy <span style={{ color: "#74c316" }}>Policy</span>
          </>
        }
        description="Learn how we handle and protect your data."
        imageSrc="https://res.cloudinary.com/devrmpo2p/image/upload/v1774352404/pexels-helenalopes-3688761_k5kyk7.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-24">
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-600">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Our <span className="text-[#74c316]">Commitment</span></h2>
          <p className="mb-8">
            At Ephorsys Pvt. Ltd., we prioritize the trust of our clients. We are committed to maintaining the highest standards of privacy and ensuring that your personal data is handled with transparency, care, and security.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Data Collection & <span className="text-[#74c316]">Purpose</span></h2>
          <p className="mb-8">
            We collect personal information—including your name, email address, and phone number—only when you voluntarily provide it through our website, contact forms, or direct inquiries. This information is used strictly to facilitate our professional relationship, respond to your inquiries, schedule appointments, and provide our services to you.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Human-Centric <span className="text-[#74c316]">Communication</span></h2>
          <p className="mb-8">
            We believe in personal connection. Ephorsys Pvt. Ltd. handles all client communications manually. We do not utilize automated messaging systems, bots, or unsolicited SMS services. When we reach out, it is a direct, human-to-human interaction tailored to your specific needs.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Data Protection & <span className="text-[#74c316]">Non-Disclosure</span></h2>
          <p className="mb-8">
            Your privacy is paramount. We implement robust security measures to protect your personal information from unauthorized access. We explicitly guarantee that we will not share, sell, rent, or disclose your contact information to any third parties for marketing or promotional purposes. Your data remains strictly within our professional ecosystem.
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Your Data <span className="text-[#74c316]">Rights</span></h2>
          <p className="mb-4 text-gray-600 font-medium tracking-tight">
            You maintain full control over your personal information. You have the right to:
          </p>
          <ul className="list-none space-y-3 mb-8 ml-2">
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span>Request access to the personal data we hold about you.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span>Request corrections to your information if it is inaccurate.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-[#74c316] mt-2 shrink-0" />
              <span>Request that we delete your contact information from our records.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
