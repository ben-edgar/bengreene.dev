import { Button } from '@/components/Button';
import { Apple, GooglePlay } from '@/components/icons/BrandIcons';
import { CONFETTI_NAVIGATION_DELAY_MS, fireConfetti } from '@/lib/confetti';
import type { StoreCta } from '@/lib/storeCtas';

interface StoreButtonProps {
  cta: Pick<StoreCta, 'badgeLead' | 'badgeName' | 'buttonLabel' | 'href' | 'key'>;
  variant?: 'primary' | 'secondary';
  tone?: 'dadtrack' | 'momtrack';
  surface?: 'cloth' | 'paper';
  /** Celebrates the click. Leave off where a store link is not a download moment. */
  confetti?: boolean;
}

/** A store link laid out like a store badge, so a pair of them sits on one line. */
export function StoreButton({
  cta,
  variant = 'primary',
  tone = 'dadtrack',
  surface = 'cloth',
  confetti = true,
}: StoreButtonProps) {
  const Logo = cta.key === 'ios' ? Apple : GooglePlay;

  return (
    <Button
      href={cta.href}
      variant={variant}
      tone={tone}
      surface={surface}
      size="badge"
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel={cta.buttonLabel}
      externalNavigationDelayMs={confetti ? CONFETTI_NAVIGATION_DELAY_MS : undefined}
      onClick={confetti ? () => fireConfetti(tone) : undefined}
      className="flex-1 sm:flex-none"
    >
      <Logo className="h-[22px] w-[22px] shrink-0 sm:h-6 sm:w-6" />
      <span className="whitespace-nowrap text-left leading-tight">
        <span className="block text-[11px] font-normal opacity-80">{cta.badgeLead}</span>
        <span className="block text-base font-semibold sm:text-[17px]">{cta.badgeName}</span>
      </span>
    </Button>
  );
}
