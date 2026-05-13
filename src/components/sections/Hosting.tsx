'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Check,
  Zap,
  Crown,
  Server,
  BarChart3,
  Lock,
  Headphones,
  RefreshCw,
  FileText,
  Search,
  Phone,
  Palette,
  Plus,
} from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GlowCard from '@/components/effects/GlowCard';
import MagneticButton from '@/components/effects/MagneticButton';

interface HostingPlan {
  name: string;
  price: string;
  period: string;
  icon: React.ElementType;
  glowColor: 'green' | 'cyan' | 'purple';
  features: { icon: React.ElementType; text: string }[];
  highlight?: boolean;
}

const plans: HostingPlan[] = [
  {
    name: 'Basic Care',
    price: '₹499',
    period: '/month',
    icon: Shield,
    glowColor: 'green',
    features: [
      { icon: Lock, text: 'SSL certificate' },
      { icon: Server, text: 'Daily backups' },
      { icon: BarChart3, text: 'Uptime monitoring' },
      { icon: FileText, text: 'Monthly reports' },
      { icon: Headphones, text: 'Email support' },
    ],
  },
  {
    name: 'Growth Care',
    price: '₹999',
    period: '/month',
    icon: Zap,
    glowColor: 'cyan',
    highlight: true,
    features: [
      { icon: Check, text: 'Everything in Basic' },
      { icon: RefreshCw, text: 'Weekly content updates' },
      { icon: Zap, text: 'Performance optimization' },
      { icon: Shield, text: 'Security scanning' },
      { icon: Headphones, text: 'Priority support' },
      { icon: BarChart3, text: 'Monthly analytics review' },
    ],
  },
  {
    name: 'Premium Care',
    price: '₹1,999',
    period: '/month',
    icon: Crown,
    glowColor: 'purple',
    features: [
      { icon: Check, text: 'Everything in Growth' },
      { icon: RefreshCw, text: 'Unlimited content updates' },
      { icon: Search, text: 'Advanced SEO monitoring' },
      { icon: Headphones, text: '24/7 priority support' },
      { icon: Phone, text: 'Monthly strategy call' },
      { icon: Palette, text: 'Design refreshes' },
      { icon: Plus, text: 'Feature additions' },
    ],
  },
];

export default function Hosting() {
  return (
    <section id="hosting" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-neon-purple" style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)' }}>
            Hosting &amp; Maintenance
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Keep Your Website Running{' '}
            <span className="gradient-text">Perfectly</span>
          </h2>
        </ScrollReveal>

        {/* Hosting Cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <ScrollReveal key={plan.name} delay={index * 0.15}>
                <GlowCard
                  className="relative h-full p-6 sm:p-8"
                  glowColor={plan.glowColor}
                >
                  {/* Popular Badge */}
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-neon-cyan px-3 py-1 text-xs font-bold text-deep-black" style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }}>
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon & Name */}
                  <div className="mb-4 text-center">
                    <div
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14"
                      style={{
                        background:
                          plan.glowColor === 'green'
                            ? 'rgba(57, 255, 20, 0.1)'
                            : plan.glowColor === 'cyan'
                              ? 'rgba(0, 240, 255, 0.1)'
                              : 'rgba(168, 85, 247, 0.1)',
                      }}
                    >
                      <Icon
                        className={`h-6 w-6 sm:h-7 sm:w-7 ${
                          plan.glowColor === 'green'
                            ? 'text-neon-green'
                            : plan.glowColor === 'cyan'
                              ? 'text-neon-cyan'
                              : 'text-neon-purple'
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground sm:text-xl">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6 text-center">
                    <span
                      className={`text-3xl font-extrabold sm:text-4xl ${
                        plan.glowColor === 'green'
                          ? 'text-neon-green'
                          : plan.glowColor === 'cyan'
                            ? 'text-neon-cyan'
                            : 'text-neon-purple'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mb-6 space-y-3 sm:mb-8">
                    {plan.features.map((feature) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li
                          key={feature.text}
                          className="flex items-center gap-2.5"
                        >
                          <FeatureIcon
                            className={`h-4 w-4 shrink-0 ${
                              plan.glowColor === 'green'
                                ? 'text-neon-green/70'
                                : plan.glowColor === 'cyan'
                                  ? 'text-neon-cyan/70'
                                  : 'text-neon-purple/70'
                            }`}
                          />
                          <span className="text-sm text-muted-foreground">
                            {feature.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA Button */}
                  <MagneticButton
                    className={`group flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                      plan.glowColor === 'green'
                        ? 'border border-neon-green/20 bg-neon-green/5 text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]'
                        : plan.glowColor === 'cyan'
                          ? 'border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                          : 'border border-neon-purple/20 bg-neon-purple/5 text-neon-purple hover:bg-neon-purple/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                    }`}
                    onClick={() => {
                      window.open(
                        'https://wa.me/916297097642',
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }}
                  >
                    Choose Plan
                  </MagneticButton>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
