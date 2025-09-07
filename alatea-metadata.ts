import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Alatea Group — Your strategic growth partner', template: '%s — Alatea Group' },
  description: 'We help companies scale: market entry, eCommerce, and high‑stakes negotiations—end‑to‑end growth advisory and execution.',
  keywords: [
    'market expansion', 'go-to-market', 'eCommerce', 'partnerships',
    'B2B growth', 'internationalization', 'negotiations', 'GTM', 'Alatea Group'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Alatea Group — Your strategic growth partner',
    description: 'We help companies scale: market entry, eCommerce, and high‑stakes negotiations—end‑to‑end growth advisory and execution.',
    siteName: 'Alatea Group',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Alatea Group — Your strategic growth partner' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alatea Group — Your strategic growth partner',
    description: 'We help companies scale: market entry, eCommerce, and high‑stakes negotiations—end‑to‑end growth advisory and execution.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};
