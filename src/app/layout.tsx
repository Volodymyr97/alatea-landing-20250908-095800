import "./globals.css";
import { ubuntu } from "@/app/fonts";
import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";
import Script from "next/script";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400","700"], variable: "--font-ubuntu", display: "swap" });

// ── SEO base ────────────────────────────────────────────────────────────────
const siteUrl = "https://alateagroup.com";
const siteName = "Alatea Group";
const siteTitle = "Alatea Group — Strategic Growth Partner";
const siteDescription =
  "Alatea Group helps brands expand internationally and optimize sales & distribution with go-to-market strategy, partner negotiations, and e-commerce growth.";

// Next metadata (глобально для всіх сторінок)
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: "%s | Alatea Group", // підсторінки будуть "... | Alatea Group"
  },
  description: siteDescription,
  keywords: [
    "Alatea Group",
    "market expansion",
    "international expansion",
    "distribution",
    "sales advisory",
    "go-to-market",
    "multi-channel optimization",
    "negotiation support",
    "e-commerce growth",
    "commercial strategy",
    "product launch",
    "partner evaluation",
    "pricing analysis",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      { url: "/web-app-manifest-512x512.png", width: 512, height: 512, alt: "Alatea Group" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/web-app-manifest-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "Business",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"    className={`${ubuntu.variable} ${ubuntu.className} ${`${ubuntu.variable}`} ${ubuntu.className} ${ubuntu.variable} ${ubuntu.className} ${ubuntu.variable}`} suppressHydrationWarning>
      <body
        className="
          relative min-h-[100svh]
          bg-black text-white antialiased
          overflow-x-clip selection:bg-white/10 selection:text-white
         ${ubuntu.variable}"
        suppressHydrationWarning
      >
        {/* JSON-LD Organization + каталог сервісів */}
        <Script id="ld-org" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
            logo: `${siteUrl}/web-app-manifest-512x512.png`,
            slogan: "Your strategic growth partner",
            description: siteDescription,
            areaServed: "Worldwide",
            offers: {
              "@type": "OfferCatalog",
              name: "Consulting Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategic distribution & sales advisory" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "International market expansion" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial strategy & product launch" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Negotiation support" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce growth" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pricing & partner evaluation" } },
              ],
            },
          })}
        </Script>

        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
