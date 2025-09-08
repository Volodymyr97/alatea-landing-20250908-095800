import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
    // необов’язково: формати сучасних картинок
    formats: ["image/avif", "image/webp"],
    // якщо будеш тягнути SVG як <Image> з Sanity:
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
