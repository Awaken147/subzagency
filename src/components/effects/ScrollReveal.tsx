'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  stagger = false,
  staggerDelay = 0.1,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const offset = directionOffset[direction];

  if (stagger) {
    const childArray = Array.isArray(children) ? children : [children];
    return (
      <div ref={ref} className={className}>
        {childArray.map((child, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: offset.x, y: offset.y }}
            animate={
              isInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: offset.x, y: offset.y }
            }
            transition={{
              duration: 0.6,
              delay: delay + index * staggerDelay,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
