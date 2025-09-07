// src/sanity/schema/objects/advisorySection.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "advisorySection",
  title: "Advisory Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "advisoryCard" }],
      validation: (r) => r.min(1),
    }),

    defineField({
      name: "palette",
      title: "Palette",
      type: "object",
      fields: [
        defineField({ name: "sectionBg", type: "string", title: "Section BG (CSS)", initialValue: "#07080e" }),
        defineField({ name: "headingColor", type: "string", title: "Heading color", initialValue: "#e6e9f5" }),
        defineField({ name: "bodyColor", type: "string", title: "Body color", initialValue: "#dbe0f4" }),
        defineField({ name: "cardDefaultBg", type: "string", title: "Default card BG", initialValue: "#15204b" }),
        defineField({ name: "cardDefaultText", type: "string", title: "Default card text", initialValue: "#ffffff" }),
        defineField({ name: "progressColor", type: "string", title: "Progress color", initialValue: "#2f4db5" }),
      ],
    }),

    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      fields: [
        defineField({
          name: "headingFont",
          type: "string",
          title: "Heading font preset",
          description: "Напр.: var(--font-inter), var(--font-manrope), system-ui",
          initialValue: "var(--font-inter)",
        }),
        defineField({
          name: "bodyFont",
          type: "string",
          title: "Body font preset",
          initialValue: "var(--font-inter)",
        }),
        defineField({
          name: "headingSize",
          type: "string",
          title: "Heading size",
          options: { list: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl"] },
          initialValue: "lg",
        }),
        defineField({
          name: "bodySize",
          type: "string",
          title: "Body size",
          options: { list: ["sm", "md", "lg"] },
          initialValue: "md",
        }),
      ],
    }),

    defineField({
      name: "animation",
      title: "Animation",
      type: "object",
      fields: [
        defineField({
          name: "type",
          type: "string",
          options: { list: ["coverflow", "slide", "fade", "flip"] },
          initialValue: "coverflow",
        }),
        defineField({ name: "autoplayMs", type: "number", title: "Autoplay (ms)", initialValue: 5000 }),
        defineField({ name: "transitionMs", type: "number", title: "Transition (ms)", initialValue: 550 }),
        defineField({
          name: "easing",
          type: "string",
          title: "Easing",
          options: { list: ["easeInOut", "anticipate", "circInOut", "linear"] },
          initialValue: "easeInOut",
        }),
        defineField({ name: "pauseOnHover", type: "boolean", title: "Pause on hover", initialValue: true }),
        defineField({ name: "pauseOnTouch", type: "boolean", title: "Pause on touch", initialValue: true }),
      ],
    }),
  ],

  preview: {
    select: { title: "title", cards: "cards" },
    prepare({ title, cards }) {
      const count = Array.isArray(cards) ? cards.length : 0;
      return { title: title || "Advisory Section", subtitle: `${count} card(s)` };
    },
  },
});
