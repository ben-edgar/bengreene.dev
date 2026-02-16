import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/context/ThemeContext";
import { SITE_CANONICAL_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitScript = `
(() => {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_error) {
    // No-op fallback if localStorage is blocked.
  }
})();
`;

export const metadata: Metadata = {
  title: "Ben Greene – DadTrack App & Portfolio",
  description: "Ben Greene's portfolio and DadTrack, a dad-focused journaling app now available on iOS and Android.",
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
    title: "Ben Greene – DadTrack App & Portfolio",
    description: "Ben Greene's portfolio and DadTrack, a dad-focused journaling app now available on iOS and Android.",
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
    title: "Ben Greene – DadTrack App & Portfolio",
    description: "DadTrack is now available on iOS and Android.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
