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
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      title: "Description",
      name: "description",
      type: "string",
    },

    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "CountInStock",
      name: "countInStock",
      type: "number",
    },
    {
      title: "Brand",
      name: "brand",
      type: "string",
    },
  ],
};
