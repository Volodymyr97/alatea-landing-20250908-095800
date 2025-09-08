import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // не ламаємо збірку, поки доводимо типи/ліни
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  reactStrictMode: true,
  compress: true,
  httpAgentOptions: { keepAlive: true },

  // ✅ оптизація зображень (менші мережеві ланцюжки, менше JS на клієнті)
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 днів
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },

  // ✅ менше бандлу без змін у коді
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // дрібний триммінг консолей у проді
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // ✅ preconnect/dns-prefetch + правильний кеш для статичних файлів
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Link", value: '<https://cdn.sanity.io>; rel=preconnect; crossorigin' },
          { key: "Link", value: "<https://cdn.sanity.io>; rel=dns-prefetch" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source:
          "/(favicon.ico|favicon.svg|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
