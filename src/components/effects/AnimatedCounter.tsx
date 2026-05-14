'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  prefix?: string;
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export default function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
  className = '',
  prefix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);
      const currentCount = Math.floor(easedProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
