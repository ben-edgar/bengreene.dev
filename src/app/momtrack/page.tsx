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
  MOMTRACK_TESTFLIGHT_URL,
  SITE_CANONICAL_URL,
} from '@/lib/constants';
import {
  MOMTRACK_BETA_CTA,
  MOMTRACK_FEATURES,
  MOMTRACK_KEY_POINTS,
  MOMTRACK_PAGE_THEME,
  PRODUCT_ROADMAP,
  getOddFinalGridItemClass,
} from '@/lib/productContent';

export default function MomTrack() {
  const features = MOMTRACK_FEATURES;
  const keyPoints = MOMTRACK_KEY_POINTS;
  const roadmap = PRODUCT_ROADMAP;
  const theme = MOMTRACK_PAGE_THEME;

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MomTrack',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS',
    description:
      'A mom-focused journaling app for capturing memories, moods, and milestones. Now in beta on iOS.',
    url: `${SITE_CANONICAL_URL}/momtrack`,
    image: `${SITE_CANONICAL_URL}/opengraph-image.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    sameAs: [MOMTRACK_TESTFLIGHT_URL],
    downloadUrl: MOMTRACK_TESTFLIGHT_URL,
  };

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

      <main className="flex-1 relative bg-slate-950">
        {/* Subtle page-wide background ambiance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-[700px] h-[700px] ${theme.ambientPrimary} rounded-full blur-3xl`} />
          <div className={`absolute bottom-1/3 right-0 w-[500px] h-[500px] ${theme.ambientSecondary} rounded-full blur-3xl`} />
          <div className={`absolute top-1/2 right-1/4 w-[400px] h-[400px] ${theme.ambientTertiary} rounded-full blur-3xl`} />
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
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border ${theme.accentBorder} text-sm ${theme.accentText} font-medium mb-2`}>
                  📱 The Mom Journaling App
                </div>
              </FadeIn>
              <FadeIn>
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  <span className={`${theme.gradientText} bg-clip-text text-transparent`}>
                    MomTrack
                  </span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
                  Track the journey, one memory at a time
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/40 text-amber-300 rounded-full text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                  </span>
                  Now in Beta — iOS TestFlight
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  The mom journaling app that helps you preserve precious moments through photos, mood tracking, and daily reflections. Built by a dad for his wife, and for moms everywhere.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="flex w-full max-w-md mx-auto flex-col gap-4 pt-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
                  <Button
                    href={MOMTRACK_BETA_CTA.href}
                    size="lg"
                    tone="momtrack"
                    mobileFullWidth
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {MOMTRACK_BETA_CTA.label}
                  </Button>
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
                    <button
                      type="button"
                      aria-label={`Open ${feature.title} screenshot`}
                      className={`group h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left backdrop-blur-xl transition-all duration-300 ${theme.accentHoverBorder} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8746e]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
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
                    </button>
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
              Why MomTrack Is Different
            </h2>
          </SlideUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keyPoints.map((point, index) => (
              <StaggerItem key={index}>
                <TiltCard intensity={12}>
                  <div className={`p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 ${theme.accentHoverBorder} transition-all duration-300 h-full space-y-3`}>
                    <h3 className={`text-xl font-bold ${theme.accentText}`}>
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
                          <span className={`${theme.bulletText} font-bold mt-1`}>•</span>
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
                Join the MomTrack Beta
              </h2>
            </SlideUp>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-300">
                MomTrack is currently in beta testing on iOS. Join via TestFlight and help shape the app.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex w-full max-w-md mx-auto flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
                <Button
                  href={MOMTRACK_BETA_CTA.href}
                  size="lg"
                  tone="momtrack"
                  mobileFullWidth
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {MOMTRACK_BETA_CTA.label}
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-sm text-slate-500">
                <Link href="/feedback?app=momtrack" className={`${theme.accentText} hover:underline`}>
                  Have feedback?
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
