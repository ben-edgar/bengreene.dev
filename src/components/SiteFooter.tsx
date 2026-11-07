import Link from 'next/link';
import { Github, Linkedin } from '@/components/icons/BrandIcons';
import { navLinks } from '@/lib/navigation';

const SOCIAL_LINK =
    'rounded-lg p-2 text-on-cloth-muted transition-colors duration-200 hover:bg-on-cloth/10 hover:text-on-cloth';

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-cloth-deep text-on-cloth">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <span className="font-display text-2xl leading-none">Ben Greene</span>
                    <nav className="flex flex-wrap gap-x-7 gap-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[15px] text-on-cloth-muted hover:text-on-cloth"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-8 flex flex-col justify-between gap-4 border-t border-on-cloth/15 pt-6 sm:flex-row sm:items-center">
                    <p className="flex flex-wrap gap-x-5 text-sm text-on-cloth-faint">
                        <span>© {currentYear} Ben Greene. All rights reserved.</span>
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-on-cloth">
                            Privacy
                        </Link>
                    </p>
                    <div className="-ml-2 flex items-center gap-1">
                        <a
                            href="https://github.com/ben-edgar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={SOCIAL_LINK}
                            aria-label="GitHub"
                        >
                            <Github className="h-[18px] w-[18px]" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ben-greene-dev/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={SOCIAL_LINK}
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-[18px] w-[18px]" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
