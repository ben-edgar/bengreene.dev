import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

const pendingFeedbackContent = new Promise<never>(() => {});

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('./FeedbackContent', () => ({
  default() {
    throw pendingFeedbackContent;
  },
}));

import FeedbackPage from './page';

describe('Feedback route shell', () => {
  it('renders the static Suspense fallback when the feedback client component suspends', () => {
    const markup = renderToStaticMarkup(<FeedbackPage />);

    expect(markup).toContain('Header');
    expect(markup).toContain('Share Your Feedback');
    expect(markup).toContain('Loading the feedback form');
  });
});
