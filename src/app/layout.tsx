import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ben Greene – DadTrack App & Portfolio",
  description: "Ben Greene's portfolio and DadTrack, a dad-focused journaling app for capturing moments with your kids.",
  openGraph: {
    title: "Ben Greene – DadTrack App & Portfolio",
    description: "Ben Greene's portfolio and DadTrack, a dad-focused journaling app.",
    type: "website",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
