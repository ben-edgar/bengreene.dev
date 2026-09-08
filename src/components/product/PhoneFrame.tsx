import type { ReactNode } from 'react';
import Image from 'next/image';

interface PhoneFrameProps {
  /** Screenshot to render inside the frame. Omit when providing `children`. */
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Custom screen content (e.g. a stack of crossfading screenshots). */
  children?: ReactNode;
}

/**
 * A portrait device frame sized by its parent. The screen keeps the exact
 * aspect ratio of the app screenshots (1080 x 2347) so nothing is letterboxed.
 */
export function PhoneFrame({
  src,
  alt = '',
  priority = false,
  sizes = '(min-width: 1024px) 340px, 78vw',
  className = '',
  children,
}: PhoneFrameProps) {
  return (
    <div
      className={`relative rounded-[2.4rem] bg-slate-950 p-2 ring-1 ring-white/15 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ${className}`}
    >
      <div className="relative aspect-[1080/2347] w-full overflow-hidden rounded-[2rem] bg-slate-900">
        {children}
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        ) : null}
        <div className="pointer-events-none absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
