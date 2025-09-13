"use client";

import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

type CTA = { text?: string; url?: string };
type Item = {
  _key?: string;
  title: string;
  description?: string;
  image?: any;        // Sanity image
  imageUrl?: string;  // direct URL (fallback)
  alt?: string;
  href?: string;
};

export type GrowthPartnerData = {
  title: string;
  cta?: CTA;
  items: Item[];

  palette?: {
    sectionBg?: string;
    headingColor?: string;
    bodyColor?: string;
    cardBg?: string;
    cardText?: string;
    buttonBg?: string;
    buttonText?: string;
    stroke?: string;         // якщо треба рамка: інакше ставимо transparent
  };
  typography?: {
    headingPx?: number;
    cardTitlePx?: number;
    bodyPx?: number;
    headingFont?: string;
    bodyFont?: string;
  };
  layout?: {
    containerMax?: number;
    leftW?: number;      // ширина лівої колонки з заголовком
    gap?: number;
    radius?: number;     // радіус картки
    pt?: number;
    pb?: number;
    cardRatio?: number;  // width/height, наприклад 1.78 для ~16/9
  };
};

const ease = [0.22, 1, 0.36, 1] as const;
const V = {
  heading: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } },
  grid:    { visible: { transition: { staggerChildren: 0.12 } } },
  card:    { hidden: { opacity: 0, y: 16, scale: .985 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } } },
};

function imgSrc(it: Item, w = 1200) {
  if (it?.imageUrl) return it.imageUrl;
  if (it?.image) {
    try { return urlFor(it.image).width(w).auto("format").url(); } catch {}
  }
  return "";
}

export default function GrowthPartnerSection({ data }: { data: GrowthPartnerData }) {
  const { title, cta, items = [], palette, typography, layout } = data;

  const {
    sectionBg = "#05060E",
    headingColor = "#E6E9F5",
    bodyColor = "#D8DEF3",
    cardBg = "rgba(16,24,64,.35)",
    cardText = "#E7ECFF",
    buttonBg = "#4677FF",
    buttonText = "#FFFFFF",
    stroke = "transparent",              // ❗️дефолт: без обводки
  } = palette || {};

  const {
    headingPx = 48,
    cardTitlePx = 22,
    bodyPx = 18,
    headingFont = "var(--font-ubuntu, system-ui)",
    bodyFont = "var(--font-ubuntu, system-ui)",
  } = typography || {};

  const {
    containerMax = 1440,
    leftW = 520,
    gap = 56,
    radius = 22,                         // трохи менший = акуратніше
    pt = 96,
    pb = 110,
    cardRatio = 1.78,                    // 16/9
  } = layout || {};

  // окремий радіус для фото (трішки менший від картки)
  const imgRadius = Math.max(10, radius - 4);

  return (
    <section className="not-prose w-full" style={{ background: sectionBg }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .gp-container{max-width:${containerMax}px;margin-inline:auto;}
            .gp-wrap{padding:${pt}px 24px ${pb}px;}

            /* Desktop: заголовок вертикально по центру секції */
            .gp-grid{
              display:grid;
              grid-template-columns:${leftW}px minmax(0,1fr);
              column-gap:${gap}px; row-gap:32px;
              align-items:center;
            }

            .gp-cards{
              display:grid;
              grid-template-columns:repeat(2, minmax(0,1fr));
              gap:${Math.round(gap * 0.65)}px;
            }

            @media (max-width:1279.98px){
              .gp-wrap{padding:64px 20px 80px;}
              .gp-grid{grid-template-columns:1fr; align-items:start; row-gap:28px;}
              .gp-cards{grid-template-columns:1fr; gap:20px;}
            }
          `,
        }}
      />

      <div className="gp-container gp-wrap">
        <div className="gp-grid">
          {/* LEFT */}
          <motion.div
            variants={V.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="flex flex-col justify-center"
          >
            {!!title && (
              <h2
                className="font-semibold tracking-[-0.01em] whitespace-pre-wrap"
                style={{ color: headingColor, fontSize: headingPx, lineHeight: 1.15, fontFamily: headingFont }}
              >
                {title}
              </h2>
            )}

            {cta?.text && cta?.url && (
              <a
                href={cta.url}
                className="inline-flex mt-8 items-center justify-center rounded-xl px-7 py-4 font-medium transition-transform"
                style={{ background: buttonBg, color: buttonText, boxShadow: "0 14px 40px rgba(70,119,255,.28)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {cta.text}
              </a>
            )}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="gp-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={V.grid}
          >
            {items.slice(0, 4).map((it, i) => {
              const src = imgSrc(it, 1280);
              const ratio = cardRatio > 0.1 ? cardRatio : 1.78;

              // стилі картки без бордера (лише якщо stroke !== transparent)
              const cardStyle: React.CSSProperties = {
                background: cardBg,
                borderRadius: radius,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.045), 0 26px 64px rgba(8,12,28,.35)",
              };
              if (stroke && stroke !== "transparent") {
                cardStyle.border = `1.5px solid ${stroke}`;
              }

              return (
                <motion.article
                  key={it._key ?? i}
                  variants={V.card}
                  whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
                  className="group overflow-hidden"
                  style={cardStyle}
                >
                  {/* IMAGE */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: `${ratio} / 1`,
                      borderTopLeftRadius: imgRadius,
                      borderTopRightRadius: imgRadius,
                    }}
                  >
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt={it.alt || it.title || ""}
                        className="h-full w-full object-cover transition-transform duration-500"
                        style={{ transform: "scale(1.02)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full" style={{ background: "linear-gradient(135deg,#1f2b66,#141a3c)" }} />
                    )}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)" }}
                      aria-hidden
                    />
                  </div>

                  {/* TEXT */}
                  <div className="p-6 md:p-7 lg:p-8">
                    <h3
                      className="font-extrabold uppercase tracking-wide"
                      style={{ color: cardText, fontSize: cardTitlePx, lineHeight: 1.25 }}
                    >
                      {it.title}
                    </h3>
                    {it.description && (
                      <p
                        className="mt-3 leading-8 max-w-[60ch]"
                        style={{ color: bodyColor, fontSize: bodyPx, fontFamily: bodyFont }}
                      >
                        {it.description}
                      </p>
                    )}
                  </div>

                  {!!it.href && <a href={it.href} className="absolute inset-0" aria-label={it.title} />}
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
