'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CarouselSlide {
  src: string;
  alt: string;
  title?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export function Carousel({
  slides,
  autoPlay: _autoPlay = true,
  autoPlayInterval: _autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex((index + slides.length) % slides.length);
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg">
      {/* Image Container */}
      <div className="relative w-full" style={{ minHeight: '400px', maxHeight: '600px' }}>
        <Image
          src={currentSlide.src}
          alt={currentSlide.alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Title Overlay */}
      {currentSlide.title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <p className="text-white text-lg font-semibold">{currentSlide.title}</p>
        </div>
      )}

      {/* Previous Button */}
      {showArrows && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Previous slide"
        >
          ←
        </button>
      )}

      {/* Next Button */}
      {showArrows && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Next slide"
        >
          →
        </button>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 w-2 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
