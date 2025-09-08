// @ts-nocheck
import { draftMode } from 'next/headers';
import { client } from '@/sanity/client';
import { pageBySlugQuery } from '@/sanity/queries';
import BlocksRenderer from '@/components/blocks/BlocksRenderer';
import { mockHome } from '@/mock/home';

export const revalidate = 60; // ISR

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params?.slug?.join('/') || 'home';
  const { isEnabled } = await draftMode();

  try {
    const data = await client.fetch(
      pageBySlugQuery,
      { slug },
      isEnabled
        ? { perspective: 'previewDrafts', useCdn: false, stega: true }
        : { perspective: 'published', useCdn: true }
    );

    if (!data) return <BlocksRenderer page={mockHome} />;
    return <BlocksRenderer page={data} />;
  } catch {
    return <BlocksRenderer page={mockHome} />;
  }
}
