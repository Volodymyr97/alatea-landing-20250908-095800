'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlForImage } from '@/sanity/image';

export default function ImageFeature({ blok }: { blok: any }) {
  const bg = blok?.image
    ? urlForImage(blok.image).width(1800).height(900).fit('crop').url()
    : '';
  const radius = Number(blok?.radius ?? 28);
  const headline = String(blok?.headline ?? '');
  const cards = Array.isArray(blok?.cards) ? blok.cards.slice(0, 2) : [];
  const underline = blok?.showUnderline !== false;

  // === твої константи (не чіпаю) ===
  const CARD_W = 360;
  const CARD_H = 285;
  const CARD_PAD = 28;
  const RIGHT = 60;
  const TOP1 = 40;
  const GAP = 40;
  const BTN_W = 180;
  const BTN_H = 60;
  const BLUE = '#141E4B';
  const PANEL = '#E6EBF0';

  // анімації
  const breath = {
    scale: [1, 1.2, 1],
    transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section className="py-10 md:py-14">
      <div className="relative mx-auto w-[min(1400px,95vw)]">
        {/* BG + легкий loop-zoom ("дихання") */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          animate={breath}
          className="relative"
          style={{ willChange: 'transform,opacity' }}
        >
          {bg && (
            <Image
              src={bg}
              alt=""
              width={1800}
              height={900}
              priority
              className="w-full h-auto"
              style={{ borderRadius: radius }}
            />
          )}

          {/* HEADLINE (reveal on scroll) */}
          {headline && (
            <motion.div
              className="absolute left-[6.8%] top-[22%] max-w-[560px] select-none"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45 }}
            >
              <h2
                className="font-ubuntu leading-[1.15] text-balance"
                style={{
                  color: BLUE,
                  fontWeight: 400,
                  fontSize: 'clamp(28px,3.2vw,56px)',
                  textShadow: '0 10px 22px rgba(20,30,75,.18)',
                }}
                dangerouslySetInnerHTML={{ __html: headline.replace(/\n/g, '<br/>') }}
              />
              {underline && (
                <motion.div
                  className="mt-6 h-[6px] rounded-full"
                  style={{ background: '#2B58D6', width: 500, transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                />
              )}
            </motion.div>
          )}

          {/* CARDS (stagger slide-in + легкий hover) */}
          {cards.map((c: any, idx: number) => {
            const top = idx === 0 ? TOP1 : TOP1 + CARD_H + GAP;
            return (
              <motion.div
                key={c._key || idx}
                className="absolute shadow-[0_20px_40px_rgba(0,0,0,.18)]"
                style={{
                  right: RIGHT,
                  top,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: 26,
                  background: PANEL,
                  willChange: 'transform,opacity',
                }}
                initial={{ opacity: 0, x: 64, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: 0.30 + idx * 0.18, duration: 0.55, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="h-full" style={{ padding: CARD_PAD }}>
                  {c.kicker && (
                    <div className="mb-1 text-xs tracking-[.08em]" style={{ color: BLUE, opacity: 0.7 }}>
                      {c.kicker}
                    </div>
                  )}

                  <div className="text-[36px] leading-[1.05] font-extrabold pr-2" style={{ color: BLUE }}>
                    {(c.title || '').split('\n').map((line: string, i: number) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>

                  {c.body && (
                    <p className="mt-2 text-[36px] leading-snug" style={{ color: BLUE, opacity: 0.85 }}>
                      {c.body}
                    </p>
                  )}

                  {c.cta?.url && (
                    <a
                      href={c.cta.url}
                      className="mt-6 inline-flex items-center justify-center rounded-[8px] font-semibold"
                      style={{
                        width: BTN_W,
                        height: BTN_H,
                        background: BLUE,
                        color: '#fff',
                      }}
                    >
                      {c.cta?.text || 'Explore'}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

