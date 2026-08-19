'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      // const progress = (scrollTop / height) * 100;
      const progress = height > 0 ? Math.min(Math.max((scrollTop / height) * 100, 0), 100) : 0;
      setScrollProgress(progress);
      setShow(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
<button
  onClick={scrollToTop}
  className={`fixed bottom-25 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center
  transition-all duration-500 backdrop-blur-lg border border-[#74c316] shadow-lg
  ${show ? 'opacity-100 bg-[#74c316] scale-100' : 'opacity-0 scale-75 pointer-events-none'}
  `}
>
      {/* Progress Ring */}
      <svg className="absolute w-full h-full rotate-[-90deg]">
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="#042407"
          strokeWidth="3"
          fill="transparent"
        />
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="white"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={150}
          strokeDashoffset={150 - (150 * scrollProgress) / 100}
          strokeLinecap="round"
        />
      </svg>

      {/* Icon */}
      <ArrowUp className="text-[#042407] z-10" size={20} />
    </button>
  );
}