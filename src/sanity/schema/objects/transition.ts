// src/sanity/schema/objects/transition.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "transition",
  title: "Transition",
  type: "object",
  fields: [
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Dissolve (crossfade + zoom)", value: "dissolve" },
          { title: "Wipe (top-down curtain)",     value: "wipe" },
          { title: "Iris (radial reveal)",        value: "iris" },
          { title: "Blackout (fade to black)",     value: "blackout" },
          { title: "Blackout Hold (pause in black)", value: "blackoutHold" },
        ],
        layout: "radio",
      },
      initialValue: "blackout",
    }),

    defineField({ name: "fromBg", title: "From background", type: "image" }),
    defineField({
      name: "toBg",
      title: "To background",
      type: "image",
      // Обов'язкове лише якщо не blackout
      validation: (Rule) =>
        Rule.custom((val, ctx: any) => {
          const st = ctx?.parent?.style;
          if (st === "blackout" || st === "blackoutHold") return true;
          return val ? true : "Required for this transition style";
        }),
    }),

    defineField({
      name: "heightVh",
      title: "Scene height (vh)",
      type: "number",
      initialValue: 220,
      description: "200–300 = довший перехід при скролі",
    }),
    defineField({
      name: "overlayOpacity",
      title: "Dark overlay (0–1)",
      type: "number",
      initialValue: 0.18,
      hidden: ({ parent }) => parent?.style === "blackout" || parent?.style === "blackoutHold",
    }),
    defineField({
      name: "grain",
      title: "Film grain",
      type: "boolean",
      initialValue: false, // для blackout не обов'язково
      hidden: ({ parent }) => parent?.style === "blackout" || parent?.style === "blackoutHold",
    }),
  ],
  preview: {
    select: { title: "style" },
    prepare: ({ title }) => ({ title: `Transition: ${title || "blackout"}` }),
  },
});
