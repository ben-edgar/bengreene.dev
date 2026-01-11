'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ImageLightbox } from '@/components/ImageLightbox';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { ParallaxContent } from '@/components/animations/Parallax';
import { getAssetPath } from '@/lib/basePath';
import { DADTRACK_GOOGLE_PLAY_URL } from '@/lib/constants';

export default function Home() {
  const screenshots = [
    {
      src: getAssetPath('/images/dadtrack/1_homescreen_with_tip.png'),
      alt: 'DadTrack Home Timeline with AI Tip',
      title: 'AI-Powered Daily Tips',
      description: 'Get personalized parenting tips powered by AI, right in your timeline',
    },
    {
      src: getAssetPath('/images/dadtrack/2_monthly_recap.png'),
      alt: 'DadTrack Monthly Recap',
      title: 'Monthly AI Recaps',
      description: 'Beautiful narrative summaries of your journaling journey each month',
    },
    {
      src: getAssetPath('/images/dadtrack/3_magazine_mode.png'),
      alt: 'DadTrack Magazine Mode',
      title: 'Immersive Magazine Mode',
      description: 'Relive your moments with full-screen photos and dramatic typography',
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
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
          <ParallaxContent>
            <div className="text-center space-y-8">
              <FadeIn>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white bg-clip-text">
                    Ben Greene
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                    Engineering Leader & Builder
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Professional engineering leader passionate about building effective teams, shipping software, and mentoring engineers.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex gap-4 justify-center flex-wrap pt-4">
                  <Button href="/about" size="lg">
                    About Me
                  </Button>
                  <Button href="https://github.com/ben-edgar" variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </Button>
                </div>
              </FadeIn>
            </div>
          </ParallaxContent>
        </section>

        {/* Professional Highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
                Experience
              </h2>
            </SlideUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StaggerItem>
                <Card>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Senior Engineering Manager
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      Arcadia • 2021 – Present
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Leading global teams building utility data platforms. Managing engineers from interns to senior staff,
                      driving platform initiatives, and championing responsible AI driven development.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Engineering Manager
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      Shift • 2020 – 2022
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Managed consumer fulfillment teams, advised CTO on technical direction, and built a team culture of learning and growth.
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* DadTrack Introduction */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Current Project: DadTrack
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                As an engineering leader and dad, I built DadTrack from a simple insight:
                parenting is one of the most meaningful journeys we take, yet the moments slip away too quickly.
                DadTrack helps dads capture the small, everyday moments—the moods, the memories, the milestones—
                so you can reflect on them, share them with family, and never lose sight of what matters most.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Now Available on Android!
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Button href="/dadtrack" size="lg">
                  Learn More
                </Button>
                <Button
                  href={DADTRACK_GOOGLE_PLAY_URL}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🤖 Get it on Google Play
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Screenshot Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50 dark:bg-slate-900/50">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
              DadTrack in Action
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
            {screenshots.map((screenshot, index) => (
              <StaggerItem key={index}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="space-y-4">
                    {/* Screenshot Image */}
                    <div
                      className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden cursor-pointer group/image"
                      style={{ minHeight: '400px', maxHeight: '500px' }}
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        className="object-contain transition-transform duration-300 group-hover/image:scale-105"
                      />
                      {/* Click to expand hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover/image:opacity-100 transition-opacity bg-white dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium">
                          Click to expand
                        </div>
                      </div>
                    </div>
                    {/* Title and Description */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {screenshot.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {screenshot.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Let&apos;s Connect
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Interested in DadTrack or want to connect? I&apos;d love to hear from you.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Button
                  href={DADTRACK_GOOGLE_PLAY_URL}
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🤖 Download DadTrack
                </Button>
                <Button href="https://www.linkedin.com/in/ben-greene-dev/" variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Lightbox */}
      <ImageLightbox
        images={screenshots}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
}
