"use client";

import React from "react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

/* ===== Types ===== */
type WWItem = {
  _key?: string;
  title: string;
  description?: string;
  image?: any;        // Sanity image
  imageUrl?: string;  // fallback URL
  alt?: string;
};

export type WhoWeWorkData = {
  title: string;
  lead1?: string;
  lead2?: string;
  items: WWItem[];

  palette?: {
    sectionBg?: string;
    heading?: string;
    lead?: string;
    cardTitle?: string;
    cardText?: string;
    cardBg?: string;
    cardStroke?: string;
  };
  typography?: {
    headingPx?: number;
    cardTitlePx?: number;
    bodyPx?: number;
    leadPx?: number;
    headingFont?: string;
    bodyFont?: string;
  };
  layout?: {
    containerMax?: number;
    gap?: number;        // між картками
    pt?: number;
    pb?: number;
    radius?: number;
    cardAR?: number;     // aspect ratio (width/height)
  };
};

const ease = [0.22, 1, 0.36, 1] as const;
const V = {
  heading: { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease } } },
  leadWrap: { visible: { transition: { staggerChildren: .08 } } },
  lead:   { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: .55, ease } } },
  grid:   { visible: { transition: { staggerChildren: .14 } } },
  card:   { hidden: { opacity: 0, y: 16, scale: .985 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: .55, ease } } },
};

const imgSrc = (it: WWItem, w = 1200) =>
  it.imageUrl ? it.imageUrl : it.image ? urlFor(it.image).width(w).auto("format").url() : "";

/* ===== Component ===== */
export default function WhoWeWorkSection({ data }: { data: WhoWeWorkData }) {
  const { title, lead1, lead2, items = [], palette, typography, layout } = data;

  const {
    sectionBg = "#05060E",
    heading    = "#E6E9F5",
    lead       = "#C9D2F8",
    cardTitle  = "#E9EEFF",
    cardText   = "#D8DEF3",
    cardBg     = "rgba(16,24,64,.35)",
    cardStroke = "#3D5CE7",
  } = palette || {};

  const {
    headingPx    = 44,
    leadPx       = 20,
    cardTitlePx  = 22,
    bodyPx       = 18,
    headingFont  = "var(--font-ubuntu, system-ui)",
    bodyFont     = "var(--font-ubuntu, system-ui)",
  } = typography || {};

  const {
    containerMax = 1440,
    gap          = 28,
    pt           = 110,
    pb           = 110,
    radius       = 22,
    cardAR       = 1.55, // ~16:10
  } = layout || {};

  return (
    <section className="cv-auto not-prose w-full" style={{ background: sectionBg }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .www-container{max-width:${containerMax}px;margin-inline:auto;}
            .www-wrap{padding:${pt}px 24px ${pb}px;}
            .www-grid{
              display:grid;
              grid-template-columns: repeat(3,minmax(0,1fr));
              gap:${gap}px;
            }
            @media (max-width:1279.98px){
              .www-wrap{padding:72px 20px;}
              .www-grid{grid-template-columns: repeat(2,minmax(0,1fr)); gap:${Math.max(18, gap)}px;}
            }
            @media (max-width:767.98px){
              .www-grid{grid-template-columns: 1fr;}
            }
          `,
        }}
      />

      <div className="www-container www-wrap">
        {/* Heading + Leads */}
        <motion.h2
          className="text-center font-semibold tracking-[-0.01em]"
          style={{ color: heading, fontSize: headingPx, lineHeight: 1.15, fontFamily: headingFont }}
          variants={V.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {title}
        </motion.h2>

        {(lead1 || lead2) && (
          <motion.div
            className="mx-auto mt-5 max-w-5xl text-center"
            variants={V.leadWrap}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {lead1 && (
              <motion.p
                className="leading-8"
                style={{ color: lead, fontSize: leadPx, fontFamily: bodyFont }}
                variants={V.lead}
              >
                {lead1}
              </motion.p>
            )}
            {lead2 && (
              <motion.p
                className="mt-3 leading-8"
                style={{ color: lead, fontSize: leadPx, fontFamily: bodyFont }}
                variants={V.lead}
              >
                {lead2}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Cards */}
        <motion.div
          className="www-grid mt-12"
          variants={V.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          {items.map((it, i) => {
            const src = imgSrc(it);
            return (
              <motion.article
                key={it._key ?? i}
                variants={V.card}
                className="group overflow-hidden"
                style={{
                  borderRadius: radius,
                  background: cardBg,
                  border: `0 px solid ${cardStroke}`,
                  boxShadow: "0 30px 90px rgba(22,29,54,.45), inset 0 1px 0 rgba(255,255,255,.04)",
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: .35, ease }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: `${cardAR} 1` }} />
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img height="800" width="1200" decoding="async" loading="lazy"
                      src={src}
                      alt={it.alt || it.title || ""}
                      className="h-full w-full object-cover transition-transform duration-600"
                      style={{ transform: "scale(1.02)", borderTopLeftRadius: radius, borderTopRightRadius: radius }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    />
                  ) : (
                    <div className="h-full w-full" style={{ background: "linear-gradient(135deg,#27326b,#151a3c)" }} />
                  )}
                </div>

                {/* Text */}
                <div className="p-6 md:p-7">
                  <h3
                    className="font-extrabold uppercase tracking-wide"
                    style={{ color: cardTitle, fontSize: cardTitlePx, lineHeight: 1.25 }}
                  >
                    {it.title}
                  </h3>
                  {it.description && (
                    <p
                      className="mt-3 leading-8 max-w-[62ch]"
                      style={{ color: cardText, fontSize: bodyPx, fontFamily: bodyFont }}
                    >
                      {it.description}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
