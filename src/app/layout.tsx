import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-ubuntu",
  display: "swap",
});

const SITE_NAME = "Alatea Group";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://alatea.group";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Alatea Group — Your strategic growth partner",
    template: "%s | Alatea Group",
  },
  description:
    "We help brands and distributors expand into new markets, build e-commerce, and drive sustainable growth through end-to-end commercial execution.",
  keywords: [
    "Alatea Group",
    "market expansion",
    "business growth",
    "distributors",
    "e-commerce",
    "international sales",
    "negotiations",
    "go-to-market",
  ],
  authors: [{ name: "Alatea Group" }],
  creator: "Alatea Group",
  publisher: "Alatea Group",
  category: "Business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "Alatea Group — Your strategic growth partner",
    description:
      "End-to-end support: market entry, e-commerce set-up, distribution and negotiations.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Alatea Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alatea Group — Your strategic growth partner",
    description:
      "End-to-end support: market entry, e-commerce set-up, distribution and negotiations.",
    images: ["/og.jpg"],
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  colorScheme: "dark",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/favicon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/android-chrome-512x512.png`,
    sameAs: [],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={query}`,
      "query-input": "required name=query",
    },
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
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLd, websiteLd]),
          }}
        />
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
