import { defineField, defineType } from "sanity";

export default defineType({
  name: "whoWeWorkSection",
  title: "Who we work with",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Section title", type: "string", validation: r => r.required() }),
    defineField({ name: "lead1", title: "Lead #1", type: "text" }),
    defineField({ name: "lead2", title: "Lead #2", type: "text" }),

    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      validation: r => r.min(1),
      of: [{ type: "whoWeWorkCard" }],
    }),

    // Optional design controls
    defineField({
      name: "palette",
      title: "Palette",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "sectionBg", type: "string", title: "Section BG", initialValue: "#05060E" },
        { name: "heading",   type: "string", title: "Heading color", initialValue: "#E6E9F5" },
        { name: "lead",      type: "string", title: "Lead color",    initialValue: "#C9D2F8" },
        { name: "cardTitle", type: "string", title: "Card title",    initialValue: "#E9EEFF" },
        { name: "cardText",  type: "string", title: "Card text",     initialValue: "#D8DEF3" },
        { name: "cardBg",    type: "string", title: "Card BG",       initialValue: "rgba(16,24,64,.35)" },
        { name: "cardStroke",type: "string", title: "Card stroke",   initialValue: "#3D5CE7" },
      ],
    }),
    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "headingPx",   type: "number", title: "Heading px", initialValue: 44 },
        { name: "leadPx",      type: "number", title: "Lead px",    initialValue: 20 },
        { name: "cardTitlePx", type: "number", title: "Card title px", initialValue: 22 },
        { name: "bodyPx",      type: "number", title: "Body px", initialValue: 18 },
        { name: "headingFont", type: "string", title: "Heading font" },
        { name: "bodyFont",    type: "string", title: "Body font" },
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "containerMax", type: "number", title: "Container max", initialValue: 1440 },
        { name: "gap",          type: "number", title: "Gap", initialValue: 28 },
        { name: "pt",           type: "number", title: "Padding top", initialValue: 110 },
        { name: "pb",           type: "number", title: "Padding bottom", initialValue: 110 },
        { name: "radius",       type: "number", title: "Card radius", initialValue: 22 },
        { name: "cardAR",       type: "number", title: "Card aspect ratio (W/H)", initialValue: 1.55 },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
