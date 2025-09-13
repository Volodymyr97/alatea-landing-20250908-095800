'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SmartScrubber from '@/components/blocks/SmartScrubber';

/* ---------- Types ---------- */
type CTA = { text?: string; url?: string };
type AdvisoryCard = {
  _key?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  body?: string;
  text?: string;
  copy?: string;
  points?: string[];
  cta?: CTA;
  iconUrl?: string;
  bgColor?: string;
  textColor?: string;
};

export type AdvisorySectionData = {
  title: string;
  cards: AdvisoryCard[];
  palette?: {
    sectionBg?: string;
    headingColor?: string;
    bodyColor?: string;

    progressColor?: string;
    scrubTrackColor?: string;
    scrubSeparatorColor?: string;

    cardDefaultBg?: string;
    cardDefaultText?: string;
    cardStroke?: string;
    cardShadow?: string;
  };
  typography?: {
    headingFont?: string;
    bodyFont?: string;
    headingPx?: number;
    cardTitlePx?: number;
    bodyPx?: number;
    eyebrowPx?: number;
  };
  layout?: {
    containerMax?: number;
    leftColW?: number;
    gap?: number;

    scrubWidth?: number | string;
    scrubHeight?: number;
    scrubRadius?: number;

    cardW?: number;
    cardH?: number;
    cardPad?: number;
    cardRadius?: number;

    pt?: number;
    pb?: number;
  };
};

/* ---------- Utils ---------- */
const pickDesc = (c?: AdvisoryCard) =>
  (c?.description ?? c?.body ?? c?.text ?? c?.copy ?? '').trim();

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const V = {
  heading:  { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .55, ease: EASE } } },
  cardIn:   { opacity: 0, y: 10, scale: .985 },
  cardShow: { opacity: 1, y: 0,  scale: 1,    transition: { duration: .45, ease: EASE } },
  cardOut:  { opacity: 0, y: -10, scale: .985, transition: { duration: .35, ease: EASE } },
};

