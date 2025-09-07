import { defineType, defineField } from 'sanity';
import { RiSparkling2Line } from 'react-icons/ri';

const weightOptions = [
  { title: 'Light (300)', value: 300 },
  { title: 'Regular (400)', value: 400 },
  { title: 'Medium (500)', value: 500 },
  { title: 'SemiBold (600)', value: 600 },
  { title: 'Bold (700)', value: 700 },
  { title: 'ExtraBold (800)', value: 800 },
];

export default defineType({
  name: 'typingText',
  title: 'Text (Animated)',
  type: 'object',
  icon: RiSparkling2Line,
  fields: [
    defineField({ name: 'title', title: 'Label (for editors)', type: 'string' }),

    // layout
    defineField({
      name: 'align', title: 'Align', type: 'string',
      options: { list: ['center','left'], layout: 'radio' }, initialValue: 'center',
    }),
    defineField({ name: 'maxWidthPx', title: 'Max content width (px)', type: 'number', initialValue: 1100 }),

    // content
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'headingLevel', title: 'Heading level', type: 'string',
      options: { list: [{title:'H1',value:'h1'},{title:'H2',value:'h2'},{title:'H3',value:'h3'}], layout: 'radio' },
      initialValue: 'h2',
    }),
    defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text' }], validation: r => r.min(1) }),

    // ONE animation for the whole block
    defineField({
      name: 'animStyle', title: 'Animation style', type: 'string',
      options: {
        list: [
          { title: 'Fade in', value: 'fade' },
          { title: 'Fade up', value: 'fadeUp' },
          { title: 'Fade down', value: 'fadeDown' },
          { title: 'Slide left', value: 'slideLeft' },
          { title: 'Slide right', value: 'slideRight' },
          { title: 'Blur in', value: 'blurIn' },
          { title: 'Scale in', value: 'scaleIn' },
        ],
      }, initialValue: 'fadeUp',
    }),
    defineField({ name: 'duration', title: 'Duration (s)', type: 'number', initialValue: 0.6 }),
    defineField({ name: 'distance', title: 'Distance (px)', type: 'number', initialValue: 24 }),
    defineField({ name: 'delay', title: 'Start delay (s)', type: 'number', initialValue: 0 }),
    defineField({ name: 'once', title: 'Play once', type: 'boolean', initialValue: true }),
    defineField({ name: 'viewportAmount', title: 'Trigger amount (0–1)', type: 'number', initialValue: 0.35 }),
    defineField({ name: 'paragraphGap', title: 'Paragraph gap (px)', type: 'number', initialValue: 20 }),

    // ======== TYPO ======== (усе з адмінки)
    // Heading sizes (mobile/desktop) + weight/style
    defineField({ name: 'headingSizeMobilePx', title: 'Heading size — mobile (px)', type: 'number', initialValue: 28 }),
    defineField({ name: 'headingSizeDesktopPx', title: 'Heading size — desktop (px)', type: 'number', initialValue: 56 }),
    defineField({ name: 'headingLineHeight', title: 'Heading line-height', type: 'number', initialValue: 1.08 }),
    defineField({ name: 'headingWeight', title: 'Heading weight', type: 'number', options: { list: weightOptions }, initialValue: 600 }),
    defineField({ name: 'headingItalic', title: 'Heading italic', type: 'boolean', initialValue: false }),

    // Paragraph sizes (mobile/desktop) + weight/style
    defineField({ name: 'paraSizeMobilePx', title: 'Paragraph size — mobile (px)', type: 'number', initialValue: 16 }),
    defineField({ name: 'paraSizeDesktopPx', title: 'Paragraph size — desktop (px)', type: 'number', initialValue: 22 }),
    defineField({ name: 'paraLineHeight', title: 'Paragraph line-height', type: 'number', initialValue: 1.5 }),
    defineField({ name: 'paraWeight', title: 'Paragraph weight', type: 'number', options: { list: weightOptions }, initialValue: 400 }),
    defineField({ name: 'paraItalic', title: 'Paragraph italic', type: 'boolean', initialValue: false }),

    // (опційно) загальне сімейство
    defineField({
      name: 'fontFamily', title: 'Font family', type: 'string',
      options: { list: [{title:'Inherit (site)', value:'inherit'}, {title:'Ubuntu (layout)', value:'ubuntu'}], layout: 'radio' },
      initialValue: 'inherit',
    }),
  ],
  preview: {
    select: { t: 'title', h: 'heading' },
    prepare({ t, h }) { return { title: t || 'Text (Animated)', subtitle: h ? String(h).slice(0, 64) : '' }; },
  },
});
