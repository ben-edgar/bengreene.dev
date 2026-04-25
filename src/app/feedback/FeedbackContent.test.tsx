import React, { forwardRef } from 'react';
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

vi.mock('framer-motion', () => {
  type MockMotionProps = React.HTMLAttributes<HTMLElement> & {
    animate?: unknown;
    exit?: unknown;
    initial?: unknown;
    style?: React.CSSProperties;
    transition?: unknown;
    variants?: unknown;
  };

  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        const MotionComponent = forwardRef<HTMLElement, MockMotionProps>(
          (
            { animate, exit, initial, transition, variants, children, ...props },
            ref,
          ) => {
            void animate;
            void exit;
            void initial;
            void transition;
            void variants;

            return React.createElement(tag, { ...props, ref }, children);
          },
        );
        MotionComponent.displayName = `MockMotion.${tag}`;

        return MotionComponent;
      },
    },
  );

  return { motion };
});

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
});
