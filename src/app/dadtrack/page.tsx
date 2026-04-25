'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { TiltCard } from '@/components/TiltCard';
import { Button } from '@/components/Button';
import { ImageLightbox } from '@/components/ImageLightbox';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideUp } from '@/components/animations/SlideUp';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { StaggerItem } from '@/components/animations/StaggerItem';
import { ParallaxContent } from '@/components/animations/Parallax';
import { GlowDivider } from '@/components/GlowDivider';
import { getAssetPath } from '@/lib/basePath';
import {
  DADTRACK_APP_STORE_URL,
  DADTRACK_GOOGLE_PLAY_URL,
  SITE_CANONICAL_URL,
} from '@/lib/constants';
import {
  DADTRACK_FEATURES,
  DADTRACK_KEY_POINTS,
  PRODUCT_ROADMAP,
  getOddFinalGridItemClass,
} from '@/lib/productContent';
import { getTrackedStoreCtas, useDetectedStorePlatform } from '@/lib/storeLinks';

export default function DadTrack() {
  const features = DADTRACK_FEATURES;
  const keyPoints = DADTRACK_KEY_POINTS;
  const roadmap = PRODUCT_ROADMAP;

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DadTrack',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    description:
      'A dad-focused journaling app for capturing memories, moods, and milestones with AI-powered insights.',
    url: `${SITE_CANONICAL_URL}/dadtrack`,
    image: `${SITE_CANONICAL_URL}/opengraph-image.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    sameAs: [DADTRACK_APP_STORE_URL, DADTRACK_GOOGLE_PLAY_URL],
    downloadUrl: [DADTRACK_APP_STORE_URL, DADTRACK_GOOGLE_PLAY_URL],
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const platform = useDetectedStorePlatform();
  const storeCtas = platform === null ? null : getTrackedStoreCtas(platform);

  const renderStoreCtas = (keyPrefix = '') => {
    if (!storeCtas) {
      return (
        <>
          <div
            key={`${keyPrefix}loading-primary`}
            className="h-14 w-64 rounded-xl bg-slate-800 animate-pulse"
            aria-hidden="true"
          />
          <div
            key={`${keyPrefix}loading-secondary`}
            className="h-14 w-64 rounded-xl bg-slate-800 animate-pulse"
            aria-hidden="true"
          />
        </>
      );
    }

    return storeCtas.map((cta, index) => (
      <Button
        key={`${keyPrefix}${cta.key}`}
        href={cta.href}
        variant={index === 0 ? undefined : 'secondary'}
        size="lg"
        mobileFullWidth
        target="_blank"
        rel="noopener noreferrer"
      >
        {cta.buttonLabel}
      </Button>
    ));
  };

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

      <main className="flex-1 relative bg-slate-950">
        {/* Subtle page-wide background ambiance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
          <ParallaxContent>
            <div className="text-center space-y-6">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-sm text-teal-400 font-medium mb-2">
                  📱 The Dad Journaling App
                </div>
              </FadeIn>
              <FadeIn>
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DadTrack
                  </span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
                  Track the journey, one memory at a time
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 text-green-300 rounded-full text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Now Available on iOS and Android!
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  The dad journaling app that helps you capture moments, moods, and memories with AI-powered insights.
                  Voice journaling, daily tips, monthly recaps, cloud backup, and streak celebrations—all designed to make memory-keeping effortless.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="flex w-full max-w-md mx-auto flex-col gap-4 pt-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
                  {renderStoreCtas('hero-')}
                </div>
              </FadeIn>
            </div>
          </ParallaxContent>
        </section>

        <GlowDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* Key Features */}
        <section className="relative py-20 border-y border-white/10 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
                What&apos;s Included
              </h2>
            </SlideUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
              {features.map((feature, index) => (
                <StaggerItem key={feature.title} className={getOddFinalGridItemClass(index, features.length)}>
                  <TiltCard intensity={8}>
                    <div
                      className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full overflow-hidden cursor-zoom-in"
                      onClick={() => openLightbox(index)}
                    >
                      {/* Screenshot Image */}
                      <div
                        className="relative bg-slate-900/80 overflow-hidden"
                        style={{ height: '320px' }}
                      >
                        <Image
                          src={getAssetPath(feature.image)}
                          alt={feature.title}
                          fill
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover hint */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center pointer-events-none">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 px-4 py-2 rounded-full text-sm font-medium text-slate-200 border border-white/20">
                            🔍 Click to expand
                          </div>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{feature.icon}</span>
                          <h3 className="text-lg font-bold text-white">
                            {feature.title}
                          </h3>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <GlowDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* Why It's Different */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Why DadTrack Is Different
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyPoints.map((point, index) => (
              <StaggerItem key={index}>
                <TiltCard intensity={12}>
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-teal-500/30 transition-all duration-300 h-full space-y-3">
                    <h3 className="text-xl font-bold text-teal-400">
                      {point.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <GlowDivider className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* Roadmap */}
        <section className="relative py-20 border-y border-white/10 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Coming Soon
              </h2>
            </SlideUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmap.map((section, index) => (
                <StaggerItem key={index}>
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4">
                    <h3 className="text-xl font-bold text-white">
                      {section.milestone}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-slate-300"
                        >
                          <span className="text-teal-400 font-bold mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <GlowDivider className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" />

        {/* CTA Section */}
        <section id="download" className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <SlideUp>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Get DadTrack Today
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-300">
                Start capturing memories with your kids. Available now on iOS and Android.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex w-full max-w-md mx-auto flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
                {renderStoreCtas('download-')}
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-sm text-slate-500">
                Have feedback or ideas?{' '}
                <Link href="/feedback" className="text-teal-400 hover:underline">
                  Share your thoughts
                </Link>
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Image Lightbox */}
      <ImageLightbox
        images={features.map(f => ({
          src: getAssetPath(f.image),
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
