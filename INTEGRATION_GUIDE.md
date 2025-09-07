# Alatea Group — SEO & Favicon Integration (Next.js App Router)

1) Copy `public/` and `app/` into your project (merge).
2) Add to `.env`:
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
3) In `src/app/layout.tsx`:
   - Paste the contents of `alatea-metadata.ts` (adjust imports).
   - Optionally import and render `<JsonLd />` from `alatea-jsonld.tsx` inside RootLayout.
4) Update `app/sitemap.ts` routes to match your pages.
5) Verify `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and OG tags.
