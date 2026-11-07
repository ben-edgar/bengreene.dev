'use client';

import { FormEvent, useState } from 'react';
import confetti from 'canvas-confetti';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { confettiColors } from '@/lib/confetti';
import { submitToGoogleSheet } from '@/lib/formSubmit';
import {
  buildFeedbackSubmissionPayload,
  feedbackCopyByApp,
  parseFeedbackAppParam,
  type FeedbackApp,
} from './feedbackApp';

const FIELD_STYLES =
  'w-full rounded-md border border-ink/25 bg-paper-raised px-4 py-3 text-ink placeholder-ink-muted transition-colors duration-200 focus:border-ink-accent focus:outline-2 focus:outline-offset-0 focus:outline-ink-accent';

const LABEL_STYLES = 'block text-sm font-medium text-ink';

export default function FeedbackContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app');
  const [app, setApp] = useState<FeedbackApp>(() => parseFeedbackAppParam(appParam));
  // Follow ?app= when the URL changes, while still letting the user switch
  // apps with the toggle. Adjusting state during render (rather than in an
  // effect) avoids a second, cascading render.
  const [syncedAppParam, setSyncedAppParam] = useState(appParam);
  if (appParam !== syncedAppParam) {
    setSyncedAppParam(appParam);
    setApp(parseFeedbackAppParam(appParam));
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const copy = feedbackCopyByApp[app];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Honeypot check - if filled, it is likely a bot.
    if (formData.website) {
      return false;
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Feedback is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitToGoogleSheet(
        buildFeedbackSubmissionPayload({
          name: formData.name,
          email: formData.email,
          comment: formData.comment,
          app,
        }),
      );

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for your feedback! We appreciate your input.',
        });
        setFormData({ name: '', email: '', comment: '', website: '' });

        const colors = confettiColors(app);

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors,
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
          });
        }, 250);

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
          });
        }, 400);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message,
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-brand={app} className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8">
          <div>
            <h1 className="font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.02em]">
              Share your feedback
            </h1>
            <p className="mt-6 font-display text-[1.75rem] italic leading-tight">{copy.subtitle}</p>
            <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-on-cloth-muted">{copy.body}</p>
            <p className="mt-6 max-w-[34rem] leading-relaxed text-on-cloth-muted">
              We read every piece of feedback and appreciate your input. We&apos;ll get back to you as
              soon as possible.
            </p>
          </div>

          <div className="page-sheet p-6 sm:p-10">
              <div
                aria-label="Choose app for feedback"
                className="mb-7 grid grid-cols-2 gap-1 rounded-lg bg-ink/5 p-1"
                role="group"
              >
                {(['dadtrack', 'momtrack'] as const).map((appOption) => {
                  const isSelected = app === appOption;

                  return (
                    <button
                      aria-pressed={isSelected}
                      className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                        isSelected ? 'bg-ink-accent text-paper-raised' : 'text-ink-muted hover:text-ink'
                      }`}
                      key={appOption}
                      onClick={() => setApp(appOption)}
                      type="button"
                    >
                      {appOption === 'dadtrack' ? 'DadTrack' : 'MomTrack'}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="feedback-name"
                    className={LABEL_STYLES}
                  >
                    Name <span className="text-ink-accent">*</span>
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={FIELD_STYLES}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-800">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="feedback-email"
                    className={LABEL_STYLES}
                  >
                    Email <span className="text-ink-accent">*</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={FIELD_STYLES}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-800">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="feedback-comment"
                    className={LABEL_STYLES}
                  >
                    Your feedback <span className="text-ink-accent">*</span>
                  </label>
                  <textarea
                    id="feedback-comment"
                    name="comment"
                    placeholder="Share your thoughts, feature requests, or bug reports..."
                    value={formData.comment}
                    onChange={handleChange}
                    rows={6}
                    required
                    className={`resize-none ${FIELD_STYLES}`}
                  />
                  {errors.comment && (
                    <p className="text-sm text-red-800">{errors.comment}</p>
                  )}
                </div>

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {submitStatus.type === 'success' && (
                  <div role="status" className="rounded-md border border-green-800/30 bg-green-800/10 p-4">
                    <p className="font-medium text-green-900">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {submitStatus.type === 'error' && (
                  <div role="alert" className="rounded-md border border-red-800/30 bg-red-800/10 p-4">
                    <p className="font-medium text-red-900">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                <Button type="submit" surface="paper" size="lg" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit feedback'}
                </Button>
              </form>
          </div>
        </section>
      </main>
    </div>
  );
}
