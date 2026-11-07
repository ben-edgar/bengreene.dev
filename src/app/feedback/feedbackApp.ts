export type FeedbackApp = 'dadtrack' | 'momtrack';

export type FeedbackFormData = {
  name: string;
  email: string;
  comment: string;
};

export type FeedbackSubmissionPayload = FeedbackFormData & {
  type: 'feedback';
  app: FeedbackApp;
};

export type FeedbackCopy = {
  subtitle: string;
  body: string;
};

export const feedbackCopyByApp: Record<FeedbackApp, FeedbackCopy> = {
  dadtrack: {
    subtitle: 'Help us build the best dad journaling app',
    body: 'Your thoughts and ideas shape DadTrack. Whether it is a feature request, bug report, or general feedback, we want to hear from you.',
  },
  momtrack: {
    subtitle: 'Help us shape MomTrack',
    body: 'MomTrack is now live on iOS. Your feedback directly shapes what we build next.',
  },
};

export function parseFeedbackAppParam(app: string | null): FeedbackApp {
  return app === 'momtrack' || app === 'dadtrack' ? app : 'dadtrack';
}

export function buildFeedbackSubmissionPayload({
  name,
  email,
  comment,
  app,
}: FeedbackFormData & { app: FeedbackApp }): FeedbackSubmissionPayload {
  return {
    name,
    email,
    comment,
    type: 'feedback',
    app,
  };
}
