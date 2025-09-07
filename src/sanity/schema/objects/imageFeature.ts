// src/sanity/schema/objects/imageFeature.ts
import { defineField, defineType } from "sanity";

/** Внутрішня картка праворуч */
export const imageFeatureCard = defineType({
  name: "imageFeatureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker (small label)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "string" }),
        defineField({ name: "url", title: "URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
  },
});

/** Головний блок: зображення + дві картки */
const imageFeature = defineType({
  name: "imageFeature",
  title: "Image + Feature cards",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "radius",
      title: "Image corner radius (px)",
      type: "number",
      initialValue: 28,
    }),
    defineField({
      name: "headline",
      title: "Headline (3 lines)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "showUnderline",
      title: "Show underline under headline",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "cards",
      title: "Cards (right side, max 2)",
      type: "array",
      of: [{ type: "imageFeatureCard" }], 
      validation: (r) => r.max(2),
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare({ title }) {
      return { title: title || "Image + Feature Cards" };
    },
  },
});

export default imageFeature;
