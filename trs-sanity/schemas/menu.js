export default {
  title: 'Menu',
  name: 'menu',
  type: 'document',
  __experimental_actions: ["update", /* 'create', 'delete', */ "publish"],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Menu Items',
      name: 'children',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      pageTitle: 'title',
    },
    prepare(selection) {
      const { pageTitle } = selection;
      return {
        ...selection,
        title: pageTitle,
      };
    },
  },
};