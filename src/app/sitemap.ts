import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://alatea.group";
  const now = new Date();
  return [
    { url: `${base}/`,       lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
  ];
}
