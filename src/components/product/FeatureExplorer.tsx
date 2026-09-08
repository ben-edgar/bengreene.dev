'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Baby,
  BellRing,
  ChevronLeft,
  ChevronRight,
  FileArchive,
  ImageDown,
  Images,
  Mic,
  Sparkles,
  SmilePlus,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { getAssetPath } from '@/lib/basePath';
import type {
  ProductExtra,
  ProductExtraIconKey,
  ProductFeature,
  ProductPageTheme,
} from '@/lib/productContent';
import { PhoneFrame } from './PhoneFrame';

const EXTRA_ICONS: Record<ProductExtraIconKey, LucideIcon> = {
  mic: Mic,
  images: Images,
  users: Users,
  imageDown: ImageDown,
  sparkles: Sparkles,
  smile: SmilePlus,
  baby: Baby,
  bell: BellRing,
  fileArchive: FileArchive,
};

/** How long scroll-driven selection stays muted after an explicit click. */
const CLICK_LOCK_MS = 600;

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
  theme: ProductPageTheme;
  onOpenLightbox: (index: number) => void;
}

export function FeatureExplorer({ features, extras, theme, onOpenLightbox }: FeatureExplorerProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // The desktop list and the mobile rail are separate DOM, so they keep
  // independent selections.
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [railIndex, setRailIndex] = useState(0);

  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const clickLockUntil = useRef(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const railFrame = useRef<number | null>(null);

  const selectFromList = useCallback((index: number) => {
    clickLockUntil.current = Date.now() + CLICK_LOCK_MS;
    setDesktopIndex(index);
  }, []);

  // Keep the sticky phone in sync with whichever list item is crossing the
  // vertical middle of the viewport.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const items = itemRefs.current.filter((item): item is HTMLLIElement => item !== null);
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLockUntil.current) return;

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

  const paperFocus = `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4efe6] ${theme.paperFocusRing}`;

  return (
    <section className="relative px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#f4efe6] text-slate-800 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ring-1 ring-black/10 lg:rounded-[2rem]">
        {/* Inner top highlight — the sheen of a paper card catching light. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />

        <div className="relative px-5 py-10 sm:px-8 md:px-10 md:py-14 lg:px-12">
          <header className="max-w-2xl text-center lg:text-left">
            <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
              What&apos;s included
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Eight screens from the app, as they look on an iPhone today.
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
                      className={`w-full rounded-2xl px-5 py-4 text-left transition-colors duration-200 ${paperFocus} ${
                        isActive ? 'bg-white shadow-sm ring-1 ring-black/5' : 'bg-transparent hover:bg-white/60'
                      }`}
                    >
                      <span className="flex items-start gap-4">
                        <span aria-hidden="true" className="mt-0.5 text-2xl leading-none">
                          {feature.icon}
                        </span>
                        <span className="block">
                          <span
                            className={`block font-display text-xl font-semibold ${
                              isActive ? theme.paperAccentText : 'text-slate-900'
                            }`}
                          >
                            {feature.title}
                          </span>
                          <span className="mt-1 block text-[15px] leading-relaxed text-slate-700">
                            {feature.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="sticky top-24">
              <button
                type="button"
                aria-label={`Open ${activeFeature.title} screenshot`}
                onClick={() => onOpenLightbox(desktopIndex)}
                className={`block w-full cursor-zoom-in rounded-[2.4rem] ${paperFocus}`}
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
              <p className="mt-3 text-center text-sm text-slate-500">Tap to enlarge</p>
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
                    className={`block w-full cursor-zoom-in rounded-[2.4rem] ${paperFocus}`}
                  >
                    <PhoneFrame
                      src={getAssetPath(feature.image)}
                      alt={feature.alt}
                      priority={index === 0}
                      sizes="(min-width: 768px) 320px, 78vw"
                    />
                  </button>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">
                    <span aria-hidden="true" className="mr-2">
                      {feature.icon}
                    </span>
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate-700">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Previous screen"
                onClick={() => scrollRailTo(railIndex - 1)}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white/70 ${paperFocus}`}
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
                    className={`h-2 rounded-full transition-all duration-200 ${paperFocus} ${
                      index === railIndex ? `w-6 ${theme.paperAccentSolid}` : 'w-2 bg-slate-900/20'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next screen"
                onClick={() => scrollRailTo(railIndex + 1)}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white/70 ${paperFocus}`}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <ExtrasGrid extras={extras} theme={theme} />
        </div>
      </div>
    </section>
  );
}

interface ExtrasGridProps {
  extras: ProductExtra[];
  theme: ProductPageTheme;
}

export function ExtrasGrid({ extras, theme }: ExtrasGridProps) {
  return (
    <div className="mt-12 border-t border-black/10 pt-10 md:mt-16">
      <h3 className="font-display text-2xl font-semibold text-slate-900">Also in the box</h3>
      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {extras.map((extra) => {
          const Icon = EXTRA_ICONS[extra.iconKey];

          return (
            <div key={extra.label} className="flex items-start gap-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${theme.paperAccentText}`} aria-hidden="true" />
              <div>
                <dt className="text-[15px] font-semibold text-slate-900">{extra.label}</dt>
                <dd className="text-[15px] leading-relaxed text-slate-600">{extra.detail}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
