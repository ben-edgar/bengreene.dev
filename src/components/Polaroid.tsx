import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { getAssetPath } from '@/lib/basePath';

interface PolaroidProps {
  src: string;
  caption: string;
  href: string;
  /** Resting angle, in degrees. */
  tilt: number;
  tone?: 'dadtrack' | 'momtrack';
  /** Delay before the landing animation, in milliseconds. */
  landingDelayMs?: number;
  sizes: string;
  className?: string;
}

/** A taped snapshot, the way the apps show a kept memory. Links to what it pictures. */
export function Polaroid({
  src,
  caption,
  href,
  tilt,
  tone = 'dadtrack',
  landingDelayMs = 0,
  sizes,
  className = '',
}: PolaroidProps) {
  const style = {
    '--tilt': `${tilt}deg`,
    animationDelay: `${landingDelayMs}ms`,
  } as CSSProperties;

  return (
    <Link
      href={href}
      style={style}
      data-tone={tone === 'momtrack' ? tone : undefined}
      className={`polaroid polaroid-landing block bg-paper-raised p-[5%] pb-0 text-ink shadow-[0_26px_44px_-18px_rgba(0,0,0,0.7)] ${className}`}
    >
      <span aria-hidden="true" className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
      <span className="relative block aspect-square overflow-hidden">
        <Image src={getAssetPath(src)} alt="" fill priority sizes={sizes} className="object-cover" />
      </span>
      <span className="block py-[6%] text-center font-hand text-[clamp(1.5rem,3.2vw,2.5rem)] leading-none">
        {caption}
      </span>
    </Link>
  );
}
