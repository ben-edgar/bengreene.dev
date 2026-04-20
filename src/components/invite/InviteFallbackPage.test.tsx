import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockSearchParams = vi.hoisted(() => ({
  current: new URLSearchParams({
    familyId: 'fam_secret_123',
    inviteToken: 'invite_secret_456',
    senderName: 'Ben',
  }),
}));

const mockPlatform = vi.hoisted(() => ({
  current: null as 'ios' | 'android' | 'other' | null,
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams.current,
}));

vi.mock('@/lib/storeLinks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/storeLinks')>(
    '@/lib/storeLinks',
  );

  return {
    ...actual,
    useDetectedStorePlatform: () => mockPlatform.current,
  };
});

import { InviteFallbackPage } from './InviteFallbackPage';

function renderPage() {
  return renderToStaticMarkup(<InviteFallbackPage />);
}

describe('InviteFallbackPage', () => {
  beforeEach(() => {
    mockSearchParams.current = new URLSearchParams({
      familyId: 'fam_secret_123',
      inviteToken: 'invite_secret_456',
      senderName: 'Ben',
    });
    mockPlatform.current = null;
  });

  it('does not render raw invite identifiers from the URL', () => {
    const markup = renderPage();

    expect(markup).not.toContain('fam_secret_123');
    expect(markup).not.toContain('invite_secret_456');
    expect(markup).toContain('Ben invited you to join a family group');
  });

  it('renders Google Play before the App Store once Android is detected', () => {
    mockPlatform.current = 'android';

    const markup = renderPage();

    expect(markup.indexOf('Get it on Google Play')).toBeGreaterThan(-1);
    expect(markup.indexOf('Download on the App Store')).toBeGreaterThan(-1);
    expect(markup.indexOf('Get it on Google Play')).toBeLessThan(
      markup.indexOf('Download on the App Store'),
    );
  });

  it('withholds clickable store CTAs until platform detection finishes', () => {
    const markup = renderPage();

    expect(markup).not.toContain('Get it on Google Play');
    expect(markup).not.toContain('Download on the App Store');
  });
});
