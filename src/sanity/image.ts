// src/sanity/image.ts
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// беремо projectId/dataset з конфігурації клієнта (а не напряму з process.env)
const { projectId, dataset } = client.config();

if (!projectId || !dataset) {
  // допоміжний лог у деві
  // eslint-disable-next-line no-console
  console.error("[sanity:image] Missing projectId/dataset. Check .env.local");
}

const builder = createImageUrlBuilder({
  projectId: projectId!,
  dataset: dataset!,
});

export function urlForImage(source: any) {
  return builder.image(source).auto("format");
}
