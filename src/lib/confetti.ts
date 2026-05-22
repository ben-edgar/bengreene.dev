type ConfettiTheme = 'dadtrack' | 'momtrack';

const DADTRACK_COLORS = ['#2dd4bf', '#60a5fa', '#a78bfa', '#ffffff'];
const MOMTRACK_COLORS = ['#e8746e', '#c4566a', '#9e2b3c', '#ffffff'];

export async function fireConfetti(theme: ConfettiTheme = 'dadtrack'): Promise<void> {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const confetti = (await import('canvas-confetti')).default;
  const colors = theme === 'momtrack' ? MOMTRACK_COLORS : DADTRACK_COLORS;

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7 },
    colors,
    scalar: 0.9,
    ticks: 200,
  });
}
