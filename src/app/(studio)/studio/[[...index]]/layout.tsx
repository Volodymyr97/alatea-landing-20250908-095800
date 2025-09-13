import { Ubuntu } from "next/font/google";
import type { Metadata } from 'next';

import { ubuntu } from "@/app/fonts";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400","700"], variable: "--font-ubuntu", display: "swap" });
export const metadata: Metadata = {
  title: 'Studio',
};

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // без <html   className={`${ubuntu.variable} ${ubuntu.className} ${`${ubuntu.variable}`} ${ubuntu.className} ${ubuntu.variable} ${ubuntu.className}`}> і <body className={ubuntu.variable}> тут
  return <>{children}</>;
}
