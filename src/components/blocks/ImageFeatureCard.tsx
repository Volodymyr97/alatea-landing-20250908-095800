// src/components/blocks/ImageFeatureCard.tsx
import Link from 'next/link';
type Props = {
  kicker?: string;
  title?: string;
  body?: string;
  cta?: { url?: string; text?: string };
  className?: string;
  style?: React.CSSProperties;
};
export default function ImageFeatureCard({ kicker, title, body, cta, className, style }: Props) {
  return (
    <div className={className} style={style}>
      {kicker && <div className="mb-1 text-xs tracking-[.08em] opacity-70">{kicker}</div>}
      {title && <div className="text-[28px] md:text-[32px] leading-[1.05] font-extrabold pr-2">{title}</div>}
      {body && <p className="mt-2 text-base md:text-lg opacity-85">{body}</p>}
      {cta?.url && (
        <Link href={cta.url} className="mt-6 inline-flex items-center justify-center rounded-[8px] px-5 py-3 font-semibold bg-[#141E4B] text-white">
          {cta.text || 'Explore'}
        </Link>
      )}
    </div>
  );
}
