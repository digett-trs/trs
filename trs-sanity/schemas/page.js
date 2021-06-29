// siteSettings.js
export default {
  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
    },
    {
      title: "Body",
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
        },
      ],
    },
    {
      title: "Sidebar",
      name: "sidebar",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blockcontent" }],
        },
      ],
    },
  ],
};
