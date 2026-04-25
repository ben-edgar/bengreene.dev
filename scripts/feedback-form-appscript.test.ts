import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

const require = createRequire(import.meta.url);
const appscript = require('./feedback-form-appscript.js') as {
  buildFeedbackNotification_: (
    data: Record<string, string | undefined>,
    timestamp: Date,
    app: string,
  ) => { subject: string; message: string };
  buildFeedbackRow_: (
    timestamp: Date,
    data: Record<string, string | undefined>,
    app: string,
  ) => unknown[];
  getSubmissionApp_: (
    data: Record<string, string | undefined>,
    event?: { parameter?: Record<string, string | undefined> },
  ) => string;
};

describe('feedback form Apps Script helpers', () => {
  it('prefers the app included in the JSON body', () => {
    const app = appscript.getSubmissionApp_(
      { app: 'momtrack' },
      { parameter: { app: 'dadtrack' } },
    );

    expect(app).toBe('momtrack');
  });

  it('falls back to the Apps Script request parameter when the body omits app', () => {
    const app = appscript.getSubmissionApp_({}, { parameter: { app: 'momtrack' } });

    expect(app).toBe('momtrack');
  });

  it('defaults unknown app values to DadTrack', () => {
    const app = appscript.getSubmissionApp_({ app: 'other' });

    expect(app).toBe('dadtrack');
  });

  it('adds the normalized app as the final sheet column', () => {
    const timestamp = new Date('2026-04-25T12:00:00Z');

    const row = appscript.buildFeedbackRow_(
      timestamp,
      {
        name: 'Ben',
        email: 'ben@example.com',
        comment: 'Great app',
        platform: 'ios',
        type: 'feedback',
      },
      'momtrack',
    );

    expect(row).toEqual([
      timestamp,
      'Ben',
      'ben@example.com',
      'Great app',
      'ios',
      'feedback',
      'momtrack',
    ]);
  });

  it('uses the selected app in the feedback email', () => {
    const notification = appscript.buildFeedbackNotification_(
      {
        name: 'Ben',
        email: 'ben@example.com',
        comment: 'Great app',
        platform: 'ios',
      },
      new Date('2026-04-25T12:00:00Z'),
      'momtrack',
    );

    expect(notification.subject).toBe('New MomTrack Feedback Received');
    expect(notification.message).toContain('App: MomTrack');
    expect(notification.message).toContain('Feedback: Great app');
  });
});
