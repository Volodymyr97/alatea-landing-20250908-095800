// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  // Base URL for absolute/canonical/OG links
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

  // Titles
  title: {
    default: "Alatea Group — Your strategic growth partner",
    template: "%s — Alatea Group",
  },

  // Core SEO
  description:
    "We help companies scale: market entry, eCommerce, and high-stakes negotiations—end-to-end growth advisory and execution.",
  keywords: [
    "market expansion",
    "go-to-market",
    "eCommerce",
    "partnerships",
    "B2B growth",
    "internationalization",
    "negotiations",
    "GTM",
    "Alatea Group",
  ],
  alternates: { canonical: "/" },

  // Social previews
  openGraph: {
    type: "website",
    url: "/",
    title: "Alatea Group — Your strategic growth partner",
    description:
      "We help companies scale: market entry, eCommerce, and high-stakes negotiations—end-to-end growth advisory and execution.",
    siteName: "Alatea Group",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Alatea Group — Your strategic growth partner" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alatea Group — Your strategic growth partner",
    description:
      "We help companies scale: market entry, eCommerce, and high-stakes negotiations—end-to-end growth advisory and execution.",
    images: ["/og-image.png"],
  },

  // Indexing signals (robots.txt route додається окремо у app/robots.ts)
  robots: { index: true, follow: true },

  // Icons & manifest (файли вже у /public або /app)
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",

  // UI color
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // JSON-LD (Organization + ProfessionalService)
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alatea Group",
    url: siteUrl,
    logo: "/icon-192.png",
    sameAs: [] as string[],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Alatea Group",
    url: siteUrl,
    slogan: "Your strategic growth partner",
    areaServed: "Global",
    serviceType: [
      "Market expansion",
      "eCommerce launch",
      "Negotiation support",
      "Go-to-market advisory",
      "Partnership development",
    ],
  };

  return (
    <html lang="en" className={ubuntu.variable} suppressHydrationWarning>
      <body
        className="
          relative min-h-[100svh]
          bg-black text-white antialiased
          overflow-x-clip selection:bg-white/10 selection:text-white
        "
        suppressHydrationWarning
      >
        {/* Structured data for rich results */}
        <Script id="org-ldjson" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(orgJsonLd)}
        </Script>
        <Script id="service-ldjson" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(serviceJsonLd)}
        </Script>

        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
