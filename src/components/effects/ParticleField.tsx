'use client';

import { useMemo, type CSSProperties } from 'react';

interface ParticleFieldProps {
  className?: string;
  count?: number;
}

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
  tx: string;
  ty: string;
}

const COLORS = ['#39ff14', '#00f0ff', '#39ff14', '#00f0ff', '#a855f7'];

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const tx = (Math.random() - 0.5) * 200;
    const ty = -(100 + Math.random() * 300);
    particles.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.5,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      tx: `${tx}px`,
      ty: `${ty}px`,
    });
  }
  return particles;
}

export default function ParticleField({
  className = '',
  count = 30,
}: ParticleFieldProps) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={
            {
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: 0,
              '--tx': p.tx,
              '--ty': p.ty,
              animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}40`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
