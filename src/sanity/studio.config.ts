import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '@/sanity/schema';

export default defineConfig({
  projectId: 'i9mupi94',         // твій Project ID
  dataset: 'production',
  title: 'Rocket Studio',
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
