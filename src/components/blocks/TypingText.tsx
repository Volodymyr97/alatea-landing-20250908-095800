// src/components/blocks/TypingText.tsx
'use client';

import { motion, Variants } from 'framer-motion';

type Props = { blok: any };

function variantsFor(style: string, distance: number): Variants {
  switch (style) {
    case 'fade':       return { hidden: { opacity: 0 },                 visible: { opacity: 1 } };
    case 'fadeUp':     return { hidden: { opacity: 0, y:  distance },   visible: { opacity: 1, y: 0 } };
    case 'fadeDown':   return { hidden: { opacity: 0, y: -distance },   visible: { opacity: 1, y: 0 } };
    case 'slideLeft':  return { hidden: { opacity: 0, x:  distance },   visible: { opacity: 1, x: 0 } };
    case 'slideRight': return { hidden: { opacity: 0, x: -distance },   visible: { opacity: 1, x: 0 } };
    case 'blurIn':     return { hidden: { opacity: 0, filter: 'blur(8px)' }, visible: { opacity: 1, filter: 'blur(0)' } };
    case 'scaleIn':    return { hidden: { opacity: 0, scale: 0.96 },    visible: { opacity: 1, scale: 1 } };
    default:           return { hidden: { opacity: 0, y: distance },    visible: { opacity: 1, y: 0 } };
  }
}

// плавний clamp між mobile(360px) і desktop(1280px)
function cssClamp(minPx: number, maxPx: number) {
  const minW = 360, maxW = 1280;
  const delta = maxPx - minPx;
  return `clamp(${minPx}px, calc(${minPx}px + ${delta} * ((100vw - ${minW}px) / ${maxW - minW})), ${maxPx}px)`;
}
function num(v: unknown, fallback: number) {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') { const p = parseFloat(v.replace(',','.')); if (Number.isFinite(p)) return p; }
  return fallback;
}
function clampNum(v: unknown, def: number, min: number, max: number) {
  const n = num(v, def); return Math.max(min, Math.min(max, n));
}

export default function TypingText({ blok }: Props) {
  // layout
  const align = (blok?.align ?? 'center') as 'center' | 'left';
  const maxW  = clampNum(blok?.maxWidthPx, 1100, 320, 2200);
  const alignWrap = align === 'center' ? 'mx-auto text-center' : 'mx-auto md:mx-0 text-left';

  // content
  const level   = (String(blok?.headingLevel ?? 'h2') as 'h1'|'h2'|'h3');
  const Heading = level as any;
  const heading = String(blok?.heading ?? '');
  const paragraphs: string[] = Array.isArray(blok?.paragraphs) ? blok.paragraphs : [];

  // one animation for the whole block
  const animStyle = String(blok?.animStyle ?? 'fadeUp');
  const distance  = num(blok?.distance, 24);
  const duration  = num(blok?.duration, 0.6);
  const delay     = num(blok?.delay, 0);
  const once      = Boolean(blok?.once ?? true);
  const amount    = num(blok?.viewportAmount, 0.35);
  const gapPx     = num(blok?.paragraphGap, 20);
  const variants  = variantsFor(animStyle, distance);

  // fonts — heading
  const hMin  = num(blok?.headingSizeMobilePx, 28);
  const hMax  = num(blok?.headingSizeDesktopPx, 56);
  const hLH   = num(blok?.headingLineHeight, 1.08);
  const hW    = num(blok?.headingWeight, 600);
  const hItal = Boolean(blok?.headingItalic);

  // fonts — paragraph
  const pMin  = num(blok?.paraSizeMobilePx, 16);
  const pMax  = num(blok?.paraSizeDesktopPx, 22);
  const pLH   = num(blok?.paraLineHeight, 1.5);
  const pW    = num(blok?.paraWeight, 400);
  const pItal = Boolean(blok?.paraItalic);

  // clamp sizes
  const clampH = cssClamp(hMin, hMax);
  const clampP = cssClamp(pMin, pMax);

  // family (опційно: ubuntu з layout через css var)
  const fontFamily = String(blok?.fontFamily ?? 'inherit');
  const fontClass  = fontFamily === 'ubuntu' ? '[font-family: inherit;

  return (
    <section className={`relative py-24 text-white ${fontClass}`}>
      <div className={`px-6 ${alignWrap}`} style={{ maxWidth: maxW }}>
        {/* увесь блок анімується одночасно */}
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount }}
          transition={{ duration, delay, ease: 'easeOut' }}
        >
          {heading ? (
            <Heading
              className="text-balance tracking-tight mb-4"
              style={{
                fontSize: clampH,
                lineHeight: hLH,
                fontWeight: hW as any,
                fontStyle: hItal ? 'italic' : 'normal',
              }}
            >
              {heading}
            </Heading>
          ) : null}

          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-pretty opacity-90"
              style={{
                fontSize: clampP,
                lineHeight: pLH,
                fontWeight: pW as any,
                fontStyle: pItal ? 'italic' : 'normal',
                marginTop: i ? gapPx : 0,
              }}
            >
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
