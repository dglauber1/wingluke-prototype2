export default {
  name: "youthProgramSession",
  title: "Youth Program Session",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "localeString",
    },
    {
      name: "type",
      title: "Type of Youth Program",
      type: "reference",
      to: [{ type: "youthProgram" }],
    },
    // the exhibit created by this youth program session can be inferred from the exhibit document type's curatedBy field
    /*     {
      name: "exhibitCreated",
      title: "Exhibit Created",
      type: "reference",
      to: [{ type: "exhibit" }],
      description: "Provide the exhibit that this program created.",
    }, */
    {
      name: "members", // TODO rename to participants?
      title: "Members",
      type: "array",
      of: [{ type: "string" }],
    },
    // TODO add teaching artist
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
};
