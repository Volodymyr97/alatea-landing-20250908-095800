// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rocket + Sanity",
  description: "Next.js + Sanity starter with Visual Editing",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={ubuntu.variable} suppressHydrationWarning>
      <body
        className="
          relative min-h-[100svh]
          bg-black text-white antialiased
          overflow-x-clip selection:bg-white/10 selection:text-white
        "
        suppressHydrationWarning
      >
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
