'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown, Star, Zap, Headphones } from 'lucide-react';
import AuroraBackground from '@/components/effects/AuroraBackground';
import ParticleField from '@/components/effects/ParticleField';
import MagneticButton from '@/components/effects/MagneticButton';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const METRICS = [
  { label: 'Projects Delivered', value: 150, suffix: '+', icon: Zap },
  { label: 'Client Rating', value: 4.9, suffix: '★', icon: Star },
  { label: 'Smooth Animations', value: 60, suffix: 'fps', icon: Zap },
  { label: 'Support', value: 24, suffix: '/7', icon: Headphones },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const threeDVariants = {
  hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 },
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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } },
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
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
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
/*  3D Text Component                                                  */
/* ------------------------------------------------------------------ */

function ThreeDText() {
  const [isClient, setIsClient] = useState(false);

  // Use requestAnimationFrame to set client state after initial render
  // This avoids the "setState in effect" lint warning
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsClient(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!isClient) {
    return (
      <span
        className="inline-block mx-2 font-extrabold text-transparent"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
      >
        3D
      </span>
    );
  }

  return (
    <motion.span
      variants={threeDVariants}
      className="inline-block relative mx-1 sm:mx-2"
      style={{ perspective: '800px' }}
    >
      <motion.span
        className="inline-block font-extrabold relative"
        style={{
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #39ff14 0%, #00f0ff 40%, #a855f7 70%, #39ff14 100%)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-shift 3s ease infinite',
          filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.5)) drop-shadow(0 0 40px rgba(0,240,255,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: [0, 2, 0, -2, 0],
          rotateX: [0, -1, 0, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        3D
        {/* Glassmorphism overlay layer */}
        <span
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 60%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            lineHeight: 'inherit',
          }}
          aria-hidden="true"
        >
          3D
        </span>
      </motion.span>
      {/* Glow pulse behind 3D text */}
      <motion.span
        className="absolute inset-0 -z-10 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(57,255,20,0.3) 0%, rgba(0,240,255,0.15) 50%, transparent 70%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />
    </motion.span>
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
          className="mb-6 font-bold tracking-tight [font-family:var(--font-space-grotesk)] flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={wordVariants} className="inline-block text-foreground">
            We Build
          </motion.span>
          <motion.span
            variants={wordVariants}
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #0066ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Cinematic
          </motion.span>
          <ThreeDText />
          <motion.span variants={wordVariants} className="inline-block text-foreground"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.1)',
            }}
          >
            Websites That Sell
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          variants={fadeUp(1.0)}
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
          variants={fadeUp(1.2)}
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
        transition={{ delay: 2.5, duration: 0.8 }}
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
