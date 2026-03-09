import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import About from './page';

describe('About page', () => {
  it('highlights how Ben leads and builds with mentorship and AI-assisted delivery', () => {
    const markup = renderToStaticMarkup(<About />);

    expect(markup).toContain('How I Lead and Build');
    expect(markup).toContain('The work I enjoy most sits at the intersection of people, product, and engineering.');
    expect(markup).toContain('I care a lot about mentorship and team health.');
    expect(markup).toContain('AI tools well');
  });

  it('ends with a CTA that points visitors to DadTrack or LinkedIn', () => {
    const markup = renderToStaticMarkup(<About />);

    expect(markup).toContain('Check Out DadTrack');
    expect(markup).toContain('Reach Out on LinkedIn');
    expect(markup).toContain('w-full sm:w-auto');
  });
});
