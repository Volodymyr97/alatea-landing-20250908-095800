'use client';

import { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { urlForImage } from "@/sanity/image";

type CloudCfg = { count?: number; opacity?: number; speedSec?: number; delayBetweenSec?: number; sprites?: any[]; };

const clamp = (n:number,min:number,max:number)=>Math.max(min,Math.min(max,n));
const num = (v:unknown,fallback:number)=>{
  if(typeof v==="number"&&Number.isFinite(v))return v;
  if(typeof v==="string"){const p=parseFloat(v.replace(",", ".")); if(Number.isFinite(p))return p;}
  return fallback;
};
function mulberry32(seed:number){return()=>{let t=(seed+=0x6D2B79F5);t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}

const GRAIN="data:image/svg+xml;utf8,"+encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>
     <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.06'/></feComponentTransfer></filter>
     <rect width='100%' height='100%' filter='url(#n)'/>
   </svg>`
);

/** Витягуємо URL фону з можливих полів Sanity або з прямого url */
function resolveBgUrl(b:any):string|null{
  if(!b||typeof b!=="object")return null;
  for(const u of [b.bgUrl,b.backgroundUrl,b.bg,b.background]){
    if(typeof u==="string" && u.startsWith("http")) return u;
  }
  const keys=["bg","background","backgroundImage","image","media","bgImage","backgroundImg"];
  for(const k of keys){
    const img=b[k];
    if(img?.asset?._ref || img?.asset?._id){
      try{ return urlForImage(img).width(2400).height(1350).fit("crop").url(); }catch{}
    }
    if(typeof img?.asset?.url==="string") return img.asset.url;
    if(typeof img?.url==="string" && img.url.startsWith("http")) return img.url;
  }
  try{
    const stack=[b];
    while(stack.length){
      const cur:any=stack.pop();
      if(cur && typeof cur==="object"){
        if(cur.asset?._ref || cur.asset?._id){
          try{ return urlForImage(cur).width(2400).height(1350).fit("crop").url(); }catch{}
        }
        for (const v of Object.values(cur)) if(v && typeof v==="object") stack.push(v);
      }
    }
  }catch{}
  return null;
}

export default function Hero({ blok }: { blok: any }) {
  const rootRef = useRef<HTMLDivElement>(null);

  /** MEDIA */
  const bgUrl = resolveBgUrl(blok);
  const videoUrl: string | null = blok?.bgVideoUrl || null;
  const hasMedia = !!bgUrl || !!videoUrl;

  /** Кіношні параметри (лише zoom-in + паралакс) */
  const zoomEnabled = blok?.zoomLoop ?? true;
  const zoomScale = clamp(num(blok?.zoomScale, 1.12), 1, 1.25);
  const zoomDuration = clamp(num(blok?.zoomDuration, 16), 6, 60);
  const overlayOpacity = clamp(num(blok?.overlayOpacity, 0.28), 0, 1);
  const grains = blok?.grain ?? true;

  /** Паралакс скролу для фону */
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start end", "end start"] });
  const bgTranslateY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  /** Паралакс курсора для картки */
  const mvX = useMotionValue(0), mvY = useMotionValue(0);
  const sX = useSpring(mvX, { stiffness: 120, damping: 12, mass: 0.2 });
  const sY = useSpring(mvY, { stiffness: 120, damping: 12, mass: 0.2 });
  const rotateY = useTransform(sX, [-1, 1], [5, -5]);
  const rotateX = useTransform(sY, [-1, 1], [-5, 5]);
  const transX  = useTransform(sX, [-1, 1], [-16, 16]);
  const transY  = useTransform(sY, [-1, 1], [-16, 16]);
  const onPointerMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mvX.set(((e.clientX - r.left) / r.width) * 2 - 1);
    mvY.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  };
  const onPointerLeave = () => { mvX.set(0); mvY.set(0); };

  /** Хмаринки (за бажанням) */
  const cloudsEnabled = !!blok?.cloudsEnabled;
  const cfg: CloudCfg = blok?.clouds || {};
  const cloudCount = clamp(num(cfg.count, 6), 0, 20);
  const cloudOpacity = clamp(num(cfg.opacity, 0.22), 0, 1);
  const cloudSpeed = clamp(num(cfg.speedSec, 12), 4, 120);
  const cloudDelayBetween = clamp(num(cfg.delayBetweenSec, 0.4), 0, 10);
  const clouds = useMemo(() => Array.from({ length: cloudCount }, (_, i) => {
    const rnd = mulberry32(i + 1);
    const edge = Math.floor(rnd() * 4); const offset = rnd();
    let startX = 0, startY = 0;
    if (edge === 0) { startX = (offset - 0.5) * 120; startY = -60; }
    if (edge === 2) { startX = (offset - 0.5) * 120; startY =  60; }
    if (edge === 1) { startX =  60; startY = (offset - 0.5) * 120; }
    if (edge === 3) { startX = -60; startY = (offset - 0.5) * 120; }
    const sizeVmin = 12 + rnd() * 20;
    return { i, startX, startY, sizeVmin };
  }), [cloudCount]);

  /** Єдина ширина для лого й текстів */
  const CONTENT_W = blok?.contentWidth ?? "clamp(380px, 28vw, 560px)";
  const titleScale = clamp(num(blok?.titleScale, 1.0), 0.6, 2.0);
  const subtitleScale = clamp(num(blok?.subtitleScale, 1.0), 0.6, 2.0);

  return (
    <section
      ref={rootRef}
      className="cv-auto relative isolate min-h-[100svh] overflow-hidden"
      style={hasMedia && !videoUrl && bgUrl
        ? { backgroundImage: `url("${bgUrl}")`, backgroundSize: "cover", backgroundPosition: "50% 30%" }
        : { background: "radial-gradient(100% 100% at 50% 30%, #0a0b0e 0%, #05060a 60%, #000 100%)" }}
    >
      {/* ===== ФОН: zoom-in loop + паралакс ===== */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0"
        initial={false}
        animate={zoomEnabled ? { scale: [1, zoomScale, 1.2] } : undefined}
        transition={zoomEnabled ? { duration: zoomDuration, repeat: Infinity, repeatType: "loop", ease: "easeInOut" } : undefined}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <motion.div className="absolute inset-0" style={{ y: bgTranslateY, scale: bgParallaxScale }}>
          {videoUrl ? (
            <video src={videoUrl} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : hasMedia && bgUrl ? (
            <div className="absolute inset-0" style={{ backgroundImage: `url("${bgUrl}")`, backgroundSize: "cover", backgroundPosition: "50% 30%" }} />
          ) : null}

          <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />
          {grains && (
            <div className="absolute inset-0 opacity-40 mix-blend-soft-light" style={{ backgroundImage: `url("${GRAIN}")` }} />
          )}
        </motion.div>
      </motion.div>

      {/* ===== ХМАРИНКИ (опціонально) ===== */}
      {cloudsEnabled && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {clouds.map(({ i, startX, startY, sizeVmin }) => (
            <motion.div
              key={i}
              initial={{ x: `${startX}vmin`, y: `${startY}vmin`, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: [0, cloudOpacity, 0] }}
              transition={{ duration: cloudSpeed, delay: i * cloudDelayBetween, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2"
              style={{ transformOrigin: "center", willChange: "transform, opacity" }}
            >
              <div style={{ width: `${sizeVmin}vmin`, height: `${sizeVmin*0.6}vmin`, background:"radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)", filter:"blur(6px)" }} />
            </motion.div>
          ))}
        </div>
      )}

      {/* ===== КОНТЕНТ (центруємо, одна ширина для лого/текстів) ===== */}
      <div className="relative z-20 flex h-[100svh] items-center justify-center px-6">
        <motion.div
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="rounded-[28px] p-8 md:p-12 backdrop-blur-sm bg-black/20 text-white text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          style={{
            rotateX, rotateY, x: transX, y: transY,
            transformStyle: "preserve-3d", willChange: "transform",
            ["--cw" as any]: CONTENT_W,
          }}
        >
          <div className="mx-auto" style={{ width: "var(--cw)" }}>
            {blok?.logo && (
              <img height="800" width="1200" decoding="async" loading="lazy"
                src={urlForImage(blok.logo).width(1400).url()}
                alt=""
                className="mx-auto mb-6 opacity-90 block"
                style={{ width:"100%", height:"auto" }}
              />
            )}

            {blok?.headline && (
              <h1
                className="text-white font-extrabold tracking-tight text-balance mx-auto"
                style={{ width:"100%", fontSize:`clamp(${28*titleScale}px, ${2.7*titleScale}vw, ${38*titleScale}px)`, lineHeight:1.08 }}
              >
                {blok.headline}
              </h1>
            )}

            {blok?.subheading && (
              <p
                className="text-white/90 mt-6 text-pretty mx-auto"
                style={{ width:"100%", fontSize:`clamp(${16*subtitleScale}px, ${2.4*subtitleScale}vw, ${26*subtitleScale}px)`, lineHeight:1.35 }}
              >
                {blok.subheading}
              </p>
            )}

            {blok?.ctaEnabled && blok?.cta?.url && (
              <a
                href={blok.cta.url}
                className="mt-8 inline-flex items-center justify-center rounded-2xl px-7 py-3.5 font-medium ring-1 ring-white/25 shadow-lg hover:shadow-xl bg-white/10 text-white hover:bg-white/15"
                style={{ width:"100%" }}
              >
                {blok.cta?.text || "Get started"}
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Віньєтка для «кіно» */}
      <div className="pointer-events-none absolute inset-0 z-10"
           style={{ background: "radial-gradient(120% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.34) 100%)" }} />
    </section>
  );
}
