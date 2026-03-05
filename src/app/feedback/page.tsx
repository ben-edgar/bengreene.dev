'use client';

import { useState, FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { submitToGoogleSheet } from '@/lib/formSubmit';
import { motion } from 'framer-motion';

export default function Feedback() {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Honeypot check - if filled, it's likely a bot
    if (formData.website) {
      // Honeypot triggered: fail silently, do not set user-visible error
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
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
      const result = await submitToGoogleSheet({
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        type: 'feedback',
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for your feedback! We appreciate your input.',
        });
        setFormData({ name: '', email: '', comment: '', website: '' });

        // Trigger confetti celebration
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
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 relative">
        {/* Ambient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <section className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 font-medium mb-2">
                💬 Share Your Thoughts
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Share Your{' '}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Feedback
                </span>
              </h1>
              <p className="text-xl text-slate-300 font-medium">
                Help us build the best dad life companion
              </p>
              <p className="text-lg text-slate-400 leading-relaxed">
                Your thoughts and ideas shape DadTrack. Whether it&apos;s a feature request, bug report, or general feedback, we want to hear from you.
              </p>
            </motion.div>

            {/* Glassmorphic Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="feedback-name" className="block text-sm font-medium text-slate-300">
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all duration-200"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-slate-300">
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Feedback Field */}
                <div className="space-y-2">
                  <label htmlFor="feedback-comment" className="block text-sm font-medium text-slate-300">
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all duration-200 resize-none"
                  />
                  {errors.comment && (
                    <p className="text-red-400 text-sm">{errors.comment}</p>
                  )}
                </div>

                {/* Honeypot field - hidden from users, catches bots */}
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

                {/* Status Messages */}
                {submitStatus.type === 'success' && (
                  <div className="p-4 rounded-xl bg-green-950/50 border border-green-800/50">
                    <p className="text-green-300 font-medium">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {submitStatus.type === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/50">
                    <p className="text-red-300 font-medium">
                      {submitStatus.message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-teal-700' : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]'
                    }`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                  </span>
                </button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center space-y-2"
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
