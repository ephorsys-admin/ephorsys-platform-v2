export type ProcessStep = {
  step: string;
  title: string;
  desc: string;
};

export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
};

export type TechStack = {
  category: string;
  tools: string[];
};

export type ServiceData = {
  // ── Core (existing) ──────────────────────────────
  title: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];

  // ── Extended ─────────────────────────────────────
  tagline: string;
  heroStats: { value: string; label: string }[];
  whatWeDeliver: { title: string; desc: string }[];
  process: ProcessStep[];
  techStack: TechStack[];
  pricing: PricingTier[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  deliverables: string[];
  timeline: string;
  idealFor: string[];
};

export const servicesData: Record<string, ServiceData> = {

  // ─────────────────────────────────────────────────────────────────────────────
  "app-development": {
    // Core
    title: "App Development",
    description:
      "Custom-built applications designed to meet your business needs with scalability and efficiency.",
    longDescription:
      "We build high-performance, scalable, and secure mobile and web applications tailored to your business goals. From iOS and Android native apps to cross-platform solutions, our development team ensures a seamless user experience.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Native iOS & Android Apps",
      "Cross-Platform Development (React Native, Flutter)",
      "Custom Enterprise Apps",
      "UI/UX Design & Prototyping",
      "App Maintenance & Support",
    ],

    // Extended
    tagline: "From idea to App Store — we build apps people actually use.",
    heroStats: [
      { value: "15+", label: "Apps Shipped" },
      { value: "4.8★", label: "Avg Store Rating" },
      { value: "98%", label: "Crash-Free Rate" },
      { value: "2×", label: "Faster Time to Market" },
    ],
    whatWeDeliver: [
      {
        title: "Native Performance",
        desc: "Platform-specific builds for iOS and Android that feel butter-smooth and follow OS design guidelines.",
      },
      {
        title: "Cross-Platform Efficiency",
        desc: "One codebase, two platforms. React Native and Flutter let us ship faster without sacrificing quality.",
      },
      {
        title: "Offline-First Architecture",
        desc: "Apps that work without an internet connection and sync seamlessly when back online.",
      },
      {
        title: "Push Notifications & Engagement",
        desc: "Re-engage users with smart, personalized push notifications built into the core flow.",
      },
      {
        title: "App Store Optimization",
        desc: "We prep your listing, screenshots, and metadata to maximize organic downloads on launch day.",
      },
      {
        title: "Post-Launch Support",
        desc: "Crash monitoring, OS update compatibility, and ongoing feature releases — we stay in it with you.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Scoping",
        desc: "We map out your user personas, core flows, and technical constraints before writing a single line of code.",
      },
      {
        step: "02",
        title: "Wireframes & Design",
        desc: "Interactive prototypes so you can feel the app before it's built. Iterate fast, decide with confidence.",
      },
      {
        step: "03",
        title: "Agile Development",
        desc: "Two-week sprints with live staging previews. You see progress every week, not just at the end.",
      },
      {
        step: "04",
        title: "QA & Testing",
        desc: "Device testing across 20+ real devices, performance benchmarking, and security audits.",
      },
      {
        step: "05",
        title: "Launch & Monitor",
        desc: "App Store submission handled by us. Post-launch, we monitor crashes, performance, and user feedback.",
      },
    ],
    techStack: [
      { category: "Mobile", tools: ["React Native", "Flutter", "Swift", "Kotlin"] },
      { category: "Backend", tools: ["Node.js", "Firebase", "Supabase", "AWS Lambda"] },
      { category: "Database", tools: ["PostgreSQL", "MongoDB", "SQLite", "Redis"] },
      { category: "DevOps", tools: ["Fastlane", "GitHub Actions", "TestFlight", "Firebase App Distribution"] },
    ],
    pricing: [
      {
        name: "Starter",
        price: "₹50,000",
        period: "one-time",
        description: "Perfect for MVPs and early-stage startups validating an idea.",
        features: [
          "Single platform (iOS or Android)",
          "Up to 8 screens",
          "Basic auth & onboarding",
          "REST API integration",
          "1 month post-launch support",
        ],
      },
      {
        name: "Growth",
        price: "₹1,20,000",
        period: "one-time",
        description: "Full-featured app for businesses ready to scale.",
        features: [
          "Both iOS & Android",
          "Up to 20 screens",
          "Push notifications",
          "Payment gateway integration",
          "Admin dashboard",
          "3 months post-launch support",
        ],
        highlight: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "project-based",
        description: "Complex, large-scale applications with advanced requirements.",
        features: [
          "Unlimited screens & flows",
          "Custom backend architecture",
          "Offline-first support",
          "Enterprise SSO & security",
          "Dedicated project manager",
          "12 months SLA support",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a mobile app?",
        answer:
          "An MVP typically takes 6–10 weeks. A full-featured app with both platforms is usually 12–20 weeks depending on complexity.",
      },
      {
        question: "Do you handle App Store and Google Play submission?",
        answer:
          "Yes — we manage the entire submission process including metadata, screenshots, and compliance review.",
      },
      {
        question: "Can you work with our existing backend or API?",
        answer:
          "Absolutely. We integrate with existing REST or GraphQL APIs and can audit and optimize them if needed.",
      },
      {
        question: "What if we want to add features after launch?",
        answer:
          "We offer monthly retainer packages for ongoing development, or you can scope individual feature sprints as needed.",
      },
      {
        question: "React Native or Flutter — which do you recommend?",
        answer:
          "Both are excellent. We recommend React Native if you have a web team already using JavaScript, and Flutter for highly custom UIs and animation-heavy apps.",
      },
    ],
    testimonials: [
      {
        name: "Arjun Mehta",
        role: "Founder",
        company: "QuickDeliver",
        quote:
          "Ephorsys delivered our delivery app in 8 weeks flat. The quality was better than agencies charging 3x more.",
        avatar: "https://i.pravatar.cc/80?img=11",
      },
      {
        name: "Priya Sharma",
        role: "Product Head",
        company: "EduTrack",
        quote:
          "The offline-first architecture they built for us is rock solid. Our users love that the app works even without connectivity.",
        avatar: "https://i.pravatar.cc/80?img=44",
      },
    ],
    deliverables: [
      "Figma design files (all screens)",
      "Production-ready source code (GitHub repo)",
      "App Store & Play Store listing assets",
      "Technical documentation & API docs",
      "CI/CD pipeline setup",
      "1–3 months post-launch monitoring report",
    ],
    timeline: "6 – 20 weeks depending on scope",
    idealFor: [
      "Startups building their first product",
      "Businesses extending a web product to mobile",
      "Enterprises needing internal mobile tools",
      "SaaS companies adding a mobile layer",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  "web-development": {
    // Core
    title: "Web Development",
    description:
      "Robust, responsive websites that deliver seamless user experiences and drive business growth.",
    longDescription:
      "Deliver engaging digital experiences with our custom web development services. We build responsive, fast, and secure websites ranging from corporate portals to complex web applications using the latest modern tech stacks.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Custom Web Applications",
      "Responsive Website Design",
      "E-commerce Solutions",
      "CMS Development (WordPress, headless CMS)",
      "Progressive Web Apps (PWAs)",
    ],

    // Extended
    tagline: "Websites that load fast, look sharp, and convert.",
    heroStats: [
      { value: "40+", label: "Sites Launched" },
      { value: "<1s", label: "Avg Load Time" },
      { value: "100", label: "Lighthouse Score" },
      { value: "70%", label: "Repeat Clients" },
    ],
    whatWeDeliver: [
      {
        title: "Performance-First Builds",
        desc: "Every site we build targets a 90+ Lighthouse score. Fast sites rank better and convert more.",
      },
      {
        title: "Pixel-Perfect Responsive Design",
        desc: "Looks flawless on mobile, tablet, and desktop — no compromises.",
      },
      {
        title: "SEO-Ready Architecture",
        desc: "Clean semantic HTML, meta structure, Open Graph, and sitemap — ready for Google from day one.",
      },
      {
        title: "CMS Integration",
        desc: "Sanity, Contentful, WordPress, or Notion as a CMS — your team updates content without a developer.",
      },
      {
        title: "E-commerce Ready",
        desc: "Shopify, WooCommerce, or custom carts with payment gateway integration, inventory, and order management.",
      },
      {
        title: "Web App Development",
        desc: "Complex SPAs and full-stack web applications with real-time features, auth, and dashboards.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery & Sitemap",
        desc: "We audit your current presence (if any), map out the content structure, and agree on tech stack.",
      },
      {
        step: "02",
        title: "Design in Figma",
        desc: "Full desktop and mobile mockups with your brand applied. No coding until you approve the design.",
      },
      {
        step: "03",
        title: "Development & CMS Setup",
        desc: "Component-driven development with live preview links after each sprint.",
      },
      {
        step: "04",
        title: "QA & Performance Audit",
        desc: "Cross-browser testing, accessibility checks, and Lighthouse optimization.",
      },
      {
        step: "05",
        title: "Launch & Handover",
        desc: "Domain setup, SSL, hosting configuration, and a recorded walkthrough so your team can own it.",
      },
    ],
    techStack: [
      { category: "Frontend", tools: ["Next.js", "React", "Astro", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", tools: ["Node.js", "Express", "tRPC", "Prisma"] },
      { category: "CMS", tools: ["Sanity", "Contentful", "WordPress", "Notion API"] },
      { category: "Hosting", tools: ["Vercel", "Netlify", "AWS", "Cloudflare"] },
    ],
    pricing: [
      {
        name: "Landing Page",
        price: "₹19,999",
        period: "one-time",
        description: "High-converting single page for campaigns, products, or launches.",
        features: [
          "Up to 5 sections",
          "Mobile responsive",
          "Contact form integration",
          "Basic SEO setup",
          "Deployed on Vercel/Netlify",
        ],
      },
      {
        name: "Business Website",
        price: "₹49,999",
        period: "one-time",
        description: "Multi-page professional website with CMS for easy content updates.",
        features: [
          "Up to 10 pages",
          "CMS integration",
          "Blog setup",
          "SEO optimization",
          "Analytics integration",
          "2 months support",
        ],
        highlight: true,
      },
      {
        name: "Web Application",
        price: "Custom",
        period: "project-based",
        description: "Full-stack web apps with auth, dashboards, and complex logic.",
        features: [
          "Custom architecture",
          "Authentication & roles",
          "Database design",
          "API development",
          "Admin panel",
          "Ongoing retainer available",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build with WordPress or custom code?",
        answer:
          "Both — we recommend Next.js for performance and flexibility, but WordPress for clients who need simple content management. We'll guide you to the right choice.",
      },
      {
        question: "Will the website be mobile-friendly?",
        answer:
          "Every site we build is mobile-first by default. We test on real devices and multiple screen sizes.",
      },
      {
        question: "Can I update the content myself after launch?",
        answer:
          "Yes. We connect a headless CMS so your team can update text, images, and pages without touching code.",
      },
      {
        question: "Do you provide hosting?",
        answer:
          "We set up hosting on Vercel, Netlify, or AWS based on your needs. We can manage it or hand it over to you.",
      },
      {
        question: "How do you handle website security?",
        answer:
          "SSL certificates, environment variable protection, rate limiting, and dependency audits are all standard in our builds.",
      },
    ],
    testimonials: [
      {
        name: "Sneha Kapoor",
        role: "Marketing Director",
        company: "NovaBrands",
        quote:
          "Our new website loads in under a second and our bounce rate dropped 40% in the first month. Incredible work.",
        avatar: "https://i.pravatar.cc/80?img=22",
      },
      {
        name: "Rahul Iyer",
        role: "CEO",
        company: "LegalEdge",
        quote:
          "They took our outdated WordPress site and rebuilt it in Next.js. The Lighthouse score went from 48 to 97.",
        avatar: "https://i.pravatar.cc/80?img=33",
      },
    ],
    deliverables: [
      "Figma design files",
      "Source code (GitHub repo)",
      "CMS setup & training video",
      "SEO audit report",
      "Google Analytics / Search Console setup",
      "Hosting & deployment guide",
    ],
    timeline: "3 – 12 weeks depending on scope",
    idealFor: [
      "Businesses needing a new or redesigned website",
      "Startups wanting a strong first online presence",
      "E-commerce brands scaling online sales",
      "Companies migrating away from outdated platforms",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  "software-development": {
    // Core
    title: "Software Development",
    description:
      "End-to-end custom software solutions to streamline your business operations.",
    longDescription:
      "We engineer robust and scalable software solutions that solve complex business challenges. Our end-to-end software development lifecycle covers everything from conceptualization and architecture to development, testing, and deployment.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Custom Enterprise Software",
      "SaaS Product Development",
      "API Development & Integration",
      "Legacy System Modernization",
      "Cloud-Native Solutions",
    ],

    // Extended
    tagline: "Software that fits your business — not the other way around.",
    heroStats: [
      { value: "10+", label: "SaaS Products Built" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "0", label: "Critical Security Incidents" },
      { value: "5×", label: "Avg ROI Improvement" },
    ],
    whatWeDeliver: [
      {
        title: "SaaS Product Engineering",
        desc: "Multi-tenant architecture, subscription billing, and role-based access — built to scale to thousands of users.",
      },
      {
        title: "API Development & Integration",
        desc: "RESTful and GraphQL APIs with thorough documentation, versioning, and rate limiting.",
      },
      {
        title: "Legacy Modernization",
        desc: "We assess your old system and migrate to modern stacks without disrupting current operations.",
      },
      {
        title: "Cloud-Native Architecture",
        desc: "Containerized microservices on AWS, GCP, or Azure with auto-scaling and zero-downtime deployments.",
      },
      {
        title: "Internal Business Tools",
        desc: "Custom CRMs, ERPs, inventory systems, and workflow automation tools built for your exact process.",
      },
      {
        title: "Data Pipelines & Reporting",
        desc: "ETL pipelines, real-time dashboards, and exportable reports so your team makes decisions with data.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Requirements Workshop",
        desc: "Deep-dive sessions with your stakeholders to map every workflow, integration, and edge case.",
      },
      {
        step: "02",
        title: "Architecture Design",
        desc: "System design document covering data models, API contracts, infrastructure, and scalability plan.",
      },
      {
        step: "03",
        title: "Iterative Development",
        desc: "Two-week sprints with working software demonstrated at the end of each sprint.",
      },
      {
        step: "04",
        title: "Testing & Security Audit",
        desc: "Unit, integration, and end-to-end testing plus a dedicated security review before go-live.",
      },
      {
        step: "05",
        title: "Deployment & Knowledge Transfer",
        desc: "Production deployment with runbooks, admin training, and complete technical documentation.",
      },
    ],
    techStack: [
      { category: "Languages", tools: ["TypeScript", "Python", "Go", "Java"] },
      { category: "Frameworks", tools: ["Node.js", "FastAPI", "NestJS", "Spring Boot"] },
      { category: "Database", tools: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
      { category: "Cloud & DevOps", tools: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
    ],
    pricing: [
      {
        name: "Startup",
        price: "₹1,00,000",
        period: "one-time",
        description: "Ideal for building a focused MVP or internal tool.",
        features: [
          "Core feature set",
          "REST API",
          "Basic auth & roles",
          "PostgreSQL database",
          "Deployment on cloud",
          "1 month support",
        ],
      },
      {
        name: "Scale",
        price: "₹3,00,000",
        period: "one-time",
        description: "Full-featured software product ready for real users and real scale.",
        features: [
          "Advanced business logic",
          "Multi-tenant support",
          "Third-party integrations",
          "Admin panel & reporting",
          "CI/CD pipeline",
          "3 months support",
        ],
        highlight: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "retainer or project",
        description: "Mission-critical software with SLAs, security audits, and dedicated team.",
        features: [
          "Dedicated dev team",
          "Architecture consulting",
          "On-premise or cloud",
          "SOC 2 / compliance ready",
          "24/7 monitoring",
          "12-month SLA",
        ],
      },
    ],
    faqs: [
      {
        question: "How is custom software better than off-the-shelf tools?",
        answer:
          "Off-the-shelf tools force you to adapt your process to their limitations. Custom software is built around your exact workflows, saving time and money long-term.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "Yes — we specialize in third-party integrations. If there's an API, we can connect to it. We also build custom middleware for legacy systems without APIs.",
      },
      {
        question: "What if requirements change mid-project?",
        answer:
          "Our agile process accommodates change. Scope changes are assessed for impact and agreed upon transparently — no nasty surprises.",
      },
      {
        question: "Who owns the code after delivery?",
        answer:
          "You own 100% of the source code. We transfer the full repository to your account upon project completion.",
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer:
          "Yes. We offer monthly retainer plans covering bug fixes, dependency updates, security patches, and small feature additions.",
      },
    ],
    testimonials: [
      {
        name: "Vikram Nair",
        role: "CTO",
        company: "FinFlow",
        quote:
          "They rebuilt our monolith into microservices without a single hour of downtime. Exceptional engineering discipline.",
        avatar: "https://i.pravatar.cc/80?img=12",
      },
      {
        name: "Ananya Krishnan",
        role: "Operations Head",
        company: "LogiStack",
        quote:
          "The custom inventory system they built replaced three separate tools we were paying for. ROI in 4 months.",
        avatar: "https://i.pravatar.cc/80?img=45",
      },
    ],
    deliverables: [
      "System architecture document",
      "Full source code (GitHub repo)",
      "API documentation (Swagger / Postman collection)",
      "Database schema & migration scripts",
      "Deployment runbook",
      "Admin user guide",
    ],
    timeline: "8 – 24 weeks depending on complexity",
    idealFor: [
      "Businesses replacing manual or spreadsheet-based processes",
      "Startups building a SaaS product",
      "Enterprises modernizing legacy systems",
      "Companies needing custom integrations between tools",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  "product-design": {
    // Core
    title: "Product Design",
    description:
      "Intuitive and beautiful UI/UX designs that keep your users engaged.",
    longDescription:
      "Our product design process blends aesthetics with functionality. We focus on user-centric design methodologies to create intuitive, accessible, and stunning interfaces that resonate with your target audience and elevate your brand.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    features: [
      "User Research & Personas",
      "Wireframing & Prototyping",
      "UI/UX Design",
      "Usability Testing",
      "Design Systems Creation",
    ],

    // Extended
    tagline: "Design that users feel, not just see.",
    heroStats: [
      { value: "3×", label: "Avg Engagement Lift" },
      { value: "50+", label: "Products Designed" },
      { value: "92%", label: "Usability Test Pass Rate" },
      { value: "2wk", label: "First Prototype Delivered" },
    ],
    whatWeDeliver: [
      {
        title: "User Research",
        desc: "Interviews, surveys, and competitor analysis to understand who your users are and what they actually need.",
      },
      {
        title: "Information Architecture",
        desc: "Logical content hierarchy and navigation flows so users always know where they are and what to do next.",
      },
      {
        title: "Wireframes & Prototypes",
        desc: "Low and high-fidelity prototypes in Figma that you can click through and test before development begins.",
      },
      {
        title: "Visual UI Design",
        desc: "Pixel-perfect screens with your brand identity applied — typography, color, spacing, and iconography.",
      },
      {
        title: "Design System",
        desc: "A component library in Figma with tokens, variants, and documentation that scales across your entire product.",
      },
      {
        title: "Usability Testing",
        desc: "Real user sessions to validate design decisions and catch friction points before they cost you users.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Research & Discovery",
        desc: "User interviews, competitor teardowns, and a design audit of your existing product (if applicable).",
      },
      {
        step: "02",
        title: "Information Architecture",
        desc: "Sitemap, user flows, and content hierarchy before any visuals are drawn.",
      },
      {
        step: "03",
        title: "Wireframing",
        desc: "Low-fidelity wireframes to validate structure and flow with your team quickly.",
      },
      {
        step: "04",
        title: "Visual Design",
        desc: "High-fidelity Figma screens with interactive prototypes for all key user journeys.",
      },
      {
        step: "05",
        title: "Handoff & Design System",
        desc: "Developer-ready Figma files with annotations, a component library, and design tokens.",
      },
    ],
    techStack: [
      { category: "Design", tools: ["Figma", "FigJam", "Framer"] },
      { category: "Research", tools: ["Maze", "Hotjar", "Google Forms", "Loom"] },
      { category: "Collaboration", tools: ["Notion", "Slack", "Zeplin"] },
      { category: "Prototyping", tools: ["Figma Prototypes", "Framer", "ProtoPie"] },
    ],
    pricing: [
      {
        name: "UI Audit",
        price: "₹18,000",
        period: "one-time",
        description: "A structured review of your existing product with an actionable improvement report.",
        features: [
          "Heuristic evaluation",
          "Mobile & desktop review",
          "Priority issue list",
          "Quick-win recommendations",
          "Delivered in 5 business days",
        ],
      },
      {
        name: "Product Design",
        price: "₹60,000",
        period: "one-time",
        description: "End-to-end design for a new product or major redesign.",
        features: [
          "User research & personas",
          "Full wireframes",
          "High-fidelity Figma screens",
          "Interactive prototype",
          "Handoff-ready files",
          "2 revision rounds",
        ],
        highlight: true,
      },
      {
        name: "Design System",
        price: "₹1,20,000",
        period: "one-time",
        description: "A scalable component library and design language for your entire product.",
        features: [
          "Full component library",
          "Design tokens",
          "Documentation in Figma",
          "Dark mode variants",
          "Developer handoff guide",
          "Team training session",
        ],
      },
    ],
    faqs: [
      {
        question: "Do we need design before development starts?",
        answer:
          "Always. Building without a validated design is the #1 cause of expensive rework. A good design phase saves 3–5x in dev costs.",
      },
      {
        question: "What file formats will we receive?",
        answer:
          "All designs are delivered as organized Figma files with auto-layout, components, and variants. We can also export assets in any format your developers need.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Absolutely. We apply your brand to the UI — if you don't have guidelines yet, we can create them as part of the project.",
      },
      {
        question: "Do you conduct actual user testing?",
        answer:
          "Yes. We run moderated usability sessions with real users from your target audience and document findings with video clips and a written report.",
      },
      {
        question: "Can your design system be used by our internal team?",
        answer:
          "Yes — that's the point. We document every component and train your team so they can extend it independently.",
      },
    ],
    testimonials: [
      {
        name: "Meera Patel",
        role: "Product Manager",
        company: "TaskFlow",
        quote:
          "Our user onboarding drop-off rate went from 62% to 18% after the UX redesign. The research process was eye-opening.",
        avatar: "https://i.pravatar.cc/80?img=23",
      },
      {
        name: "Karthik Reddy",
        role: "Founder",
        company: "Schedulr",
        quote:
          "The design system they built for us has saved our dev team weeks of work. Every new feature ships faster now.",
        avatar: "https://i.pravatar.cc/80?img=15",
      },
    ],
    deliverables: [
      "User research report & personas",
      "Sitemap & user flow diagrams",
      "Wireframes (all key screens)",
      "High-fidelity Figma designs",
      "Interactive clickable prototype",
      "Design system / component library",
      "Handoff documentation",
    ],
    timeline: "2 – 8 weeks depending on scope",
    idealFor: [
      "Startups validating a product before building",
      "Businesses with poor user retention or high drop-off",
      "Dev teams that need design-ready Figma files",
      "Companies building or scaling a SaaS product",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  "digital-marketing": {
    // Core
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to increase brand awareness, engagement, and conversions.",
    longDescription:
      "Maximize your online presence and reach your target audience effectively. Our comprehensive digital marketing strategies are driven by analytics and tailored to boost traffic, engagement, and ROI across all digital channels.",
    image:
      "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Social Media Marketing",
      "Content Strategy & Creation",
      "Pay-Per-Click (PPC) Advertising",
      "Email Marketing Campaigns",
      "Conversion Rate Optimization",
    ],

    // Extended
    tagline: "Marketing that drives revenue, not just impressions.",
    heroStats: [
      { value: "3.5×", label: "Avg ROAS" },
      { value: "60%", label: "Avg Traffic Increase" },
      { value: "40%", label: "Avg CPL Reduction" },
      { value: "25+", label: "Brands Grown" },
    ],
    whatWeDeliver: [
      {
        title: "Paid Advertising (PPC)",
        desc: "Google Ads, Meta Ads, and LinkedIn campaigns built around your ICP with aggressive A/B testing.",
      },
      {
        title: "Social Media Management",
        desc: "Content calendars, design, copywriting, and community management across Instagram, LinkedIn, and X.",
      },
      {
        title: "Content Marketing",
        desc: "Blog posts, case studies, and thought leadership content that ranks and converts.",
      },
      {
        title: "Email Marketing",
        desc: "Automated drip sequences, newsletters, and re-engagement campaigns with open rate optimization.",
      },
      {
        title: "Conversion Rate Optimization",
        desc: "Heatmaps, session recordings, A/B tests, and landing page optimization to squeeze more from existing traffic.",
      },
      {
        title: "Analytics & Reporting",
        desc: "Monthly performance reports with plain-English insights — not vanity metrics, but metrics tied to revenue.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit & Strategy",
        desc: "We audit your current marketing, analyze competitors, and build a 90-day growth plan.",
      },
      {
        step: "02",
        title: "Channel Setup",
        desc: "Ad accounts, tracking pixels, UTM structure, and analytics dashboards configured properly from day one.",
      },
      {
        step: "03",
        title: "Campaign Launch",
        desc: "Creatives, copy, and targeting live. We start conservative and scale what works.",
      },
      {
        step: "04",
        title: "Optimize & Scale",
        desc: "Weekly optimizations based on data. Winning campaigns get more budget. Losers get cut fast.",
      },
      {
        step: "05",
        title: "Report & Iterate",
        desc: "Monthly reports with clear ROI attribution and a plan for the next 30 days.",
      },
    ],
    techStack: [
      { category: "Advertising", tools: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager"] },
      { category: "Analytics", tools: ["Google Analytics 4", "Hotjar", "Mixpanel", "Looker Studio"] },
      { category: "Email", tools: ["Mailchimp", "Klaviyo", "Brevo"] },
      { category: "Social", tools: ["Buffer", "Hootsuite", "Canva", "CapCut"] },
    ],
    pricing: [
      {
        name: "Starter",
        price: "₹20,000",
        period: "per month",
        description: "Essential digital marketing for small businesses getting started.",
        features: [
          "2 social media channels",
          "12 posts/month",
          "Basic Google Ads management",
          "Monthly performance report",
          "Ad spend not included",
        ],
      },
      {
        name: "Growth",
        price: "₹45,000",
        period: "per month",
        description: "Full-funnel marketing for businesses ready to scale acquisition.",
        features: [
          "4 social media channels",
          "24 posts + stories/month",
          "Google + Meta Ads management",
          "Email marketing (2 campaigns/mo)",
          "CRO audit & recommendations",
          "Bi-weekly performance calls",
        ],
        highlight: true,
      },
      {
        name: "Performance",
        price: "Custom",
        period: "retainer + % of ad spend",
        description: "Performance-based marketing for high-growth companies.",
        features: [
          "All channels covered",
          "Dedicated marketing manager",
          "Weekly reporting",
          "Landing page design",
          "Video ad creative",
          "Attribution modeling",
        ],
      },
    ],
    faqs: [
      {
        question: "How soon will I see results?",
        answer:
          "Paid ads can generate leads within the first week. SEO and content take 2–4 months to compound. We set honest expectations at kickoff.",
      },
      {
        question: "Is the ad spend included in your fee?",
        answer:
          "No — our fee covers strategy and management. Ad spend goes directly to the platform (Google, Meta, etc.) and is billed separately.",
      },
      {
        question: "Do you create the ad creatives too?",
        answer:
          "Yes — our Growth and Performance plans include static and animated ad creatives. Starter plan uses your existing assets.",
      },
      {
        question: "How do you measure ROI?",
        answer:
          "We set up proper conversion tracking from day one and tie every channel to actual leads, signups, or sales — not just clicks.",
      },
      {
        question: "Can we pause or cancel anytime?",
        answer:
          "Yes. We work on monthly retainers with 30-day notice for cancellation. No long-term lock-ins.",
      },
    ],
    testimonials: [
      {
        name: "Deepika Nambiar",
        role: "Head of Growth",
        company: "ShopEase",
        quote:
          "Our Meta ROAS went from 1.2x to 4.1x in 90 days. The creative testing approach they use is methodical and it works.",
        avatar: "https://i.pravatar.cc/80?img=25",
      },
      {
        name: "Sanjay Gupta",
        role: "Founder",
        company: "FitNest",
        quote:
          "We went from 200 to 2,000 Instagram followers in 3 months — but more importantly, 30% of new signups now come from social.",
        avatar: "https://i.pravatar.cc/80?img=14",
      },
    ],
    deliverables: [
      "90-day marketing strategy document",
      "Monthly content calendar",
      "Ad creative assets (static + animated)",
      "Monthly performance report (PDF)",
      "Google Analytics & Ads dashboard",
      "Competitor analysis report (onboarding)",
    ],
    timeline: "Ongoing monthly retainer (min. 3 months recommended)",
    idealFor: [
      "Businesses with a product but no marketing engine",
      "E-commerce brands wanting to scale paid ads",
      "SaaS companies building top-of-funnel awareness",
      "Local businesses wanting to dominate their area online",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  "seo": {
    // Core
    title: "SEO Optimization",
    description:
      "Advanced SEO techniques to improve search visibility, drive traffic, and boost online presence.",
    longDescription:
      "Climb the search engine rankings and attract organic traffic with our proven SEO strategies. We conduct deep keyword research, technical audits, and on-page optimization to ensure your website is easily discoverable by your customers.",
    image:
      "https://images.unsplash.com/photo-1562883676-8c6fbf064050?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Comprehensive SEO Audits",
      "On-Page & Off-Page Optimization",
      "Technical SEO",
      "Local SEO Optimization",
      "Keyword Research & Strategy",
    ],

    // Extended
    tagline: "Rank higher. Get found. Grow without paying per click.",
    heroStats: [
      { value: "3×", label: "Avg Organic Traffic Lift" },
      { value: "Top 3", label: "Avg Keyword Rankings" },
      { value: "6mo", label: "Avg to First Results" },
      { value: "80%", label: "Retention Rate" },
    ],
    whatWeDeliver: [
      {
        title: "Technical SEO Audit",
        desc: "Site speed, Core Web Vitals, crawlability, indexation, broken links, schema markup — a full technical health check.",
      },
      {
        title: "Keyword Research & Mapping",
        desc: "We find the keywords your ideal customers actually search, map them to your pages, and build a content gap plan.",
      },
      {
        title: "On-Page Optimization",
        desc: "Title tags, meta descriptions, heading structure, internal linking, and content optimization for every priority page.",
      },
      {
        title: "Content Creation",
        desc: "SEO-focused blog posts, landing pages, and FAQs written to rank and convert — not just fill word count.",
      },
      {
        title: "Link Building",
        desc: "White-hat backlink acquisition through digital PR, guest posts, and partnerships that build real authority.",
      },
      {
        title: "Local SEO",
        desc: "Google Business Profile optimization, local citations, and reviews strategy for businesses serving specific geographies.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Technical Audit",
        desc: "Full site crawl to identify and prioritize every technical issue hurting your rankings.",
      },
      {
        step: "02",
        title: "Keyword & Competitor Research",
        desc: "Map the keyword landscape, identify what competitors rank for, and find gaps to exploit.",
      },
      {
        step: "03",
        title: "On-Page Optimization",
        desc: "Systematically optimize every priority page — titles, content, schema, internal links.",
      },
      {
        step: "04",
        title: "Content & Link Building",
        desc: "Publish new content targeting ranking opportunities and build authority through quality backlinks.",
      },
      {
        step: "05",
        title: "Monitor & Report",
        desc: "Track keyword movements, traffic, and conversions monthly. Adjust strategy based on what the data shows.",
      },
    ],
    techStack: [
      { category: "Audit & Research", tools: ["Ahrefs", "SEMrush", "Screaming Frog", "Google Search Console"] },
      { category: "Analytics", tools: ["Google Analytics 4", "Looker Studio", "Clarity"] },
      { category: "Content", tools: ["SurferSEO", "Clearscope", "Frase"] },
      { category: "Local SEO", tools: ["Google Business Profile", "BrightLocal", "Yext"] },
    ],
    pricing: [
      {
        name: "SEO Audit",
        price: "₹12,000",
        period: "one-time",
        description: "A comprehensive audit of your site's SEO health with a prioritized action plan.",
        features: [
          "Technical health report",
          "Top 20 keyword opportunities",
          "On-page gap analysis",
          "Competitor comparison",
          "Delivered in 7 days",
        ],
      },
      {
        name: "SEO Growth",
        price: "₹30,000",
        period: "per month",
        description: "Ongoing SEO management to steadily grow your organic traffic.",
        features: [
          "Monthly on-page optimization",
          "4 blog posts/month",
          "Backlink building (5 links/mo)",
          "Google Search Console management",
          "Monthly rankings report",
          "Keyword tracking (100 keywords)",
        ],
        highlight: true,
      },
      {
        name: "Authority",
        price: "₹65,000",
        period: "per month",
        description: "Aggressive SEO for competitive markets and high-growth companies.",
        features: [
          "Technical SEO maintenance",
          "8 blog posts/month",
          "Premium link building (15 links/mo)",
          "Digital PR campaigns",
          "Schema markup implementation",
          "Bi-weekly strategy calls",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to work?",
        answer:
          "Technical fixes can show results in 2–4 weeks. Keyword rankings and traffic typically start improving at 3–6 months. SEO is a long-term investment.",
      },
      {
        question: "Can you guarantee page 1 rankings?",
        answer:
          "No ethical SEO agency can guarantee specific rankings — search algorithms change constantly. We guarantee a proven process and transparent reporting tied to real outcomes.",
      },
      {
        question: "Do you build backlinks?",
        answer:
          "Yes — white-hat link building through guest posts, digital PR, and outreach. We never buy links or use link farms.",
      },
      {
        question: "Will you write the content too?",
        answer:
          "Yes. Our Growth and Authority plans include SEO-optimized blog content written by our in-house team. We also optimize existing content.",
      },
      {
        question: "What happens if I cancel?",
        answer:
          "All the optimizations and content we've built stay with you. Rankings may slowly drift without maintenance, but you keep everything we've done.",
      },
    ],
    testimonials: [
      {
        name: "Aditya Rao",
        role: "Founder",
        company: "LawDesk",
        quote:
          "We went from zero to 8,000 organic visitors/month in 5 months. Three of our target keywords are now in position 1.",
        avatar: "https://i.pravatar.cc/80?img=16",
      },
      {
        name: "Kavya Nair",
        role: "Marketing Manager",
        company: "GreenCart",
        quote:
          "The technical audit alone uncovered 47 issues our previous agency never mentioned. Fixed them and traffic jumped 35% in 6 weeks.",
        avatar: "https://i.pravatar.cc/80?img=47",
      },
    ],
    deliverables: [
      "Technical SEO audit report",
      "Keyword research & content map",
      "On-page optimization (all priority pages)",
      "Monthly rankings tracker (Google Looker Studio)",
      "Backlink report",
      "Monthly performance PDF report",
    ],
    timeline: "Ongoing monthly retainer (min. 3 months recommended)",
    idealFor: [
      "Businesses tired of paying for ads and wanting free organic traffic",
      "New websites that need to establish domain authority",
      "Local businesses wanting to dominate Google Maps results",
      "Content-heavy sites needing a proper keyword strategy",
    ],
  },

  "ai-development": {
    // Core
    title: "AI Development",
    description:
      "Custom AI solutions that automate workflows, unlock insights, and give your business a competitive edge.",
    longDescription:
      "Harness the power of artificial intelligence with our custom AI development services. We build intelligent systems ranging from LLM-powered chatbots to predictive analytics engines and computer vision pipelines, tailored to your specific business problem.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    features: [
      "LLM Integration & Custom Chatbots",
      "AI Automation & Workflow Agents",
      "Predictive Analytics & ML Models",
      "Computer Vision Solutions",
      "RAG (Retrieval-Augmented Generation) Systems",
    ],

    // Extended
    tagline: "AI that actually solves your business problem — not just a demo.",
    heroStats: [
      { value: "25+", label: "AI Systems Shipped" },
      { value: "60%", label: "Avg Task Automation" },
      { value: "99.9%", label: "Uptime on Deployed Models" },
      { value: "3x", label: "Faster Decision Making" },
    ],
    whatWeDeliver: [
      {
        title: "Custom LLM Integration",
        desc: "Connect GPT, Claude, or open-source models into your product with proper prompt engineering and guardrails.",
      },
      {
        title: "RAG & Knowledge Base Systems",
        desc: "Let your AI answer questions using your own company data — docs, PDFs, databases — accurately and securely.",
      },
      {
        title: "AI Agents & Automation",
        desc: "Autonomous agents that handle repetitive tasks — data entry, email triage, report generation — end to end.",
      },
      {
        title: "Predictive & ML Models",
        desc: "Forecasting, churn prediction, recommendation engines, and anomaly detection built on your historical data.",
      },
      {
        title: "Computer Vision",
        desc: "Object detection, OCR, quality inspection, and image classification pipelines for real-world use cases.",
      },
      {
        title: "Model Fine-Tuning & Evaluation",
        desc: "Fine-tune models on your domain data and build evaluation pipelines to track accuracy and drift over time.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Problem Discovery & Feasibility",
        desc: "We identify the right AI approach for your problem and validate feasibility before writing any code.",
      },
      {
        step: "02",
        title: "Data Audit & Preparation",
        desc: "We assess your available data, clean it, and structure it for training or retrieval.",
      },
      {
        step: "03",
        title: "Prototype & Model Selection",
        desc: "Rapid prototyping with the best-fit model (LLM, custom ML, or hybrid), tested against real scenarios.",
      },
      {
        step: "04",
        title: "Integration & Guardrails",
        desc: "We integrate the model into your product with safety checks, rate limiting, and fallback logic.",
      },
      {
        step: "05",
        title: "Deployment & Monitoring",
        desc: "Production deployment with logging, evaluation dashboards, and a handover walkthrough for your team.",
      },
    ],
    techStack: [
      { category: "LLMs & APIs", tools: ["OpenAI", "Anthropic Claude", "Gemini", "Llama", "Mistral"] },
      { category: "ML/Frameworks", tools: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face"] },
      { category: "Vector & RAG", tools: ["Pinecone", "Weaviate", "LangChain", "LlamaIndex"] },
      { category: "Infra", tools: ["AWS SageMaker", "Vercel AI SDK", "Docker", "FastAPI"] },
    ],
    pricing: [
      {
        name: "AI Chatbot / Assistant",
        price: "₹39,999",
        period: "one-time",
        description: "Custom LLM-powered chatbot trained on your business content.",
        features: [
          "Up to 1 knowledge base source",
          "Custom prompt engineering",
          "Website widget integration",
          "Basic analytics dashboard",
          "1 month support",
        ],
      },
      {
        name: "RAG & Automation System",
        price: "₹89,999",
        period: "one-time",
        description: "Full RAG pipeline with automation agents for internal or customer-facing use.",
        features: [
          "Multiple data source integration",
          "Custom agent workflows",
          "Role-based access control",
          "Evaluation & monitoring dashboard",
          "Analytics integration",
          "2 months support",
        ],
        highlight: true,
      },
      {
        name: "Custom AI Platform",
        price: "Custom",
        period: "project-based",
        description: "End-to-end AI product — ML models, agents, or vision systems built for scale.",
        features: [
          "Custom model training/fine-tuning",
          "Scalable inference architecture",
          "Data pipeline & MLOps setup",
          "Admin & analytics panel",
          "Ongoing retainer available",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you build with existing LLM APIs or train custom models?",
        answer:
          "Both — most use cases are best solved with fine-tuned prompts on existing LLMs, but for specialized problems we train custom models. We'll recommend the right fit.",
      },
      {
        question: "Can the AI use our own company data?",
        answer:
          "Yes. We build RAG pipelines that let the AI reference your documents, databases, or knowledge base securely, without retraining the model.",
      },
      {
        question: "How do you prevent the AI from giving wrong answers?",
        answer:
          "We implement guardrails, source citations, confidence thresholds, and human-in-the-loop review for critical outputs.",
      },
      {
        question: "Do you handle data privacy and security?",
        answer:
          "Yes. We follow data minimization practices, secure API handling, and can deploy on-premise or in your private cloud if required.",
      },
      {
        question: "How long does an AI project take?",
        answer:
          "Simple chatbot integrations can ship in 2-3 weeks. Custom ML models or multi-agent systems typically take 6-16 weeks depending on data readiness.",
      },
    ],
    testimonials: [
      {
        name: "Ankit Verma",
        role: "Operations Head",
        company: "SwiftLogix",
        quote:
          "The AI agent they built now handles 70% of our support tickets automatically. Our team finally has time to focus on complex cases.",
        avatar: "https://i.pravatar.cc/80?img=45",
      },
      {
        name: "Priya Nair",
        role: "Founder",
        company: "MedConnect",
        quote:
          "They built a RAG system on top of our medical documentation that our staff now use daily. Accuracy and speed exceeded expectations.",
        avatar: "https://i.pravatar.cc/80?img=56",
      },
    ],
    deliverables: [
      "Model/architecture documentation",
      "Source code (GitHub repo)",
      "Evaluation & monitoring dashboard",
      "Data pipeline documentation",
      "API documentation",
      "Deployment & handover guide",
    ],
    timeline: "3 – 16 weeks depending on scope",
    idealFor: [
      "Businesses wanting to automate repetitive workflows",
      "Companies with large document/data repositories needing smart search",
      "Startups building AI-native products",
      "Teams needing predictive insights from historical data",
    ],
  },
};
