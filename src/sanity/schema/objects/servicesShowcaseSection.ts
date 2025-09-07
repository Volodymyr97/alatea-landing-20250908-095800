import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesShowcaseSection",
  title: "Services Showcase Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "string", validation: r => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "string" }),
        defineField({ name: "url",  title: "URL",  type: "url" }),
      ],
    }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [{ type: "servicesShowcaseItem" }],
      validation: r => r.min(1).max(4),
    }),

    /* Palette */
    defineField({
      name: "palette",
      title: "Palette",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "sectionBg", type: "string", title: "Section BG (hex/rgba)", initialValue: "#05060E" },
        { name: "heading",   type: "string", title: "Heading", initialValue: "#E6E9F5" },
        { name: "subheading",type: "string", title: "Subtitle", initialValue: "rgba(230,233,245,.80)" },
        { name: "ctaBg",     type: "string", title: "CTA BG", initialValue: "#4C76FF" },
        { name: "ctaText",   type: "string", title: "CTA Text", initialValue: "#0B0E17" },
        { name: "cardTitle", type: "string", title: "Card title", initialValue: "#E6E9F5" },
        { name: "cardBody",  type: "string", title: "Card body", initialValue: "#D8DEF3" },
        { name: "cardBg",    type: "string", title: "Card BG", initialValue: "#131A39" },
        { name: "cardStroke",type: "string", title: "Card Stroke", initialValue: "#2E3E86" },
        { name: "imgOverlay",type: "string", title: "Image overlay", initialValue: "linear-gradient(180deg, rgba(6,9,24,0) 40%, rgba(6,9,24,.55) 100%)" },
        { name: "glow",      type: "string", title: "Glow", initialValue: "radial-gradient(60% 80% at 50% 50%, rgba(34,46,104,.28), rgba(0,0,0,0))" },
      ],
    }),

    /* Typography */
    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "headingPx",   type: "number", title: "Heading px", initialValue: 44 },
        { name: "subtitlePx",  type: "number", title: "Subtitle px", initialValue: 22 },
        { name: "cardTitlePx", type: "number", title: "Card title px", initialValue: 22 },
        { name: "bodyPx",      type: "number", title: "Body px", initialValue: 18 },
        { name: "ctaPx",       type: "number", title: "CTA px", initialValue: 18 },
        { name: "headingFont", type: "string", title: "Heading font CSS var", initialValue: "var(--font-inter, system-ui)" },
        { name: "bodyFont",    type: "string", title: "Body font CSS var", initialValue: "var(--font-inter, system-ui)" },
      ],
    }),

    /* Layout */
    defineField({
      name: "layout",
      title: "Layout",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "containerMax", type: "number", title: "Container max px", initialValue: 1440 },
        { name: "leftW",        type: "number", title: "Left column width px", initialValue: 460 },
        { name: "gap",          type: "number", title: "Gap between columns px", initialValue: 56 },
        { name: "pt",           type: "number", title: "Padding top", initialValue: 120 },
        { name: "pb",           type: "number", title: "Padding bottom", initialValue: 120 },
        { name: "gridGap",      type: "number", title: "Cards gap px", initialValue: 40 },
        { name: "imgH",         type: "number", title: "Image height px", initialValue: 220 },
        { name: "imgRadius",    type: "number", title: "Image radius px", initialValue: 18 },
        { name: "cardRadius",   type: "number", title: "Card radius px", initialValue: 22 },
        { name: "columns",      type: "number", title: "Columns (1/2)", initialValue: 2, validation: r => r.min(1).max(2) },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "items.length" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Services Showcase",
      subtitle: `${subtitle ?? 0} cards`,
    }),
  },
});
