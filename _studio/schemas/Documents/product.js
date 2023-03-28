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
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
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
      title: "Model",
      name: "model",
      type: "string",
    },
    {
      title: "Fuel",
      name: "fuel",
      type: "string",
    },
    {
      title: "Km Stand",
      name: "kmstand",
      type: "string",
    },
    {
      title: "Power",
      name: "power",
      type: "string",
    },
    {
      title: "Wheel drive",
      name: "wheeldrive",
      type: "string",
    },
    {
      title: "Gearbox",
      name: "gearbox",
      type: "string",
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
      title: "Category",
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      title: "Equipment",
      name: "equipment",
      type: "array",
      of: [{ type: "reference", to: [{ type: "equipment" }] }],
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
        media: image,
      };
    },
  },
};
