import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'expStatCard',
  title: 'Experience Card',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', title: 'Kicker (small top line)', type: 'string' }),
    defineField({ name: 'title', title: 'Title (bold)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button text', type: 'string', initialValue: 'Explore' }),
        defineField({ name: 'url',  title: 'Button URL',  type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kicker' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Card', subtitle }),
  },
})
