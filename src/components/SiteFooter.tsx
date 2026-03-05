import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import {
    DADTRACK_APP_STORE_URL_TRACKED,
} from '@/lib/constants';

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500">
                    © {currentYear} Ben Greene. All rights reserved.
                </p>
                <div className="flex items-center gap-3">
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
                    <a
                        href={DADTRACK_APP_STORE_URL_TRACKED}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 hover:text-teal-400 transition-colors duration-200"
                    >
                        DadTrack on the App Store
                    </a>
                </div>
            </div>
        </footer>
    );
}
