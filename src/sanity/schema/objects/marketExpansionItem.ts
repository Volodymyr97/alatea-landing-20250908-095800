import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'marketExpansionItem',
  title: 'Market Expansion Item',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title (UPPERCASE)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),

    // ВАРІАНТ 1: зображення (png/jpg/svg)
    defineField({ name: 'icon', title: 'Icon (Image)', type: 'image', options: { hotspot: false } }),

    // ВАРІАНТ 2: SVG-файл
    defineField({ name: 'iconSvgFile', title: 'Icon SVG (File)', type: 'file', options: { accept: '.svg' } }),

    // ВАРІАНТ 3: inline SVG як рядок
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG (inline markup)',
      type: 'text',
      rows: 6,
      description: 'Встав сирий <svg>…</svg> з fill/stroke="currentColor", щоб міняти колір з теми'
    }),

    defineField({ name: 'alt', title: 'Alt', type: 'string' }),
  ],
  preview: { select: { title: 'title', media: 'icon' } }
})
