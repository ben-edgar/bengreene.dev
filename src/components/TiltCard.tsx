'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = '', intensity = 15 }: TiltCardProps) {
  const [transform, setTransform] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const hasHoverSupport = useRef<boolean>(false);

  // Cache hover support check on mount
  useEffect(() => {
    hasHoverSupport.current = window.matchMedia('(hover: hover)').matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Early exit if no hover support or card ref
    if (!hasHoverSupport.current || !cardRef.current) return;

    // Throttle with requestAnimationFrame
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) {
        rafRef.current = undefined;
        return;
      }

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();

      // Calculate mouse position relative to card center (-1 to 1)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Calculate rotation angles
      const rotateX = -y * intensity;
      const rotateY = x * intensity;

      // Apply 3D transform
      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      );

      rafRef.current = undefined;
    });
  };

  const handleMouseLeave = () => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }

    // Smooth transition back to normal
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
