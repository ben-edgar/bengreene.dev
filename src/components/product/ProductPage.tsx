'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '@/components/Header';
import { ImageLightbox } from '@/components/ImageLightbox';
import { getAssetPath } from '@/lib/basePath';
import type {
  ProductComingSoon,
  ProductExtra,
  ProductFeature,
  ProductKeyPoint,
  ProductPageTheme,
} from '@/lib/productContent';
import { FeatureExplorer } from './FeatureExplorer';
import { PhoneFrame } from './PhoneFrame';

export type ProductPageConfig = {
  name: string;
  theme: ProductPageTheme;
  eyebrow: string;
  availability: string;
  tagline: string;
  lead: string;
  features: ProductFeature[];
  extras: ProductExtra[];
  keyPoints: ProductKeyPoint[];
  comingSoon: ProductComingSoon;
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
    comingSoon,
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
    <div data-brand={theme.brand} className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Hero */}
        <section className="overflow-hidden pb-16 pt-8 md:pb-24 md:pt-14">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <p className="font-medium text-accent">{eyebrow}</p>
              <h1 className="mt-3 font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
                {name}
              </h1>
              <p className="mt-5 max-w-[32rem] font-display text-[1.75rem] italic leading-tight md:text-[2rem]">
                {tagline}
              </p>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-on-cloth-muted">{lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">{renderStoreCtas('hero-')}</div>
              <p className="mt-4 text-sm text-on-cloth-faint">{availability}</p>
            </div>

            <div className="relative mx-auto h-[430px] w-full max-w-[380px] sm:h-[500px] sm:max-w-[440px] lg:h-[620px] lg:max-w-[540px]">
              <div className="absolute left-0 top-1/2 w-[41%] -translate-y-1/2 rotate-[-8deg] brightness-[0.72]">
                <PhoneFrame
                  src={getAssetPath(heroBackLeft.image)}
                  alt={heroBackLeft.alt}
                  sizes="(min-width: 1024px) 220px, 40vw"
                />
              </div>
              <div className="absolute right-0 top-1/2 w-[41%] -translate-y-1/2 rotate-[8deg] brightness-[0.72]">
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
          </div>
        </section>

        <FeatureExplorer
          features={features}
          extras={extras}
          onOpenLightbox={openLightbox}
        />

        {/* Why it's different */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl">Why {name} is different</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {keyPoints.map((point) => (
              <div key={point.title} className="border-t border-on-cloth/20 pt-5">
                <h3 className="font-display text-[1.75rem] leading-tight">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-on-cloth-muted">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coming soon */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,260px)_1fr] md:gap-16">
            <YearbookCover name={name} theme={theme} />
            <div>
              <h2 className="font-display text-4xl md:text-5xl">Coming soon</h2>
              <p className="mt-2 text-on-cloth-muted">What I’m building next.</p>
              <h3 className="mt-8 font-display text-3xl">{comingSoon.title}</h3>
              <p className="mt-2 text-lg text-on-cloth">{comingSoon.summary}</p>
              <ul className="mt-5 max-w-[65ch] list-disc space-y-3 pl-5 leading-relaxed text-on-cloth-muted marker:text-accent">
                {comingSoon.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="bg-cloth-raised py-16 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">{downloadHeading}</h2>
              <p className="mt-3 text-lg text-on-cloth-muted">{downloadLine}</p>
              <p className="mt-3 text-on-cloth-muted">
                {feedbackPrefix ? `${feedbackPrefix} ` : null}
                <Link href={feedbackHref} className="text-accent underline underline-offset-4 hover:text-on-cloth">
                  {feedbackLinkLabel}
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">{renderStoreCtas('download-')}</div>
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
        imageAspect="1080 / 2347"
      />
    </div>
  );
}

/**
 * A small hardcover drawn in CSS: cloth cover, a taped photo, the title
 * stamped below it, and page edges peeking out on the fore-edge.
 */
function YearbookCover({ name, theme }: { name: string; theme: ProductPageTheme }) {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[220px] md:max-w-none">
      <div className="relative rotate-[-3deg]">
        {/* Page block peeking out on the fore-edge and bottom */}
        <div className="absolute inset-0 translate-x-[6px] translate-y-[5px] rounded-r-md bg-[repeating-linear-gradient(90deg,#efe8da_0px,#efe8da_2px,#d9d0bd_2px,#d9d0bd_3px)]" />
        <div
          className={`relative aspect-[8.5/11] overflow-hidden rounded-r-md rounded-l-sm shadow-[0_30px_50px_-20px_rgba(0,0,0,0.8)] ${theme.bookCloth}`}
        >
          {/* Cloth grain and the hinge along the spine */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0px,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_3px)]" />
          <div className="absolute inset-y-0 left-0 w-[9%] bg-gradient-to-r from-black/45 via-black/15 to-white/5" />
          <div className="absolute inset-y-0 left-[9%] w-px bg-black/30" />

          <div className="absolute inset-x-[16%] top-[13%]">
            <div className="relative rotate-[2deg] bg-[#fbf8f1] p-[6%] pb-[16%] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[37/39] overflow-hidden">
                <Image
                  src={getAssetPath('/images/shared/yearbook-cover-photo.webp')}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <span className="absolute -top-[7%] left-1/2 h-[12%] w-[38%] -translate-x-1/2 rotate-[-4deg] bg-white/55 shadow-sm backdrop-blur-[1px]" />
            </div>
          </div>

          <div className="absolute inset-x-[12%] bottom-[9%] text-center">
            <p className="font-display text-[clamp(1.6rem,3.4vw,2.25rem)] leading-none text-[#f3ead8]/90">
              Our year
            </p>
            <p className="mt-2 text-[10px] font-medium tracking-[0.2em] text-[#f3ead8]/55">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
