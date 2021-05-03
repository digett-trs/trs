export default {
  title: "Menu Item",
  name: "menuItem",
  type: "object",
  fields: [
    {
      title: "Menu Item Item",
      name: "children",
      type: "menuItemItem",
    },
  ],
  preview: {
    select: {
      title: "children.title",
      pageSlug: "children.document.slug.current",
    },
    prepare(selection) {
      const { pageSlug, title } = selection;
      console.log(selection);
      return {
        ...selection,
        title: title,
        subtitle: `URL: https://www.texasranchesforsale.com/` + pageSlug,
      };
    },
  },
};
