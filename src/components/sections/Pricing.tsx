'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GlowCard from '@/components/effects/GlowCard';
import CheckoutModal from '@/components/sections/CheckoutModal';

type GlowColorType = 'green' | 'cyan' | 'purple';

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  price: string;
  priceAmount: number;
  priceSubtext?: string;
  features: PricingFeature[];
  badge?: string;
  badgeColor?: string;
  glowColor: GlowColorType;
  neonAccent: string;
  buttonStyle: 'outline' | 'filled' | 'special';
  isPopular?: boolean;
  isPremium?: boolean;
  isEnterprise?: boolean;
  scaleUp?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Simple Landing Page',
    price: '₹9,999',
    priceAmount: 9999,
    features: [
      { text: '1-page modern landing page' },
      { text: 'Clean premium UI' },
      { text: 'Smooth animations' },
      { text: 'Mobile responsive' },
      { text: 'WhatsApp integration' },
      { text: 'Basic SEO' },
      { text: 'Fast loading optimization' },
    ],
    glowColor: 'green',
    neonAccent: '#39ff14',
    buttonStyle: 'outline',
  },
  {
    name: 'Starter 3D Business Website',
    price: '₹24,999',
    priceAmount: 24999,
    badge: 'POPULAR',
    badgeColor: '#39ff14',
    features: [
      { text: 'Up to 5 pages' },
      { text: 'Cinematic 3D sections' },
      { text: 'Advanced animations' },
      { text: 'Interactive hover effects' },
      { text: 'Forms + WhatsApp integration' },
      { text: 'SEO optimized' },
      { text: 'Premium responsive design' },
      { text: 'Fast performance optimization' },
    ],
    glowColor: 'cyan',
    neonAccent: '#00f0ff',
    buttonStyle: 'filled',
    isPopular: true,
    scaleUp: true,
  },
  {
    name: 'Growth 3D Experience Website',
    price: '₹49,999',
    priceAmount: 49999,
    features: [
      { text: 'Advanced 3D animations' },
      { text: 'Interactive Three.js experiences' },
      { text: 'Motion effects' },
      { text: 'AI chatbot integration' },
      { text: 'Custom UI/UX' },
      { text: 'Speed optimized' },
      { text: 'Premium cinematic transitions' },
      { text: 'Business systems integration' },
    ],
    glowColor: 'purple',
    neonAccent: '#a855f7',
    buttonStyle: 'outline',
  },
  {
    name: 'Premium 3D Brand Experience',
    price: '₹89,999',
    priceAmount: 89999,
    badge: 'PREMIUM',
    badgeColor: '#ff6600',
    features: [
      { text: 'Full cinematic 3D website' },
      { text: 'Complex Three.js playground' },
      { text: 'Ultra premium animations' },
      { text: 'Ecommerce support' },
      { text: 'AI automation' },
      { text: 'Custom backend systems' },
      { text: 'Advanced SEO' },
      { text: 'High-end brand visuals' },
      { text: 'Priority support' },
    ],
    glowColor: 'purple',
    neonAccent: '#ff6600',
    buttonStyle: 'filled',
    isPremium: true,
  },
  {
    name: 'Custom Enterprise 3D Solution',
    price: 'DM For Custom Quote',
    priceAmount: 0,
    priceSubtext: 'No fixed pricing',
    badge: 'ENTERPRISE',
    badgeColor: '#39ff14',
    features: [
      { text: 'Enterprise-grade custom solutions' },
      { text: 'AI systems' },
      { text: 'Dashboards' },
      { text: 'Large-scale business websites' },
      { text: 'Advanced automation' },
      { text: 'Dedicated support' },
      { text: 'Custom integrations' },
      { text: 'Scalable architecture' },
    ],
    glowColor: 'green',
    neonAccent: '#39ff14',
    buttonStyle: 'special',
    isEnterprise: true,
  },
];

const checkColorMap: Record<string, string> = {
  '#39ff14': 'text-neon-green',
  '#00f0ff': 'text-neon-cyan',
  '#a855f7': 'text-neon-purple',
  '#ff6600': 'text-neon-orange',
};

