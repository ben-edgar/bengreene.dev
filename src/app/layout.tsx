import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_CANONICAL_URL } from "@/lib/constants";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
