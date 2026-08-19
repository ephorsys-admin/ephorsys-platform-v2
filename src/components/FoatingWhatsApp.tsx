'use client';

import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  const phoneNumber = '9556536002';
  const message = 'Hello, I want to know more about your services!';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center
        w-16 h-16 rounded-full
        bg-white shadow-xl
        transition-all duration-500 group
        ${
          show
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }
      `}
    >
      {/* Glow */}
     

  

      {/* Animated GIF */}
      <img
        src="/whatsapp.gif"
        alt="WhatsApp"
        className="relative z-10 w-14 h-14 object-contain rounded
          transition-transform duration-300
          group-hover:scale-110"
      />
    </a>
  );
}