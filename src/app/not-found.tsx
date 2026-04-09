'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

/* ─── tiny cartoon SVG characters ─────────────────────────────────────────── */

function AstronautSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="48" rx="32" ry="34" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2"/>
      <ellipse cx="60" cy="50" rx="22" ry="22" fill="#BAE6FD" opacity="0.7"/>
      <ellipse cx="52" cy="42" rx="6" ry="4" fill="white" opacity="0.5" transform="rotate(-20 52 42)"/>
      <rect x="36" y="78" width="48" height="44" rx="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2"/>
      <rect x="50" y="88" width="20" height="14" rx="4" fill="#7C3AED" opacity="0.6"/>
      <circle cx="60" cy="95" r="3" fill="#A78BFA"/>
      <rect x="18" y="80" width="18" height="32" rx="9" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2"/>
      <circle cx="27" cy="114" r="7" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5"/>
      <rect x="84" y="80" width="18" height="32" rx="9" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2"/>
      <circle cx="93" cy="114" r="7" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5"/>
      <rect x="42" y="120" width="16" height="28" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2"/>
      <rect x="62" y="120" width="16" height="28" rx="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2"/>
      <rect x="38" y="144" width="24" height="12" rx="6" fill="#94A3B8"/>
      <rect x="58" y="144" width="24" height="12" rx="6" fill="#94A3B8"/>
      <circle cx="52" cy="50" r="4" fill="#1E293B"/>
      <circle cx="68" cy="50" r="4" fill="#1E293B"/>
      <circle cx="53.5" cy="48.5" r="1.5" fill="white"/>
      <circle cx="69.5" cy="48.5" r="1.5" fill="white"/>
    </svg>
  );
}

function PlanetSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="70" cy="40" rx="65" ry="14" fill="none" stroke="#169b6e" strokeWidth="3" opacity="0.5"/>
      <circle cx="70" cy="40" r="28" fill="#169b6e"/>
      <ellipse cx="62" cy="32" rx="10" ry="6" fill="#8B5CF6" opacity="0.5" transform="rotate(-20 62 32)"/>
      <ellipse cx="78" cy="46" rx="7" ry="4" fill="#4C1D95" opacity="0.4"/>
      <ellipse cx="70" cy="40" rx="65" ry="14" fill="none" stroke="#A78BFA" strokeWidth="1.5" opacity="0.3" strokeDasharray="8 4"/>
    </svg>
  );
}

function StarSVG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.8 8.6H20.7L15.1 12.7L16.9 19.3L12 15.2L7.1 19.3L8.9 12.7L3.3 8.6H10.2L12 2Z"/>
    </svg>
  );
}

function UfoBotSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="42" rx="44" ry="14" fill="#169b6e"/>
      <ellipse cx="50" cy="40" rx="44" ry="12" fill="#002309"/>
      <ellipse cx="50" cy="30" rx="22" ry="18" fill="#169b6e" opacity="0.8"/>
      <ellipse cx="50" cy="28" rx="16" ry="13" fill="#002309" opacity="0.5"/>
      <ellipse cx="44" cy="27" rx="4" ry="5" fill="#169b6e"/>
      <ellipse cx="56" cy="27" rx="4" ry="5" fill="#169b6e"/>
      <circle cx="44" cy="25" r="1.5" fill="white"/>
      <circle cx="56" cy="25" r="1.5" fill="white"/>
      <circle cx="22" cy="42" r="5" fill="#FCD34D"/>
      <circle cx="38" cy="46" r="5" fill="#F87171"/>
      <circle cx="50" cy="48" r="5" fill="#34D399"/>
      <circle cx="62" cy="46" r="5" fill="#F87171"/>
      <circle cx="78" cy="42" r="5" fill="#FCD34D"/>
      <path d="M36 54 L30 70 M50 54 L50 70 M64 54 L70 70" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 2"/>
    </svg>
  );
}

