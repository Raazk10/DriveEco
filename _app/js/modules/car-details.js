import { sanity } from "../sanity.js";
import Slideshow from "./slideshow.js";

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

function displayCarDetail(carDetail) {
  const descriptionContainer = document.createElement("div");

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = carDetail.description;

  descriptionContainer.appendChild(descriptionParagraph);
  
  return descriptionContainer;
}

async function fetchCarDetails() {
  const query = `*[ _type == "product" && _id == "${id}" ]{
    _id,
    name,
    modelYear,
    brand,
    kmstand,
    gearbox,
    fuel,
    enginePower,
    wheeldrive,
    price,
    description,
    "images": image[].asset->url,
   "icons": icon[]->{
			  "iconUrl": icons[].asset->url,
			  name
		}
  }`;
  const carDetails = await sanity.fetch(query);

  const carImages = document.querySelector(".car__images");

   // Create images and append them to carImages
  carDetails[0].images.forEach((imageUrl) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = `${carDetails[0].name} image`;
    img.className = "car__image";
    carImages.appendChild(img);
  });

  Slideshow(".car__image");
  

  const carTitle = document.querySelector(".car__title");
  const carModelYear = document.querySelector(".car__model-year");
  const carBrand = document.querySelector(".car__brand");
  const carDriven = document.querySelector(".car__driven");
  const carGearbox = document.querySelector(".car__gearbox");
  const carFuel = document.querySelector(".car__fuel");
  const carEnginePower = document.querySelector(".car__engine-power");
  const carWheelDrive = document.querySelector(".car__wheel-drive");
  const carPrice = document.querySelector(".car__price");

  const carDescriptionContainer = displayCarDetail(carDetails[0]);

  const carDescriptionWrapper = document.querySelector(".car__description--container");
  carDescriptionWrapper.appendChild(carDescriptionContainer);

  carTitle.textContent = carDetails[0].name;
  carModelYear.textContent = carDetails[0].modelYear;
  carBrand.textContent = carDetails[0].brand;
  carDriven.textContent = `${carDetails[0].kmstand} km`;
  carGearbox.textContent = carDetails[0].gearbox;
  carFuel.textContent = carDetails[0].fuel;
  carEnginePower.textContent = `${carDetails[0].enginePower} HK`;
  carWheelDrive.textContent = carDetails[0].wheeldrive;
  carPrice.textContent = `${carDetails[0].price} kr`;
}

fetchCarDetails();
