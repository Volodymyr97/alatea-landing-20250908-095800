import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content blocks",
      type: "array",
      of: [
        { type: "hero" },
        { type: "transition" },
        { type: "features" },
        { type: "typingText" },
        { type: "imageFeature" },
        { type: "advisorySection" },
        { type: "marketExpansionSection" },
        { type: "servicesShowcaseSection" },
        { type: "commercialMarketingSection" },
        { type: "growthPartnerSection" },
        { type: "whoWeWorkSection" },
        { type: "expStatSection" },
        { type: 'contactCta' },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
