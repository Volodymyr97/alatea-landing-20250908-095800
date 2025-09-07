# 🚀 Rocket — Next.js 15 + Sanity v3 (embedded) — ZERO-STEP LOCAL

This starter is **pre-filled** with your Sanity Project ID (`i9mupi94`) and works **immediately**:

## Run locally
```bash
npm i
npm run dev
```
Open:
- Site → http://localhost:3000
- Studio → http://localhost:3000/studio

### How content works
- If there is no published document `page` with `slug = "home"` in your Sanity project, the site will show a **mock Home** (so you see UI instantly).
- To replace the mock with real CMS content:
  1) Go to **Studio** → create document **Page** with `slug = home`.
  2) Add a **Hero** block (+ optional **Features**).
  3) **Publish** the document.
  4) Refresh http://localhost:3000 → you’ll see real content.

### Draft preview (optional)
- If you want Visual Editing / draft mode, add a **Viewer token** to `.env.local`:
  `SANITY_VIEWER_TOKEN=...`
- Then use "Open preview" in Studio (Presentation tool).

## Stack
- Next.js (App Router) + Tailwind + Framer Motion
- Sanity Studio embedded at `/studio`
- GROQ queries + image URL builder
- Mock fallback ensures instant render without CMS setup
