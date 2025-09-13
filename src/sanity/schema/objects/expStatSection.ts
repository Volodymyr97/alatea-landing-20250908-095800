import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'expStatSection',
  title: 'Hero With Stat Cards',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Left Headline',
      type: 'text',
      description: 'Use line breaks (Shift+Enter) to split lines exactly like in the design.',
      rows: 3,
      validation: r => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Left Image',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Cards (right side)',
      type: 'array',
      of: [{ type: 'expStatCard' }],
      validation: r => r.min(1).max(3),
    }),

    // Styling knobs
    defineField({
      name: 'palette',
      title: 'Palette',
      type: 'object',
      fields: [
        { name: 'sectionBg',      type: 'string', title: 'Section BG',      initialValue: '#05060E' },
        { name: 'headlineColor',  type: 'string', title: 'Headline color',  initialValue: '#1E3270' },
        { name: 'underlineColor', type: 'string', title: 'Underline color', initialValue: '#4677FF' },
        { name: 'cardBg',         type: 'string', title: 'Card BG',         initialValue: '#E6ECF7' },
        { name: 'cardText',       type: 'string', title: 'Card Text',       initialValue: '#0B1530' },
        { name: 'btnBg',          type: 'string', title: 'Button BG',       initialValue: '#162453' },
        { name: 'btnText',        type: 'string', title: 'Button Text',     initialValue: '#FFFFFF' },
        { name: 'stroke',         type: 'string', title: 'Card Stroke',     initialValue: 'rgba(70,119,255,.35)' },
      ],
    }),
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'object',
      fields: [
        { name: 'headlinePx', type: 'number', title: 'Headline px', initialValue: 44 },
        { name: 'cardTitlePx', type: 'number', title: 'Card title px', initialValue: 22 },
        { name: 'bodyPx', type: 'number', title: 'Body px', initialValue: 18 },
        { name: 'headingFont', type: 'string', title: 'Heading font CSS', initialValue: 'var(--font-ubuntu, system-ui)' },
        { name: 'bodyFont', type: 'string', title: 'Body font CSS', initialValue: 'var(--font-ubuntu, system-ui)' },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'object',
      fields: [
        { name: 'containerMax', type: 'number', title: 'Container max', initialValue: 1440 },
        { name: 'pt', type: 'number', title: 'Padding top', initialValue: 120 },
        { name: 'pb', type: 'number', title: 'Padding bottom', initialValue: 120 },
        { name: 'gap', type: 'number', title: 'Grid gap', initialValue: 32 },
        { name: 'radius', type: 'number', title: 'Card radius', initialValue: 22 },
        { name: 'underlineW', type: 'number', title: 'Underline width (px)', initialValue: 220 },
        { name: 'rightColW', type: 'number', title: 'Right column width (px on xl+)', initialValue: 480 },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'image' },
    prepare: ({ title, media }) => ({
      title: (title || 'Hero With Cards').split('\n')[0],
      media,
    }),
  },
})
