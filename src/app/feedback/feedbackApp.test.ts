import { describe, expect, it } from 'vitest';

import {
  buildFeedbackSubmissionPayload,
  feedbackCopyByApp,
  parseFeedbackAppParam,
} from './feedbackApp';

describe('feedback app helpers', () => {
  it('defaults unknown feedback app params to DadTrack', () => {
    expect(parseFeedbackAppParam(null)).toBe('dadtrack');
    expect(parseFeedbackAppParam('')).toBe('dadtrack');
    expect(parseFeedbackAppParam('unknown')).toBe('dadtrack');
  });

  it('parses supported feedback app params', () => {
    expect(parseFeedbackAppParam('dadtrack')).toBe('dadtrack');
    expect(parseFeedbackAppParam('momtrack')).toBe('momtrack');
  });

  it('defines app-specific feedback copy and styling hooks', () => {
    expect(feedbackCopyByApp.dadtrack.subtitle).toBe(
      'Help us build the best dad journaling app',
    );
    expect(feedbackCopyByApp.momtrack.subtitle).toBe('Help us shape MomTrack');
    expect(feedbackCopyByApp.momtrack.submitButtonClass).toContain(
      'from-[#e8746e]',
    );
    expect(feedbackCopyByApp.momtrack.submittingButtonClass).toContain(
      'bg-[#9e2b3c]',
    );
    expect(feedbackCopyByApp.momtrack.submittingButtonClass).not.toContain(
      'bg-teal-700',
    );
  });

  it('builds a typed feedback submission payload with app context', () => {
    expect(
      buildFeedbackSubmissionPayload({
        name: 'Ben',
        email: 'ben@example.com',
        comment: 'This is useful.',
        app: 'momtrack',
      }),
    ).toEqual({
      name: 'Ben',
      email: 'ben@example.com',
      comment: 'This is useful.',
      type: 'feedback',
      app: 'momtrack',
    });
  });
});