/* ─── main component ───────────────────────────────────────────────────────── */

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fourRef      = useRef<HTMLDivElement>(null);
  const zeroRef      = useRef<HTMLDivElement>(null);
  const four2Ref     = useRef<HTMLDivElement>(null);
  const astroRef     = useRef<HTMLDivElement>(null);
  const ufoRef       = useRef<HTMLDivElement>(null);
  const planetRef    = useRef<HTMLDivElement>(null);
  const starsRef     = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const btnsRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* stars twinkle */
      const stars = starsRef.current?.querySelectorAll('.star');
      stars?.forEach((s) => {
        gsap.to(s, {
          opacity: gsap.utils.random(0.1, 0.9),
          scale: gsap.utils.random(0.6, 1.4),
          duration: gsap.utils.random(0.8, 2.5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 2),
        });
      });

      /* UFO hover + drift */
      gsap.to(ufoRef.current, { y: -18, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(ufoRef.current, { x: 30,  duration: 5,   repeat: -1, yoyo: true, ease: 'sine.inOut' });
      const lights = ufoRef.current?.querySelectorAll('circle');
      lights?.forEach((l, i) => {
        if (i > 1) {
          gsap.to(l, { opacity: 0.2, duration: 0.4 + i * 0.1, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: i * 0.15 });
        }
      });

      /* Astronaut float */
      gsap.to(astroRef.current, { y: -22, rotation: 8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      /* Planet slow spin */
      gsap.to(planetRef.current, { rotation: 360, duration: 30, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });

      /* 404 entrance */
      const tl = gsap.timeline();
      tl.from([fourRef.current, zeroRef.current, four2Ref.current], {
        y: -80, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'back.out(1.6)',
      })
      .from(textRef.current, { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from(btnsRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

      /* 404 digit wobble */
      gsap.to([fourRef.current, four2Ref.current], {
        skewX: 4, duration: 0.12, repeat: -1, repeatDelay: 4, yoyo: true, ease: 'power1.inOut',
      });
      gsap.to(zeroRef.current, {
        scaleX: 1.08, duration: 0.15, repeat: -1, repeatDelay: 4.5, yoyo: true, ease: 'power1.inOut', delay: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const STARS = Array.from({ length: 40 }, (_, i) => ({
    x: ((i * 137.5) % 100).toFixed(1),
    y: ((i * 97.3) % 100).toFixed(1),
    size: (((i * 7) % 3) + 1) * 4,
    opacity: (((i * 13) % 7) + 2) * 0.1,
  }));

  /* ── shared digit style ── */
  const digitStyle: React.CSSProperties = {
    fontFamily: "'Fredoka One', 'Nunito', sans-serif",
    // ✅ Changed: was plain white (#fff) with violet glow
    // Now uses #e8ffd0 (light mint — same as footer headings) with matching green glow
    color: '#e8ffd0',
    textShadow: '0 0 40px rgba(168,201,122,0.45)',
  };

  return (
    <div
      ref={containerRef}      
      className="min-h-screen bg-[#002309] flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      {/* Star field */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="star absolute"
            // ✅ Changed: was text-slate-400 → now uses #7aaa4a (medium green, matches footer body text)
            style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity, color: '#7aaa4a' }}
          >
            <StarSVG size={s.size} />
          </div>
        ))}
      </div>

      {/* Planet */}
      <div ref={planetRef} className="absolute bottom-8 left-6 sm:left-16 opacity-60" style={{ width: 140 }}>
        <PlanetSVG className="w-full" />
      </div>

      {/* UFO */}
      <div ref={ufoRef} className="absolute top-10 right-6 sm:right-20" style={{ width: 110 }}>
        <UfoBotSVG className="w-full" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6">

        {/* 404 digits */}
        <div className="flex items-end gap-2 sm:gap-4 select-none">
          <div
            ref={fourRef}
            className="text-[100px] sm:text-[150px] md:text-[180px] font-black leading-none"
            style={digitStyle}
          >
            4
          </div>

          <div
            ref={zeroRef}
            className="relative text-[100px] sm:text-[150px] md:text-[180px] font-black leading-none"
            style={digitStyle}
          >
            0
            <div ref={astroRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AstronautSVG className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24" />
            </div>
          </div>

          <div
            ref={four2Ref}
            className="text-[100px] sm:text-[150px] md:text-[180px] font-black leading-none"
            style={digitStyle}
          >
            4
          </div>
        </div>

        {/* Text block */}
        <div ref={textRef} className="flex flex-col gap-2">
          {/* ✅ Changed: was text-slate-100 → #e8ffd0 (light mint heading, matches footer col headings) */}
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "'Nunito', sans-serif", color: '#e8ffd0' }}
          >
            Lost in space!
          </h2>
          {/* ✅ Changed: was text-slate-400 → #7aaa4a (medium green body text, matches footer desc) */}
          <p
            className="text-sm sm:text-base max-w-sm mx-auto leading-relaxed"
            style={{ color: '#7aaa4a' }}
          >
            Our astronaut can't find this page. It might have drifted into a black hole or never existed.
          </p>
        </div>

        {/* Buttons */}
        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
          <Button
            asChild
            className="px-7 py-5 bg-[#537a2e] hover:bg-[#537a2e]/80 font-bold rounded-2xl shadow-lg transition-all w-full sm:w-auto h-auto text-base group border-0"
            // ✅ Changed: button text uses #e8ffd0 instead of plain white for cohesion
            style={{ fontFamily: "'Nunito', sans-serif", color: '#e8ffd0' }}
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            // ✅ Changed: border uses green-tinted slate, text uses #c5e08a (bright contact-level green)
            // hover text upgrades to #e8ffd0 for clear feedback
            className="px-7 py-5 font-bold rounded-2xl transition-all w-full sm:w-auto h-auto text-base group"
            style={{
              fontFamily: "'Nunito', sans-serif",
              background: 'transparent',
              border: '1px solid #537a2e',
              color: '#c5e08a',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(83,122,46,0.15)';
              (e.currentTarget as HTMLButtonElement).style.color = '#e8ffd0';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#c5e08a';
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </div>

        {/* ✅ Added: subtle tertiary credit line using #537a2e — matches footer copyright */}
        <p className="text-xs mt-4" style={{ color: '#537a2e', fontFamily: "'Nunito', sans-serif" }}>
          Error 404 · Page not found
        </p>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;900&display=swap');
      `}</style>
    </div>
  );
}