'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons/BrandIcons';
import { navLinks } from '@/lib/navigation';
import { MobileMenu } from './MobileMenu';

const SOCIAL_LINK =
  'rounded-lg p-2 text-on-cloth-muted transition-colors duration-200 hover:bg-on-cloth/10 hover:text-on-cloth';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled ? 'bg-cloth-deep shadow-[0_8px_24px_-16px_rgba(0,0,0,0.8)]' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-[1.75rem] leading-none text-on-cloth">
            Ben Greene
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`border-b-2 py-1 text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-accent text-on-cloth'
                      : 'border-transparent text-on-cloth-muted hover:text-on-cloth'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com/ben-edgar"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:block ${SOCIAL_LINK}`}
              aria-label="GitHub"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/ben-greene-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:block ${SOCIAL_LINK}`}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-[18px] w-[18px]" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden ${SOCIAL_LINK}`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
