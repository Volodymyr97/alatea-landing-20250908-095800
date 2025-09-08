import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    // 👇 миттєво зніме блокування і не вимагатиме списку доменів
    unoptimized: true,
    // 👇 все одно лишаємо явні хости на майбутнє
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
