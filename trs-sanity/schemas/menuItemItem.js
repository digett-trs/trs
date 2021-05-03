export default {
  title: 'Menu Item Item',
  name: 'menuItemItem',
  type: 'object',
  fields: [
    {
      title: 'Top Level Document Reference',
      description: 'Reference existing content to be used in the navigation structure.',
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      title: 'Menu Title',
      name: 'title',
      type: 'string',
    },
    // {
    //   title: 'Submenu Item',
    //   name: 'submenu',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [
    //         { type: 'page' },
    //       ]
    //     }
    //   ]
    // }
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