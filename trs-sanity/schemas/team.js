export default {
  title: "Team",
  name: "team",
  type: "document",
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "Slug",
    },
    {
      title: "Team First Name",
      name: "teamFirstName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Team Last Name",
      name: "teamLastName",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Team Cell Number",
      name: "teamCellNumber",
      type: "string",
    },
    {
      title: "Team E-mail",
      name: "teamEmail",
      type: "string",
    },
    {
      title: "Team Photo",
      name: "teamPhoto",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
    {
      title: "Team Bio",
      name: "teamBio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Team Position",
      name: "teamPosition",
      type: "string",
    },
    {
      title: "Team Sub Title",
      name: "teamSubTitle",
      type: "string",
    },
  ],
  preview: {
    select: {
      firstName: "teamFirstName",
      lastName: "teamLastName",
    },
    prepare(selection) {
      const { firstName, lastName } = selection;
      return {
        ...selection,
        title: firstName + " " + lastName,
      };
    },
  },
};
