// icon.js

export default {
  title: "Icon",
  name: "icon",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Icons",
      name: "icons",
      type: "array",
      of: [
        {
          title: "Icon",
          name: "icon",
          type: "image",
          options: {
            accept: "image/png",
          },
        },
      ],
    },
  ],
};
