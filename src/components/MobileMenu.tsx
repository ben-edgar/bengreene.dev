'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons/BrandIcons';
import { navLinks } from '@/lib/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 right-0 top-0 z-50 w-72 bg-cloth-deep shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between border-b border-on-cloth/15 p-5">
            <span className="font-display text-2xl leading-none">
              Ben Greene
            </span>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-on-cloth-muted transition-colors hover:bg-on-cloth/10 hover:text-on-cloth"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${isActive
                          ? 'bg-on-cloth/10 text-on-cloth'
                          : 'text-on-cloth-muted hover:bg-on-cloth/5 hover:text-on-cloth'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Links at bottom */}
          <div className="border-t border-on-cloth/15 p-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ben-edgar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-on-cloth/5 px-4 py-2.5 text-sm font-medium text-on-cloth-muted transition-colors duration-200 hover:bg-on-cloth/10 hover:text-on-cloth"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ben-greene-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-on-cloth/5 px-4 py-2.5 text-sm font-medium text-on-cloth-muted transition-colors duration-200 hover:bg-on-cloth/10 hover:text-on-cloth"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
