'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { ImageLightbox } from '@/components/ImageLightbox';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { getAssetPath } from '@/lib/basePath';

export default function DadTrack() {
  const features = [
    {
      title: 'Daily Dad Journal',
      description:
        'One entry per day to capture moments, moods, and memories. Support for multiple mood tags and up to 5 photos per entry.',
      image: getAssetPath('/images/dadtrack/add_journal_entry_screen.png'),
      icon: '📝',
    },
    {
      title: 'Multi-Child Support',
      description:
        'Manage multiple children with individual profiles. Switch between child timelines or view "All kids" in one stream.',
      image: getAssetPath('/images/dadtrack/home_screen.png'),
      icon: '👨‍👩‍👧‍👦',
    },
    {
      title: 'Magazine Mode',
      description:
        'Immersive, full-screen experience with large photos, dramatic typography, and hero animations for reliving your memories.',
      image: getAssetPath('/images/dadtrack/magazine_mode_journal_entry.png'),
      icon: '✨',
    },
    {
      title: 'Mood Tracking',
      description:
        'Create custom mood tags to personalize your journal entries. Track emotional patterns over time with advanced filtering.',
      image: getAssetPath('/images/dadtrack/manage_mood_screen.png'),
      icon: '😊',
    },
    {
      title: 'Advanced Filtering',
      description:
        'Find entries by text, date range, mood tags, specific children, or photo presence. Powerful search to relive any moment.',
      image: getAssetPath('/images/dadtrack/filter_screen.png'),
      icon: '🔍',
    },
    {
      title: 'Settings & Customization',
      description:
        'Configure journal reminders, dark mode, together-time windows, and more. Make the app work for your lifestyle.',
      image: getAssetPath('/images/dadtrack/settings_screen.png'),
      icon: '⚙️',
    },
  ];

  const keyPoints = [
    {
      title: 'Dad-Focused',
      description: 'Built for dads, by a dad. Speaks in your voice and emphasizes bonding and memory-keeping.',
    },
    {
      title: 'Low Effort, High Impact',
      description: 'Just take a photo, read a tip, jot a feeling. Over time, build a rich memory archive.',
    },
    {
      title: 'Family-Inclusive',
      description: 'While dad-focused, includes features that benefit the whole family—sharing, data export, and more.',
    },
  ];

  const roadmap = [
    {
      milestone: 'Milestone 3: Smart Parenting Support',
      items: ['Dad Tips Feed', 'Milestone Tracker', 'Family Photo Reminders'],
    },
    {
      milestone: 'Milestone 4: Enhanced Experience',
      items: ['Monthly Memory Highlights', 'Advanced Analytics'],
    },
    {
      milestone: 'Milestone 5: Platform Expansion',
      items: ['iOS App', 'Wear OS Watch App', 'Dad Community Feed'],
    },
    {
      milestone: 'Milestone 6: Practical Parenting Tools',
      items: ['Child Information Hub', 'Shopping & Development Guide'],
    },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % features.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <FadeIn>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
                DadTrack
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Track the journey, one memory at a time
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                A daily dad life companion app designed to help you capture moments, moods, and milestones with your kids.
                One journal entry, some photos, a mood tag—and over time, you build a rich archive of memories.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">
              What's Included
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card className="group hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  {/* Screenshot Image */}
                  <div
                    className="relative bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-md cursor-pointer group/image"
                    style={{ minHeight: '400px', maxHeight: '500px' }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover/image:scale-105"
                    />
                    {/* Click to expand hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover/image:opacity-100 transition-opacity bg-white dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                        Click to expand
                      </div>
                    </div>
                  </div>
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{feature.icon}</span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  {/* Description */}
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Why It's Different */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Why DadTrack Is Different
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyPoints.map((point, index) => (
              <StaggerItem key={index}>
                <Card className="bg-primary-50 dark:bg-primary-950">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {point.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Roadmap */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
              Coming Soon
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roadmap.map((section, index) => (
              <StaggerItem key={index}>
                <Card>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {section.milestone}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-primary-600 dark:text-primary-400 font-bold mt-1">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-8">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Join the Journey
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Help us build the best dad life companion. Early feedback shapes the future of DadTrack.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button href="/waitlist" size="lg">
                  Join the Waitlist
                </Button>
                <Button href="/waitlist" variant="secondary" size="lg">
                  Send Feedback
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Lightbox */}
      <ImageLightbox
        images={features.map(f => ({
          src: f.image,
          alt: f.title,
          title: f.title,
          description: f.description,
        }))}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
}
