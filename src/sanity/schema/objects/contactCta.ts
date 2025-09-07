import { defineType, defineField } from 'sanity';
import { Mail } from 'lucide-react';


export default defineType({
name: 'contactCta',
title: 'Contact CTA (modal form)',
type: 'object',
icon: Mail as any,
fields: [
defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow (small text)' }),
defineField({ name: 'title', type: 'string', title: 'Title' }),
defineField({ name: 'ctaLabel', type: 'string', title: 'Button label', initialValue: 'Get in touch' }),
defineField({
name: 'recipients',
title: 'Recipient emails',
type: 'array',
of: [{ type: 'string', validation: (Rule) => Rule.email() }],
description: 'Submissions will be sent to these addresses.',
validation: (Rule) => Rule.required().min(1),
}),
defineField({
name: 'theme',
title: 'Theme',
type: 'string',
options: { list: [
{ title: 'Dark', value: 'dark' },
{ title: 'Light', value: 'light' },
{ title: 'Custom color', value: 'custom' },
]},
initialValue: 'dark',
}),
defineField({ name: 'bg', title: 'Custom background color', type: 'string', hidden: ({ parent }) => parent?.theme !== 'custom' }),
defineField({ name: 'successTitle', type: 'string', title: 'Success title', initialValue: 'Thank you!' }),
defineField({ name: 'successBody', type: 'text', rows: 3, title: 'Success body', initialValue: 'We will get back to you shortly.' }),
],
preview: {
select: { title: 'title', eyebrow: 'eyebrow' },
prepare: ({ title, eyebrow }) => ({ title: title || 'Contact CTA', subtitle: eyebrow })
}
});