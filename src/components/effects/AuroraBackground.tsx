'use client';

import { useMemo, type CSSProperties } from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

export default function AuroraBackground({
  className = '',
}: AuroraBackgroundProps) {
  const blobs = useMemo(
    () => [
      {
        id: 1,
        color: 'rgba(57, 255, 20, 0.08)',
        size: '60vmax',
        top: '-10%',
        left: '-10%',
        animationDuration: '25s',
        animationDelay: '0s',
      },
      {
        id: 2,
        color: 'rgba(0, 240, 255, 0.06)',
        size: '50vmax',
        top: '20%',
        left: '30%',
        animationDuration: '30s',
        animationDelay: '-5s',
      },
      {
        id: 3,
        color: 'rgba(168, 85, 247, 0.06)',
        size: '55vmax',
        top: '50%',
        left: '-5%',
        animationDuration: '28s',
        animationDelay: '-10s',
      },
      {
        id: 4,
        color: 'rgba(57, 255, 20, 0.05)',
        size: '45vmax',
        top: '60%',
        left: '40%',
        animationDuration: '32s',
        animationDelay: '-15s',
      },
    ],
    []
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {blobs.map((blob) => (
        <div
          key={blob.id}
          style={
            {
              position: 'absolute',
              top: blob.top,
              left: blob.left,
              width: blob.size,
              height: blob.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
              filter: 'blur(60px)',
              animation: `aurora ${blob.animationDuration} ease-in-out ${blob.animationDelay} infinite`,
              willChange: 'transform, opacity',
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
