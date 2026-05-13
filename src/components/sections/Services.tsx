'use client';

import { motion } from 'framer-motion';
import {
  Box,
  Globe,
  ShoppingCart,
  Layout,
  Palette,
  Search,
  Bot,
  Crown,
} from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GlowCard from '@/components/effects/GlowCard';

type GlowColorType = 'green' | 'cyan' | 'purple';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  glowColor: GlowColorType;
  neonColor: string;
}

const services: ServiceItem[] = [
  {
    title: '3D Websites',
    description:
      'Immersive Three.js powered experiences with interactive 3D elements that captivate visitors',
    icon: Box,
    glowColor: 'green',
    neonColor: '#39ff14',
  },
  {
    title: 'Web Applications',
    description:
      'Full-stack web apps with modern frameworks, real-time features, and seamless UX',
    icon: Globe,
    glowColor: 'cyan',
    neonColor: '#00f0ff',
  },
  {
    title: 'Ecommerce Stores',
    description:
      'High-converting online stores with smooth checkout flows and premium product showcases',
    icon: ShoppingCart,
    glowColor: 'purple',
    neonColor: '#ff6600',
  },
  {
    title: 'Landing Pages',
    description:
      'Conversion-optimized pages with cinematic animations that turn visitors into customers',
    icon: Layout,
    glowColor: 'purple',
    neonColor: '#a855f7',
  },
  {
    title: 'UI/UX Design',
    description:
      'User-centered design systems that balance aesthetics with intuitive functionality',
    icon: Palette,
    glowColor: 'cyan',
    neonColor: '#00f0ff',
  },
  {
    title: 'SEO Optimization',
    description:
      'Technical SEO and content strategy to dominate search rankings and drive organic growth',
    icon: Search,
    glowColor: 'green',
    neonColor: '#39ff14',
  },
  {
    title: 'AI Chatbot Integration',
    description:
      'Intelligent AI assistants that engage visitors, answer questions, and capture leads 24/7',
    icon: Bot,
    glowColor: 'purple',
    neonColor: '#a855f7',
  },
  {
    title: 'Branding',
    description:
      'Complete brand identity systems from logo design to comprehensive visual guidelines',
    icon: Crown,
    glowColor: 'purple',
    neonColor: '#ff6600',
  },
];

const iconGlowMap: Record<string, string> = {
  '#39ff14':
    'drop-shadow(0 0 8px rgba(57, 255, 20, 0.6)) drop-shadow(0 0 20px rgba(57, 255, 20, 0.3))',
  '#00f0ff':
    'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 20px rgba(0, 240, 255, 0.3))',
  '#a855f7':
    'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))',
  '#ff6600':
    'drop-shadow(0 0 8px rgba(255, 102, 0, 0.6)) drop-shadow(0 0 20px rgba(255, 102, 0, 0.3))',
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #050510 0%, #0a0a1a 50%, #050510 100%)',
      }}
    >
      {/* Subtle background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0, 240, 255, 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-neon-cyan uppercase tracking-widest text-sm font-medium mb-4 text-glow-cyan">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            What We{' '}
            <span className="gradient-text">Build</span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            End-to-end digital solutions crafted with precision and innovation
          </p>
        </ScrollReveal>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="h-full"
                >
                  <GlowCard
                    glowColor={service.glowColor}
                    className="h-full p-6 sm:p-8"
                  >
                    <div className="flex flex-col items-start gap-4">
                      {/* Icon with neon glow */}
                      <div
                        className="flex items-center justify-center w-14 h-14 rounded-xl"
                        style={{
                          backgroundColor: `${service.neonColor}10`,
                          border: `1px solid ${service.neonColor}20`,
                        }}
                      >
                        <Icon
                          size={28}
                          style={{
                            color: service.neonColor,
                            filter: iconGlowMap[service.neonColor],
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
