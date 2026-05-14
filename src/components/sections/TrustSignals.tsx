'use client';

import {
  Shield,
  MessageCircle,
  Lock,
  Users,
  MapPin,
  Award,
} from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GlowCard from '@/components/effects/GlowCard';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type GlowColor = 'green' | 'cyan' | 'purple';

interface TrustSignal {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  glowColor: GlowColor;
  neonHex: string;
}

const SIGNALS: TrustSignal[] = [
  {
    icon: Shield,
    title: 'Verified Business in Gangtok, Sikkim',
    subtitle: 'Registered & operational since 2024',
    glowColor: 'green',
    neonHex: '#39ff14',
  },
  {
    icon: MessageCircle,
    title: 'We respond within 2 hours',
    subtitle: 'WhatsApp, Email & Instagram',
    glowColor: 'cyan',
    neonHex: '#00f0ff',
  },
  {
    icon: Lock,
    title: 'UPI & Bank Transfer',
    subtitle: 'Transparent pricing, no hidden fees',
    glowColor: 'purple',
    neonHex: '#a855f7',
  },
  {
    icon: Users,
    title: 'Trusted across India',
    subtitle: '4.9\u2605 average rating',
    glowColor: 'green',
    neonHex: '#39ff14',
  },
  {
    icon: MapPin,
    title: 'Gangtok, Sikkim, India',
    subtitle: 'Available for in-person consultations',
    glowColor: 'cyan',
    neonHex: '#00f0ff',
  },
  {
    icon: Award,
    title: 'Cinematic 3D websites',
    subtitle: 'Built with Next.js & Three.js',
    glowColor: 'purple',
    neonHex: '#a855f7',
  },
];

/* Icon glow filter map — matches the Services component pattern */
const iconGlowMap: Record<string, string> = {
  '#39ff14':
    'drop-shadow(0 0 8px rgba(57, 255, 20, 0.6)) drop-shadow(0 0 20px rgba(57, 255, 20, 0.3))',
  '#00f0ff':
    'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 20px rgba(0, 240, 255, 0.3))',
  '#a855f7':
    'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))',
};

/* ------------------------------------------------------------------ */
/*  TrustSignals Component                                             */
/* ------------------------------------------------------------------ */

export default function TrustSignals() {
  return (
    <section
      id="trust-signals"
      aria-labelledby="trust-signals-heading"
      className="relative py-24 sm:py-32"
      itemScope
      itemType="https://schema.org/Organization"
      style={{
        background:
          'linear-gradient(180deg, #050510 0%, #0a0a1a 30%, #0f0a1a 60%, #050510 100%)',
      }}
    >
      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(0, 240, 255, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ---- Section header ---- */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan text-glow-cyan">
              Why Trust SubzAgency
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              id="trust-signals-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl [font-family:var(--font-space-grotesk)]"
            >
              Built on Trust &amp;{' '}
              <span className="gradient-text">Transparency</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              We believe great work starts with honesty. Here&apos;s how we
              earn and keep your confidence at every step.
            </p>
          </ScrollReveal>
        </div>

        {/* ---- Trust signal cards ---- */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {SIGNALS.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <ScrollReveal key={signal.title} delay={i * 0.08}>
                <GlowCard
                  glowColor={signal.glowColor}
                  className="p-5 sm:p-6 h-full"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    {/* Icon circle */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: `${signal.neonHex}15`,
                        border: `1px solid ${signal.neonHex}30`,
                      }}
                    >
                      <Icon
                        size={22}
                        aria-hidden="true"
                        style={{
                          color: signal.neonHex,
                          filter: iconGlowMap[signal.neonHex],
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-sm font-bold leading-snug text-foreground sm:text-base"
                      itemProp="description"
                    >
                      {signal.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {signal.subtitle}
                    </p>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ---- Hidden structured data ---- */}
        <meta itemProp="name" content="SubzAgency" />
        <meta itemProp="url" content="https://subzagency.com" />
        <meta itemProp="address" content="Gangtok, Sikkim, India" />
        <meta itemProp="foundingDate" content="2024" />
        <meta itemProp="aggregateRating" content="4.9" />
      </div>
    </section>
  );
}
