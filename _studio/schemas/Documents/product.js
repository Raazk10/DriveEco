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
      title: "Icon",
      name: "icon",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "icon" }],
        },
      ],
    },

    {
      title: "Description",
      name: "description",
      type: "text",
    },
    {
      title: "Warranty",
      name: "warranty",
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
          { title: "Bensin", value: "bensin" },
          { title: "Diesel", value: "diesel" },
          { title: "Elektrisk", value: "elektrisk" },
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
          { title: "Forhjulsdrift", value: "forhjulsdrift" },
          { title: "Bakhjulsdrift", value: "bakhjulsdrift" },
          { title: "Firehjulsdrift", value: "firehjulsdrift" },
        ],
      },
    },
    {
      title: "Gearbox",
      name: "gearbox",
      type: "string",
      options: {
        list: [
          { title: "Automatisk", value: "automatisk" },
          { title: "Manuell", value: "manuell" },
        ],
      },
    },
    {
      title: "Body Condition",
      name: "bodyCondition",
      type: "string",
      options: {
        list: [
          { title: "Utmerket", value: "utmerket" },
          { title: "God", value: "god" },
          { title: "Akseptabel", value: "akseptabel" },
          { title: "Dårlig", value: "dårlig" },
        ],
      },
    },
    {
      title: "Mechanical Condition",
      name: "mechanicalCondition",
      type: "string",
      options: {
        list: [
          { title: "Utmerket", value: "utmerket" },
          { title: "God", value: "god" },
          { title: "Akseptabel", value: "akseptabel" },
          { title: "Dårlig", value: "dårlig" },
        ],
      },
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
