import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZetaVex Tech Solutions — Innovate · Develop · Deliver',
  description:
    'ZetaVex Tech Solutions transforms ambitious ideas into scalable digital solutions. Enterprise Web Apps, Custom SaaS Platforms, Mobile Apps, and Cloud Infrastructure engineered across all modern tech stacks by Vivek Chauhan.',
  keywords: [
    'ZetaVex Tech Solutions',
    'Vivek Chauhan',
    'Full Stack Web Development',
    'Universal Tech Stack Development',
    'Custom SaaS Development',
    'Mobile App Solutions',
    'Rewari Haryana Software Company',
    'Enterprise Cloud Solutions',
  ],
  authors: [{ name: 'Vivek Chauhan', url: 'https://zetavextech.com' }],
  creator: 'Vivek Chauhan',
  metadataBase: new URL('https://zetavextech.com'),
  openGraph: {
    title: 'ZetaVex Tech Solutions — Innovate · Develop · Deliver',
    description: 'Transforming ambitious ideas into scalable digital solutions across all tech stacks.',
    url: 'https://zetavextech.com',
    siteName: 'ZetaVex Tech Solutions',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#FAF8F5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#0A0A0B] antialiased selection:bg-[#FF5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}
