import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import Experience from './Experience';

describe('Experience', () => {
  it('renders three roles with narrative achievement bullets', () => {
    const markup = renderToStaticMarkup(<Experience />);

    expect(markup).toContain('Engineering leadership, product judgment, and AI-native building');
    expect(markup).toContain('Arcadia');
    expect(markup).toContain('Shift');
    expect(markup).toContain('Appian');
    expect(markup).toContain('Guide engineers from interns to senior staff through mentoring, feedback, and career growth');
    expect(markup).toContain('Worked closely with product, design, and leadership to scope and ship meaningful consumer experiences');
    expect(markup).toContain('Managed engineering interns from project definition through execution, providing both technical guidance and career mentorship');
  });
});
