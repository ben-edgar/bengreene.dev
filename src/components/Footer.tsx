import Link from 'next/link';
import {
  DADTRACK_APP_STORE_URL_TRACKED,
  DADTRACK_GOOGLE_PLAY_URL_TRACKED,
} from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 transition-colors hover:text-primary-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 transition-colors hover:text-primary-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/dadtrack" className="text-slate-400 transition-colors hover:text-primary-300">
                  DadTrack
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/ben-edgar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-primary-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ben-greene-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-primary-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={DADTRACK_APP_STORE_URL_TRACKED}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-primary-300"
                >
                  App Store
                </a>
              </li>
              <li>
                <a
                  href={DADTRACK_GOOGLE_PLAY_URL_TRACKED}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-primary-300"
                >
                  Google Play
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="mb-4 font-semibold text-white">About</h3>
            <p className="text-sm text-slate-400">
              Engineering leader building DadTrack, a journaling app for dads. Now available on iOS and Android.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-sm text-slate-400">
            © {currentYear} Ben Greene. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
