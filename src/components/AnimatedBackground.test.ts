import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

describe('AnimatedBackground source', () => {
  it('uses explicit Tailwind background classes instead of dynamic bg-* generation', () => {
    const source = readFileSync(
      path.resolve(__dirname, './AnimatedBackground.tsx'),
      'utf8',
    );

    expect(source).not.toContain('bg-${orb.color}');
    expect(source).toContain('bgColor');
  });
});
