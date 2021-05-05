export default {
  title: "Property Type",
  name: "propertyType",
  type: "document",
  fields: [
    {
      title: "Property Type",
      name: "propertyTypeName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Property Type Description",
      name: "propertyTypeDescrition",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      pageTitle: "propertyTypeName",
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
