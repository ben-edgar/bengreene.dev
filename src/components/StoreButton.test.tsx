import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const fireConfetti = vi.hoisted(() => vi.fn());

vi.mock('@/lib/confetti', async () => {
  const actual = await vi.importActual<typeof import('@/lib/confetti')>('@/lib/confetti');

  return { ...actual, fireConfetti };
});

import { CONFETTI_NAVIGATION_DELAY_MS } from '@/lib/confetti';
import { getTrackedStoreCtas } from '@/lib/storeCtas';
import { StoreButton } from './StoreButton';

const [iosCta, androidCta] = getTrackedStoreCtas('ios');

describe('StoreButton', () => {
  it('names the store in full for screen readers and on two lines on screen', () => {
    const markup = renderToStaticMarkup(<StoreButton cta={androidCta} />);

    expect(markup).toContain('aria-label="Get it on Google Play"');
    expect(markup).toContain('>Get it on<');
    expect(markup).toContain('>Google Play<');
  });

  it('opens the tracked store link in a new tab', () => {
    const markup = renderToStaticMarkup(<StoreButton cta={iosCta} />);

    expect(markup).toContain(`href="${iosCta.href.replaceAll('&', '&amp;')}"`);
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
  });

  it('draws the mark of the store it links to', () => {
    const appleMark = 'd="M12.152';
    const playMark = 'd="M22.018';

    expect(renderToStaticMarkup(<StoreButton cta={iosCta} />)).toContain(appleMark);
    expect(renderToStaticMarkup(<StoreButton cta={androidCta} />)).toContain(playMark);
  });

  it('holds the navigation for the confetti in the tone of the app', () => {
    fireConfetti.mockClear();
    const button = StoreButton({ cta: iosCta, tone: 'momtrack' });

    expect(button.props.externalNavigationDelayMs).toBe(CONFETTI_NAVIGATION_DELAY_MS);
    button.props.onClick();
    expect(fireConfetti).toHaveBeenCalledWith('momtrack');
  });

  it('navigates straight away when confetti is off', () => {
    const button = StoreButton({ cta: iosCta, confetti: false });

    expect(button.props.externalNavigationDelayMs).toBeUndefined();
    expect(button.props.onClick).toBeUndefined();
  });
});
