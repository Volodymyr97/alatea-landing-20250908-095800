import {defineField, defineType} from "sanity";

export default defineType({
  name: "growthPartnerSection",
  title: "Growth Partner Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading", type: "text", rows: 2, validation: r => r.required() }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "string" }),
        defineField({ name: "url", title: "URL", type: "url" }),
      ],
    }),

    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [{ type: "partnerGridItem" }],
      validation: r => r.min(1),
    }),

    // стилі
    defineField({
      name: "palette",
      title: "Palette",
      type: "object",
      fields: [
        { name: "sectionBg", title: "Section background", type: "string", initialValue: "#05060E" },
        { name: "headingColor", title: "Heading color", type: "string", initialValue: "#E6E9F5" },
        { name: "bodyColor", title: "Body color", type: "string", initialValue: "#D8DEF3" },
        { name: "cardBg", title: "Card bg overlay", type: "string", initialValue: "rgba(16,24,64,.35)" },
        { name: "cardText", title: "Card text color", type: "string", initialValue: "#E7ECFF" },
        { name: "buttonBg", title: "Button bg", type: "string", initialValue: "#4677FF" },
        { name: "buttonText", title: "Button text", type: "string", initialValue: "#FFFFFF" },
        { name: "stroke", title: "Card stroke", type: "string", initialValue: "#3D5CE7" },
      ],
    }),

    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      fields: [
        { name: "headingPx", title: "Heading size (px)", type: "number", initialValue: 48 },
        { name: "cardTitlePx", title: "Card title size (px)", type: "number", initialValue: 22 },
        { name: "bodyPx", title: "Body size (px)", type: "number", initialValue: 18 },
        { name: "headingFont", title: "Heading font CSS value", type: "string", initialValue: "var(--font-ubuntu, system-ui)" },
        { name: "bodyFont", title: "Body font CSS value", type: "string", initialValue: "var(--font-ubuntu, system-ui)" },
      ],
    }),

    defineField({
      name: "layout",
      title: "Layout",
      type: "object",
      fields: [
        { name: "containerMax", title: "Container max (px)", type: "number", initialValue: 1440 },
        { name: "leftW", title: "Left column width (px)", type: "number", initialValue: 520 },
        { name: "gap", title: "Gap (px)", type: "number", initialValue: 56 },
        { name: "radius", title: "Card radius (px)", type: "number", initialValue: 24 },
        { name: "pt", title: "Padding top (px)", type: "number", initialValue: 110 },
        { name: "pb", title: "Padding bottom (px)", type: "number", initialValue: 110 },
        { name: "cardRatio", title: "Card image ratio (w/h)", type: "number", initialValue: 1.78 }, // 16:9≈1.78
      ],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({title}) => ({title: (title || "").slice(0, 60)}) },
});
