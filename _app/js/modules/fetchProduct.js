import { sanity } from "../sanity.js";

export default async function fetchProduct() {
  const query = `*[_type=='product']{
		  _id,
		  "image":image[0].asset->url,
		  modelYear,
		  name,
	  brand,
		  kmstand,
		  gearbox,
		  fuel,
		  enginePower,
		  wheeldrive,
		  price,
		  "icons": icon[]->{
			  "iconUrl": icons[].asset->url,
			  name
			}
		 }`;
  return sanity.fetch(query);
}
