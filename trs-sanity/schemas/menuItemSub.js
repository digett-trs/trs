export default {
  title: "Menu Item Sub",
  name: "menuItemSub",
  type: "object",
  fields: [
    { name: "title", type: "string", title: "Menu Title" },
    {
      name: "document",
      type: "reference",
      title: "Document Reference",
      to: [{ type: "page" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      pageSlug: "document.slug.current",
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
