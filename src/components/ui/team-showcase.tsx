"use client"

import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '../../lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dipti Ranjan Sahoo',
    role: 'CEO & Founder',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775717718/WhatsApp_Image_2026-04-09_at_12.23.19_PM_ds7yuk.jpg',
    social: { linkedin: 'https://www.linkedin.com/in/drsdipti/' },
  },
  {
    id: '2',
    name: 'Biswajit Das',
    role: 'Chief Technology Officer',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/v1774337648/biswajit-pX4fUldF_yvl1a1.jpg',
    social: {  linkedin: 'https://www.linkedin.com/in/biswajit-das-307236378/' },
  },
  {
    id: '3',
    name: 'Asish Behera',
    role: 'Chief Operating Officer',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/v1774337649/asish-YP_x4M2m_zezpos.png',
    social: { linkedin: 'https://www.linkedin.com/in/asish-behera-7aa599231/' },
  },
  {
    id: '4',
    name: 'Chandan Prakash Dash',
    role: 'Chief Data Officer',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/v1774337649/chandan-Cx7uX2po_s6mbwx.png',
    social: { linkedin: 'https://www.linkedin.com/in/chandan-prakash-dash-938a30314/' },
  },
  {
    id: '5',
    name: 'Santanu Swain',
    role: 'Full-Stack Developer',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/v1774337649/santanu-BiRSCqHD_twbc2u.png',
    social: { linkedin: 'https://www.linkedin.com/in/santanu-swain/' },
  },
  {
    id: '6',
    name: 'Ankita Panda',
    role: 'Businesss Development Executive',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/v1774337649/ankita-C7Tzn3mv_swm78w.jpg',
    social: { linkedin: 'https://www.linkedin.com/in/ankita-panda-8b5657259?utm_source=share_via&utm_content=profile&utm_medium=member_android' } as TeamMember['social'],
  },
  {
    id: '7',
    name: 'Abhisek Mahanta',
    role: 'Chief Financial Officer',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775717833/WhatsApp_Image_2026-04-09_at_12.26.48_PM_sc5mqr.jpg',
    social: { linkedin: 'https://www.linkedin.com/in/abhisek-mohanta-9401952a3?utm_source=share_via&utm_content=profile&utm_medium=member_android' } as TeamMember['social'],
  },
  {
    id: '8',
    name: 'Bibhas Ranjan Behera',
    role: 'Digital Marketing Lead',
    image: 'https://res.cloudinary.com/devrmpo2p/image/upload/q_auto/f_auto/v1775718261/WhatsApp_Image_2026-04-09_at_12.32.51_PM_sorjzf.jpg',
    social: { linkedin: 'https://www.linkedin.com/in/bibhas-ranjan-behera?utm_source=share_via&utm_content=profile&utm_medium=member_android' } as TeamMember['social'],
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8 px-4 md:px-6 font-sans overflow-hidden">
      
    {/* ── Left: photo grid ── */}

      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:flex md:gap-4 shrink-0 md:overflow-visible pb-1 md:pb-0 min-w-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3 col-span-1">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-full aspect-4/5 sm:w-40 sm:h-42.5 md:w-30 md:h-33 lg:w-40 lg:h-41.25"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-6 sm:mt-8 md:mt-13 lg:mt-17 col-span-1">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-full aspect-4/5 sm:w-42.5 sm:h-45 md:w-33.5 md:h-36.5 lg:w-43 lg:h-45.5"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-3 sm:mt-4 md:mt-6.5 lg:mt-8 col-span-1">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-full aspect-4/5 sm:w-40 sm:h-42.5 md:w-31.5 md:h-34.5 lg:w-40.5 lg:h-43"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list*/}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-3 md:gap-4 lg:gap-5 pt-4 md:pt-2 flex-1 min-w-0 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer shrink-0 transition-opacity duration-400',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
        }}
      />
    </div>
  );
}


function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram ?? member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'w-4 h-3 rounded-[5px] shrink-0 transition-all duration-300',
            isActive ? 'bg-foreground w-5' : 'bg-foreground/25',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="X / Twitter"
              >
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn size={20} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={10} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-150 hover:scale-110"
                title="Behance"
              >
                <FaBehance size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-6.75 text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {member.role}
      </p>
    </div>
  );
}
