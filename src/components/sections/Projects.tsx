'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';

interface Project {
  name: string;
  category: string;
  tech: string[];
  results: string;
  color: string;
  colorClass: string;
  description: string;
}

const projects: Project[] = [
  {
    name: 'FitZone Gym',
    category: 'Gym & Fitness',
    tech: ['Three.js', 'GSAP', 'Next.js'],
    results: '200% increase in memberships',
    color: '#39ff14',
    colorClass: 'neon-green',
    description: 'Immersive 3D gym website with interactive workout demos and membership portal',
  },
  {
    name: 'LuxeStay Hotels',
    category: 'Hotel & Hospitality',
    tech: ['React', 'Framer Motion', 'Node.js'],
    results: '150% more direct bookings',
    color: '#00f0ff',
    colorClass: 'neon-cyan',
    description: 'Premium hotel booking platform with virtual room tours and seamless reservation system',
  },
  {
    name: 'Brew & Bean Cafe',
    category: 'Cafe & Restaurant',
    tech: ['Next.js', 'Three.js', 'Tailwind'],
    results: '300% online order increase',
    color: '#ff6600',
    colorClass: 'neon-orange',
    description: 'Charming cafe website with 3D menu showcase and online ordering system',
  },
  {
    name: 'ShopElite Store',
    category: 'Ecommerce',
    tech: ['Next.js', 'Prisma', 'Stripe'],
    results: '250% revenue growth',
    color: '#a855f7',
    colorClass: 'neon-purple',
    description: 'High-converting ecommerce store with smooth checkout and product visualization',
  },
  {
    name: 'GreenBite Restaurant',
    category: 'Restaurant',
    tech: ['React', 'GSAP', 'SEO'],
    results: '180% more reservations',
    color: '#39ff14',
    colorClass: 'neon-green',
    description: 'Elegant restaurant landing page with menu animations and reservation system',
  },
  {
    name: 'Alex Morgan Brand',
    category: 'Personal Brand',
    tech: ['Three.js', 'Framer Motion', 'Next.js'],
    results: '400% follower growth',
    color: '#00f0ff',
    colorClass: 'neon-cyan',
    description: 'Stunning personal brand website with interactive portfolio and social integration',
  },
  {
    name: 'NeuralAI Solutions',
    category: 'AI Business',
    tech: ['React', 'Python', 'TensorFlow'],
    results: '500% lead generation',
    color: '#a855f7',
    colorClass: 'neon-purple',
    description: 'Cutting-edge AI business platform with live demos and intelligent chatbot',
  },
  {
    name: 'PrimeVista Realty',
    category: 'Real Estate',
    tech: ['Next.js', 'Three.js', 'Maps API'],
    results: '200% property inquiries',
    color: '#ff6600',
    colorClass: 'neon-orange',
    description: 'Immersive real estate platform with 3D property tours and smart search',
  },
];

const marqueeText =
  'GYMS \u2022 HOTELS \u2022 CAFES \u2022 ECOMMERCE \u2022 RESTAURANTS \u2022 PERSONAL BRANDS \u2022 AI BUSINESSES \u2022 REAL ESTATE \u2022 STARTUPS \u2022 LOCAL BUSINESS \u2022 ';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  }, []);

  const rotateX = isHovered ? (mousePos.y - 0.5) * -10 : 0; // max 5 deg
  const rotateY = isHovered ? (mousePos.x - 0.5) * 10 : 0; // max 5 deg

  return (
    <ScrollReveal delay={index * 0.08} direction="up" amount={0.15}>
      <motion.div
        ref={cardRef}
        className="glass relative overflow-hidden rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0.5, y: 0.5 });
        }}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle gradient overlay at top in accent color */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl"
          style={{
            background: `linear-gradient(180deg, ${project.color}0D 0%, transparent 100%)`,
          }}
        />

        {/* Mouse-following glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${project.color}1A 0%, transparent 60%)`,
            boxShadow: isHovered
              ? `0 0 30px ${project.color}26, inset 0 0 30px ${project.color}0D`
              : 'none',
          }}
        />

        {/* Animated border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            border: `1px solid ${project.color}40`,
            boxShadow: `0 0 20px ${project.color}1A`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Category badge */}
          <div className="mb-4">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-white">{project.name}</h3>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md px-2 py-1 text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Results */}
          <div
            className="flex items-center gap-2 rounded-lg p-3"
            style={{
              background: `${project.color}08`,
              border: `1px solid ${project.color}15`,
            }}
          >
            <Trophy size={16} style={{ color: project.color }} className="shrink-0" />
            <span className="text-sm font-semibold" style={{ color: project.color }}>
              {project.results}
            </span>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-neon-orange">
              Our Work
            </span>
            <h2 className="text-4xl font-bold sm:text-5xl">
              Projects That{' '}
              <span className="gradient-text">Speak Results</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-container mt-20 overflow-hidden">
        <div className="glass-strong py-4">
          <div className="marquee-track flex whitespace-nowrap">
            {[0, 1].map((set) => (
              <span
                key={set}
                className="mr-0 inline-flex items-center text-lg font-bold uppercase tracking-widest text-neon-green opacity-60"
              >
                {marqueeText.repeat(2)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
