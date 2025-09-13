"use client";

import React from "react";
import { motion } from "framer-motion";

/* ====== Types ====== */
type MEItem = {
  _key?: string;
  title: string;
  description?: string;
  iconUrl?: string;     // PNG/JPG/SVG файл
  iconSvg?: string;     // inline SVG (<svg …/>)
  alt?: string;
};

export type MarketExpansionData = {
  title: string;
  items: MEItem[];
  palette?: {
    sectionBg?: string;
    headingColor?: string;
    itemTitleColor?: string;
    bodyColor?: string;
    iconColor?: string;
    dividerColor?: string;
  };
  typography?: {
    headingPx?: number;
    itemTitlePx?: number;
    bodyPx?: number;
    headingFont?: string;
    bodyFont?: string;
  };
  layout?: {
    containerMax?: number;
    columns?: 1 | 2 | 3;
    gap?: number;
    iconSize?: number;
    pt?: number;
    pb?: number;
  };
};

/* м’якше та довше */
const ease = [0.16, 1, 0.3, 1] as const;
const V = {
  heading: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } } },
  list:    { visible: { transition: { staggerChildren: 0.16 } } },
  item:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } },
};

function Icon({
  url, svg, size, color, alt,
}: { url?: string; svg?: string; size: number; color: string; alt?: string }) {
  if (svg && svg.trim()) {
    return (
      <div
        className="shrink-0"
        style={{ width: size, height: size, color }}
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img height="800" width="1200" decoding="async" loading="lazy" src={url} alt={alt || ""} className="shrink-0" style={{ width: size, height: size }} />;
  }
  return <div style={{ width: size, height: size }} aria-hidden />;
}

export default function MarketExpansionSection({ data }: { data: MarketExpansionData }) {
  const { title, items = [], palette, typography, layout } = data;

  /* palette */
  const {
    sectionBg = "#05060E",             // ← новий фон
    headingColor = "#E6E9F5",
    itemTitleColor = "#E6E9F5",
    bodyColor = "#D8DEF3",
    iconColor = "#4C76FF",
    dividerColor = "transparent",
  } = palette || {};

  /* typography */
  const {
    headingPx = 48,
    itemTitlePx = 24,
    bodyPx = 20,
    headingFont = "var(--font-ubuntu, system-ui)",
    bodyFont = "var(--font-ubuntu, system-ui)",
  } = typography || {};

  /* layout */
  const {
    containerMax = 1440,
    columns = 2,
    gap = 64,
    iconSize = 140,
    pt = 120,
    pb = 120,
  } = layout || {};

  const gridCols = Math.max(1, Math.min(3, columns));

  return (
    <section className="cv-auto not-prose w-full" style={{ background: sectionBg }}>
      {/* локальний CSS для макета */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .me-container{max-width:${containerMax}px;margin-inline:auto;}
            .me-wrap{padding:${pt}px 24px ${pb}px;}
            .me-grid{
              display:grid;
              grid-template-columns:repeat(${gridCols},minmax(0,1fr));
              column-gap:${gap}px; row-gap:${gap}px;
            }
            @media (max-width:1279.98px){
              .me-wrap{padding:72px 20px;}
              .me-grid{grid-template-columns:1fr;row-gap:48px;}
            }
          `,
        }}
      />

      <div className="me-container me-wrap">
        {/* Заголовок без риски */}
        <motion.h2
          variants={V.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="font-semibold tracking-[-0.01em]"
          style={{ color: headingColor, fontSize: headingPx, lineHeight: 1.15, fontFamily: headingFont }}
        >
          {title}
        </motion.h2>

        {/* Список карток */}
        <motion.div
          className="me-grid mt-14 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={V.list}
        >
          {/* опційний вертикальний divider на xl */}
          <div
            className="pointer-events-none hidden xl:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
            style={{ width: 1, background: dividerColor, opacity: 0.35 }}
            aria-hidden
          />

          {items.map((it, idx) => (
            <motion.article
              key={it._key ?? idx}
              variants={V.item}
              className="flex flex-col"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.35, ease }}
            >
              {/* Іконка з плавною появою */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.65, ease }}
              >
                <Icon url={it.iconUrl} svg={it.iconSvg} size={iconSize} color={iconColor} alt={it.alt} />
              </motion.div>

              <h3
                className="mt-8 font-extrabold uppercase tracking-wide"
                style={{ color: itemTitleColor, fontSize: itemTitlePx, lineHeight: 1.25 }}
              >
                {it.title}
              </h3>

              {it.description && (
                <motion.p
                  className="mt-6 leading-8 max-w-[62ch]"
                  style={{ color: bodyColor, fontFamily: bodyFont, fontSize: bodyPx }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.65, ease, delay: 0.06 }}
                >
                  {it.description}
                </motion.p>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
