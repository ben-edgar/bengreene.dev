import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import InviteLayout, { metadata } from './layout';
import InvitePage from './page';
import { InviteFallbackPage } from '@/components/invite/InviteFallbackPage';

const searchParamsState = {
  familyId: 'fam_secret_123',
  inviteToken: 'token_secret_456',
  senderName: 'Ben',
};

const platformState = {
  platform: 'android' as const,
};

vi.mock('@/components/Header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (name: string) => searchParamsState[name as keyof typeof searchParamsState] ?? null,
  }),
}));

vi.mock('@/lib/storeLinks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/storeLinks')>(
    '@/lib/storeLinks',
  );

  return {
    ...actual,
    useDetectedStorePlatform: () => platformState.platform,
  };
});

describe('Invite route', () => {
  beforeEach(() => {
    searchParamsState.familyId = 'fam_secret_123';
    searchParamsState.inviteToken = 'token_secret_456';
    searchParamsState.senderName = 'Ben';
    platformState.platform = 'android';
  });

  it('exports noindex metadata with the invite canonical URL', () => {
    expect(metadata.title).toBe('Family Invite – DadTrack');
    expect(metadata.description).toBe(
      'Install DadTrack to continue a family invite from DadTrack or MomTrack.',
    );
    expect(metadata.alternates?.canonical).toBe('/invite');
    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
    });

    const layoutMarkup = renderToStaticMarkup(
      <InviteLayout>
        <div>child</div>
      </InviteLayout>,
    );

    expect(layoutMarkup).toContain('child');
  });

  it('renders the invite shell fallback while the client page resolves', () => {
    const markup = renderToStaticMarkup(<InvitePage />);

    expect(markup).toContain('Header');
    expect(markup).toContain('min-h-screen');
    expect(markup).toContain('bg-slate-950');
    expect(markup).toContain('Family Invite');
    expect(markup).toContain('What to do next');
  });

  it('renders a ready invite state without exposing the raw invite params', () => {
    const markup = renderToStaticMarkup(<InviteFallbackPage />);

    expect(markup).toContain('Ben invited you to join a family group');
    expect(markup).toContain('Get it on Google Play');
    expect(markup).toContain('Download on the App Store');
    expect(markup).toContain(
      'After installing DadTrack, reopen the original invite link from the message or email where it was shared to continue inside the app.',
    );
    expect(markup).not.toContain('fam_secret_123');
    expect(markup).not.toContain('token_secret_456');
  });

  it('renders the invalid state when required invite params are missing', () => {
    searchParamsState.familyId = '';
    searchParamsState.inviteToken = '';
    searchParamsState.senderName = '';
    platformState.platform = 'other';

    const markup = renderToStaticMarkup(<InviteFallbackPage />);

    expect(markup).toContain('This invite link looks incomplete');
    expect(markup).toContain('Download on the App Store');
    expect(markup).toContain(
      'The invite may have been copied without all of its details. Install DadTrack, then go back to the original message and open the full invite link again.',
    );
    expect(markup).not.toContain('familyId');
    expect(markup).not.toContain('inviteToken');
  });
});
