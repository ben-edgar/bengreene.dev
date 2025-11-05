'use client';

import { useState, FormEvent } from 'react';
import type { Metadata } from 'next';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/form/Input';
import { Textarea } from '@/components/form/Textarea';
import { Button } from '@/components/Button';
import { submitToGoogleSheet } from '@/lib/formSubmit';

// Note: This component uses 'use client' so metadata is handled via a separate file or wrapper
// For now, metadata would be set by the parent layout or a separate metadata file

export default function Waitlist() {
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for joining the waitlist! We\'ll be in touch soon.',
        });
        setFormData({ name: '', email: '', comment: '' });

        // Trigger confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'],
        });

        // Add a second burst for extra celebration
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
    } catch (error) {
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

      <main className="flex-1">
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
                Join the Waitlist
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                Be among the first to get early access to DadTrack
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Join other dads in shaping the future of DadTrack. Your feedback helps us build the best dad life companion.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Textarea
                label="Comment (Optional)"
                name="comment"
                placeholder="Share any thoughts, feature requests, or feedback"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
              />

              {/* Status Messages */}
              {submitStatus.type === 'success' && (
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {submitStatus.type === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {isSubmitting ? 'Submitting...' : 'Join the Waitlist'}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="text-center space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400">
                No spam, just updates about DadTrack.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                We respect your privacy. Your email will only be used to send DadTrack updates.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
