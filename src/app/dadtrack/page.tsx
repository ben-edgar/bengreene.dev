'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { TiltCard } from '@/components/TiltCard';
import { Button } from '@/components/Button';
import { ImageLightbox } from '@/components/ImageLightbox';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { ParallaxContent } from '@/components/animations/Parallax';
import { getAssetPath } from '@/lib/basePath';

export default function DadTrack() {
  const features = [
    {
      title: 'AI-Powered Daily Tips',
      description:
        'Get personalized, age-appropriate parenting tips powered by AI. Tips appear at the top of your timeline each day—dismiss or save your favorites for later.',
      image: getAssetPath('/images/dadtrack/1_homescreen_with_tip.png'),
      icon: '🤖',
    },
    {
      title: 'Monthly AI Recaps',
      description:
        'Each month, DadTrack generates a beautiful narrative summary of your journaling journey—complete with photo highlights and references to your entries.',
      image: getAssetPath('/images/dadtrack/2_monthly_recap.png'),
      icon: '📖',
    },
    {
      title: 'Magazine Mode',
      description:
        'Relive memories in an immersive, full-screen experience with large photos, dramatic typography, and smooth hero animations.',
      image: getAssetPath('/images/dadtrack/3_magazine_mode.png'),
      icon: '✨',
    },
    {
      title: 'Flexible View Modes',
      description:
        'Choose how you browse your memories. Basic mode offers a clean, focused reading experience, while Magazine mode delivers immersive full-screen photos with dramatic typography.',
      image: getAssetPath('/images/dadtrack/4_regular_view.png'),
      icon: '📱',
    },
    {
      title: 'Journaling Streaks',
      description:
        'Build a consistent journaling habit with streak tracking. Hit milestones and celebrate with confetti animations and motivational messages.',
      image: getAssetPath('/images/dadtrack/5_streak_celebration.png'),
      icon: '🔥',
    },
    {
      title: 'Tip History & Favorites',
      description:
        'Never lose a great tip again. Star your favorites and search through your tip history with edge scrolling for quick navigation.',
      image: getAssetPath('/images/dadtrack/6_tip_history.png'),
      icon: '⭐',
    },
    {
      title: 'Advanced Search',
      description:
        'Find any memory instantly. Filter by text, date range, mood tags, children, or photo presence. The powerful search helps you relive any moment.',
      image: getAssetPath('/images/dadtrack/7_search.png'),
      icon: '🔍',
    },
    {
      title: 'Custom Mood Tags',
      description:
        'Create and manage custom mood tags to personalize your journal entries. Track emotional patterns over time with your own vocabulary.',
      image: getAssetPath('/images/dadtrack/manage_mood_screen.png'),
      icon: '😊',
    },
  ];

  const keyPoints = [
    {
      title: 'Dad-Focused',
      description: 'Built for dads, by a dad. Speaks in your voice and emphasizes bonding and memory-keeping.',
    },
    {
      title: 'Low Effort, High Impact',
      description: 'Snap a photo, dictate with voice, jot a feeling. Over time, build a rich memory archive effortlessly.',
    },
    {
      title: 'Your Data, Your Control',
      description: 'Automatic nightly backups, cross-device migration, and complete data export. Your memories are always safe.',
    },
  ];

  const roadmap = [
    {
      milestone: 'Milestone Tracker',
      items: ['Weekly milestones for first 3 months', 'Monthly milestones up to age 5', 'Achievement tracking (rolling, walking, first words)'],
    },
    {
      milestone: 'Child Information Hub',
      items: ['Doctor\'s office and doctor name', 'Insurance card information', 'Emergency contacts and allergies'],
    },
    {
      milestone: 'Memory Highlights',
      items: ['Monthly "look back" collages', 'Yearly memory books', 'Photo frequency tracking'],
    },
    {
      milestone: 'Family Sharing',
      items: ['Invite partner or grandparents', 'Shared timeline access', 'Selective entry sharing'],
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
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
          <ParallaxContent>
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
                  The dad journaling app that helps you capture moments, moods, and memories with AI-powered insights.
                  Voice journaling, daily tips, monthly recaps, and streak celebrations—all designed to make memory-keeping effortless.
                </p>
              </FadeIn>
            </div>
          </ParallaxContent>
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
                <TiltCard intensity={10}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <div className="space-y-6">
                      {/* Screenshot Image */}
                      <div
                        className="relative bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-md cursor-zoom-in group/image"
                        style={{ minHeight: '400px', maxHeight: '500px' }}
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-contain p-4 transition-transform duration-300 group-hover/image:scale-110"
                        />
                        {/* Click to expand hint */}
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity bg-white dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            🔍 Click to expand
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
                </TiltCard>
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
                <TiltCard intensity={12}>
                  <Card className="bg-primary-50 dark:bg-primary-950 h-full">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        {point.title}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </Card>
                </TiltCard>
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
                <Button href="/feedback" variant="secondary" size="lg">
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
