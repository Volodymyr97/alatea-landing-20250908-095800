export default {
  compress: true,
  swcMinify: true,
  images: {
    formats: ["image/avif","image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }]
  }
}
