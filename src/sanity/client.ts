// src/sanity/client.ts
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "i9mupi94";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
  stega: { studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL },
});
