'use client';

import { useState, FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/Button';
import { submitToGoogleSheet } from '@/lib/formSubmit';
import { DADTRACK_GOOGLE_PLAY_URL } from '@/lib/constants';

// Note: This component uses 'use client' so metadata is handled via a separate file or wrapper
// For now, metadata would be set by the parent layout or a separate metadata file

export default function Waitlist() {
  const [formData, setFormData] = useState({ name: '', email: '', website: '' });
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
      // Honeypot triggered: silently fail without setting a user-visible error
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
        platform: 'ios',
        type: 'waitlist',
      });

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thanks for joining the iOS waitlist! We\'ll notify you when DadTrack launches on iOS.',
        });
        setFormData({ name: '', email: '', website: '' });

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
    } catch (_error) {
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
                Join the iOS Waitlist
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                Be among the first to get DadTrack on iOS
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                iOS version is coming soon! Join the waitlist to get early access when it launches.
              </p>

              {/* Android Available Note */}
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  🤖 Android user? DadTrack is available now!{' '}
                  <a
                    href={DADTRACK_GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    Get it on Google Play →
                  </a>
                </p>
              </div>
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

              {/* Platform field - iOS only, hidden since Android is now available */}
              <input
                type="hidden"
                name="platform"
                value="ios"
              />

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
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Have feedback or ideas?{' '}
                <a
                  href="/feedback"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Share your thoughts
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
