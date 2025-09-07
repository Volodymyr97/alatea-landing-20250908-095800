import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
// імпортуємо лише типи, без важких плагінів
import { schemaTypes } from '@/sanity/schema';

export default defineConfig({
  projectId: 'i9mupi94',       // <-- твій Project ID
  dataset: 'production',
  title: 'Studio (safe)',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: schemaTypes },
});
