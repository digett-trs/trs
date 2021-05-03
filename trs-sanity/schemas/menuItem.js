export default {
  title: 'Menu Item',
  name: 'menuItem',
  type: 'object',
  fields: [
    {
      title: 'Menu Item',
      name: 'children',
      type: 'array',
      of: [{ type: 'menuItemItem' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'page.title',
      pageSlug: 'page.slug',
      pageTitle: 'page.title',
      media: '',
    },
    prepare(selection) {
      const { pageSlug, pageTitle } = selection;
      return {
        ...selection,
        title: pageTitle,
        subtitle: `Content Item | ${pageSlug.current}`,
      };
    },
  },
};