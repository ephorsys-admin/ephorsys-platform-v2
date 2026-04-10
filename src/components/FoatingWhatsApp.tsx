'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  const phoneNumber = '9937405891';
  const message = 'Hello, I want to know more!';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
   <a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg transition-all duration-500 group
    ${show 
      ? 'opacity-100 translate-y-0 scale-100' 
      : 'opacity-0 translate-y-10 scale-75 pointer-events-none'}
  `}
>
  {/* Glow Ring */}
  <span className="absolute w-16 h-16 rounded-full bg-green-400 opacity-30 blur-md group-hover:opacity-60 transition"></span>

  {/* Pulse Ripple */}
  <span className="absolute w-full h-full rounded-full bg-green-400 opacity-20 animate-ping"></span>

  {/* Icon */}
  <FaWhatsapp 
    size={28} 
    className="text-white z-10 transition-all duration-300 
    group-hover:scale-125 group-hover:rotate-12" 
  />
</a>
  );
}
