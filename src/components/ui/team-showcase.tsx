"use client"

import { useState, useRef } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

// ─── LEADERSHIP (C-suite, founders) ───────────────────────────────────────────
const LEADERSHIP: TeamMember[] = [];

// ─── CORE TEAM ─────────────────────────────────────────────────────────────────
const CORE_TEAM: TeamMember[] = [
 
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

// ─── SINGLE CARD ──────────────────────────────────────────────────────────────
function MemberCard({
  member,
  index,
  isHovered,
  isAnyHovered,
  onEnter,
  onLeave,
  nameSize = 17,
}: {
  member: TeamMember;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  nameSize?: number;
}) {
  const dimmed = isAnyHovered && !isHovered;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10,
        cursor: 'pointer',
        opacity: dimmed ? 0.28 : 1,
        transition: 'opacity 0.3s ease',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Photo */}
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        style={{
          width: '100%',
          display: 'block',
          objectFit: 'cover',
          aspectRatio: nameSize > 15 ? '3/4' : '4/5',
          filter: isHovered
            ? 'grayscale(0) brightness(1.04)'
            : 'grayscale(0.45) brightness(0.82)',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
        }}
      />

      {/* Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.18) 52%, transparent 100%)',
          opacity: isHovered ? 1 : 0.65,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Index */}
      <span
        style={{
          position: 'absolute',
          top: 10,
          right: 11,
          fontSize: 10,
          fontWeight: 300,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.13em',
          fontFamily: "'Outfit', sans-serif",
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Info */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem 1rem 0.85rem',
          transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
          opacity: isHovered ? 1 : 0.9,
          transition: 'transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: nameSize,
            fontWeight: 400,
            color: '#fff',
            margin: '0 0 3px',
            lineHeight: 1.15,
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontSize: 9,
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {member.role}
        </p>

        {/* Social */}
        {member.social?.linkedin && member.social.linkedin !== '#' && (
          <div
            style={{
              display: 'flex',
              gap: 7,
              marginTop: 9,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
              transition: 'opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s',
            }}
          >
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="LinkedIn"
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: '0.5px solid rgba(255,255,255,0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.72)',
                textDecoration: 'none',
              }}
            >
              <LinkedInIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: '1.2rem',
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
          fontWeight: 400,
          fontFamily: "'Outfit', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: '0.5px',
          background: 'var(--color-border-tertiary)',
        }}
      />
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function TeamShowcase({
  leadersData = [],
  developersData = [],
  marketingData = [],
  bdeData = [],
}: {
  leadersData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  developersData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  marketingData?: { name: string; position: string; photo: string; linkedIn?: string }[];
  bdeData?: { name: string; position: string; photo: string; linkedIn?: string }[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isAnyHovered = hoveredId !== null;

  const activeLeaders = leadersData && leadersData.length > 0
    ? leadersData.map((d, idx) => ({
        id: `l-${idx}`,
        name: d.name,
        role: d.position,
        image: d.photo || "https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775717718/WhatsApp_Image_2026-04-09_at_12.23.19_PM_ds7yuk.jpg",
        social: { linkedin: d.linkedIn || "#" },
      }))
    : LEADERSHIP;

  const activeDevelopers = developersData && developersData.length > 0
    ? developersData.map((d, idx) => ({
        id: `s-${idx}`,
        name: d.name,
        role: d.position,
        image: d.photo || "https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775717718/WhatsApp_Image_2026-04-09_at_12.23.19_PM_ds7yuk.jpg",
        social: { linkedin: d.linkedIn || "#" },
      }))
    : CORE_TEAM.filter(m => ['c1', 'c2', 'c3', 'c4', 'c5'].includes(m.id));

  const activeMarketing = marketingData && marketingData.length > 0
    ? marketingData.map((d, idx) => ({
        id: `m-${idx}`,
        name: d.name,
        role: d.position,
        image: d.photo || "https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775717718/WhatsApp_Image_2026-04-09_at_12.23.19_PM_ds7yuk.jpg",
        social: { linkedin: d.linkedIn || "#" },
      }))
    : CORE_TEAM.filter(m => ['c6', 'c7'].includes(m.id));

  const activeBde = bdeData && bdeData.length > 0
    ? bdeData.map((d, idx) => ({
        id: `b-${idx}`,
        name: d.name,
        role: d.position,
        image: d.photo || "https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775717718/WhatsApp_Image_2026-04-09_at_12.23.19_PM_ds7yuk.jpg",
        social: { linkedin: d.linkedIn || "#" },
      }))
    : CORE_TEAM.filter(m => ['c8', 'c9', 'c10'].includes(m.id));

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Outfit:wght@300;400;500&display=swap"
      />

      <section
        style={{ width: '100%', maxWidth: '72rem', margin: '0 auto', padding: '3.5rem 1.5rem', fontFamily: "'Outfit', sans-serif" }}
        aria-label="Team"
      >
        {/* ── Leadership ── */}
        {activeLeaders.length > 0 && (
          <>
            <SectionLabel label="Leadership" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
                marginBottom: '2.5rem',
              }}
            >
              {activeLeaders.map((m, i) => (
                <MemberCard
                  key={m.id}
                  member={m}
                  index={i}
                  isHovered={hoveredId === m.id}
                  isAnyHovered={isAnyHovered}
                  onEnter={() => setHoveredId(m.id)}
                  onLeave={() => setHoveredId(null)}
                  nameSize={17}
                />
              ))}
            </div>
            <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '0 0 2rem' }} />
          </>
        )}

        {/* ── Core Developers ── */}
        {activeDevelopers.length > 0 && (
          <>
            <SectionLabel label="Core Developers" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 12,
                marginBottom: '2.5rem',
              }}
            >
              {activeDevelopers.map((m, i) => (
                <MemberCard
                  key={m.id}
                  member={m}
                  index={i}
                  isHovered={hoveredId === m.id}
                  isAnyHovered={isAnyHovered}
                  onEnter={() => setHoveredId(m.id)}
                  onLeave={() => setHoveredId(null)}
                  nameSize={15}
                />
              ))}
            </div>
            <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '0 0 2rem' }} />
          </>
        )}

        {/* ── Core Digital Marketing ── */}
        {activeMarketing.length > 0 && (
          <>
            <SectionLabel label="Core Digital Marketing" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 12,
                marginBottom: '2.5rem',
              }}
            >
              {activeMarketing.map((m, i) => (
                <MemberCard
                  key={m.id}
                  member={m}
                  index={i}
                  isHovered={hoveredId === m.id}
                  isAnyHovered={isAnyHovered}
                  onEnter={() => setHoveredId(m.id)}
                  onLeave={() => setHoveredId(null)}
                  nameSize={15}
                />
              ))}
            </div>
            <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '0 0 2rem' }} />
          </>
        )}

        {/* ── Business Development Executives ── */}
        {activeBde.length > 0 && (
          <>
            <SectionLabel label="Business Development Executives" />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 12,
              }}
            >
              {activeBde.map((m, i) => (
                <MemberCard
                  key={m.id}
                  member={m}
                  index={i}
                  isHovered={hoveredId === m.id}
                  isAnyHovered={isAnyHovered}
                  onEnter={() => setHoveredId(m.id)}
                  onLeave={() => setHoveredId(null)}
                  nameSize={15}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
