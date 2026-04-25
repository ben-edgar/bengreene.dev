import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import { navLinks } from '@/lib/navigation';

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Top row: brand + nav links */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                    <span className="font-bold text-lg bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                        Ben Greene
                    </span>
                    <nav className="flex flex-wrap gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom row: copyright + social icons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Ben Greene. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1">
                        <a
                            href="https://github.com/ben-edgar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ben-greene-dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all duration-200"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