/* ---------- Card ---------- */
function CardFace({
  c,
  palette,
  fonts,
  sizes,
  radius,
  pad,
}: {
  c: AdvisoryCard;
  palette: { bg: string; text: string; body: string; stroke: string; shadow: string };
  fonts: { body: string };
  sizes: { eyebrowPx: number; titlePx: number; bodyPx: number };
  radius: number;
  pad: number;
}) {
  const desc = pickDesc(c);

  return (
    <article
      className="relative w-full"
      style={{
        borderRadius: radius,
        background: c.bgColor || palette.bg,
        color: c.textColor || palette.text,
        border: `1.5px solid ${palette.stroke}`,
        padding: pad,
        boxSizing: 'border-box',
        boxShadow: palette.shadow,
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit]"
           style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.06)' }} />

      {(c.eyebrow || c.iconUrl) && (
        <div className="flex items-center gap-3 mb-3">
          {c.iconUrl && (/* eslint-disable-next-line @next/next/no-img-element */ <img height="800" width="1200" decoding="async" loading="lazy" src={c.iconUrl} alt="" className="h-6 w-6 opacity-80" />)}
          {c.eyebrow && (
            <span className="uppercase tracking-[0.18em] opacity-80" style={{ fontSize: sizes.eyebrowPx }}>
              {c.eyebrow}
            </span>
          )}
        </div>
      )}

      {c.title && (
        <h3 className="font-extrabold uppercase tracking-wide" style={{ fontSize: sizes.titlePx }}>
          {c.title}
        </h3>
      )}

      {desc && (
        <p className="mt-3 leading-8 max-w-[64ch]"
           style={{ color: palette.body, fontFamily: fonts.body, fontSize: sizes.bodyPx }}>
          {desc}
        </p>
      )}

      {Array.isArray(c.points) && c.points.length > 0 && (
        <ul className="mt-4 space-y-2"
            style={{ color: palette.body, fontFamily: fonts.body, fontSize: sizes.bodyPx }}>
          {c.points.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'rgba(255,255,255,.65)' }} />
              <span className="leading-relaxed opacity-95">{p}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/* ---------- Section ---------- */
export default function AdvisorySection({ data }: { data: AdvisorySectionData }) {
  const cards = Array.isArray(data.cards) ? data.cards : [];
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  /* palette */
  const {
    sectionBg = '#0B0E17',
    headingColor = '#E6E9F5',
    bodyColor = '#D8DEF3',

    progressColor = '#3D5CE7',
    scrubTrackColor = 'rgba(255,255,255,.10)',
    scrubSeparatorColor = 'rgba(255,255,255,.55)',

    cardDefaultBg = '#16224F',
    cardDefaultText = '#FFFFFF',
    cardStroke = 'rgba(81,110,212,.55)',
    cardShadow = '0 30px 120px rgba(16,22,40,.55)',
  } = data.palette || {};

  /* type */
  const {
    headingFont = 'var(--font-ubuntu, system-ui)',
    bodyFont = 'var(--font-ubuntu, system-ui)',
    headingPx = 44,
    cardTitlePx = 30,
    bodyPx = 28,
    eyebrowPx = 12,
  } = data.typography || {};

  /* geometry */
  const {
    containerMax = 1440,
    leftColW = 700,
    gap = 72,

    scrubWidth = 'clamp(240px, 34vw, 560px)',
    scrubHeight = 12,
    scrubRadius = 999,

    cardW = 600,
    cardH = 300,
    cardPad = 28,
    cardRadius = 28,

    pt = 120,
    pb = 120,
  } = data.layout || {};

  const stepsReal = Math.max(1, cards.length);
  const v = Math.min(active, stepsReal - 1);
  const scrubWidthCss =
    typeof scrubWidth === 'number' ? `min(100%, ${scrubWidth}px)` : `min(100%, ${scrubWidth})`;

  return (
    <section className="cv-auto not-prose w-full relative" style={{ background: sectionBg, isolation: 'isolate' }}>
      {/* Responsive rules */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .adv-container{max-width:${containerMax}px;margin-inline:auto;}
            .adv-grid{
              display:grid;
              grid-template-columns:minmax(0, ${leftColW}px) ${gap}px minmax(0, ${cardW}px);
              align-items:center;
              padding:${pt}px 24px ${pb}px;
              position:relative;
            }
            .adv-card-wrap{ width:${cardW}px; height:${cardH}px; position:relative; }
            .adv-card{ position:absolute; left:0; top:0; width:100%; height:100%; }
            @media (max-width:1279.98px){
              .adv-grid{
                grid-template-columns:1fr;
                row-gap:28px;
                padding:72px 20px;
                align-items:start;
              }
              .adv-card-wrap{ width:100%; height:auto; }
              .adv-card{ position:relative; height:auto; }
            }
          `,
        }}
      />

      <div className="adv-container">
        <div className="adv-grid">
          {/* LEFT */}
          <motion.div
            className="flex flex-col"
            variants={V.heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <h2
              className="font-semibold tracking-[-0.01em]"
              style={{
                color: headingColor,
                fontFamily: headingFont,
                fontSize: `clamp(28px, 4.6vw, ${headingPx}px)`,
                lineHeight: 1.12,
              }}
            >
              {data.title}
            </h2>

            {/* Смуга-перемикач */}
            <div className="mt-6" style={{ width: scrubWidthCss }}>
              <SmartScrubber
                steps={Math.max(2, stepsReal)}
                value={v}
                onChange={(i) => setActive(Math.min(stepsReal - 1, i))}
                color={progressColor}
                width={'100%'}
                height={scrubHeight}
                radius={scrubRadius}
                trackColor={scrubTrackColor}
                separatorColor={scrubSeparatorColor}
                animated={!reduce}
              />
            </div>
          </motion.div>

          {/* GAP */}
          <div aria-hidden />

          {/* RIGHT */}
          <div className="relative flex justify-start xl:justify-end">
            <div className="adv-card-wrap">
              <AnimatePresence mode="wait">
                {cards[v] && (
                  <motion.div
                    key={cards[v]._key ?? v}
                    initial={V.cardIn}
                    animate={V.cardShow}
                    exit={V.cardOut}
                    className="adv-card"
                  >
                    {/* glow під карткою */}
                    <motion.div
                      className="pointer-events-none absolute -inset-6 rounded-[32px]"
                      style={{ background: 'radial-gradient(60% 80% at 50% 50%, rgba(34,46,104,.38), rgba(0,0,0,0))', zIndex: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
                      aria-hidden
                    />
                    <div className="relative z-[1]">
                      <CardFace
                        c={cards[v]}
                        radius={cardRadius}
                        pad={cardPad}
                        fonts={{ body: bodyFont }}
                        sizes={{ eyebrowPx, titlePx: cardTitlePx, bodyPx }}
                        palette={{
                          bg: cardDefaultBg,
                          text: cardDefaultText,
                          body: bodyColor,
                          stroke: cardStroke,
                          shadow: cardShadow,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
