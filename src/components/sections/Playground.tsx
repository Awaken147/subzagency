'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Box, Waves, Circle, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import { Skeleton } from '@/components/ui/skeleton';

const PlaygroundScene = dynamic(() => import('@/components/three/PlaygroundScene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-deep-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-neon-green" />
        <p className="text-sm text-muted-foreground">Loading 3D Experience...</p>
      </div>
    </div>
  ),
});

const tabs = [
  { label: 'Particle Field', icon: Sparkles },
  { label: '3D Geometry', icon: Box },
  { label: 'Wave Motion', icon: Waves },
  { label: 'Orbit System', icon: Circle },
];

export default function Playground() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="playground" aria-labelledby="playground-heading" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-neon-cyan text-glow-cyan">
            Interactive Playground
          </span>
          <h2 id="playground-heading" className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Experience the{' '}
            <span className="gradient-text">Future</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Interact with our 3D demos. Move your mouse, click, drag, and explore.
          </p>
        </ScrollReveal>

        {/* Tab Switcher */}
        <ScrollReveal delay={0.2}>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-8">
            <div className="glass-strong flex flex-wrap items-center gap-1 rounded-xl p-1.5 sm:gap-2 sm:p-2" role="tablist" aria-label="Playground demos">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === index;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`playground-panel-${index}`}
                    id={`playground-tab-${index}`}
                    className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-300 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                      isActive
                        ? 'text-neon-green text-glow-green'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="playground-active-tab"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'rgba(57, 255, 20, 0.08)',
                          borderBottom: '2px solid #39ff14',
                          boxShadow: '0 2px 12px rgba(57, 255, 20, 0.2)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Canvas Area */}
        <ScrollReveal delay={0.3}>
          <div className="glass overflow-hidden rounded-2xl border border-white/5">
            <div className="relative min-h-[400px] sm:min-h-[500px]" aria-label={`Interactive 3D demo canvas showing ${tabs[activeTab].label}`} role="img">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  role="tabpanel"
                  id={`playground-panel-${activeTab}`}
                  aria-labelledby={`playground-tab-${activeTab}`}
                >
                  <Suspense
                    fallback={
                      <div className="flex h-full min-h-[400px] w-full items-center justify-center sm:min-h-[500px]">
                        <div className="flex flex-col items-center gap-4">
                          <Loader2 className="h-10 w-10 animate-spin text-neon-green" />
                          <p className="text-sm text-muted-foreground">
                            Loading 3D Experience...
                          </p>
                          <div className="flex gap-2">
                            <Skeleton className="h-2 w-20 rounded-full" />
                            <Skeleton className="h-2 w-16 rounded-full" />
                            <Skeleton className="h-2 w-24 rounded-full" />
                          </div>
                        </div>
                      </div>
                    }
                  >
                    <PlaygroundScene activeTab={activeTab} />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
                <span className="text-xs text-muted-foreground">Live 3D Render</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {tabs[activeTab].label} — Move mouse to interact
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
