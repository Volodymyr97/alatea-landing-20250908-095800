// src/sanity/schema/objects/advisoryCard.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "advisoryCard",
  title: "Advisory Card",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", title: "Description", rows: 4 }),
    defineField({ name: "bgColor", type: "string", title: "Card BG color (CSS)" }),
    defineField({ name: "textColor", type: "string", title: "Card text color (CSS)" }),
  ],
});
