import { describe, expect, it } from 'vitest';

import { navLinks } from './navigation';

describe('navigation links', () => {
  it('lists MomTrack after DadTrack across shared site navigation', () => {
    expect(navLinks).toEqual([
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/dadtrack', label: 'DadTrack' },
      { href: '/momtrack', label: 'MomTrack' },
      { href: '/feedback', label: 'Feedback' },
    ]);
  });
});
