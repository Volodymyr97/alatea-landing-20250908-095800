'use client';

import React, { Fragment } from 'react';

import Hero from './Hero';
import Features from './Features';
import TransitionBlock from './Transition';
import TextAppear from './TextAppear';
import ImageFeature from './ImageFeature';
import ServicesShowcaseSection from "./ServicesShowcaseSection";
import GrowthPartnerSection from "@/components/blocks/GrowthPartnerSection";
import WhoWeWorkSection from "@/components/blocks/WhoWeWorkSection";
import ExperienceStatSection from './ExperienceStatSection';
import ContactCta from '@/components/blocks/ContactCta'; // ✅ правильний шлях

// === Секції
import AdvisorySection from './AdvisorySection';
import MarketExpansionSection from './MarketExpansionSection';
import CommercialMarketingSection from '@/components/blocks/CommercialMarketingSection';

// ---- Типи
type Block = Record<string, any>;
type PageLike = { content?: Block[] };

// ---- Нормалізація типу
function normType(blok: Block): string {
  const raw =
    (blok?._type as string) ??
    (blok?.type as string) ??
    (blok?.component as string) ??
    '';
  return String(raw).toLowerCase(); // ⬅️ все до lower-case
}

// ---- Витягнути payload секції (inline / reference / portable-text)
function pickSectionData(blok: Block) {
  return (
    blok?.data ??
    blok?.section ??
    blok?.value ??
    blok?.fields ??
    blok
  );
}

/* ===== Адаптери під секції ===== */

function AdvisorySectionBlock({ blok }: { blok: Block }) {
  return <AdvisorySection data={pickSectionData(blok)} />;
}
function GrowthPartnerBlock({ blok }: { blok: Record<string, any> }) {
  const data = (blok?.data ?? blok?.section ?? blok?.value ?? blok) as any;
  return <GrowthPartnerSection data={data} />;
}
function ServicesShowcaseBlock({ blok }: { blok: any }) {
  const data = blok?.data ?? blok?.section ?? blok?.value ?? blok;
  return <ServicesShowcaseSection data={data} />;
}
function WhoWeWorkBlock({ blok }: { blok: any }) {
  return <WhoWeWorkSection data={pickSectionData(blok)} />;
}

function MarketExpansionSectionBlock({ blok }: { blok: Block }) {
  return <MarketExpansionSection data={pickSectionData(blok)} />;
}

function CMDSectionBlock({ blok }: { blok: Block }) {
  return <CommercialMarketingSection data={pickSectionData(blok)} />;
}

/* ===== Fallback ===== */
function UnknownBlock({ i, blok }: { i: number; blok: Block }) {
  return (
    <div className="py-24 text-center text-sm text-white/60">
      <p className="mb-2">Unknown block at index {i}</p>
      <pre className="mx-auto max-w-[90vw] overflow-auto rounded bg-white/5 p-4 text-left">
        {JSON.stringify(
          {
            _type: blok?._type ?? blok?.type ?? blok?.component ?? 'N/A',
            keys: Object.keys(blok ?? {}),
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

/* ===== Рендерер ===== */
export function BlocksRenderer({
  page,
  body,
}: {
  page?: PageLike | Block[];
  body?: Block[];
}) {
  const source = typeof body !== 'undefined' ? body : page;
  const blocks: Block[] = Array.isArray(source)
    ? (source as Block[])
    : source && Array.isArray((source as PageLike).content)
    ? ((source as PageLike).content as Block[])
    : [];

  return (
    <Fragment>
      {blocks.map((blok: Block, i: number) => {
        const key = blok?._key ?? `${i}`;
        const t = normType(blok);

        switch (t) {
          case 'hero':
            return <Hero key={key} blok={blok} />;

          case 'features':
            return <Features key={key} blok={blok} />;

          // imageFeature — ловимо різні написання
          case 'imagefeature':
          case 'image_feature':
          case 'image-feature':
          case 'imagefeatureblock':
            return <ImageFeature key={key} blok={blok} />;

          // одна анімація для текстових блоків
          case 'typingtext':
          case 'textappear':
          case 'textanimated':
            return <TextAppear key={key} blok={blok} />;

          // Секція з картками справа
          case 'expstatsection':
          case 'exp-stat-section':
          case 'experiencewithcards':
            return <ExperienceStatSection key={key} data={pickSectionData(blok)} />;

          // 🚫 Прибрав зламаний кейс feedTransitionSection (там були невизначені b/FeedTransitionSection)

          // Growth Partner
          case 'growthpartnersection':
          case 'growth-partner-section':
          case 'partnergrid':
          case 'partnergridsection':
            return <GrowthPartnerBlock key={key} blok={blok} />;

          // Who we work
          case 'whoweworksection':
          case 'who-we-work-section':
          case 'whowework':
            return <WhoWeWorkBlock key={key} blok={blok} />;

          // Advisory Section
          case 'advisorysection':
          case 'advisory-section':
          case 'advisory_section':
          case 'advisory':
          case 'advisorysectionref':
            return <AdvisorySectionBlock key={key} blok={blok} />;

          // Market Expansion Section
          case 'marketexpansionsection':
          case 'market-expansion-section':
          case 'market_expansion_section':
          case 'marketexpansion':
          case 'internationalmarketexpansion':
            return <MarketExpansionSectionBlock key={key} blok={blok} />;

          // Contact CTA (тип у CMS приводиться до lower-case → 'contactcta')
          case 'contactcta':
          case 'contact-cta':
          case 'contact_cta':
            return <ContactCta key={key} blok={pickSectionData(blok)} />;

          // Services Showcase
          case 'servicesshowcasesection':
          case 'services-showcase-section':
          case 'services_showcase_section':
          case 'showcaseservices':
            return <ServicesShowcaseBlock key={key} blok={blok} />;

          // Commercial & Marketing Development Section
          case 'commercialmarketingsection':
          case 'commercial-marketing-section':
          case 'commercial_marketing_section':
          case 'cmdsection':
          case 'commercialmarketing':
            return <CMDSectionBlock key={key} blok={blok} />;

          default: {
            if (t.includes('transition')) return <TransitionBlock key={key} blok={blok} />;
            return <UnknownBlock key={key} i={i} blok={blok} />;
          }
        }
      })}
    </Fragment>
  );
}

export default BlocksRenderer;
