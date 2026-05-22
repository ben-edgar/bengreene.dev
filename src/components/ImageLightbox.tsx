'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
}

export function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImageLightboxProps) {
  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;
  const [collapsedForIndex, setCollapsedForIndex] = useState<number | null>(null);
  const descriptionCollapsed = collapsedForIndex === currentIndex;

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/55 hover:bg-black/75 text-white shadow-lg ring-1 ring-white/15 transition-colors"
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Previous Button */}
          {hasMultipleImages && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/55 hover:bg-black/75 text-white shadow-lg ring-1 ring-white/15 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          )}

          {/* Next Button */}
          {hasMultipleImages && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/55 hover:bg-black/75 text-white shadow-lg ring-1 ring-white/15 transition-all hover:scale-110"
              aria-label="Next image"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          )}

          {/* Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Image Info */}
            {(currentImage.title || currentImage.description) && (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  {currentImage.title && (
                    <h3 className="text-2xl font-bold">
                      {currentImage.title}
                    </h3>
                  )}
                  {currentImage.description && (
                    <button
                      className="md:hidden flex-shrink-0 p-1 rounded-lg text-white/60 hover:text-white transition-colors"
                      aria-label={descriptionCollapsed ? 'Show description' : 'Hide description'}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCollapsedForIndex(descriptionCollapsed ? null : currentIndex);
                      }}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${descriptionCollapsed ? 'rotate-180' : ''}`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {currentImage.description && (
                  <div className={`overflow-hidden transition-all duration-200 ${descriptionCollapsed ? 'max-h-0 mt-0 opacity-0' : 'max-h-48 mt-2 opacity-100'}`}>
                    <p className="text-lg text-white/90">
                      {currentImage.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Help Text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm hidden md:block">
            {hasMultipleImages ? 'Use arrow keys to navigate • ' : ''}Press ESC to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
