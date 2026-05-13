'use client';

import { useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Star, Zap, Headphones } from 'lucide-react';
import AuroraBackground from '@/components/effects/AuroraBackground';
import ParticleField from '@/components/effects/ParticleField';
import MagneticButton from '@/components/effects/MagneticButton';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_WORDS = ['We', 'Build', 'Cinematic', '3D', 'Websites', 'That', 'Sell'];

const METRICS = [
  { label: 'Projects Delivered', value: 150, suffix: '+', icon: Zap },
  { label: 'Client Rating', value: 4.9, suffix: '★', icon: Star, decimals: true },
  { label: 'Smooth Animations', value: 60, suffix: 'fps', icon: Zap },
  { label: 'Support', value: 24, suffix: '/7', icon: Headphones },
] as const;

/* ------------------------------------------------------------------ */
/*  Stagger helpers                                                    */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] },
  },
});

const metricContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.2 } },
};

const metricCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Mouse Glow Sub-component                                           */
/* ------------------------------------------------------------------ */

function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(57,255,20,0.15) 0%, rgba(57,255,20,0.05) 30%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                     */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ---- Background layers ---- */}
      <div className="absolute inset-0 z-0">
        <AuroraBackground />
        <ParticleField />
        <div className="animated-grid absolute inset-0" />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,16,0.6) 70%, rgba(5,5,16,0.95) 100%)',
          }}
        />
      </div>

      {/* ---- Mouse-reactive glow ---- */}
      <MouseGlow />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Main heading */}
        <motion.h1
          className="mb-6 font-bold tracking-tight [font-family:var(--font-space-grotesk)]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {HEADING_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-[0.3em] ${
                word === 'Cinematic' || word === '3D' || word === 'Sell'
                  ? 'gradient-text'
                  : 'text-foreground'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          variants={fadeUp(0.8)}
          initial="hidden"
          animate="visible"
        >
          Transforming businesses with futuristic web experiences, immersive 3D
          animations, and AI-powered solutions that convert visitors into
          customers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mb-14 flex flex-wrap items-center justify-center gap-4"
          variants={fadeUp(1.0)}
          initial="hidden"
          animate="visible"
        >
          <MagneticButton
            className="group relative inline-flex items-center gap-2 rounded-xl bg-neon-green px-8 py-4 text-lg font-semibold text-deep-black transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">View Packages</span>
            <Zap className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          <MagneticButton
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-neon-cyan bg-transparent px-8 py-4 text-lg font-semibold text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            onClick={() => {
              const el = document.getElementById('playground');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Try Playground</span>
            <ChevronDown className="h-5 w-5 rotate-[-90deg] transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>

        {/* Floating Metrics */}
        <motion.div
          className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          variants={metricContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={metricCardVariants}
                className="glass flex flex-col items-center gap-2 rounded-2xl p-4"
                style={{ animation: `float 6s ease-in-out infinite` }}
              >
                <Icon className="h-5 w-5 text-neon-green" />
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    duration={2}
                  />
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {metric.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.button
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-neon-green"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
