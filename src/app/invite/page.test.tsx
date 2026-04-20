import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import InviteLayout, { metadata } from './layout';

const pendingInvitePage = new Promise<never>(() => {});

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('@/components/invite/InviteFallbackPage', () => ({
  InviteFallbackPage() {
    throw pendingInvitePage;
  },
}));

import InvitePage from './page';

describe('Invite route contracts', () => {
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

  it('renders the route fallback skeleton when the invite client component suspends', () => {
    const markup = renderToStaticMarkup(<InvitePage />);

    expect(markup).toContain('Header');
    expect(markup).toContain('Family Invite');
    expect(markup).toContain('Open this invite in DadTrack');
    expect(markup).toContain(
      'Checking your invite details and the best download option for this device.',
    );
  });
});
