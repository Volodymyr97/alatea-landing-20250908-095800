import { defineField, defineType } from "sanity";

export default defineType({
  name: "features",
  title: "Features",
  type: "object",
  fields: [
    defineField({ name: "title",  title: "Title",  type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "featureItem" }],
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "title" } },
});
