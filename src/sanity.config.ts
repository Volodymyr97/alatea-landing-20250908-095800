// src/sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";

// ✅ правильні імпорти (через alias @ -> src/)
import { schemaTypes } from "@/sanity/schema";
import { locations, mainDocuments } from "@/sanity/presentation/resolve";


// жорстко фіксуємо проект для надійного запуску
const projectId = "i9mupi94" as const;
const dataset = "production" as const;

export default defineConfig({
  projectId,
  dataset,
  title: "Rocket Studio",
  basePath: "/studio",
  plugins: [
    deskTool(),
    visionTool(),
    presentationTool({
      resolve: { locations, mainDocuments },
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3000",
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      allowOrigins: ["http://localhost:*"],
    }),
  ],
  schema: { types: schemaTypes },
});
