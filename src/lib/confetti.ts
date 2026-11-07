import confettiLib from 'canvas-confetti';

export type ConfettiTheme = 'dadtrack' | 'momtrack';

const DADTRACK_COLORS = ['#8fd6ca', '#f2c46b', '#5b8db8', '#f4efe6'];
const MOMTRACK_COLORS = ['#f5aea6', '#e8746e', '#f2c46b', '#f4efe6'];

export const CONFETTI_NAVIGATION_DELAY_MS = 700;

export function confettiColors(theme: ConfettiTheme): string[] {
  return theme === 'momtrack' ? MOMTRACK_COLORS : DADTRACK_COLORS;
}

export function fireConfetti(theme: ConfettiTheme = 'dadtrack'): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  confettiLib({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.65 },
    colors: confettiColors(theme),
    scalar: 0.95,
    ticks: 220,
  });
}
