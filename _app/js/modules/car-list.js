import fetchProduct from "./fetchProduct.js";
import { createElementWithClass } from "../util/createElement.js";
import filterCars from "./filterCar.js";
import {
  createCarCard,
  createCarCardImageWrapper,
  createCarCardYear,
  createCarCardImage,
  createCarCardInfo,
  createCarCardTitle,
  createCarCardPriceWrapper,
  createCarCardLabel,
  createCarCardPrice,
  createCarCardIcons,
  createCarCardButton,
} from "./carCardElements.js";

export default async function CarList() {
  let carProducts = [];
  const carCardContainer = document.querySelector(".car-card");
  handleCarProduct();

  async function handleCarProduct() {
    carProducts = await fetchProduct();
    updateCarList();
  }

  function createProductListContainerDOM(carList) {
    const container = createElementWithClass("div", "car-card-container");

    for (const carProduct of carList) {
      const carCard = createCarCard();
      container.appendChild(carCard);

      const carCardImageWrapper = createCarCardImageWrapper();
      carCard.appendChild(carCardImageWrapper);

      const carCardYear = createCarCardYear(carProduct);
      carCardImageWrapper.appendChild(carCardYear);

      const carCardImage = createCarCardImage(carProduct);
      carCardImageWrapper.appendChild(carCardImage);

      const carCardInfo = createCarCardInfo();
      carCard.appendChild(carCardInfo);

      const carCardTitle = createCarCardTitle(carProduct);
      carCardInfo.appendChild(carCardTitle);

      //price
      const carCardPriceWrapper = createCarCardPriceWrapper();
      carCard.appendChild(carCardPriceWrapper);

      const carCardLabel = createCarCardLabel();
      carCardPriceWrapper.appendChild(carCardLabel);

      const carCardPrice = createCarCardPrice(carProduct);
      carCardPriceWrapper.appendChild(carCardPrice);

      const carCardIcons = createCarCardIcons();
      carCard.appendChild(carCardIcons);

      // Create icon elements
      const gearbox = carProduct.gearbox;
      const fuel = carProduct.fuel;
      const enginePower = carProduct.enginePower;
      const wheeldrive = carProduct.wheeldrive;

      // Iterate through the icons array and create icon elements
      for (const icon of carProduct.icons) {
        const iconElement = createIconElement(
          icon,
          gearbox,
          fuel,
          enginePower,
          wheeldrive
        );

        carCardIcons.appendChild(iconElement);
      }
      // Create car-card__button button
      const carCardButton = createCarCardButton(carProduct);
      carCard.appendChild(carCardButton);
    }
    return container;
  }

  function renderHTML(carList) {
    const container = createProductListContainerDOM(carList);
    carCardContainer.innerHTML = "";
    carCardContainer.appendChild(container);
  }

  function createIconElement(icon, gearbox, fuel, enginePower, wheeldrive) {
    const iconDiv = document.createElement("div");
    iconDiv.className = `car-card__icon car-card__icon--${icon}`;

    const iconImageDiv = document.createElement("div");
    iconImageDiv.className = "car-card__icon-image";
    iconDiv.appendChild(iconImageDiv);

    for (const url of icon.iconUrl) {
      const iconImage = document.createElement("img");
      iconImage.src = url;
      iconImage.alt = icon.name;
      iconImageDiv.appendChild(iconImage);
    }

    const iconTextDiv = document.createElement("div");
    iconTextDiv.className = "car-card__icon-text";
    iconDiv.appendChild(iconTextDiv);

    const iconSpan = document.createElement("span");
    iconTextDiv.appendChild(iconSpan);

    const iconInfoDiv = document.createElement("div");
    iconInfoDiv.className = "car-card__icon-info";
    iconTextDiv.appendChild(iconInfoDiv);

    const iconGearboxSpan = document.createElement("span");
    iconGearboxSpan.textContent = gearbox;
    iconInfoDiv.appendChild(iconGearboxSpan);

    const iconFuelSpan = document.createElement("span");
    iconFuelSpan.textContent = fuel;
    iconInfoDiv.appendChild(iconFuelSpan);

    const iconEnginePowerSpan = document.createElement("span");
    iconEnginePowerSpan.textContent = enginePower;
    iconInfoDiv.appendChild(iconEnginePowerSpan);

    const iconWheelDriveSpan = document.createElement("span");
    iconWheelDriveSpan.textContent = wheeldrive;
    iconInfoDiv.appendChild(iconWheelDriveSpan);

    return iconDiv;
  }

  //filter system

  const filterCarData = {
    diesel: (car) => car.fuel === "diesel",
    bensin: (car) => car.fuel === "bensin",
    elektrisk: (car) => car.fuel === "elektrisk",

    forhjulsdrift: (car) => car.wheeldrive === "forhjulsdrift",
    bakhjulsdrift: (car) => car.wheeldrive === "bakhjulsdrift",
    firehjulsdrift: (car) => car.wheeldrive === "firehjulsdrift",

    automatisk: (car) => car.gearbox === "automatisk",
    manuell: (car) => car.gearbox === "manuell",

    audi: (car) => car.brand === "Audi",
    bmw: (car) => car.brand === "BMW",
    ferrari: (car) => car.brand === "Ferrari",
    ford: (car) => car.brand === "Ford",
    honda: (car) => car.brand === "Honda",
    hyundai: (car) => car.brand === "Hyundai",
    jaguar: (car) => car.brand === "Jaguar",
    mazda: (car) => car.brand === "Mazda",
    mercedes: (car) => car.brand === "Mercedes-Benz",
    skoda: (car) => car.brand === "Skoda",
    toyota: (car) => car.brand === "Toyota",
    volkswagen: (car) => car.brand === "Volkswagen",
  };

  function updateCarList() {
    const activeFilters = Object.keys(filterCarData).reduce(
      (acc, filterName) => {
        const checkbox = document.querySelector(`input[name="${filterName}"]`);
        if (checkbox.checked) {
          acc[filterName] = filterCarData[filterName];
        }
        return acc;
      },
      {}
    );

    const filteredCarProducts = filterCars(carProducts, activeFilters);
    renderHTML(filteredCarProducts);
    // fixing card size when there is only one card while filtering
    if (filteredCarProducts.length === 1) {
      carCardContainer.classList.add("single-card");
    } else {
      carCardContainer.classList.remove("single-card");
    }
  }
  for (const filterName in filterCarData) {
    const checkbox = document.querySelector(`input[name="${filterName}"]`);
    checkbox.addEventListener("change", updateCarList);
  }
}
