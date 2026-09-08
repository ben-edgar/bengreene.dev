'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';

import { Header } from '@/components/Header';
import { ImageLightbox } from '@/components/ImageLightbox';
import { FadeIn } from '@/components/animations/FadeIn';
import { getAssetPath } from '@/lib/basePath';
import type {
  ProductExtra,
  ProductFeature,
  ProductKeyPoint,
  ProductPageTheme,
  ProductRoadmapSection,
} from '@/lib/productContent';
import { FeatureExplorer } from './FeatureExplorer';
import { PhoneFrame } from './PhoneFrame';

export type ProductAvailability = {
  label: string;
  pillClass: string;
  pingClass: string;
  dotClass: string;
};

export type ProductPageConfig = {
  name: string;
  theme: ProductPageTheme;
  eyebrow: string;
  availability: ProductAvailability;
  tagline: string;
  lead: string;
  features: ProductFeature[];
  extras: ProductExtra[];
  keyPoints: ProductKeyPoint[];
  roadmap: ProductRoadmapSection[];
  feedbackHref: string;
  feedbackPrefix?: string;
  feedbackLinkLabel: string;
  downloadHeading: string;
  downloadLine: string;
  renderStoreCtas: (keyPrefix: string) => ReactNode;
  schema: Record<string, unknown>;
};

export function ProductPage({ config }: { config: ProductPageConfig }) {
  const {
    name,
    theme,
    eyebrow,
    availability,
    tagline,
    lead,
    features,
    extras,
    keyPoints,
    roadmap,
    feedbackHref,
    feedbackPrefix,
    feedbackLinkLabel,
    downloadHeading,
    downloadLine,
    renderStoreCtas,
    schema,
  } = config;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % features.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const [heroFront, heroBackLeft, , , heroBackRight] = features;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex-1 bg-slate-950">
        {/* Subtle page-wide background ambiance */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`absolute left-1/4 top-0 h-[700px] w-[700px] rounded-full blur-3xl ${theme.ambientPrimary}`} />
          <div className={`absolute bottom-1/3 right-0 h-[500px] w-[500px] rounded-full blur-3xl ${theme.ambientSecondary}`} />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <FadeIn>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${theme.accentBorder} ${theme.accentText} bg-white/5`}
                >
                  {eyebrow}
                </span>
              </FadeIn>
              <FadeIn>
                <h1 className="mt-6 font-display text-5xl font-semibold text-white lg:text-6xl">
                  <span className={`${theme.gradientText} bg-clip-text text-transparent`}>{name}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-5 text-xl leading-snug text-slate-300 md:text-2xl">{tagline}</p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div
                  className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${availability.pillClass}`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${availability.pingClass}`} />
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${availability.dotClass}`} />
                  </span>
                  {availability.label}
                </div>
              </FadeIn>
              <FadeIn delay={0.35}>
                <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-slate-300 lg:mx-0">{lead}</p>
              </FadeIn>
              <FadeIn delay={0.45}>
                <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                  {renderStoreCtas('hero-')}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="relative mx-auto h-[430px] w-full max-w-[380px] sm:h-[500px] sm:max-w-[440px] lg:h-[620px] lg:max-w-[540px]">
                <div
                  className={`absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${theme.phoneGlow}`}
                />
                <div className="absolute left-0 top-1/2 w-[41%] -translate-y-1/2 rotate-[-8deg] opacity-60">
                  <PhoneFrame
                    src={getAssetPath(heroBackLeft.image)}
                    alt={heroBackLeft.alt}
                    sizes="(min-width: 1024px) 220px, 40vw"
                  />
                </div>
                <div className="absolute right-0 top-1/2 w-[41%] -translate-y-1/2 rotate-[8deg] opacity-60">
                  <PhoneFrame
                    src={getAssetPath(heroBackRight.image)}
                    alt={heroBackRight.alt}
                    sizes="(min-width: 1024px) 220px, 40vw"
                  />
                </div>
                <div className="absolute left-1/2 top-1/2 z-10 w-[48%] -translate-x-1/2 -translate-y-1/2">
                  <PhoneFrame
                    src={getAssetPath(heroFront.image)}
                    alt={heroFront.alt}
                    priority
                    sizes="(min-width: 1024px) 260px, 48vw"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* The paper sheet */}
        <FeatureExplorer
          features={features}
          extras={extras}
          theme={theme}
          onOpenLightbox={openLightbox}
        />

        {/* Why it's different */}
        <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            Why {name} Is Different
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {keyPoints.map((point) => (
              <div key={point.title}>
                <span className={`block h-px w-10 ${theme.accentRule}`} aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl font-semibold text-white">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Coming soon</h2>
          <p className="mt-3 text-slate-400">In beta now, rolling out to everyone next.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {roadmap.map((section) => (
              <div
                key={section.milestone}
                className="rounded-2xl border border-white/10 bg-slate-900/50 p-6"
              >
                <h3 className="font-display text-lg font-semibold text-white">{section.milestone}</h3>
                <ul className="mt-4 space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${theme.accentRule}`}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="relative px-4 pb-24 sm:px-6 lg:px-8">
          <div
            className={`mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 px-6 py-12 text-center ring-1 md:px-12 ${theme.accentRing}`}
          >
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">{downloadHeading}</h2>
            <p className="mt-4 text-lg text-slate-300">{downloadLine}</p>
            <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
              {renderStoreCtas('download-')}
            </div>
            <p className="mt-8 text-sm text-slate-500">
              {feedbackPrefix ? `${feedbackPrefix} ` : null}
              <Link href={feedbackHref} className={`${theme.accentText} hover:underline`}>
                {feedbackLinkLabel}
              </Link>
            </p>
          </div>
        </section>
      </main>

      <ImageLightbox
        images={features.map((feature) => ({
          src: getAssetPath(feature.image),
          alt: feature.alt,
          title: feature.title,
          description: feature.description,
        }))}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
}
