export default {
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      title: "SubTitle",
      name: "subtitle",
      type: "string",
    },

    {
      title: "Image",
      name: "image",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      options: {
        layout: "grid",
        multiple: true,
      },
    },

    {
      title: "Description",
      name: "description",
      type: "text",
    },
    {
      title: "Warrenty",
      name: "warrenty",
      type: "string",
    },

    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "Brand",
      name: "brand",
      type: "string",
    },
    {
      title: "Model Year",
      name: "modelYear",
      type: "string",
    },
    {
      title: "Fuel",
      name: "fuel",
      type: "string",
      options: {
        list: [
          { title: "Petrol", value: "petrol" },
          { title: "Diesel", value: "diesel" },
          { title: "Electric", value: "electric" },
        ],
      },
    },
    {
      title: "Km Stand",
      name: "kmstand",
      type: "string",
    },
    {
      title: "Engine Power",
      name: "enginePower",
      type: "number",

      validation: (Rule) => Rule.required(),
    },
    {
      title: "Wheel drive",
      name: "wheeldrive",
      type: "string",
      options: {
        list: [
          { title: "Front Wheel Drive", value: "frontWheelDrive" },
          { title: "Back Wheel Drive", value: "backWheelDrive" },
          { title: "All Wheel Drive", value: "allWheelDrive" },
        ],
      },
    },
    {
      title: "Gearbox",
      name: "gearbox",
      type: "string",
      options: {
        list: [
          { title: "Automatic", value: "automatic" },
          { title: "Manual", value: "manual" },
        ],
      },
    },
    {
      title: "Body Condition",
      name: "bodyCondition",
      type: "string",
    },
    {
      title: "Mechanical Condition",
      name: "mechanicalCondition",
      type: "string",
    },
    {
      title: "Equipment",
      name: "equipment",
      type: "array",
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: "reference",
          to: [{ type: "equipment" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      name: "name",
      image: "image",
      price: "price",
    },
    prepare(selection) {
      const { name, image, price } = selection;
      return {
        title: name,
        subtitle: `${price.toFixed(2)} kr`,
        media: image[0],
      };
    },
  },
};
