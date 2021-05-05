export default {
  title: "Region",
  name: "region",
  type: "document",
  fields: [
    {
      title: "Region Name",
      name: "regionName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Region Description",
      name: "regionDescrition",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      pageTitle: "regionName",
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
