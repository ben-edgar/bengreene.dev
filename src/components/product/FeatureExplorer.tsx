'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Baby,
  BellRing,
  BookHeart,
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Cloud,
  FileArchive,
  Flame,
  ImageDown,
  Images,
  LayoutGrid,
  Mic,
  NotebookPen,
  PenLine,
  Search,
  Sparkles,
  SmilePlus,
  Star,
  Sticker,
  Tablet,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { getAssetPath } from '@/lib/basePath';
import type {
  ProductExtra,
  ProductExtraIconKey,
  ProductFeature,
  ProductFeatureIconKey,
} from '@/lib/productContent';
import { PHONE_OUTLINE_RADIUS, PhoneFrame } from './PhoneFrame';

const FEATURE_ICONS: Record<ProductFeatureIconKey, LucideIcon> = {
  timeline: BookHeart,
  milestone: Star,
  entry: NotebookPen,
  composer: PenLine,
  recap: CalendarHeart,
  stickers: Sticker,
  streak: Flame,
  search: Search,
};

const EXTRA_ICONS: Record<ProductExtraIconKey, LucideIcon> = {
  mic: Mic,
  images: Images,
  users: Users,
  widgets: LayoutGrid,
  sparkles: Sparkles,
  smile: SmilePlus,
  baby: Baby,
  bell: BellRing,
  tablet: Tablet,
  cloud: Cloud,
  imageDown: ImageDown,
  fileArchive: FileArchive,
};

function NewTag() {
  return (
    <span className="ml-2 inline-block translate-y-[-2px] rounded-sm bg-ink-accent/10 px-1.5 py-0.5 align-middle font-sans text-xs font-semibold text-ink-accent">
      New
    </span>
  );
}

function FeatureIcon({ iconKey, className }: { iconKey: ProductFeatureIconKey; className: string }) {
  const Icon = FEATURE_ICONS[iconKey];

  return <Icon className={className} aria-hidden="true" />;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}

interface FeatureExplorerProps {
  features: ProductFeature[];
  extras: ProductExtra[];
  onOpenLightbox: (index: number) => void;
}

