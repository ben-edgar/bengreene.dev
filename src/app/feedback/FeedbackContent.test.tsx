import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockAppParam = vi.hoisted(() => ({
  current: 'momtrack' as string | null,
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => {
    const params = new URLSearchParams();

    if (mockAppParam.current) {
      params.set('app', mockAppParam.current);
    }

    return params;
  },
}));

vi.mock('@/components/Header', () => ({
  Header: () => <div>Header</div>,
}));

import FeedbackContent from './FeedbackContent';

describe('FeedbackContent', () => {
  beforeEach(() => {
    mockAppParam.current = 'momtrack';
  });

  it('uses the app query parameter for the first render', () => {
    const markup = renderToStaticMarkup(<FeedbackContent />);

    expect(markup).toContain('Help us shape MomTrack');
    expect(markup).not.toContain('Help us build the best dad journaling app');
  });

  it('wears the cloth of the app the feedback is for', () => {
    expect(renderToStaticMarkup(<FeedbackContent />)).toContain('data-brand="momtrack"');

    mockAppParam.current = 'dadtrack';

    expect(renderToStaticMarkup(<FeedbackContent />)).toContain('data-brand="dadtrack"');
  });
});
