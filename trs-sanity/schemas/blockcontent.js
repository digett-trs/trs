export default {
  title: "Block Content",
  name: "blockcontent",
  type: "document",
  fields: [
    {
      title: "Block Name",
      name: "blockName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Block Content",
      name: "blockcontent",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [
                      { type: "page" },
                      // other types you may want to link to
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      pageTitle: "blockName",
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