export function FeatureExplorer({ features, extras, onOpenLightbox }: FeatureExplorerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // The desktop list and the mobile rail are separate DOM, so they keep
  // independent selections.
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [railIndex, setRailIndex] = useState(0);

  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  // Once the user explicitly clicks a list item, the phone stays pinned to
  // that selection and scroll-driven selection is muted for good (until the
  // component remounts / page reloads).
  const pinnedByClick = useRef(false);
  const railRef = useRef<HTMLDivElement | null>(null);
  const railFrame = useRef<number | null>(null);

  const selectFromList = useCallback((index: number) => {
    pinnedByClick.current = true;
    setDesktopIndex(index);
  }, []);

  // Keep the sticky phone in sync with whichever list item is crossing the
  // vertical middle of the viewport, until the user picks one explicitly.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const items = itemRefs.current.filter((item): item is HTMLLIElement => item !== null);
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (pinnedByClick.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;

        const index = items.indexOf(visible.target as HTMLLIElement);
        if (index >= 0) setDesktopIndex(index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [features.length]);

  const readRailIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const slides = Array.from(rail.querySelectorAll<HTMLElement>('[data-slide]'));
    if (slides.length === 0) return;

    const center = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        nearest = index;
      }
    });

    setRailIndex(nearest);
  }, []);

  const handleRailScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (railFrame.current !== null) return;

    railFrame.current = window.requestAnimationFrame(() => {
      railFrame.current = null;
      readRailIndex();
    });
  }, [readRailIndex]);

  useEffect(
    () => () => {
      if (railFrame.current !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame(railFrame.current);
      }
    },
    [],
  );

  const scrollRailTo = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;

      const slides = Array.from(rail.querySelectorAll<HTMLElement>('[data-slide]'));
      const slide = slides[Math.max(0, Math.min(index, slides.length - 1))];
      if (!slide) return;

      rail.scrollTo({
        left: slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion],
  );

  const activeFeature = features[desktopIndex] ?? features[0];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="page-sheet">
        <div className="px-5 py-10 sm:px-8 md:px-10 md:py-14 lg:px-12">
          <header className="max-w-2xl">
            <h2 className="font-display text-4xl text-ink md:text-5xl">What&apos;s included</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Eight screens from version 1.4, as they look on an iPhone today.
            </p>
          </header>

          {/* Desktop: a list of features beside a sticky phone. */}
          <div className="mt-10 hidden lg:grid lg:grid-cols-[1fr_minmax(300px,360px)] lg:items-start lg:gap-12">
            <ul className="space-y-1">
              {features.map((feature, index) => {
                const isActive = index === desktopIndex;

                return (
                  <li
                    key={feature.title}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => selectFromList(index)}
                      className={`w-full rounded-md px-5 py-4 text-left text-ink transition-colors duration-200 ${
                        isActive ? 'bg-paper-raised shadow-sm' : 'bg-transparent hover:bg-paper-raised/60'
                      }`}
                    >
                      <span className="flex items-start gap-4">
                        <FeatureIcon iconKey={feature.iconKey} className="mt-1 h-5 w-5 shrink-0 text-ink-accent" />
                        <span className="block">
                          <span
                            className={`block font-display text-2xl leading-tight ${
                              isActive ? 'text-ink-accent' : 'text-ink'
                            }`}
                          >
                            {feature.title}
                            {feature.isNew ? <NewTag /> : null}
                          </span>
                          <span className="mt-1 block text-[15px] leading-relaxed text-ink-muted">
                            {feature.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Width is capped by viewport height so the whole phone stays on screen. */}
            <div className="sticky top-24 mx-auto w-full max-w-[min(100%,calc((100svh-9.5rem)/2.1))]">
              <button
                type="button"
                aria-label={`Open ${activeFeature.title} screenshot`}
                onClick={() => onOpenLightbox(desktopIndex)}
                className={`block w-full cursor-zoom-in text-ink-accent ${PHONE_OUTLINE_RADIUS}`}
              >
                <PhoneFrame sizes="340px">
                  {features.map((feature, index) => (
                    <Image
                      key={feature.image}
                      src={getAssetPath(feature.image)}
                      alt={feature.alt}
                      fill
                      sizes="340px"
                      priority={index === 0}
                      aria-hidden={index === desktopIndex ? undefined : true}
                      className={`object-cover object-top transition-opacity duration-200 motion-reduce:transition-none ${
                        index === desktopIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </PhoneFrame>
              </button>
              <p className="mt-3 text-center text-sm text-ink-muted">Tap to enlarge</p>
            </div>
          </div>

          {/* Mobile / tablet: a scroll-snap rail. */}
          <div className="mt-8 lg:hidden">
            <div
              ref={railRef}
              onScroll={handleRailScroll}
              className="relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:scroll-px-8 sm:px-8 md:-mx-10 md:scroll-px-10 md:px-10"
            >
              {features.map((feature, index) => (
                <div key={feature.title} data-slide className="w-[min(78vw,320px)] shrink-0 snap-center">
                  <button
                    type="button"
                    aria-label={`Open ${feature.title} screenshot`}
                    onClick={() => onOpenLightbox(index)}
                    className={`block w-full cursor-zoom-in text-ink-accent ${PHONE_OUTLINE_RADIUS}`}
                  >
                    <PhoneFrame
                      src={getAssetPath(feature.image)}
                      alt={feature.alt}
                      priority={index === 0}
                      sizes="(min-width: 768px) 320px, 78vw"
                    />
                  </button>
                  <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                    <FeatureIcon
                      iconKey={feature.iconKey}
                      className="mr-2 inline h-5 w-5 -translate-y-0.5 text-ink-accent"
                    />
                    {feature.title}
                    {feature.isNew ? <NewTag /> : null}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous screen"
                onClick={() => scrollRailTo(railIndex - 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-paper-raised"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5">
                {features.map((feature, index) => (
                  <button
                    key={feature.title}
                    type="button"
                    aria-label={`Go to ${feature.title}`}
                    aria-current={index === railIndex ? 'true' : undefined}
                    onClick={() => scrollRailTo(index)}
                    className={`h-2 rounded-full text-ink-accent transition-all duration-200 ${
                      index === railIndex ? 'w-6 bg-ink-accent' : 'w-2 bg-ink/20'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next screen"
                onClick={() => scrollRailTo(railIndex + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-paper-raised"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <ExtrasGrid extras={extras} />
        </div>
      </div>
    </section>
  );
}

interface ExtrasGridProps {
  extras: ProductExtra[];
}

export function ExtrasGrid({ extras }: ExtrasGridProps) {
  return (
    <div className="mt-12 border-t border-ink/10 pt-10 md:mt-16">
      <h3 className="font-display text-3xl text-ink">Also in the box</h3>
      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {extras.map((extra) => {
          const Icon = EXTRA_ICONS[extra.iconKey];

          return (
            <div key={extra.label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink-accent" aria-hidden="true" />
              <div>
                <dt className="text-[15px] font-semibold text-ink">
                  {extra.label}
                  {extra.isNew ? <NewTag /> : null}
                </dt>
                <dd className="text-[15px] leading-relaxed text-ink-muted">{extra.detail}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
