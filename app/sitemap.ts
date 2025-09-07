import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/services', '/cases', '/about', '/contact', '/privacy', '/terms'].map((path) => ({ 
    url: `${base}${path}`,
    lastModified: new Date('2025-09-07'),
    changeFrequency: 'monthly',
    priority: path ? 0.7 : 1.0,
  }));
  return routes;
}
