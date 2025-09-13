"use client";

import React from "react";
import { motion } from "framer-motion";

/* ===== Types ===== */
type CMDListItem = {
  _key?: string;
  text: string;
  iconUrl?: string;
  iconSvg?: string;
  alt?: string;
};

type CMDCard = {
  _key?: string;
  title: string;
  items: CMDListItem[];
};

export type CommercialMarketingData = {
  title: string;
  cards: CMDCard[];
  palette?: {
    sectionBg?: string;
    headingColor?: string;
    cardBg?: string;
    cardStroke?: string;
    itemText?: string;
    cardTitle?: string;
    iconTint?: string;
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
    gap?: number;
    pt?: number;
    pb?: number;
    radius?: number;
    cardMinH?: number;
    iconBox?: number;
    iconGap?: number;
    cardPadX?: number;
    cardPadY?: number;
    rowGap?: number;
    titleGap?: number;
    textCh?: number;
  };
};

/* ===== Animations (довші й плавніші) ===== */
const EASE = [0.22, 1, 0.36, 1] as const;

const V = {
  title: { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } },
  grid:  { visible: { transition: { staggerChildren: 0.22 } } },
  cardIn: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } },
  row:   { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } },
};

/* ===== Іконка без обводки та без тіні ===== */
function Medallion({
  url,
  svg,
  size,
  tint,
  alt,
}: {
  url?: string;
  svg?: string;
  size: number;
  tint: string;
  alt?: string;
}) {
  return (
    <motion.div
      className="relative shrink-0 rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: "transparent", // без фону/тіні
      }}
      aria-hidden={!alt}
      role={alt ? "img" : undefined}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {svg ? (
        <div
          style={{ width: size * 0.56, height: size * 0.56, color: tint }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img height="800" width="1200" decoding="async" loading="lazy" src={url} alt={alt || ""} style={{ width: size * 0.56, height: size * 0.56 }} />
      ) : null}
    </motion.div>
  );
}

/* ===== Секція ===== */
export default function CommercialMarketingSection({ data }: { data: CommercialMarketingData }) {
  const { title, cards = [], palette, typography, layout } = data;

  const {
    sectionBg = "#05060E",
    headingColor = "#E6E9F5",
    cardBg = "#1B2555",
    cardStroke = "#4A63C9",
    itemText = "#D8DEF3",
    cardTitle = "#E6E9F5",
    iconTint = "#9DB3FF",
  } = palette || {};

  const {
    headingPx = 48,
    cardTitlePx = 24,
    bodyPx = 22,
    headingFont = "var(--font-ubuntu, system-ui)",
    bodyFont = "var(--font-ubuntu, system-ui)",
  } = typography || {};

  const {
    containerMax = 1440,
    gap = 48,
    pt = 120,
    pb = 120,
    radius = 24,
    cardMinH = 600,
    iconBox = 150,
    iconGap = 18,
    cardPadX = 44,
    cardPadY = 40,
    rowGap = 30,
    titleGap = 18,
    textCh = 62,
  } = layout || {};

  return (
    <section className="cv-auto not-prose w-full" style={{ background: sectionBg }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cmd-container{max-width:${containerMax}px;margin-inline:auto;}
            .cmd-wrap{padding:${pt}px 24px ${pb}px;}
            .cmd-grid{
              display:grid;
              grid-template-columns:repeat(2,minmax(0,1fr));
              gap:${gap}px;
              align-items:stretch;
            }
            @media (max-width:1279.98px){
              .cmd-wrap{padding:72px 20px;}
              .cmd-grid{grid-template-columns:1fr;gap:32px;}
            }
          `,
        }}
      />

      <div className="cmd-container cmd-wrap">
        <motion.h2
          variants={V.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="font-semibold tracking-[-0.01em]"
          style={{ color: headingColor, fontFamily: headingFont, fontSize: headingPx, lineHeight: 1.15 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="cmd-grid mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={V.grid}
        >
          {cards.slice(0, 2).map((card, idx) => (
            <motion.article
              key={card._key ?? idx}
              variants={V.cardIn}
              className="relative flex"
              style={{
                minHeight: cardMinH,
                borderRadius: radius,
                background: cardBg,
                border: `2px solid ${cardStroke}`,
                boxShadow: "0 40px 120px rgba(22,29,54,.45), inset 0 1px 0 rgba(255,255,255,.04)",
              }}
              whileHover={{
                y: -4,
                borderColor: "#5E78FF",
                boxShadow: "0 54px 160px rgba(22,29,54,.6), inset 0 1px 0 rgba(255,255,255,.06)",
              }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* внутрішній легкий inset для акуратності */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)" }}
              />

              <div className="grid w-full grid-rows-[auto_1fr]" style={{ padding: `${cardPadY}px ${cardPadX}px` }}>
                <div>
                  <h3
                    className="font-extrabold uppercase tracking-wide"
                    style={{ color: cardTitle, fontSize: cardTitlePx, lineHeight: 1.25 }}
                  >
                    {card.title}
                  </h3>
                  {/* лінія під заголовком ВИЛУЧЕНА */}
                  <div style={{ marginTop: titleGap }} />
                </div>

                <div style={{ marginTop: Math.max(18, titleGap + 6) }}>
                  <div style={{ display: "grid", rowGap }}>
                    {card.items?.map((it, i) => (
                      <motion.div
                        key={it._key ?? i}
                        variants={V.row}
                        className="grid grid-cols-[auto_1fr] items-center group"
                        style={{ columnGap: iconGap }}
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.25, ease: EASE }}
                      >
                        <Medallion url={it.iconUrl} svg={it.iconSvg} size={iconBox} tint={iconTint} alt={it.alt} />

                        <motion.div
                          className="flex items-center"
                          style={{ minHeight: iconBox, maxWidth: `${textCh}ch` }}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.25, ease: EASE }}
                        >
                          <p
                            className="leading-8"
                            style={{
                              color: itemText,
                              fontSize: bodyPx,
                              fontFamily: bodyFont,
                              lineHeight: 1.6,
                              wordBreak: "break-word",
                            }}
                          >
                            {it.text}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* мʼякий фон-глоу під карткою */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[inherit]"
                style={{ background: "radial-gradient(60% 80% at 50% 50%, rgba(34,46,104,.33), rgba(0,0,0,0))" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
