import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cmdListItem',
  title: 'List item (with icon)',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 2,
      validation: r => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon image (PNG/SVG)',
      type: 'image',
      options: { accept: 'image/*' },
    }),
    defineField({
      name: 'iconSvg',
      title: 'Inline SVG (optional)',
      type: 'text',
      description: 'Paste raw <svg>…</svg>. Overrides image if present.',
    }),
    defineField({ name: 'alt', title: 'Alt', type: 'string' }),
  ],
  preview: {
    select: { title: 'text', media: 'icon' },
    prepare: ({ title, media }) => ({ title: title?.slice(0, 60), media }),
  },
})
