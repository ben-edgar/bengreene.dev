'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 0 = no movement, 1 = normal scroll, < 1 = slower, > 1 = faster
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet devices on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Transform scroll progress into vertical movement
  // Negative values move up as you scroll down (parallax effect)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${(1 - speed) * 100}%`]);

  // Disable parallax on mobile for performance
  if (isMobile) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Background parallax - for decorative elements that move slower
export function ParallaxBackground({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Parallax speed={0.3} className={className}>{children}</Parallax>;
}

// Content parallax - for hero text that moves slightly slower than scroll
export function ParallaxContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Parallax speed={0.7} className={className}>{children}</Parallax>;
}
