import { defineDocuments, defineLocations } from "sanity/presentation";

export const locations = {
  page: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [{ title: doc.title, href: doc.slug === "home" ? "/" : `/${doc.slug}` }],
    }),
  }),
};

export const mainDocuments = defineDocuments([
  { route: "/:slug", filter: `_type == "page" && slug.current == $slug` },
  { route: "/", filter: `_type == "page" && slug.current == "home"` },
]);
