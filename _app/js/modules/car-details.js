import { sanity } from "../sanity.js";

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");

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
    "image": image[0].asset->url,
  }`;
  const carDetails = await sanity.fetch(query);

  const carImage = document.querySelector(".car-image");
  const carTitle = document.querySelector(".car-title");
  const carModelYear = document.querySelector(".car-model-year");
  const carBrand = document.querySelector(".car-brand");
  const carDriven = document.querySelector(".car-driven");
  const carGearbox = document.querySelector(".car-gearbox");
  const carFuel = document.querySelector(".car-fuel");
  const carEnginePower = document.querySelector(".car-engine-power");
  const carWheelDrive = document.querySelector(".car-wheel-drive");
  const carPrice = document.querySelector(".car-price");

  carImage.src = carDetails[0].image;
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
