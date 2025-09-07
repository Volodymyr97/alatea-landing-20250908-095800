import {createClient} from "@sanity/client";

/**
 * Публічний клієнт для рендеру (без токена).
 * Використовується urlFor() та будь-які публічні запити.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "i9mupi94",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET     || "production",
  apiVersion: "2024-10-01", // або будь-яка актуальна дата версії API
  useCdn: true,             // кеш CDN для швидкого продакшен рендеру
  perspective: "published",
});
