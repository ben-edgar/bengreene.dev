'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageLightboxProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  /**
   * Width / height of the images, e.g. "1080 / 2347". On wide screens the
   * photo box then hugs the image, so the caption can sit right beside it.
   */
  imageAspect?: string;
}

/** How far (px) or how fast (px/s) a horizontal drag must go to change photo. */
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 500;

const ROUND_BUTTON =
  'flex items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80';

/**
 * Full-screen viewer for the product screenshots (tall phone captures).
 *
 * The caption never sits on top of the photo. On phones it's a panel under
 * the photo: collapsed it shows the title and a two-line preview; expanded it
 * grows to at most 40% of the screen and scrolls, and the photo shrinks to
 * stay fully visible. On wider screens the caption is a side panel. Swipe
 * left or right on the photo to move between images.
 */
export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  imageAspect,
}: ImageLightboxProps) {
  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;
  // Kept while paging, so a reader who expands the caption keeps it open.
  const [captionExpanded, setCaptionExpanded] = useState(false);
  const descriptionId = useId();
  // A mouse drag that ends off the photo fires a click on the backdrop; that
  // click must not close the viewer. The flag is cleared at the start of
  // every pointer interaction, so a drag can only ever swallow its own click
  // (touch swipes and drags released on the photo produce none).
  const justDragged = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        onNext();
      }
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrevious, hasMultipleImages]);

  if (!currentImage) return null;

  const hasCaption = Boolean(currentImage.title || currentImage.description);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.title ?? currentImage.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/[0.97] lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:px-28 lg:py-20"
          onPointerDownCapture={() => {
            justDragged.current = false;
          }}
          onClick={() => {
            if (justDragged.current) {
              justDragged.current = false;
              return;
            }
            onClose();
          }}
        >
          {/* Top bar: in the flow on phones so it never covers the photo. */}
          <div className="flex min-h-14 shrink-0 items-center justify-between px-3 pt-[env(safe-area-inset-top)] lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:h-auto lg:p-4">
            {hasMultipleImages ? (
              <div className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium tabular-nums text-white/90">
                {currentIndex + 1} / {images.length}
              </div>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={onClose}
              className={`${ROUND_BUTTON} h-11 w-11`}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Photo */}
          <div
            className={`relative flex min-h-0 flex-1 items-center justify-center px-12 py-2 lg:static lg:p-0 ${
              // Leave room for the caption panel (22rem / 24rem) and the gap, so
              // a tall, narrow window shrinks the photo instead of overflowing.
              imageAspect
                ? 'lg:h-full lg:min-w-0 lg:max-w-[calc(100%-25rem)] lg:flex-none xl:max-w-[calc(100%-27rem)]'
                : 'lg:self-stretch'
            }`}
          >
            {hasMultipleImages && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className={`${ROUND_BUTTON} absolute left-1.5 top-1/2 z-10 h-10 w-10 -translate-y-1/2 lg:left-6 lg:h-12 lg:w-12`}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
              </button>
            )}

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              drag={hasMultipleImages ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragStart={() => {
                justDragged.current = true;
              }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
                  onNext();
                } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
                  onPrevious();
                }
              }}
              style={imageAspect ? { aspectRatio: imageAspect } : undefined}
              className={`relative h-full w-full cursor-grab active:cursor-grabbing ${imageAspect ? 'lg:w-auto lg:max-w-full' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                draggable={false}
                className="pointer-events-none select-none object-contain"
                priority
              />
            </motion.div>

            {hasMultipleImages && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className={`${ROUND_BUTTON} absolute right-1.5 top-1/2 z-10 h-10 w-10 -translate-y-1/2 lg:right-6 lg:h-12 lg:w-12`}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Caption */}
          {hasCaption && (
            <div
              className="w-full shrink-0 self-center rounded-t-2xl bg-slate-900/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 text-white ring-1 ring-white/10 md:max-w-2xl lg:w-[22rem] lg:rounded-2xl lg:p-6 xl:w-[24rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                {currentImage.title && (
                  <h3 className="font-display text-lg font-semibold leading-snug lg:text-2xl">
                    {currentImage.title}
                  </h3>
                )}
                {currentImage.description && (
                  <button
                    type="button"
                    className="-mr-1.5 -mt-1 flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 lg:hidden"
                    aria-expanded={captionExpanded}
                    aria-controls={descriptionId}
                    onClick={() => setCaptionExpanded((expanded) => !expanded)}
                  >
                    {captionExpanded ? 'Less' : 'More'}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${captionExpanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {currentImage.description && (
                <div
                  id={descriptionId}
                  data-expanded={captionExpanded}
                  onClick={captionExpanded ? undefined : () => setCaptionExpanded(true)}
                  className={`mt-1.5 text-[15px] leading-relaxed text-white/80 lg:mt-3 lg:line-clamp-none lg:max-h-[60vh] lg:cursor-auto lg:overflow-y-auto lg:text-base ${
                    captionExpanded
                      ? 'max-h-[40svh] overflow-y-auto overscroll-contain pb-2'
                      : 'line-clamp-2 cursor-pointer'
                  }`}
                >
                  <p>{currentImage.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Help Text */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-sm text-white/50 lg:block">
            {hasMultipleImages ? 'Use arrow keys to navigate • ' : ''}Press ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
