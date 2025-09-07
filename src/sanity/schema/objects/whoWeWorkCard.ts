import { defineField, defineType } from "sanity";

export default defineType({
  name: "whoWeWorkCard",
  title: "Who – Card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: r => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", title: "External image URL", type: "url" }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
