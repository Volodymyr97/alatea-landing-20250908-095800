import { defineField, defineType } from "sanity";

export default defineType({
  name: "featureItem",
  title: "Feature item",
  type: "object",
  fields: [
    defineField({ name: "icon",  title: "Icon",  type: "image", options: { hotspot: true } }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "text",  title: "Text",  type: "text" }),
  ],
  preview: { select: { title: "title", media: "icon" } },
});
