import type { ReactNode } from 'react';
import Image from 'next/image';

interface PhoneFrameProps {
  /** Screenshot to render inside the frame. Omit when providing `children`. */
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Drop shadow under the device. Pass '' to turn it off. */
  shadowClassName?: string;
  /** Custom screen content (e.g. a stack of crossfading screenshots). */
  children?: ReactNode;
}

/**
 * Corner radius for an element that wraps a PhoneFrame edge to edge (a
 * focusable button, say), so its focus ring follows the device outline.
 * Horizontal / vertical percentages of the wrapper's own box.
 */
export const PHONE_OUTLINE_RADIUS = 'rounded-[16.5%_/_7.9%]';

const SIDE_BUTTON =
  'absolute w-[0.9cqw] bg-gradient-to-r from-[#3a3a3e] via-[#55555a] to-[#2b2b2f] shadow-[0_0_0_0.5px_rgba(0,0,0,0.6)]';

/**
 * An iPhone 16 Pro Max, drawn to the device's real proportions and sized by
 * its parent. Every measurement is in container-query units (cqw), so the
 * bezel, corners and buttons keep their proportions at any width.
 *
 * The screen is exactly 1320 x 2868, the device's native resolution, which
 * is how the app screenshots are captured. The screenshots already include
 * the status bar and Dynamic Island, so the frame draws neither: lining up
 * the real geometry is what keeps the baked-in island in the right place.
 */
export function PhoneFrame({
  src,
  alt = '',
  priority = false,
  sizes = '(min-width: 1024px) 340px, 78vw',
  className = '',
  shadowClassName = 'shadow-[0_28px_60px_-20px_rgba(0,0,0,0.6),0_10px_24px_-12px_rgba(0,0,0,0.45)]',
  children,
}: PhoneFrameProps) {
  return (
    <div className={`@container relative ${className}`}>
      {/* Left side: Action button, then volume up and down. */}
      <span aria-hidden="true" className={`${SIDE_BUTTON} -left-[0.6cqw] top-[18.5%] h-[5.2%] rounded-l-[0.6cqw]`} />
      <span aria-hidden="true" className={`${SIDE_BUTTON} -left-[0.6cqw] top-[26.5%] h-[8.4%] rounded-l-[0.6cqw]`} />
      <span aria-hidden="true" className={`${SIDE_BUTTON} -left-[0.6cqw] top-[37%] h-[8.4%] rounded-l-[0.6cqw]`} />
      {/* Right side: side button, then Camera Control (nearly flush). */}
      <span aria-hidden="true" className={`${SIDE_BUTTON} -right-[0.6cqw] top-[29%] h-[13%] rounded-r-[0.6cqw]`} />
      <span
        aria-hidden="true"
        className={`${SIDE_BUTTON} -right-[0.35cqw] top-[61%] h-[6.5%] rounded-r-[0.4cqw] opacity-80`}
      />

      {/* Titanium band */}
      <div
        className={`relative rounded-[16.5cqw] bg-[linear-gradient(150deg,#6a6a6f_0%,#2c2c30_22%,#1f1f22_55%,#3b3b40_82%,#5d5d62_100%)] p-[1.1cqw] ${shadowClassName}`}
      >
        {/* Specular edge where the band catches light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[16.5cqw] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.28),inset_0_1px_1px_rgba(255,255,255,0.18)]"
        />

        {/* Black border under the glass */}
        <div className="relative rounded-[15.4cqw] bg-black p-[2.3cqw] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.06)]">
          <div className="relative aspect-[1320/2868] w-full overflow-hidden rounded-[13.1cqw] bg-slate-900">
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
          </div>
        </div>
      </div>
    </div>
  );
}
