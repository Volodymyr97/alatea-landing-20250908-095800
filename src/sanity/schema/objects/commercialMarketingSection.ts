import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'commercialMarketingSection',
  title: 'Commercial & Marketing Development',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards (columns)',
      type: 'array',
      of: [{ type: 'cmdCard' }],
      validation: r => r.min(1).max(3),
    }),
    defineField({
      name: 'palette',
      title: 'Palette',
      type: 'object',
      fields: [
        { name: 'sectionBg', type: 'string', initialValue: '#05060E' },
        { name: 'headingColor', type: 'string', initialValue: '#E6E9F5' },
        { name: 'cardBg', type: 'string', initialValue: '#1B2555' },
        { name: 'cardStroke', type: 'string', initialValue: '#4A63C9' },
        { name: 'itemText', type: 'string', initialValue: '#D8DEF3' },
        { name: 'cardTitle', type: 'string', initialValue: '#E6E9F5' },
        { name: 'iconTint', type: 'string', initialValue: '#9DB3FF' },
      ],
    }),
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'object',
      fields: [
        { name: 'headingPx', type: 'number', initialValue: 44 },
        { name: 'cardTitlePx', type: 'number', initialValue: 22 },
        { name: 'bodyPx', type: 'number', initialValue: 18 },
        { name: 'headingFont', type: 'string' },
        { name: 'bodyFont', type: 'string' },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'object',
      fields: [
        { name: 'containerMax', type: 'number', initialValue: 1440 },
        { name: 'columns', type: 'number', initialValue: 2, description: '1–3' },
        { name: 'gap', type: 'number', initialValue: 36 },
        { name: 'pt', type: 'number', initialValue: 120 },
        { name: 'pb', type: 'number', initialValue: 120 },
        { name: 'radius', type: 'number', initialValue: 20 },
        { name: 'minCardH', type: 'number', initialValue: 560 },
        { name: 'iconBox', type: 'number', initialValue: 52 },
      ],
    }),
  ],
  preview: { select: { title: 'title' } },
})
