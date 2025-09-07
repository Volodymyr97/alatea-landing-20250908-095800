import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'marketExpansionSection',
  title: 'Market Expansion Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Section title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'marketExpansionItem' }],
      validation: r => r.min(1)
    }),

    defineField({
      name: 'palette',
      title: 'Palette (optional)',
      type: 'object',
      fields: [
        { name: 'sectionBg', type: 'string', title: 'Section BG' },
        { name: 'headingColor', type: 'string', title: 'Heading color' },
        { name: 'itemTitleColor', type: 'string', title: 'Item title color' },
        { name: 'bodyColor', type: 'string', title: 'Body color' },
        { name: 'iconColor', type: 'string', title: 'Icon color (inline SVG currentColor)' },
        { name: 'dividerColor', type: 'string', title: 'Vertical divider (xl), optional' }
      ]
    }),

    defineField({
      name: 'typography',
      title: 'Typography (optional)',
      type: 'object',
      fields: [
        { name: 'headingPx', type: 'number', title: 'Heading size (px)' },
        { name: 'itemTitlePx', type: 'number', title: 'Item title size (px)' },
        { name: 'bodyPx', type: 'number', title: 'Body size (px)' },
        { name: 'headingFont', type: 'string', title: 'Heading font CSS var' },
        { name: 'bodyFont', type: 'string', title: 'Body font CSS var' },
      ]
    }),

    defineField({
      name: 'layout',
      title: 'Layout (optional)',
      type: 'object',
      fields: [
        { name: 'containerMax', type: 'number', title: 'Container max (px)' },
        { name: 'columns', type: 'number', title: 'Columns (1–3)' },
        { name: 'gap', type: 'number', title: 'Grid gap (px)' },
        { name: 'iconSize', type: 'number', title: 'Icon size (px)' },
        { name: 'pt', type: 'number', title: 'Padding top (px)' },
        { name: 'pb', type: 'number', title: 'Padding bottom (px)' },
      ]
    })
  ],
  preview: { select: { title: 'title' } }
})
