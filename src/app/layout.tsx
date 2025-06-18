import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import NavigateToTop from '@/components/navigate-to-top';

import { HOME_META_DATA } from '@/constants/meta-data';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = HOME_META_DATA

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />

        {children}
        <NavigateToTop />
        <Footer />
      </body>
    </html>
  );
}
