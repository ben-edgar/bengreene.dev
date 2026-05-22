import confettiLib from 'canvas-confetti';

type ConfettiTheme = 'dadtrack' | 'momtrack';

const DADTRACK_COLORS = ['#2dd4bf', '#60a5fa', '#a78bfa', '#ffffff'];
const MOMTRACK_COLORS = ['#e8746e', '#c4566a', '#9e2b3c', '#ffffff'];

export function fireConfetti(theme: ConfettiTheme = 'dadtrack'): void {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  confettiLib({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.65 },
    colors: theme === 'momtrack' ? MOMTRACK_COLORS : DADTRACK_COLORS,
    scalar: 0.95,
    ticks: 220,
  });
}
