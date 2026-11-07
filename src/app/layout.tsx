import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { SITE_CANONICAL_URL } from "@/lib/constants";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { SiteFooter } from "@/components/SiteFooter";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

// The display face inside the apps, so the site and the screenshots match.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// The apps' handwriting, kept to polaroid captions.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#15303a",
};

export const metadata: Metadata = {
  title: "Ben Greene – DadTrack & MomTrack App Portfolio",
  description: "Ben Greene's portfolio and the ParentTrack apps: DadTrack (iOS & Android) and MomTrack (iOS) — journaling apps for parents who want to capture everyday memories.",
  metadataBase: new URL(SITE_CANONICAL_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Ben Greene – DadTrack & MomTrack App Portfolio",
    description: "Ben Greene's portfolio and the ParentTrack apps: DadTrack (iOS & Android) and MomTrack (iOS) — journaling apps for parents who want to capture everyday memories.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1024,
        height: 1024,
        alt: "DadTrack app icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ben Greene – DadTrack & MomTrack",
    description: "DadTrack (iOS & Android) and MomTrack (iOS) — journaling apps for parents, built by a dad.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${instrumentSerif.variable} ${caveat.variable} antialiased`}
      >
        {/* Before page content on purpose: effects fire in tree order, and /get needs
            window.gtag to exist by the time its own effect runs. */}
        <Analytics />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
