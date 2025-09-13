'use client';

import Image from "next/image";
import { urlForImage } from "@/sanity/image";

export default function Features({ blok }: { blok: any }) {
  const title = blok?.title;
  const items: any[] = Array.isArray(blok?.items) ? blok.items : [];

  return (
    <section className="cv-auto px-6 py-24 md:py-40 bg-black text-white">
      <div className="mx-auto max-w-6xl">
        {title && (
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, i) => {
            const iconUrl = it?.icon
              ? urlForImage(it.icon).width(96).height(96).fit("crop").url()
              : null;

            return (
              <div
                key={it?._key || i}
                className="rounded-2xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition-colors"
              >
                {iconUrl && (
                  <div className="mb-4">
                    <Image
                      src={iconUrl}
                      alt=""
                      width={48}
                      height={48}
                      className="opacity-90"
                    loading="lazy" decoding="async" />
                  </div>
                )}
                {it?.title && (
                  <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
                )}
                {it?.text && (
                  <p className="text-white/80 leading-relaxed">{it.text}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
