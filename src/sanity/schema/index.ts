// src/sanity/schema/index.ts
import page from "./page";
import hero from "./objects/hero";
import features from "./objects/features";
import typingText from "./objects/typingText";
import transition from "./objects/transition";
import imageFeature from "./objects/imageFeature";
import featureItem from "./objects/featureItem";
import advisoryCard from "./objects/advisoryCard";
import advisorySection from "./objects/advisorySection";
import imageFeatureCard from "./objects/imageFeatureCard";
import marketExpansionItem from "./objects/marketExpansionItem";
import marketExpansionSection from "./objects/marketExpansionSection";
import cmdListItem from "./objects/cmdListItem";
import cmdCard from "./objects/cmdCard";
import commercialMarketingSection from "./objects/commercialMarketingSection";
import servicesShowcaseItem from "./objects/servicesShowcaseItem";
import servicesShowcaseSection from "./objects/servicesShowcaseSection";
import partnerGridItem from "./objects/partnerGridItem";
import growthPartnerSection from "./objects/growthPartnerSection";
import whoWeWorkCard from "./objects/whoWeWorkCard";
import whoWeWorkSection from "./objects/whoWeWorkSection";
import expStatCard from "./objects/expStatCard";
import expStatSection from "./objects/expStatSection";
import contactCta from './objects/contactCta';
const _types: any[] = [
  page,
  hero,
  features,
  typingText,
  transition,
  imageFeature,
  featureItem,
  advisoryCard,
  advisorySection,
  imageFeatureCard,
  marketExpansionItem,
  marketExpansionSection,
  cmdListItem,
  cmdCard,
  commercialMarketingSection,
  servicesShowcaseItem,
  servicesShowcaseSection,
  partnerGridItem,
  growthPartnerSection,
  whoWeWorkCard,
  whoWeWorkSection,
  expStatCard,
  expStatSection,
  contactCta,
];

const names = _types.map(t => t?.name).filter(Boolean);
const dups = names.filter((n, i) => names.indexOf(n) !== i);
if (dups.length) throw new Error("Duplicate schema type names: " + dups.join(", "));

export const schemaTypes = _types;
