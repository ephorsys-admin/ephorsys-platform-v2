import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Footer from "@/components/outlet/footer";
import Navbar from "@/components/outlet/navbar";
import FloatingWhatsApp from "@/components/FoatingWhatsApp";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot";
import Preloader from "@/components/Preloader";
import ScrollAnimations from "@/components/ui/scrollAnimations";
import SocialMedia from "@/components/outlet/socialMedia";


const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ephorsys | Digital Solutions & AI Services",
    template: "%s | Ephorsys",
  },

  description:
    "Ephorsys builds modern, scalable digital products, web applications, and AI-powered solutions for businesses.",

  keywords: [
    "Ephorsys",
    "Digital Solutions",
    "Web Development",
    "Next.js",
    "Full Stack Development",
    "AI Applications",
    "Software Company",
  ],

  authors: [{ name: "Ephorsys Team" }],
  creator: "Ephorsys",

  metadataBase: new URL("https://ephorsys.com"),

  openGraph: {
    title: "Ephorsys | Digital Solutions & AI Services",

    description:
      "Ephorsys builds modern, scalable digital products, web applications, and AI-powered solutions for businesses.",

    url: "https://ephorsys.com",

    siteName: "Ephorsys",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ephorsys Digital Solutions",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Ephorsys | Digital Solutions & AI Services",

    description:
      "Ephorsys builds modern, scalable digital products, web applications, and AI-powered solutions for businesses.",

    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://ephorsys.com",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {/* Global scroll animations */}
        <ScrollAnimations />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F1SKC3Y6GH"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-F1SKC3Y6GH');
          `}
        </Script>

        {/* Preloader */}
        {/* <Preloader /> */}
        <SocialMedia/>

        <Navbar />

        <main className="flex-1">
          {children}

          {/* <ScrollToTop /> */}
          <Chatbot />

          <FloatingWhatsApp />
        </main>

        <Footer />
      </body>
    </html>
  );
}