'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

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
      className={`fixed bottom-6 right-6 z-50
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366]
        shadow-lg
        transition-all duration-500
        hover:scale-110
        ${
          show
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-10 scale-75 pointer-events-none'
        }
      `}
    >
      <FaWhatsapp className="text-white text-4xl" />
    </a>
  );
}