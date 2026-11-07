import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  /** Re-colors the button for MomTrack when it sits on a spruce page. */
  tone?: 'dadtrack' | 'momtrack';
  /** What the button sits on: the cloth shell or a paper sheet. */
  surface?: 'cloth' | 'paper';
  size?: 'sm' | 'md' | 'lg' | 'badge';
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  externalNavigationDelayMs?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const BASE_STYLES =
  'inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50';

const VARIANT_STYLES = {
  cloth: {
    primary: 'bg-on-cloth text-cloth-deep hover:bg-white',
    secondary: 'border border-on-cloth/40 text-on-cloth hover:border-on-cloth hover:bg-on-cloth/10',
  },
  paper: {
    primary: 'bg-ink-accent text-paper-raised hover:bg-ink',
    secondary: 'border border-ink/30 text-ink hover:border-ink hover:bg-ink/5',
  },
};

const SIZE_STYLES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-base',
  badge: 'min-w-36 gap-2 px-3 py-2 sm:min-w-40 sm:gap-2.5 sm:px-4',
};

export function Button({
  children,
  variant = 'primary',
  tone = 'dadtrack',
  surface = 'cloth',
  size = 'md',
  fullWidth = false,
  mobileFullWidth = false,
  type = 'button',
  onClick,
  href,
  target,
  rel,
  externalNavigationDelayMs,
  disabled = false,
  ariaLabel,
  className = '',
}: ButtonProps) {
  const widthStyle = fullWidth ? 'w-full' : mobileFullWidth ? 'w-full sm:w-auto' : '';

  const combinedClassName = `${BASE_STYLES} ${VARIANT_STYLES[surface][variant]} ${SIZE_STYLES[size]} ${widthStyle} ${className}`;
  const dataTone = tone === 'momtrack' ? tone : undefined;
  const relWindowFeatures = rel
    ?.split(/\s+/)
    .filter((value) => value === 'noopener' || value === 'noreferrer')
    .join(',');

  const isModifiedClick = (event: MouseEvent<HTMLAnchorElement>) =>
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey;

  if (href) {
    // Check if it's an internal link (starts with /) or external link
    const isInternalLink = href.startsWith('/');

    if (isInternalLink) {
      // Use Next.js Link for internal navigation to respect basePath
      return (
        <Link
          href={href}
          aria-label={ariaLabel}
          data-tone={dataTone}
          className={combinedClassName}
        >
          {children}
        </Link>
      );
    }

    const handleExternalLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (
        externalNavigationDelayMs === undefined ||
        event.defaultPrevented ||
        isModifiedClick(event)
      ) {
        return;
      }

      event.preventDefault();

      window.setTimeout(() => {
        if (target === '_blank') {
          window.open(href, target, relWindowFeatures);
          return;
        }

        window.location.assign(href);
      }, externalNavigationDelayMs);
    };

    // Use regular anchor for external links
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={handleExternalLinkClick}
        aria-label={ariaLabel}
        data-tone={dataTone}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      data-tone={dataTone}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
