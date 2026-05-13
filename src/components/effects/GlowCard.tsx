'use client';

import {
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { motion } from 'framer-motion';

type GlowColor = 'green' | 'cyan' | 'purple';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: GlowColor;
}

const glowColorMap: Record<GlowColor, { base: string; hover: string; shadow: string }> = {
  green: {
    base: 'rgba(57, 255, 20, 0.1)',
    hover: 'rgba(57, 255, 20, 0.4)',
    shadow: 'rgba(57, 255, 20, 0.15)',
  },
  cyan: {
    base: 'rgba(0, 240, 255, 0.1)',
    hover: 'rgba(0, 240, 255, 0.4)',
    shadow: 'rgba(0, 240, 255, 0.15)',
  },
  purple: {
    base: 'rgba(168, 85, 247, 0.1)',
    hover: 'rgba(168, 85, 247, 0.4)',
    shadow: 'rgba(168, 85, 247, 0.15)',
  },
};

export default function GlowCard({
  children,
  className = '',
  glowColor = 'green',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const colors = glowColorMap[glowColor];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * -10 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 10 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`glass relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0.5, y: 0.5 });
      }}
      animate={{
        rotateX,
        rotateY,
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
      {/* Glow border effect that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={
          {
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${colors.hover} 0%, transparent 60%)`,
            border: `1px solid ${colors.base}`,
            boxShadow: `0 0 30px ${colors.shadow}, inset 0 0 30px ${colors.shadow}`,
          } as CSSProperties
        }
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
