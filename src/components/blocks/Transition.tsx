// src/components/blocks/Transition.tsx
'use client';

import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

type Cx = CSSProperties;

export default function TransitionBlock({ blok }: { blok?: any }) {
  const ref = useRef<HTMLDivElement>(null);

  // Скільки треба проскролити через цю секцію (vh)
  const heightVh = clamp(num(blok?.heightVh, 200), 120, 320);

  // Прив'язуємо прогрес саме до цієї секції
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // 0 — коли секція тільки з’являється знизу, 1 — коли пішла нагору
  });

  // 0 → 1 → 0 : плавний “dip to black” і назад (щоб відкрився наступний блок)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // DEBUG: покажемо у консолі живий прогрес (видно, чи секція взагалі монтується/реагує)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // закоментуй, коли набридне
    // console.log('[Transition progress]', v.toFixed(3));
  });

  // Секція має бути відчутно вища за в’юпорт -> sticky всередині працює завжди
  const wrap: Cx = { height: `${heightVh}svh`, position: 'relative' };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={wrap}
      data-transition="dip-to-black"
    >
      {/* sticky робить затемнення прив’язаним до вікна під час скролу цієї секції */}
      <div className="sticky top-0 h-[100svh]">
        {/* Саме затемнення */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity }}
        />

        {/* (необов’язково) Тонка лінія зверху/знизу — щоб бачити межі секції під час дебага */}
        {blok?.debug && (
          <>
            <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/20" />
            <div className="absolute left-3 top-3 rounded bg-white/10 px-2 py-1 text-[11px] text-white/90">
              dip-to-black · heightVh={heightVh}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* helpers */
function clamp(n:number,min:number,max:number){ return Math.max(min, Math.min(max, n)); }
function num(v:unknown, fallback:number){
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') { const p = parseFloat(v.replace(',','.')); if (Number.isFinite(p)) return p; }
  return fallback;
}
