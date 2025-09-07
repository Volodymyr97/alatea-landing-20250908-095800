import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cmdCard',
  title: 'CMD Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Card title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'items',
      title: 'List',
      type: 'array',
      of: [{ type: 'cmdListItem' }],
      validation: r => r.min(1),
    }),
  ],
  preview: { select: { title: 'title' } },
})
