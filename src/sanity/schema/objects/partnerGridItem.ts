import {defineField, defineType} from "sanity";

export default defineType({
  name: "partnerGridItem",
  title: "Grid item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: r => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    // основне зображення через asset
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    // про всяк випадок — прямий URL (можна не заповнювати, якщо є image)
    defineField({ name: "imageUrl", title: "Image URL (optional)", type: "url" }),
    defineField({ name: "alt", title: "Alt", type: "string" }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare: ({title, media}) => ({ title: title || "Item", media }),
  },
});
