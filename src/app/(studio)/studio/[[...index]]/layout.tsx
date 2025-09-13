import type { Metadata } from 'next';

import { ubuntu } from "@/app/fonts";
export const metadata: Metadata = {
  title: 'Studio',
};

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // без <html> і <body className={ubuntu.variable}> тут
  return <>{children}</>;
}
