"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      "main h1, main h2, main h3, main h4, main p, main section, main button, main img"
    );

    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");

            // Animate only once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}