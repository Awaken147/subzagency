'use client';

import {
  Crosshair,
  Zap,
  Sparkles,
  Smartphone,
  Palette,
  Search,
} from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GlowCard from '@/components/effects/GlowCard';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: 'Projects Completed', target: 150, suffix: '+', glowColor: 'green' as const },
  { label: 'Happy Clients', target: 50, suffix: '+', glowColor: 'cyan' as const },
  { label: 'Rating', target: 4.9, suffix: '★', glowColor: 'purple' as const },
  { label: 'Uptime', target: 99.9, suffix: '%', glowColor: 'green' as const },
];

const FEATURES = [
  {
    icon: Crosshair,
    title: 'Pixel Perfect',
    description: 'Every detail crafted to perfection',
    glowColor: 'green' as const,
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for blazing performance',
    glowColor: 'cyan' as const,
  },
  {
    icon: Sparkles,
    title: 'Creative Innovation',
    description: 'Pushing boundaries of web design',
    glowColor: 'purple' as const,
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect on every screen size',
    glowColor: 'green' as const,
  },
  {
    icon: Palette,
    title: 'Premium UI',
    description: 'World-class user interfaces',
    glowColor: 'cyan' as const,
  },
  {
    icon: Search,
    title: 'SEO Focused',
    description: 'Built to rank and convert',
    glowColor: 'purple' as const,
  },
];

/* ------------------------------------------------------------------ */
/*  About Component                                                    */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
      style={{
        background:
          'linear-gradient(180deg, #050510 0%, #0a0a1a 40%, #0f0a1a 70%, #050510 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---- Section header ---- */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-neon-green">
              About SubzAgency
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl [font-family:var(--font-space-grotesk)]"
            >
              Where Innovation Meets{' '}
              <span className="gradient-text">Execution</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* ---- Animated counters ---- */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <GlowCard glowColor={stat.glowColor} className="p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>

        {/* ---- Feature cards ---- */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <GlowCard glowColor={feature.glowColor} className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/10">
                    <Icon className="h-6 w-6 text-neon-green" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ---- Timeline / Story ---- */}
        <ScrollReveal delay={0.1}>
          <div className="glass-strong mx-auto max-w-3xl rounded-2xl p-8 text-center sm:p-10">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Based in the heart of{' '}
              <span className="text-neon-green text-glow-green font-semibold">
                Gangtok, Sikkim
              </span>
              , SubzAgency is a premium web development studio specializing in{' '}
              <span className="text-neon-cyan text-glow-cyan font-semibold">
                cinematic 3D websites
              </span>
              , immersive digital experiences, and{' '}
              <span className="text-neon-purple font-semibold" style={{ textShadow: '0 0 10px rgba(168,85,247,0.5), 0 0 20px rgba(168,85,247,0.3)' }}>
                AI-powered solutions
              </span>
              . We don&apos;t just build websites — we craft digital experiences
              that captivate, convert, and leave lasting impressions.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
