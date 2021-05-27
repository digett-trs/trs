export default {
  title: "Property",
  name: "property",
  type: "document",
  fields: [
    {
      title: "Property Name",
      name: "propertyName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "propertyName",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200) +
          "-ranch-for-sale",
      },
    },
    {
      title: "MLSID",
      name: "mlsid",
      type: "string",
    },
    {
      title: "Property Summary",
      name: "propertySummary",
      type: "text",
    },
    {
      title: "Property Featured Image",
      name: "propertyFeaturedImage",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
    {
      title: "Property Type",
      name: "propertyType",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "propertyType" }],
        },
      ],
    },
    {
      title: "County",
      name: "county",
      type: "reference",
      to: [{ type: "county" }],
    },
    {
      title: "Region",
      name: "region",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "region" }],
        },
      ],
    },
    {
      title: "Status",
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "For Sale", value: "for-sale" },
          { title: "Sold", value: "sold" },
        ], // <-- predefined values
        layout: "radio", // <-- defaults to 'dropdown'
      },
    },
    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "Acreage",
      name: "acreage",
      type: "number",
    },
    {
      title: "Property Description",
      name: "propertyDescrition",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Property Location",
      name: "propertyLocation",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Property Land",
      name: "propertyLand",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Property Wildlife",
      name: "propertyWildlife",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Property Water",
      name: "propertyWater",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Property Improvements",
      name: "propertyImprovements",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "youtubeUrl",
      type: "url",
      title: "YouTube Video URL",
    },
    {
      title: "Property Interactive Location Map",
      name: "propertyInteractiveLocationMap",
      type: "text",
    },
    {
      title: "Property Images",
      name: "propertyImages",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      title: "Property Brochure File",
      name: "propertyBrochureFile",
      type: "file",
    },
    {
      title: "Property Aerial Map",
      name: "propertyAerialMap",
      type: "file",
    },
    {
      title: "Property Topographic Map",
      name: "propertyTopographicMap",
      type: "file",
    },
    {
      title: "Property Contacts",
      name: "propertyContacts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "team" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      pageTitle: "propertyName",
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
