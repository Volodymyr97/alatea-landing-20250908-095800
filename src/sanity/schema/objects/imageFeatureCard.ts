import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageFeatureCard',
  title: 'Image Feature Card',
  type: 'object',
  fields: [
    defineField({
      name: 'titleStrong',
      title: 'Title — line 1 (UPPER/BOLD)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'titleRest',
      title: 'Title — line 2',
      type: 'string',
      validation: r => r.required(),
    }),      
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA text',
      type: 'string',
      initialValue: 'Explore',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      validation: r => r.uri({ allowRelative: true }),
    }),
  ],
  preview: {
    select: { a: 'titleStrong', b: 'titleRest' },
    prepare: ({ a, b }) => ({ title: `${a ?? ''} ${b ?? ''}`.trim() }),
  },
});
