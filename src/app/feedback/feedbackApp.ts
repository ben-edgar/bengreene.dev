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
  submitButtonClass: string;
  activePillClass: string;
  inactivePillClass: string;
};

export const feedbackCopyByApp: Record<FeedbackApp, FeedbackCopy> = {
  dadtrack: {
    subtitle: 'Help us build the best dad journaling app',
    body: 'Your thoughts and ideas shape DadTrack. Whether it is a feature request, bug report, or general feedback, we want to hear from you.',
    submitButtonClass:
      'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]',
    activePillClass:
      'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-[0_0_18px_rgba(20,184,166,0.35)]',
    inactivePillClass:
      'bg-white/5 text-slate-300 border border-teal-500/20 hover:bg-teal-500/10 hover:text-teal-200',
  },
  momtrack: {
    subtitle: 'Help us shape MomTrack',
    body: 'MomTrack is in beta — your feedback directly shapes what we build.',
    submitButtonClass:
      'bg-gradient-to-r from-[#e8746e] via-[#c4566a] to-[#9e2b3c] hover:from-[#f08a84] hover:via-[#d76578] hover:to-[#b8374b] shadow-[0_0_20px_rgba(232,116,110,0.3)] hover:shadow-[0_0_30px_rgba(232,116,110,0.45)]',
    activePillClass:
      'bg-gradient-to-r from-[#e8746e] via-[#c4566a] to-[#9e2b3c] text-white shadow-[0_0_18px_rgba(232,116,110,0.35)]',
    inactivePillClass:
      'bg-white/5 text-slate-300 border border-rose-400/20 hover:bg-rose-500/10 hover:text-rose-200',
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
