"use client";

import React from "react";
import { motion } from "framer-motion";

/* ================= Types ================= */
type ShowcaseItem = {
  _key?: string;
  title: string;
  description?: string;
  imageUrl?: string;   // пряме посилання (можна з CDN Sanity)
  // якщо тягнеш Sanity image, просто проектуй url: image{asset->{url}}
  image?: { asset?: { url?: string } };
  alt?: string;
  href?: string;       // опц. посилання з картки
};

export type ServicesShowcaseData = {
  title: string;
  subtitle?: string;
  cta?: { text?: string; url?: string };
  items: ShowcaseItem[];

  palette?: {
    sectionBg?: string;
    heading?: string;
    subheading?: string;
    ctaBg?: string;
    ctaText?: string;
    cardTitle?: string;
    cardBody?: string;
    cardBg?: string;
    cardStroke?: string;
    imgOverlay?: string; // градієнт/оверлей зверху фото
    glow?: string;       // радіальний глоу навколо картки
  };

  typography?: {
    headingPx?: number;
    subtitlePx?: number;
    cardTitlePx?: number;
    bodyPx?: number;
    headingFont?: string;
    bodyFont?: string;
    ctaPx?: number;
  };

  layout?: {
    containerMax?: number;
    leftW?: number;       // ширина лівої колонки
    gap?: number;         // відступ між колонками
    pt?: number;
    pb?: number;
    gridGap?: number;     // гатер між картками
    imgH?: number;        // висота фото (px)
    imgRadius?: number;
    cardRadius?: number;
    columns?: 1 | 2;      // кількість колонок (desktop)
  };
};

/* ============== helpers ============== */
const ease = [0.22, 1, 0.36, 1] as const;
const V = {
  left:   { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } },
  grid:   { visible: { transition: { staggerChildren: 0.14 } } },
  cardIn: { hidden: { opacity: 0, y: 14, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } } },
};

function getImgUrl(it: ShowcaseItem) {
  return it.imageUrl || it.image?.asset?.url || "";
}

/* ============== component ============== */
export default function ServicesShowcaseSection({ data }: { data: ServicesShowcaseData }) {
  const {
    title,
    subtitle,
    cta,
    items = [],
    palette = {},
    typography = {},
    layout = {},
  } = data;

  /* colors */
  const {
    sectionBg = "#05060E",
    heading    = "#E6E9F5",
    subheading = "rgba(230,233,245,.80)",
    ctaBg      = "#4C76FF",
    ctaText    = "#0B0E17",
    cardTitle  = "#E6E9F5",
    cardBody   = "#D8DEF3",
    cardBg     = "#131A39",
    cardStroke = "#2E3E86",
    imgOverlay = "linear-gradient(180deg, rgba(6,9,24,0) 40%, rgba(6,9,24,.55) 100%)",
    glow       = "radial-gradient(60% 80% at 50% 50%, rgba(34,46,104,.28), rgba(0,0,0,0))",
  } = palette;

  /* type */
  const {
    headingPx   = 44,
    subtitlePx  = 22,
    cardTitlePx = 22,
    bodyPx      = 18,
    ctaPx       = 18,
    headingFont = "var(--font-ubuntu, system-ui)",
    bodyFont    = "var(--font-ubuntu, system-ui)",
  } = typography;

  /* layout */
  const {
    containerMax = 1440,
    leftW        = 460,
    gap          = 56,
    pt           = 120,
    pb           = 120,
    gridGap      = 40,
    imgH         = 220,
    imgRadius    = 18,
    cardRadius   = 22,
    columns      = 2,
  } = layout;

  const cols = Math.max(1, Math.min(2, columns));

  return (
    <section className="not-prose w-full" style={{ background: sectionBg }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .svc-container{max-width:${containerMax}px;margin-inline:auto;}
            .svc-wrap{padding:${pt}px 24px ${pb}px;}
            .svc-grid{
              display:grid;
              grid-template-columns:${leftW}px ${gap}px minmax(0,1fr);
              align-items:start;
            }
            .svc-cards{
              display:grid;
              grid-template-columns:repeat(${cols}, minmax(0,1fr));
              gap:${gridGap}px;
            }
            @media (max-width:1279.98px){
              .svc-wrap{padding:72px 20px;}
              .svc-grid{grid-template-columns:1fr; row-gap:32px;}
              .svc-cards{grid-template-columns:1fr; gap:28px;}
            }
          `,
        }}
      />

      <div className="svc-container svc-wrap">
        <div className="svc-grid">
          {/* LEFT */}
          <motion.div
            variants={V.left}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.55 }}
          >
            <h2
              className="font-semibold tracking-[-0.01em]"
              style={{ color: heading, fontFamily: headingFont, fontSize: headingPx, lineHeight: 1.15 }}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="mt-4"
                style={{ color: subheading, fontFamily: bodyFont, fontSize: subtitlePx, lineHeight: 1.55 }}
              >
                {subtitle}
              </p>
            )}

            {cta?.text && (
              <motion.a
                href={cta.url || "#"}
                className="inline-flex items-center mt-8 px-6 py-3 rounded-xl font-medium"
                style={{ background: ctaBg, color: ctaText, fontSize: ctaPx }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {cta.text}
              </motion.a>
            )}
          </motion.div>

          {/* GAP */}
          <div aria-hidden />

          {/* RIGHT – CARDS */}
          <motion.div
            className="svc-cards"
            variants={V.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {items.slice(0, 4).map((it, i) => {
              const url = getImgUrl(it);
              return (
                <motion.article
                  key={it._key ?? i}
                  variants={V.cardIn}
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: cardRadius,
                    background: cardBg,
                    border: `1.5px solid ${cardStroke}`,
                    boxShadow: "0 40px 120px rgba(22,29,54,.45), inset 0 1px 0 rgba(255,255,255,.04)",
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.28, ease }}
                >
                  {/* glow */}
                  <div
                    className="pointer-events-none absolute -inset-4 rounded-[inherit]"
                    style={{ background: glow, opacity: 0.8 }}
                    aria-hidden
                  />

                  {/* image */}
                  {url && (
                    <div
                      className="relative overflow-hidden"
                      style={{ height: imgH, borderTopLeftRadius: cardRadius, borderTopRightRadius: cardRadius }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <motion.img
                        src={url}
                        alt={it.alt || ""}
                        className="w-full h-full object-cover"
                        style={{ borderTopLeftRadius: imgRadius, borderTopRightRadius: imgRadius }}
                        whileHover={{ scale: 1.045 }}
                        transition={{ duration: 0.45, ease }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: imgOverlay }}
                        aria-hidden
                      />
                    </div>
                  )}

                  {/* content */}
                  <div className="p-6 md:p-7">
                    <h3
                      className="font-extrabold uppercase tracking-wide"
                      style={{ color: cardTitle, fontSize: cardTitlePx, lineHeight: 1.2 }}
                    >
                      {it.title}
                    </h3>

                    {it.description && (
                      <p
                        className="mt-3 leading-8"
                        style={{ color: cardBody, fontSize: bodyPx, fontFamily: bodyFont }}
                      >
                        {it.description}
                      </p>
                    )}

                    {it.href && (
                      <motion.a
                        href={it.href}
                        className="mt-4 inline-flex items-center gap-2 text-sm"
                        style={{ color: cardTitle }}
                        whileHover={{ x: 2 }}
                      >
                        Learn more
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M13 5l7 7-7 7M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