function PricingCard({
  plan,
  index,
  onGetStarted,
}: {
  plan: PricingPlan;
  index: number;
  onGetStarted: (plan: PricingPlan) => void;
}) {
  return (
    <ScrollReveal delay={index * 0.1} className="flex">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative w-full ${plan.scaleUp ? 'sm:-mt-4' : ''}`}
      >
        {/* Animated gradient border for enterprise card */}
        {plan.isEnterprise && (
          <div
            className="absolute -inset-[1px] rounded-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, #39ff14, #00f0ff, #a855f7, #ff6600, #39ff14)',
              backgroundSize: '300% 300%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          />
        )}

        <GlowCard
          glowColor={plan.glowColor}
          className={`relative h-full p-6 sm:p-8 ${
            plan.isEnterprise ? 'z-10' : ''
          } ${plan.scaleUp ? 'sm:pb-10' : ''}`}
        >
          {/* Badge */}
          {plan.badge && (
            <motion.div
              className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${plan.badgeColor}15`,
                border: `1px solid ${plan.badgeColor}30`,
                color: plan.badgeColor,
                boxShadow:
                  plan.isEnterprise
                    ? `0 0 15px ${plan.badgeColor}30, 0 0 30px ${plan.badgeColor}15`
                    : 'none',
              }}
              animate={
                plan.isEnterprise
                  ? {
                      boxShadow: [
                        `0 0 15px ${plan.badgeColor}30, 0 0 30px ${plan.badgeColor}15`,
                        `0 0 25px ${plan.badgeColor}50, 0 0 50px ${plan.badgeColor}25`,
                        `0 0 15px ${plan.badgeColor}30, 0 0 30px ${plan.badgeColor}15`,
                      ],
                    }
                  : undefined
              }
              transition={
                plan.isEnterprise
                  ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  : undefined
              }
            >
              {plan.isEnterprise && (
                <Sparkles size={12} style={{ color: plan.badgeColor }} />
              )}
              {plan.badge}
            </motion.div>
          )}

          {/* Plan Name */}
          <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 leading-tight">
            {plan.name}
          </h3>

          {/* Price */}
          <div className="mb-6">
            <span
              className="text-3xl sm:text-4xl font-extrabold"
              style={{
                color: plan.neonAccent,
                textShadow: `0 0 20px ${plan.neonAccent}40, 0 0 40px ${plan.neonAccent}20`,
              }}
            >
              {plan.price}
            </span>
            {plan.priceSubtext && (
              <p className="text-muted-foreground text-sm mt-1">
                {plan.priceSubtext}
              </p>
            )}
          </div>

          {/* Divider */}
          <div
            className="h-px mb-6"
            style={{
              background: `linear-gradient(90deg, transparent, ${plan.neonAccent}30, transparent)`,
            }}
          />

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-3">
                <Check
                  size={18}
                  className={`mt-0.5 shrink-0 ${
                    checkColorMap[plan.neonAccent] || 'text-neon-green'
                  }`}
                />
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.button
            onClick={() => onGetStarted(plan)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`block w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
              plan.buttonStyle === 'filled'
                ? 'text-deep-black'
                : plan.buttonStyle === 'special'
                  ? 'text-white'
                : 'text-white'
            }`}
            style={
              plan.buttonStyle === 'filled'
                ? {
                    backgroundColor: '#39ff14',
                    boxShadow:
                      '0 0 20px rgba(57, 255, 20, 0.3), 0 0 40px rgba(57, 255, 20, 0.1)',
                  }
                : plan.buttonStyle === 'special'
                  ? {
                      background:
                        'linear-gradient(135deg, #39ff14, #00f0ff)',
                      boxShadow:
                        '0 0 20px rgba(57, 255, 20, 0.2), 0 0 40px rgba(0, 240, 255, 0.1)',
                    }
                : {
                    backgroundColor: 'transparent',
                    border: `1px solid ${plan.neonAccent}40`,
                    boxShadow: `0 0 15px ${plan.neonAccent}10`,
                  }
            }
          >
            {plan.isEnterprise ? 'Contact Us' : 'Get Started'}
          </motion.button>
        </GlowCard>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Pricing() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(plans[0]);

  const handleGetStarted = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  };

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #050510 0%, #0a0a1a 30%, #0f0a1a 60%, #050510 100%)',
      }}
    >
      {/* Subtle animated gradient orbs */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle, rgba(57, 255, 20, 0.15) 0%, transparent 70%)',
          animation: 'aurora 12s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          animation: 'aurora 12s ease-in-out infinite 4s',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-neon-green uppercase tracking-widest text-sm font-medium mb-4 text-glow-green">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Invest in Your{' '}
            <span className="gradient-text">Digital Future</span>
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Transparent pricing, no hidden costs. Choose the package that fits
            your vision.
          </p>
        </ScrollReveal>

        {/* Pricing Cards - First 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 items-start">
          {plans.slice(0, 3).map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} onGetStarted={handleGetStarted} />
          ))}
        </div>

        {/* Pricing Cards - Last 2 centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto items-start">
          {plans.slice(3).map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index + 3} onGetStarted={handleGetStarted} />
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        packageName={selectedPlan.name}
        packagePrice={selectedPlan.price}
        packagePriceAmount={selectedPlan.priceAmount}
        packageFeatures={selectedPlan.features.map((f) => f.text)}
        packageType="website"
      />
    </section>
  );
}
