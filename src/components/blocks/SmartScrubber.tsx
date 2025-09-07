'use client';

import * as React from 'react';

type Props = {
  /** кількість кроків (мінімум 2) */
  steps: number;
  /** активний індекс [0..steps-1] */
  value: number;
  /** колбек перемикання */
  onChange: (i: number) => void;

  /** css-ширина треку */
  width?: string;                 // default: "100%"
  /** висота треку */
  height?: number;                // default: 12
  /** радіус скруглення */
  radius?: number;                // default: 999
  /** фон треку (25% прозорості за замовч.) */
  trackColor?: string;            // default: 'rgba(255,255,255,.25)'
  /** колір заповнення */
  fillColor?: string;             // default: '#3D5CE7'
  /** колір тонкої риски-курсора */
  cursorColor?: string;           // default: 'rgba(255,255,255,.75)'
};

export default function BarScrubber({
  steps,
  value,
  onChange,
  width = '100%',
  height = 12,
  radius = 999,
  trackColor = 'rgba(255,255,255,.25)',
  fillColor = '#3D5CE7',
  cursorColor = 'rgba(255,255,255,.75)',
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  const safeSteps = Math.max(2, steps | 0);
  const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

  // частка заповнення: мінімум один «крок», навіть коли value === 0
  const fracRaw = value / (safeSteps - 1);
  const fillFrac = Math.max(1 / (safeSteps - 1), fracRaw);
  const frac = clamp01(fillFrac);

  const toIdx = (x: number, w: number) =>
    Math.max(0, Math.min(safeSteps - 1, Math.round((x / Math.max(1, w)) * (safeSteps - 1))));

  return (
    <div
      ref={ref}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={safeSteps - 1}
      aria-valuenow={value}
      tabIndex={0}
      className="relative select-none"
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: 'hidden',
        background: trackColor,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.20), 0 6px 20px rgba(0,0,0,.25)',
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onChange(Math.min(safeSteps - 1, value + 1));
        if (e.key === 'ArrowLeft')  onChange(Math.max(0, value - 1));
        if (e.key === 'Home')       onChange(0);
        if (e.key === 'End')        onChange(safeSteps - 1);
      }}
      onPointerDown={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        onChange(toIdx(e.clientX - r.left, r.width));
        (e.currentTarget as any).setPointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!(e.currentTarget as any).hasPointerCapture?.(e.pointerId)) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        onChange(toIdx(e.clientX - r.left, r.width));
      }}
      onPointerUp={(e) => (e.currentTarget as any).releasePointerCapture?.(e.pointerId)}
    >
      {/* Заповнення */}
      <div
        className="absolute left-0 top-0"
        style={{
          height,
          background: fillColor,
          width: `${(frac * 100).toFixed(3)}%`,
          transition: 'width .25s cubic-bezier(.22,1,.36,1)',
        }}
      />
      {/* Тонкий курсор */}
      <div
        className="absolute top-0"
        aria-hidden
        style={{
          width: 2,
          height,
          left: `calc(${(frac * 100).toFixed(3)}% - 1px)`,
          background: cursorColor,
          transition: 'left .25s cubic-bezier(.22,1,.36,1)',
        }}
      />
    </div>
  );
}
