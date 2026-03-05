import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import About from './page';

describe('About page', () => {
  it('ends with a CTA that points visitors to DadTrack or LinkedIn', () => {
    const markup = renderToStaticMarkup(<About />);

    expect(markup).toContain('Check Out DadTrack');
    expect(markup).toContain('Reach Out on LinkedIn');
    expect(markup).toContain('w-full sm:w-auto');
  });
});
