// src/app/(studio)/studio/[[...index]]/StudioClient.tsx
'use client';

import { NextStudio } from 'next-sanity/studio';
import studioConfig from '@/sanity.config';

export default function StudioClient() {
  return <NextStudio config={studioConfig} />;
}
