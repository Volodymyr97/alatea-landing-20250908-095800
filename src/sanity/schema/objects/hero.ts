import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero (Cinematic)",
  type: "object",
  fields: [
    defineField({ name: "bg", title: "Background image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bgVideoUrl", title: "Background video URL (mp4/webm)", type: "url" }),
    defineField({ name: "overlayOpacity", title: "Dark overlay (0—1)", type: "number", initialValue: 0.28, validation: r => r.min(0).max(1) }),
    defineField({ name: "zoomLoop", title: "Enable BG zoom-in loop", type: "boolean", initialValue: true }),
    defineField({ name: "zoomScale", title: "Zoom scale (1.0—1.2)", type: "number", initialValue: 1.08, validation: r => r.min(1).max(1.2) }),
    defineField({ name: "zoomDuration", title: "Zoom duration (sec)", type: "number", initialValue: 12 }),

    // Контент
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "headline", title: "Title", type: "string" }),
    defineField({ name: "subheading", title: "Subtitle", type: "text" }),
    defineField({ name: "ctaEnabled", title: "Show CTA", type: "boolean", initialValue: true }),
    defineField({
      name: "cta", title: "CTA", type: "object",
      fields: [{ name: "text", title: "Text", type: "string" }, { name: "url", title: "URL", type: "url" }],
    }),

    // Стиль/керування
    defineField({ name: "forceWhite", title: "Text is always white", type: "boolean", initialValue: true }),
    defineField({ name: "centerContent", title: "Center content block", type: "boolean", initialValue: true }),
    defineField({ name: "logoHeight", title: "Logo height (px)", type: "number", initialValue: 64, validation: r => r.min(24).max(240) }),
    defineField({ name: "titleScale", title: "Title size ×", type: "number", initialValue: 1.0, validation: r => r.min(0.6).max(2) }),
    defineField({ name: "subtitleScale", title: "Subtitle size ×", type: "number", initialValue: 1.0, validation: r => r.min(0.6).max(2) }),

    // Хмаринки
    defineField({ name: "cloudsEnabled", title: "Enable clouds", type: "boolean", initialValue: false }),
    defineField({
      name: "clouds", title: "Clouds settings", type: "object",
      fields: [
        { name: "count", title: "Count (0–20)", type: "number", initialValue: 6, validation: r => r.min(0).max(20) },
        { name: "opacity", title: "Opacity (0—1)", type: "number", initialValue: 0.22, validation: r => r.min(0).max(1) },
        { name: "speedSec", title: "Speed (sec)", type: "number", initialValue: 12 },
        { name: "delayBetweenSec", title: "Delay between (sec)", type: "number", initialValue: 0.4 },
        { name: "sprites", title: "Optional cloud sprites", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
      ],
    }),

    defineField({ name: "grain", title: "Add film grain", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "headline", media: "bg" }, prepare({ title, media }) { return { title: title || "Hero (Cinematic)", media }; } },
});
