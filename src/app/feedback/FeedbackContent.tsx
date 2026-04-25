'use client';

import { FormEvent, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

import { Header } from '@/components/Header';
import { submitToGoogleSheet } from '@/lib/formSubmit';
import {
  buildFeedbackSubmissionPayload,
  feedbackCopyByApp,
  parseFeedbackAppParam,
  type FeedbackApp,
} from './feedbackApp';

export default function FeedbackContent() {
  const searchParams = useSearchParams();
  const [app, setApp] = useState<FeedbackApp>('dadtrack');
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

  useEffect(() => {
    setApp(parseFeedbackAppParam(searchParams.get('app')));
  }, [searchParams]);

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

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'],
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#0ea5e9', '#3b82f6', '#6366f1'],
          });
        }, 250);

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#8b5cf6', '#ec4899', '#f43f5e'],
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
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-2xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-center"
            >
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-400">
                Share Your Thoughts
              </div>
              <h1 className="text-5xl font-bold text-white md:text-6xl">
                Share Your{' '}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Feedback
                </span>
              </h1>
              <p className="text-xl font-medium text-slate-300">
                {copy.subtitle}
              </p>
              <p className="text-lg leading-relaxed text-slate-400">
                {copy.body}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
              <div
                aria-label="Choose app for feedback"
                className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-black/20 p-1"
                role="group"
              >
                {(['dadtrack', 'momtrack'] as const).map((appOption) => {
                  const isSelected = app === appOption;
                  const optionCopy = feedbackCopyByApp[appOption];

                  return (
                    <button
                      aria-pressed={isSelected}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                        isSelected
                          ? optionCopy.activePillClass
                          : optionCopy.inactivePillClass
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
                    className="block text-sm font-medium text-slate-300"
                  >
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="feedback-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="feedback-email"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="feedback-comment"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Your Feedback <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="feedback-comment"
                    name="comment"
                    placeholder="Share your thoughts, feature requests, or bug reports..."
                    value={formData.comment}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 focus:outline-none"
                  />
                  {errors.comment && (
                    <p className="text-sm text-red-400">{errors.comment}</p>
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
                  <div className="rounded-xl border border-green-800/50 bg-green-950/50 p-4">
                    <p className="font-medium text-green-300">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {submitStatus.type === 'error' && (
                  <div className="rounded-xl border border-red-800/50 bg-red-950/50 p-4">
                    <p className="font-medium text-red-300">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full overflow-hidden rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 ${
                    isSubmitting
                      ? copy.submittingButtonClass
                      : copy.submitButtonClass
                  }`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </span>
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2 text-center"
            >
              <p className="text-slate-400">
                We read every piece of feedback and appreciate your input.
              </p>
              <p className="text-sm text-slate-500">
                We&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
