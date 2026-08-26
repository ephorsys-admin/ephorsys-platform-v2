export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  href: string;
}

export const services: Service[] = [
  {
    id: "01",
    title: "Web Development",
    description:
      "Scalable, performant web applications built with Next.js, Node.js, and Edge computing — optimized for speed, SEO, and reliability at any scale.",
    image:
      "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352403/thisisengineering-w_zE6qlkQKA-unsplash_mtuzty.jpg",
    accent: "#ffffff",
    href: "/services/web-development",
  },
  {
    id: "02",
    title: "App Development",
    description:
      "Cross-platform mobile apps with smooth, native-feel interactions — built using React Native and Swift with complex motion design baked in.",
    image:
      "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352860/pexels-mikhail-nilov-7988087_zrncvt.jpg",
    accent: "#ffffff",
    href: "/services/app-development",
  },
  {
    id: "03",
    title: "AI Development",
    description:
      "Custom AI solutions that automate workflows, unlock insights, and give your business a competitive edge.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    accent: "#ffffff",
    href: "/services/ai-development",
  },
  {
    id: "04",
    title: "SEO Optimization",
    description:
      "Technical SEO audits, Core Web Vitals improvements, and structured data implementation that drive organic growth and search visibility.",
    image:
      "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352863/pexels-divinetechygirl-1181675_pz7dt3.jpg",
    accent: "#ffffff",
    href: "/services/seo",
  },
  {
    id: "05",
    title: "Digital Marketing",
    description:
      "Data-driven paid campaigns, conversion funnel design, and brand storytelling strategies that turn traffic into measurable business results.",
    image:
      "https://res.cloudinary.com/devrmpo2p/image/upload/v1774352401/mohammad-rahmani-LrxSl4ZxoRs-unsplash_dfyvri.jpg",
    accent: "#ffffff",
    href: "/services/digital-marketing",
  },
];