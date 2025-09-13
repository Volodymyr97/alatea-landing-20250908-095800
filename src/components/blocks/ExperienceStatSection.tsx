'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';

type CTA = { text?: string; url?: string };
type CardIn = { _key?: string; kicker?: string; title?: string; body?: string; description?: string; cta?: CTA } & Record<string, any>;

export default function ExperienceStatSection({ data }: { data: any }) {
  /* ===== palette / layout ===== */
  const BLUE = data?.palette?.headlineColor || '#141E4B';
  const PANEL = data?.palette?.cardBg || '#E6EBF0';
  const BTN_BG = data?.palette?.btnBg || BLUE;
  const BTN_TXT = data?.palette?.btnText || '#fff';
  const radius = Number(data?.layout?.radius ?? 28);

  /* ===== bg ===== */
  const bgUrl: string =
    data?.imageUrl ||
    (data?.image ? urlFor(data.image).width(2000).height(1000).fit('crop').auto('format').url() : '') ||
    '';

  /* ===== text + cards normalize ===== */
  const headline = String(data?.headline ?? '');
  const raw: CardIn[] = Array.isArray(data?.cards) ? data.cards : Array.isArray(data?.items) ? data.items : [];
  const cards = raw.slice(0, 2).map((c) => ({
    _key: c?._key,
    kicker: c?.kicker || '',
    title: c?.title || '',
    body: c?.body || c?.description || '',
    cta: c?.cta,
  }));

  return (
    <section className="py-10 md:py-14">
      {/* фіксований брейкпоінт (1280px) без tailwind */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .xp-wrap{position:relative;max-width:min(1400px,95vw);margin-inline:auto;}
            .xp-root{position:relative;overflow:hidden;border-radius:${radius}px;}
            /* desktop overlay */
            .xp-cards{display:none;position:absolute;z-index:10;right:clamp(16px,4vw,60px);top:clamp(16px,6vh,64px);flex-direction:column;gap:32px;}
            .xp-card{width:clamp(280px,22vw,380px);min-height:clamp(200px,22vw,285px);background:${PANEL};color:${BLUE};border-radius:26px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.18);}
            .xp-card .inner{padding:28px;}
            .xp-btn{border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-weight:600;background:${BTN_BG};color:${BTN_TXT};width:clamp(150px,14vw,180px);height:clamp(44px,5vh,60px);}
            /* mobile stack */
            .xp-mobile{display:block;margin-top:24px;}
            .xp-mobile .xp-card{width:min(560px,95%);margin-inline:auto;border-radius:22px;}
            .xp-mobile .inner{padding:20px;}
            .xp-mobile .xp-card + .xp-card{ margin-top:20px; }
            /* switch at 1280px */
            @media (min-width:1280px){
              .xp-cards{display:flex;}
              .xp-mobile{display:none;}
            }
          `,
        }}
      />
      <div className="xp-wrap">
        <motion.div
          className="xp-root"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          animate={{ scale: [1, 1.2, 1], transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
        >
          {/* BG */}
          {bgUrl ? (
            <Image decoding="async" src={bgUrl} alt="" width={2000} height={1000} priority className="block w-full h-auto" />
          ) : (
            <div
              className="w-full aspect-[2/1]"
              style={{ background: 'radial-gradient(120% 80% at 30% 40%, #eef3fb 0%, #e0e7f5 50%, #cfdbf1 100%)' }}
            />
          )}

          {/* HEADLINE overlay */}
          {!!headline && (
            <motion.div
              className="absolute left-[6.8%] top-[22%] max-w-[560px] select-none z-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <h2
                className="font-ubuntu leading-[1.15] text-balance"
                style={{
                  color: BLUE,
                  fontWeight: 700,
                  fontSize: 'clamp(28px,3.2vw,56px)',
                  textShadow: '0 10px 22px rgba(20,30,75,.18)',
                }}
                dangerouslySetInnerHTML={{ __html: headline.replace(/\n/g, '<br/>') }}
              />
              {data?.showUnderline !== false && (
                <motion.div
                  className="mt-6 h-[6px] rounded-full"
                  style={{ background: '#2B58D6', width: 'clamp(160px,34vw,500px)', transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                />
              )}
            </motion.div>
          )}

          {/* DESKTOP cards (праворуч поверх фото) */}
          {!!cards.length && (
            <div className="xp-cards">
              {cards.map((c, i) => (
                <motion.article
                  key={c._key ?? i}
                  className="xp-card"
                  initial={{ opacity: 0, x: 64, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.28 + i * 0.16 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="inner">
                    {!!c.kicker && <div className="mb-1 text-xs tracking-[.08em] opacity-70">{c.kicker}</div>}
                    {!!c.title && (
                      <div className="font-extrabold uppercase pr-2" style={{ fontSize: 'clamp(30px,2vw,28px)', lineHeight: 1.12 }}>
                        {String(c.title)
                          .split('\n')
                          .map((l, j) => (
                            <div key={j}>{l}</div>
                          ))}
                      </div>
                    )}
                    {!!c.body && (
                      <p className="mt-3" style={{ fontSize: 'clamp(28px,1vw,16px)', lineHeight: 1.45, opacity: 0.9 }}>
                        {c.body}
                      </p>
                    )}
                    {c.cta?.url && (
                      <a href={c.cta.url} className="xp-btn mt-5">
                        {c.cta?.text || 'Explore'}
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>

        {/* MOBILE/TABLET stack під фото */}
        {!!cards.length && (
          <div className="xp-mobile">
            {cards.map((c, i) => (
              <motion.article
                key={c._key ?? i}
                className="xp-card"
                style={{ boxShadow: '0 18px 36px rgba(0,0,0,.16)' }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 * i }}
              >
                <div className="inner">
                  {!!c.kicker && <div className="mb-1 text-[11px] tracking-[.1em] uppercase opacity-70">{c.kicker}</div>}
                  {!!c.title && (
                    <div className="font-extrabold uppercase" style={{ fontSize: 'clamp(30px,4.8vw,22px)', lineHeight: 1.15 }}>
                      {String(c.title)
                        .split('\n')
                        .map((l, j) => (
                          <div key={j}>{l}</div>
                        ))}
                    </div>
                  )}
                  {!!c.body && (
                    <p className="mt-2" style={{ fontSize: 'clamp(28px,4vw,16px)', lineHeight: 1.45, opacity: 0.9 }}>
                      {c.body}
                    </p>
                  )}
                  {c.cta?.url && (
                    <a href={c.cta.url} className="xp-btn mt-4" style={{ width: 160, height: 50 }}>
                      {c.cta?.text || 'Explore'}
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
