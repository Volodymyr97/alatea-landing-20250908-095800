import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio',
};

export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // без <html> і <body> тут
  return <>{children}</>;
}
