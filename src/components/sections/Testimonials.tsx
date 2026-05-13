'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'Gym Owner',
    rating: 5,
    text: 'SubzAgency transformed our gym\u2019s online presence. The 3D website they built gets us 50+ inquiries daily. Absolutely game-changing!',
    color: '#00f0ff',
  },
  {
    name: 'Priya Patel',
    role: 'Hotel Manager',
    rating: 5,
    text: 'Our booking rates tripled after the new website launch. The virtual tour feature is incredible. Best investment we made!',
    color: '#a855f7',
  },
  {
    name: 'Arjun Mehta',
    role: 'Cafe Owner',
    rating: 5,
    text: 'The website feels like walking into our cafe. The online ordering system is seamless. Our customers love it!',
    color: '#ff6600',
  },
  {
    name: 'Neha Gupta',
    role: 'Ecommerce CEO',
    rating: 5,
    text: 'Revenue jumped 250% in 3 months. The shopping experience they created is premium and conversion-focused. Outstanding work!',
    color: '#39ff14',
  },
  {
    name: 'Vikram Singh',
    role: 'Restaurant Owner',
    rating: 5,
    text: 'Reservations went through the roof. The menu animations and booking system are top-notch. Highly recommend SubzAgency!',
    color: '#ff00ff',
  },
  {
    name: 'Ananya Das',
    role: 'Personal Brand',
    rating: 5,
    text: 'My personal brand website is stunning. The 3D portfolio section gets compliments from everyone. True artists!',
    color: '#00f0ff',
  },
  {
    name: 'Kabir Reddy',
    role: 'AI Startup Founder',
    rating: 5,
    text: 'They understood our tech vision perfectly. The AI chatbot integration and interactive demos are next level. 10/10!',
    color: '#a855f7',
  },
  {
    name: 'Meera Joshi',
    role: 'Real Estate Director',
    rating: 5,
    text: '3D property tours changed everything for us. Client engagement is up 300%. SubzAgency delivers beyond expectations!',
    color: '#ff6600',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      className="glass group relative m-2 min-w-[340px] max-w-[400px] shrink-0 overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02]"
      style={{
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
      whileHover={{
        boxShadow: `0 0 25px ${testimonial.color}1A, inset 0 0 25px ${testimonial.color}0D`,
      }}
    >
      {/* Subtle gradient accent at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-2xl"
        style={{
          background: `linear-gradient(180deg, ${testimonial.color}0D 0%, transparent 100%)`,
        }}
      />

      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          border: `1px solid ${testimonial.color}40`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Quote icon */}
        <div className="mb-4 text-5xl font-serif leading-none" style={{ color: testimonial.color, opacity: 0.6 }}>
          &ldquo;
        </div>

        {/* Review text */}
        <p className="mb-5 text-sm leading-relaxed text-white/90">
          {testimonial.text}
        </p>

        {/* Star rating */}
        <div className="mb-4 flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Client info */}
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{
              background: `${testimonial.color}15`,
              color: testimonial.color,
              border: `1px solid ${testimonial.color}30`,
            }}
          >
            {getInitials(testimonial.name)}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const topRow = useMemo(() => testimonials.slice(0, 4), []);
  const bottomRow = useMemo(() => testimonials.slice(4, 8), []);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 sm:py-32">
      {/* Subtle particle dots */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-neon-purple/30" />
        <div className="absolute right-[15%] top-[35%] h-1.5 w-1.5 rounded-full bg-neon-cyan/20" />
        <div className="absolute left-[25%] bottom-[30%] h-1 w-1 rounded-full bg-neon-green/25" />
        <div className="absolute right-[20%] bottom-[20%] h-1 w-1 rounded-full bg-neon-purple/20" />
        <div className="absolute left-[50%] top-[15%] h-1.5 w-1.5 rounded-full bg-neon-cyan/15" />
        <div className="absolute left-[70%] bottom-[40%] h-1 w-1 rounded-full bg-neon-orange/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-neon-purple">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold sm:text-5xl">
              What Our Clients{' '}
              <span className="gradient-text">Say</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Carousel - 2 rows on desktop, 1 on mobile */}
        <div className="marquee-container space-y-4">
          {/* Top Row - scrolls left */}
          <div className="overflow-hidden no-scrollbar">
            <div className="marquee-track flex">
              {/* Duplicate for seamless loop */}
              {[...topRow, ...topRow, ...topRow, ...topRow].map((t, i) => (
                <TestimonialCard key={`top-${i}`} testimonial={t} />
              ))}
            </div>
          </div>

          {/* Bottom Row - scrolls right */}
          <div className="overflow-hidden no-scrollbar">
            <div className="marquee-track-reverse flex">
              {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((t, i) => (
                <TestimonialCard key={`bottom-${i}`} testimonial={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
