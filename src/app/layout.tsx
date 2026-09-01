import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { 
  DEFAULT_SEO, 
  PRIMARY_KEYWORDS, 
  SITE_URL, 
  getOrganizationSchema, 
  getWebSiteSchema 
} from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ZetaVex Tech Solutions — Web, SaaS & Healthcare Software Development Company',
    template: '%s | ZetaVex Tech Solutions',
  },
  description: DEFAULT_SEO.description,
  keywords: PRIMARY_KEYWORDS,
  authors: [{ name: 'Vivek Chauhan', url: SITE_URL }],
  creator: 'Vivek Chauhan',
  publisher: 'ZetaVex Tech Solutions',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZetaVex Tech Solutions — Web, SaaS & Healthcare Software Development Company',
    description: DEFAULT_SEO.description,
    url: SITE_URL,
    siteName: DEFAULT_SEO.siteName,
    locale: DEFAULT_SEO.locale,
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'ZetaVex Tech Solutions Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZetaVex Tech Solutions — Web, SaaS & Healthcare Software Development Company',
    description: DEFAULT_SEO.description,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#FAF8F5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        {/* Global Schema.org JSON-LD */}
        <JsonLd data={[orgSchema, webSiteSchema]} />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#0A0A0B] antialiased selection:bg-[#FF5500] selection:text-white">
        {children}
      </body>
    </html>
  );
}
