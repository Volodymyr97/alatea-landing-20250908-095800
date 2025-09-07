export const mockHome = {
  title: "Mock Home",
  slug: "home",
  content: [
    {
      _type: "hero",
      headline: "Rocket is live 🚀",
      subheading: "This is a local mock. Open /studio, create Page → slug = home, then Publish.",
      image: null,
      cta: { text: "Open Studio", url: "/studio" }
    },
    {
      _type: "features",
      title: "What’s inside",
      items: [
        { title: "Next.js 15 + Tailwind", description: "App Router, fast DX" },
        { title: "Sanity Studio @ /studio", description: "Desk, Vision, Presentation" },
        { title: "Visual Editing", description: "Draft Mode (Viewer token optional)" }
      ]
    }
  ]
};
